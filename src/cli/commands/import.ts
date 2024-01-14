import chalk from 'chalk';

import { TSVFileReader } from '../../shared/libs/file-reader/file-reader.js';
import { Command } from './interface.js';

export class ImportCommand implements Command {
    getName(): string {
        return '--import';
    }

    execute(...args: string[]): void {
        const [filename] = args;
        const fileReader = new TSVFileReader(filename?.trim());

        try {
            fileReader.read();
            console.log(fileReader.toArray());
        } catch (err) {
            if (!(err instanceof Error)) {
              throw err;
            }
      
            console.error(chalk.red(`Can't import data from file: ${filename}`));
            console.error(chalk.red(`Details: ${err.message}`));
        }
    }
};
