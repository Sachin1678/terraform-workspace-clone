import _ from 'lodash';
import TFCloneWS from './core/clone';
import clonePrompts from './questions';
import { argv } from './commands';

export default async function commands(): Promise<void> {
  if (argv._[0] === 'initconfig') return; // Cli instruction to create config template. No other action needed.
  try {
    const input = argv?.config ? argv : await clonePrompts();
    console.log(input);
    const sanitizedInput = sanitizeInput(input);
    const tfClone = new TFCloneWS(sanitizedInput);
    await tfClone.setup();
  } catch (error) {
    console.log(error?.message);
  }
}

function sanitizeInput(config) {
  const isValid =
    config.userApiToken &&
    config.baseUrl &&
    config.newWorkspaceName &&
    (config.isSameOrg || config.destinationOrgName) &&
    config.sourceWorkspaceId &&
    config.isCloneValue !== undefined;

  if (!isValid) {
    throw new Error(
      'Provide all required values. Check README.md for more details: https://www.npmjs.com/package/terraform-workspace-clone',
    );
  } else {
    return _.pick(config, [
      'userApiToken',
      'baseUrl',
      'newWorkspaceName',
      'destinationOrgName',
      'sourceWorkspaceId',
      'isCloneValue',
      'destinationOrgVcsOauthTokenId',
      'isSameOrg',
    ]);
  }
}
