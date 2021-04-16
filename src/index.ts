import { Client } from 'mashujs';
import { resolve } from 'path';

require('dotenv').config();

const pkg = require('../package.json') as { name: string; version: string };
const name = pkg.name.replace(/(\s|^)+./, (s) => s.toUpperCase());

process.env.PREFIX ||= 'a;';
process.env.HELPFOOTER ||= `${name} v${pkg.version}`;
process.env.COLOUR ||= '0xff80cc';
process.env.ERRORCOLOUR ||= '0xff2020';
process.env.MASHUCOLOR ||= process.env.MASHUCOLOR;
process.env.MASHUERRORCOLOR ||= process.env.MASHUERRORCOLOR;

global.colours = {
	default: Number(process.env.COLOUR),
	error: Number(process.env.ERRORCOLOUR),
};

const client = new Client({
	disableMentions: 'everyone',
	prefix: process.env.PREFIX,
	dir: resolve(__dirname, 'commands'),
	owners: process.env.OWNERS?.split(' '),
	descriptionReplacer: ['build', 'src'],
});

client.on('ready', () => {
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

	client.user.setActivity(`Rating messages with ${prefix}appraise`).catch(console.error);

	const loginText = `${process.env.HELPFOOTER} logged in as ${tag} on ${time}.\nServing ${guilds} guilds, with the prefix "${prefix}".`;
	console.log(loginText);
});

client.login(process.env.TOKEN);
