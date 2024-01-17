import fs from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';

import { Command } from './interface.js';

type PackageJson = {
    version: string;
};

function isPackageJson(data: unknown): data is PackageJson {
  return (
    typeof data === 'object' &&
        !Array.isArray(data) &&
        data !== null &&
        Object.hasOwn(data, 'version')
  );
}

export class VersionCommand implements Command {
  getName(): string {
    return '--version';
  }

  private readVersion(): string {
    const file = fs.readFileSync(resolve('package.json'), 'utf-8');
    const importedContent: unknown = JSON.parse(file);

    if (isPackageJson(importedContent)) {
      return importedContent.version;
    } else {
      throw new Error('Package is absent or not valid');
    }
  }

  execute(): void {
    try {
      console.log(chalk.blue(this.readVersion()));
    } catch(e) {
      console.log(chalk.red(`Error: ${e}`));
    }
  }
}
