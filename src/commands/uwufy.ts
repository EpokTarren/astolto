import { TextChannel } from 'discord.js';
import { ProtoCommand } from './command';
import { Uwuifier } from 'uwuifier/dist';

const uwu = new Uwuifier({ spaces: { faces: 0, actions: 0, stutters: 0 }, exclamations: 0 });
export = {
	run: async (message) => {
		const content = message.reference
			? (
					await (message.guild.channels.resolve(
						message.reference.channelID
					) as TextChannel).messages.fetch(message.reference.messageID)
			  ).content
			: message.content.replace(/^[^\s]+\s*/, '');

		if (!content)
			message.channel.send({
				embed: {
					title: 'Ewwow',
					description: 'Nyo content to convewt QwQ',
					color: 0xff2020,
				},
			});
		else
			message.channel.send({
				embed: {
					title: 'Your convewtion is complete',
					description: uwu.uwuifySentence(content),
					fields: [
						{
							name: 'Source',
							value: `[Original message](https://discord.com/channels/${
								message?.reference?.guildID || message.guild.id
							}/${message?.reference?.channelID || message.channel.id}/${
								message?.reference?.messageID || message.id
							})`,
						},
					],
					color: 0xff80cc,
				},
			});
	},
	name: 'uwufy',
	description: 'Make a message more uwu~',
	aliases: ['uwu'],
} as ProtoCommand;
