import { ProtoCommand } from './command';

export = {
	run: async (message, args) => {
		if (args[1]) {
			const command = message.client.commands.get(
				message.client.aliases.get(args[1].toLowerCase())
			);

			if (command) {
				message.channel.send({
					embed: {
						title: command.name,
						description: command.description,
					},
				});
				return;
			}
		}
		message.channel.send({
			embed: {
				title: 'List of Commands',
				description: message.client.commandList,
				color: 0xff80cc,
			},
		});
	},
	name: 'Help',
	aliases: ['Hewp'],
	examples: [(p) => `${p}help`, (p) => `${p}help appraise`],
	description: 'Provides help',
} as ProtoCommand;
