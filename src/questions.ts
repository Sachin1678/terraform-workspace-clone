import prompts from 'prompts';
import { formatUrl } from './utils/util';

const questions = [
  {
    type: 'text',
    name: 'baseUrl',
    message: 'TF domain name?',
    validate: (baseUrl: string) => !!baseUrl,
    format: formatUrl,
  },
  {
    type: 'text',
    name: 'sourceWorkspaceId',
    message: 'Source workspace ID?',
    validate: (sourceWorkspaceId: string) => !!sourceWorkspaceId,
    format: (val: string) => val.trim(),
  },
  {
    type: 'text',
    name: 'newWorkspaceName',
    message: 'New workspace name?',
    validate: (newWorkspaceName: string) => !!newWorkspaceName,
    format: (val: string) => val.trim(),
  },
  {
    type: 'text',
    name: 'destinationOrgName',
    message: 'Destination TF organization name?',
    validate: (destinationOrgName: string) => !!destinationOrgName,
    format: (val: string) => val.trim(),
  },
  {
    type: 'password',
    name: 'destinationOrgVcsOauthTokenId',
    message:
      "(Optional) OAuth Token id from destinaton organization to clone source workspace's VCS config?",
  },
  {
    type: 'password',
    name: 'userApiToken',
    message: 'User api token',
    validate: (userApiToken: string) => !!userApiToken,
  },
  {
    type: 'toggle',
    name: 'isCloneValue',
    message: 'Do you want to clone with values?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
];

export default async function clonePrompts() {
  try {
    return await prompts(questions);
  } catch (error) {
    console.log(error);
  }
}
