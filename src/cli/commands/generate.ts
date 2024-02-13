import axios from 'axios';
import { Command } from './interface.js';
import { MockServerData } from '../../shared/interfacas/index.js';
import TSVFileWriter from '../../shared/libs/file-writer/file-writer.js';
import TSVOfferGenerator from '../../shared/libs/tsv-offer-generator/tsv-offer-generator.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      const { data } = await axios.get(url);

      this.initialData = data;
    } catch(e) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, amount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < amount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  async execute(...args: string[]): Promise<void> {
    const [amount, filepath, url] = args;
    const formattedAmount = Number.parseInt(amount, 10);

    try {
      await this.load(url);
      await this.write(filepath, formattedAmount);

      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
