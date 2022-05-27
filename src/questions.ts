import prompts, { PromptType } from 'prompts';
import { formatUrl } from './utils/util';


const questions = [
  {
    type: 'text' as PromptType,
    name: 'baseUrl',
    message: 'TF domain name?',
    validate: (baseUrl: string) => !!baseUrl,
    format: formatUrl,
  },
  {
    type: 'text' as PromptType,
    name: 'sourceWorkspaceId',
    message: 'Source workspace ID?',
    validate: (sourceWorkspaceId: string) => !!sourceWorkspaceId,
    format: (val: string) => val.trim(),
  },
  {
    type: 'toggle' as PromptType,
    name: 'isSameOrg',
    message: 'Clone within same terraform organization as source workspace?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
  {
    type: (prev, values) => (values.isSameOrg ? null : ('text' as PromptType)),
    name: 'destinationOrgName',
    message: 'Destination TF organization name?',
    validate: (destinationOrgName: string) => !!destinationOrgName,
    format: (val: string) => val.trim(),
  },
  {
    type: (prev, values) =>
      values.isSameOrg ? null : ('password' as PromptType),
    name: 'destinationOrgVcsOauthTokenId',
    message:
      "(Optional) OAuth Token id from destinaton organization to clone source workspace's VCS config?",
  },
  {
    type: 'text' as PromptType,
    name: 'newWorkspaceName',
    message: 'New workspace name?',
    validate: (newWorkspaceName: string) => !!newWorkspaceName,
    format: (val: string) => val.trim(),
  },
  {
    type: 'password' as PromptType,
    name: 'userApiToken',
    message: 'User api token',
    validate: (userApiToken: string) => !!userApiToken,
  },
  {
    type: 'toggle' as PromptType,
    name: 'isCloneValue',
    message: 'Do you want to clone with values?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
];

export default async function clonePrompts(): Promise<prompts.Answers<string>> {
  try {
    return await prompts(questions);
  } catch (error) {
    console.log(error);
  }
}
