import * as Discord from 'discord.js';

interface Message extends Discord.Message {
	client: Client;
}

interface ProtoCommand {
	run: (msg: Message, args?: string[]) => Promise<void>;
	name: string;
	aliases?: string[];
	examples?: ((prefix: string) => string)[];
	description: string;
}

interface Command {
	run: (msg: Message, args?: string[]) => Promise<void>;
	name: string;
	help: string;
	aliases: string[];
	examples: string;
	description: string;
}

interface Client extends Discord.Client {
	aliases: Map<string, string>;
	commands: Map<string, Command>;
	commandList: string;
}
