import chalk from 'chalk';
import { Command } from './interface.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  execute(): void {
    console.info(`
            ${chalk.blue('Программа для подготовки данных для REST API сервера.')}
            ${chalk.blue('Пример:')}
            \t${chalk.green('cli.js --<command> [--arguments]')}
            ${chalk.blue('Команды:')}
            \t${chalk.green('--version:                     # выводит номер версии')}
            \t${chalk.green('--help:                        # печатает этот текст')}
            \t${chalk.green('--import <path>:               # импортирует данные из TSV')}
            \t${chalk.green('--generate <n> <path> <url>:   # генерирует произвольное количество тестовых данных')}
        `);
  }
}
