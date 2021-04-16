import { CommandResolvable } from 'mashujs';

const pkg = require('../../../package.json') as {
	bugs: { url: string };
	repository: string;
	homepage: string;
};

const home = pkg.homepage;
const about = `Astolto is an open source Discord bot that will gladly rate how uwu your messages are~

[Astolto](${home}) is more specifically a Discord bot written in TypeScript using [discord.js](https://discord.js.org/#/) and [MashuJS](https://mashu.tarren.moe/)(a smallish command handler built for Astolto).

[Bugs here](${pkg.bugs.url}) or @Tarren#9722 on Discord, [codebase](${pkg.repository}) if you want to contribute or poke around.`;

export = {
	run: async (message) => {
		message.channel.send({
			embed: {
				title: 'Astolto',
				description: about,
				color: colours.default,
				footer: {
					text: process.env.HELPFOOTER,
					iconURL: process.env.HELPFOOTERICON,
				},
			},
		});
	},
	name: 'About',
	description: 'Tells you about Astolto.',
	detailed: 'Sends a rundown explaining what this bot is.',
} as CommandResolvable;
