import { Client } from 'mashujs';
import { resolve } from 'path';
import { Intents } from 'discord.js';

require('dotenv').config();

const pkg = require('../package.json') as { name: string; version: string };
const name = pkg.name.replace(/(\s|^)+./, (s) => s.toUpperCase());

process.env.PREFIX ||= 'a;';
process.env.HELPFOOTER ||= `${name} v${pkg.version}`;
process.env.COLOUR ||= '0xff80cc';
process.env.ERRORCOLOUR ||= '0xff2020';
process.env.MASHUCOLOR ||= process.env.COLOUR;
process.env.MASHUERRORCOLOR ||= process.env.ERRORCOLOUR;

global.colours = {
	default: Number(process.env.COLOUR),
	error: Number(process.env.ERRORCOLOUR),
};

const client = new Client({
	allowedMentions: { parse: ['users'], repliedUser: false },
	prefix: process.env.PREFIX,
	dir: resolve(__dirname, 'commands'),
	owners: process.env.OWNERS?.split(' '),
	descriptionReplacer: ['build', 'src'],
	partials: ['CHANNEL'],
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
});

client.once('ready', () => {
	const { tag } = client.user;
	const { prefix } = client.handler;
	const time = Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZoneName: 'short',
		hour12: false,
	}).format(Date.now());
	const guilds = client.guilds.cache.size;

	process.env.HELPFOOTERICON ||= client.user.avatarURL();

	client.user.setActivity(`Rating messages with ${prefix}appraise`);

	const loginText = `${process.env.HELPFOOTER} logged in as ${tag} on ${time}.\nServing ${guilds} guilds, with the prefix "${prefix}".`;
	console.log(loginText);

	client.handler.loadSlashCommands(process.env.TOKEN);
});

client.login(process.env.TOKEN);
