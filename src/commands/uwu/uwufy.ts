import { IntractableCommand } from 'mashujs';
import { Uwuifier } from 'uwuifier/dist';

const uwu = new Uwuifier({ spaces: { faces: 0, actions: 0, stutters: 0 }, exclamations: 0 });

export = {
	run: async (message) => {
		const content = message.isMessage()
			? message.reference
				? (await message.channel.messages.fetch(message.reference.messageId)).content
				: message.content.replace(/^[^\s]+\s*/, '')
			: message.options.getString('text') ??
			  (await message.channel.messages.fetch(message.options.getString('id')))?.content;

		if (!content)
			message.reply({
				embeds: [
					{
						title: 'Ewwow',
						description: 'Nyo content to convewt QwQ',
						color: colours.error,
					},
				],
			});
		else
			message.reply({
				embeds: [
					{
						title: 'Your convewtion is complete',
						description: uwu.uwuifySentence(content),
						fields: message.isMessage()
							? [
									{
										name: 'Source',
										value: `[Original message](https://discord.com/channels/${
											message.reference?.guildId || message.guild.id
										}/${message.reference?.channelId || message.channel.id}/${
											message.reference?.messageId || message.id
										})`,
									},
							  ]
							: [],
						color: colours.default,
					},
				],
			});
	},
	name: 'uwufy',
	description: 'Make a message more uwu~',
	aliases: ['uwu'],
	examples: [
		(p) =>
			`${p}uwufy Astolfo, Class Name Rider of "Black", is the Rider-class Servant of Celenike Icecolle Yggdmillennia.`,
		(p) => `${p}uwu Astolto is an open source Discord bot that will gladly rate how cute your messages are.`,
	],
	interaction: 'on',
	interactionArgs: [
		{
			type: 'String',
			name: 'text',
			description: 'The text you want to convert',
			required: false,
		},
		{
			type: 'String',
			name: 'id',
			description: 'ID of the message you wish to convert',
			required: false,
		},
	],
} as IntractableCommand;
