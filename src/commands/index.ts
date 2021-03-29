import { readdirSync } from 'fs';
import { Command, Client, ProtoCommand, Message } from './command';

function makeCommand(cmd: ProtoCommand, prefix: string): Command {
	if (!cmd.name) throw new Error('Command provided without a name.');
	if (!cmd.run) throw new Error('Command provided without a function.');
	if (!cmd.description) throw new Error('Command provided without a description.');

	const command: Command = {
		run: cmd.run,
		name: cmd.name,
		help: '',
		aliases: [],
		examples: '',
		description: cmd.description,
	};

	if (cmd.aliases && Array.isArray(cmd.aliases)) command.aliases = cmd.aliases;

	if (cmd.examples) cmd.examples.reduce((acc, v) => `${acc}• \`${v(prefix)}\`\n`, '');

	command.help = `${cmd.description}\n${
		command.aliases[0] ? command.aliases.reduce((acc, v) => `${acc}• ${v}\n`, '') : ''
	}${command.examples ? command.examples : ''}`;

	return command;
}

export = (client: Client): void => {
	const files = readdirSync(__dirname).filter((v) => v.match(/^((?!index).+)\.js$/) !== null);
	const prefix = process.env.PREFIX;
	const commands = new Map<string, Command>();
	const aliases = new Map<string, string>();

	let commandList = '';

	files.forEach((v) => {
		const command: Command = makeCommand(require(`${__dirname}/${v}`), prefix);
		commands.set(command.name, command);
		aliases.set(command.name.toLowerCase(), command.name);
		command.aliases.forEach((alias) => aliases.set(alias.toLowerCase(), command.name));
		commandList += `**${command.name}**\n${command.description}\n\n`;
	});

	client.aliases = aliases;
	client.commands = commands;
	client.commandList = commandList;

	client.on('message', (message) => {
		if (!message.content.startsWith(prefix)) return;
		const args = message.content.slice(prefix.length).trim().split(/\s+/);
		const command = commands.get(aliases.get(args[0].toLowerCase()));
		if (command && command.run) command.run(message as Message, args);
	});
};
