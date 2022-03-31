import chalk from 'chalk';

export function removeTrailingSlash(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function log(type, message) {
  switch (type) {
    case 'warn':
      console.log(chalk.yellow(message));
      break;
    case 'info':
      console.log(chalk.green(message));
      break;
    case 'error':
      console.log(chalk.red(message));
      break;

    default:
      break;
  }
}
