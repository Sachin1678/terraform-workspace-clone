import prompts from 'prompts';
import TFCloneWS from './src/core/clone';
import { removeTrailingSlash  } from "./src/utils/util";

const questions = [
  {
    type: 'text',
    name: 'baseUrl',
    message: 'TF domain name?',
    validate: (baseUrl: string) => !!baseUrl,
    format: (val: string) => {
      val = removeTrailingSlash(val)
      if(!(val.startsWith('https') || val.startsWith('http'))) {
        val = `https://${val}`
      }

      return val
    }
  },
  {
    type: 'text',
    name: 'sourceWSId',
    message: 'Source workspace ID?',
    validate: (sourceWSId: string) => !!sourceWSId,
    format: (val: string) => val.trim()
  },
  {
    type: 'text',
    name: 'newWSName',
    message: 'New workspace name?',
    validate: (newWSName: string) => !!newWSName,
    format: (val: string) => val.trim()
  },
  {
    type: 'password',
    name: 'apiToken',
    message: 'TF api token',
    validate: (apiToken: string) => !!apiToken
  },
  {
    type: 'text',
    name: 'orgName',
    message: 'Destination TF organization name?',
    validate: (orgName: string) => !!orgName,
    format: (val: string) => val.trim()
  },
  {
    type: 'toggle',
    name: 'isCloneValue',
    message: 'Do you want to clone with values?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  },
];

(async () => {
  const response = await prompts(questions);
  const tfClone = new TFCloneWS(response)
  tfClone.setup()
})();
