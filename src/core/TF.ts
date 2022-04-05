import _ from 'lodash';
import axios from 'axios';

export default class CloneWorkspace {
  BASE_PATH: string = 'api/v2';
  URL: string = '';
  headers = {};

  constructor(baseUrl: string, userApiToken: string) {
    this.URL = `${baseUrl}/${this.BASE_PATH}`;
    this.headers = {
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${userApiToken}`,
    };
  }

  async searchWorkspace(orgName: string, WSName: string) {
    const url = `${this.URL}/organizations/${orgName}/workspaces`;

    const params = {
      'search[name]': WSName,
    };

    const res = await axios({
      method: 'GET',
      url,
      params,
      headers: this.headers,
    });

    return res.data;
  }

  async fetchWorkspaceByName(orgName: string, WSName: string) {
    const url = `${this.URL}/organizations/${orgName}/workspaces/${WSName}`;

    const res = await axios({
      method: 'GET',
      url,
      headers: this.headers,
    });

    return res.data;
  }

  async fetchWorkspaceById(WSId: string) {
    const url = `${this.URL}/workspaces/${WSId}`;

    const res = await axios({
      method: 'GET',
      url,
      headers: this.headers,
    });

    return res.data;
  }

  async createWorkspace(orgName: string, data: {}) {
    const url = `${this.URL}/organizations/${orgName}/workspaces`;

    const res = await axios({
      method: 'POST',
      url,
      data,
      headers: this.headers,
    });

    return res.data;
  }

  async fetchWorkspaceVars(wsId: string) {
    const url = `${this.URL}/workspaces/${wsId}/vars`;

    const res = await axios.get(url, {
      method: 'GET',
      headers: this.headers,
    });

    return res.data;
  }

  formatVarPayload(rawVars: { data: any[] }, isCloneValue: boolean) {
    const attrs = ['key', 'sensitive', 'category', 'hcl', 'description'];

    if (isCloneValue) {
      attrs.push('value');
    }

    return rawVars.data.map((o) => ({
      data: {
        type: 'vars',
        attributes: _.pick(o.attributes, attrs),
      },
    }));
  }

  async createVariables(varsData: any[], destWSId: string) {
    const url = `${this.URL}/workspaces/${destWSId}/vars`;

    const promises = varsData.map((data) => {
      return axios({
        method: 'post',
        url,
        data,
        headers: this.headers,
      });
    });

    return await Promise.all(promises);
  }
}
