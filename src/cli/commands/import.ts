import chalk from 'chalk';

import { TSVFileReader } from '../../shared/libs/file-reader/file-reader.js';
import { createRentalOffer } from '../../shared/helpers/index.js';
import { Command } from './interface.js';

export class ImportCommand implements Command {
  getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const rentalOffer = createRentalOffer(line);
    console.info(rentalOffer);
  }

  private onCompleteImport(count: number) {
    console.info(chalk.bgCyanBright(`${count} rows imported.`));
  }

  execute(...args: string[]): void {
    const [filename] = args;
    const fileReader = new TSVFileReader(filename?.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
