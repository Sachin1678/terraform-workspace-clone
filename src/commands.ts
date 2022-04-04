import fs from 'fs';
import yargs from 'yargs/yargs';
import { resolve } from 'path';
import { formatUrl } from './utils/util';
import { TEMPLATE_CONFIG, TEMPLATE_FILE_NAME } from './constants';

export const argv = yargs(process.argv.slice(2))
  .usage(`Clone existing terraform workspace\n\nUsage: $0 [options]`)
  .example([
    ['$0 initconfig', 'Generate config template'],
    [`$0 --config ./${TEMPLATE_FILE_NAME}`, 'Provide config file'],
  ])
  .config('config', function (configPath) {
    console.log(resolve(process.cwd(), configPath));
    if (configPath) {
      const input = JSON.parse(
        fs.readFileSync(resolve(process.cwd(), configPath), 'utf-8'),
      );

      input.baseUrl = formatUrl(input?.baseUrl);

      return input;
    }
  })
  .command(['initconfig'], 'Create config template', () => {
    fs.writeFileSync(TEMPLATE_FILE_NAME, TEMPLATE_CONFIG, 'utf8');

    return;
  })
  .help().argv;
