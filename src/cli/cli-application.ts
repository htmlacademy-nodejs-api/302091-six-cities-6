import chalk from 'chalk';

import { Command } from './commands/interface.js';

export class CLIApplication {
  constructor(defaultCommand = '--help') {
    this.defaultCommand = defaultCommand;
  }

  private commands: Record<string, Command> = {};
  private readonly defaultCommand: string;

  registerCommands(commands: Command[]) {
    commands.forEach((command) => {
      if (this.commands[command.getName()]) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }

      this.commands[command.getName()] = command;
    });
  }

  processCommand(args: string[]) {
    const [, ,commandName = this.defaultCommand, ...params] = args;

    if (this.commands[commandName]) {
      this.commands[commandName].execute(...(params || []));
    } else {
      console.error(
        chalk.red(`Error. Command ${commandName} is unsupported`)
      );
    }
  }
}
