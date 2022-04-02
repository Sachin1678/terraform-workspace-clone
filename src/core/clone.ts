import _ from 'lodash';
import { log } from '../utils/util';
import CloneWorkspace from './TF';
import { ITFConfig } from './types';

export default class TFCloneWS {
  cloneWS: CloneWorkspace;
  config: ITFConfig;

  constructor(config: ITFConfig) {
    this.config = config;
    this.cloneWS = new CloneWorkspace(config.baseUrl, config.apiToken);
  }

  async setup() {
    try {
      const searchWS = await this.cloneWS.searchWorkspace(
        this.config.orgName,
        this.config.newWSName,
      );

      if (searchWS.data.length) {
        throw new Error(
          'New workspace can not be created. Workspace with this name already exists in destination TF org.',
        );
      }

      const existingWS = await this.cloneWS.fetchWorkspaceById(
        this.config.sourceWSId,
      );

      if (!existingWS.data.id) {
        throw new Error(
          'Source workspace doesnt exists. Provide valid source to clone.',
        );
      }

      const rawVars = await this.cloneWS.fetchWorkspaceVars(existingWS.data.id);
      const createWorkspaceInput = this.workspaceAttributes(
        existingWS.data,
        this.config.newWSName,
      );
      const newWS = await this.cloneWS.createWorkspace(
        this.config.orgName,
        createWorkspaceInput,
      );
      const formattedVarsPayload = this.cloneWS.formatVarPayload(
        rawVars,
        this.config.isCloneValue,
      );
      await this.createWorkspaceVars(formattedVarsPayload, newWS.data.id);

      log(
        'info',
        `Workspace ${this.config.newWSName} created in ${this.config.orgName} organization.`,
      );
    } catch (error) {
      log('error', error?.message);
    }
  }

  workspaceAttributes(workspaceData, name = '') {
    return {
      data: {
        attributes: {
          name,
          description: workspaceData.attributes['description'],
          'terraform-version': workspaceData.attributes['terraform-version'],
          'working-directory': workspaceData.attributes['working-directory'],
          'tag-names': workspaceData.attributes['tag-names'],
        },
        type: 'workspaces',
      },
    };
  }

  async createWorkspaceVars(varData, workspaceId) {
    const chunkData = _.chunk(varData, 20);

    log('info', `Total variables: ${varData.length}`);
    log(
      'info',
      `Creating variables in ${chunkData.length} batches in new workspace`,
    );

    return new Promise<void>((resolve, reject) => {
      this.scheduleCreateWorkspaceVars(chunkData, workspaceId, 0, 1, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }

  scheduleCreateWorkspaceVars(
    varData,
    workspaceId,
    delay = 0,
    chunkCounter = 1,
    cb = (err = null) => {},
  ) {
    if (chunkCounter > varData.length) {
      return cb();
    }

    setTimeout(async () => {
      try {
        await this.cloneWS.createVariables(
          varData[chunkCounter - 1],
          workspaceId,
        );
        log('info', `Executed batch ${chunkCounter} of ${varData.length}`);
        this.scheduleCreateWorkspaceVars(
          varData,
          workspaceId,
          1000,
          ++chunkCounter,
          cb,
        );
      } catch (error) {
        return cb(
          new Error(`Error while creating variables. ${error?.message}`),
        );
      }
    }, delay);
  }
}
