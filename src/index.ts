import prompts from 'prompts';
import fs from 'fs';
import _ from 'lodash';
import yargs from 'yargs/yargs';
import { resolve } from 'path';
import TFCloneWS from './core/clone';
import { removeTrailingSlash } from './utils/util';

var argv = yargs(process.argv.slice(2))
  .usage(`Clone existing terraform workspace\n\nUsage: $0 [options]`)
  .example([['$0 --config "~/config.json"', 'Provide config file']])
  .config('config', function (configPath) {
    console.log(resolve(process.cwd(), configPath));
    if (configPath) {
      return JSON.parse(
        fs.readFileSync(resolve(process.cwd(), configPath), 'utf-8'),
      );
    }
  })
  .help().argv;

const questions = [
  {
    type: 'text',
    name: 'baseUrl',
    message: 'TF domain name?',
    validate: (baseUrl: string) => !!baseUrl,
    format: (val: string) => {
      val = removeTrailingSlash(val);
      if (!(val.startsWith('https') || val.startsWith('http'))) {
        val = `https://${val}`;
      }

      return val;
    },
  },
  {
    type: 'text',
    name: 'sourceWSId',
    message: 'Source workspace ID?',
    validate: (sourceWSId: string) => !!sourceWSId,
    format: (val: string) => val.trim(),
  },
  {
    type: 'text',
    name: 'newWSName',
    message: 'New workspace name?',
    validate: (newWSName: string) => !!newWSName,
    format: (val: string) => val.trim(),
  },
  {
    type: 'password',
    name: 'apiToken',
    message: 'TF api token',
    validate: (apiToken: string) => !!apiToken,
  },
  {
    type: 'text',
    name: 'orgName',
    message: 'Destination TF organization name?',
    validate: (orgName: string) => !!orgName,
    format: (val: string) => val.trim(),
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

export default async function commands(): Promise<void> {
  try {
    const input = argv?.config ? argv : await prompts(questions);
    const sanitizedInput = sanitizeInput(input);
    const tfClone = new TFCloneWS(sanitizedInput);
    await tfClone.setup();
  } catch (error) {
    console.log(error);
  }
}

function sanitizeInput(config) {
  const isValid =
    config.apiToken &&
    config.baseUrl &&
    config.newWSName &&
    config.orgName &&
    config.orgName &&
    config.sourceWSId &&
    config.isCloneValue !== undefined;

  if (!isValid) {
    throw new Error(
      'Provide all required values. Check README.md for more details: https://www.npmjs.com/package/terraform-workspace-clone',
    );
  } else {
    return _.pick(config, [
      'apiToken',
      'baseUrl',
      'newWSName',
      'orgName',
      'sourceWSId',
      'isCloneValue',
    ]);
  }
}
