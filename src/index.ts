import { Client } from 'discord.js';

const client = new Client({
	disableMentions: 'everyone',
});

require('dotenv').config();

if (!process.env.PREFIX) process.env.PREFIX = 'a;';

require('./commands')(client);

client.on('ready', () => {
	client.user
		.setActivity(`Rating messages with ${process.env.PREFIX}appraise`)
		.catch(console.error);

	console.log(
		`Logged in as ${client.user.tag} on ${new Date()} with the prefix: ${process.env.PREFIX}`
	);
});

client.login(process.env.TOKEN);
