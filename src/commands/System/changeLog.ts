import { IntractableCommand } from 'mashujs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { MessageEmbed } from 'discord.js';

if (typeof colours === 'undefined') global.colours = { default: 0xff80cc, error: 0xff2020 };

const versions = readFileSync(resolve(__dirname, '../../../CHANGELOG.md'))
	.toString()
	.replace(/\r/g, '')
	.split(/\n## \[/g)
	.slice(1)
	.reduce((acc, v) => {
		const [title, content] = v.split(/\] - \d{4}-\d{1,2}-\d{1,2}/);
		const fields = content
			.trim()
			.split(/### /g)
			.slice(1)
			.filter((v) => v)
			.map((category) => {
				const [name, ...values] = category.split('\n');
				return { name, value: values.join('\n').trim(), inline: false };
			});
		acc.set(title, { title: `Changes in v${title}`, fields, color: colours.default });
		return acc;
	}, new Map<string, Partial<MessageEmbed>>());
const versionNames = Array.from(versions, (v) => 'v' + v[0]);
const { version } = require('../../../package.json');
const latest = versions.get(version);
const notFound: Partial<MessageEmbed> = {
	title: 'Version not found',
	description: 'Versions are ' + versionNames.reduce((acc, v) => `${acc}, ${v}`),
	color: colours.error,
};

export = {
	run: async (message) => {
		const version = message.options.getString('version');
		const embed = version ? versions.get(version.replace(/[^\d.]+/g, '')) || notFound : latest;
		embed.footer = { text: process.env.HELPFOOTER, iconURL: process.env.HELPFOOTERICON };
		message.reply({ embeds: [embed] });
	},
	name: 'ChangeLog',
	aliases: ['Changes', 'Changed'],
	description: 'Display recent changes.',
	detailed: 'Display changes from the most recent version',
	examples: [(p) => `${p}changelog`, (p) => `${p}changed v${version}`],
	interaction: 'on',
	arguments: [
		{
			type: 'String',
			name: 'version',
			description: 'The version you want the changelog of.',
			required: false,
			choices: versionNames.slice(0, 24).map((name) => ({ name, value: name })),
		},
	],
	parseArgs: true,
} as IntractableCommand;
