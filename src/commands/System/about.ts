import { IntractableCommand } from 'mashujs';

const { repository, bugs, homepage } = require('../../../package.json') as {
	bugs: { url: string };
	repository: string;
	homepage: string;
};

const about = `Astolto is an open source Discord bot that will gladly rate how uwu your messages are~

[Astolto](${homepage}) is more specifically a Discord bot written in TypeScript using [discord.js](https://discord.js.org/#/) and [MashuJS](https://mashu.tarren.moe/)(a smallish command handler built for Astolto).

[Bugs here](${bugs.url}) or @Tarren#9722 on Discord, [codebase](${repository}) if you want to contribute or poke around.`;

export = {
	run: async (message) => {
		message.reply({
			embeds: [
				{
					title: 'Astolto',
					description: about,
					color: colours.default,
					footer: {
						text: process.env.HELPFOOTER,
						iconURL: process.env.HELPFOOTERICON,
					},
				},
			],
		});
	},
	name: 'About',
	description: 'Tells you about Astolto.',
	detailed: 'Sends a rundown explaining what this bot is.',
	examples: [(p) => `${p}about`],
	interaction: 'on',
} as IntractableCommand;
