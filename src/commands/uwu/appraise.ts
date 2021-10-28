import { IntractableCommand } from 'mashujs';
import { Uwuifier } from 'uwuifier/dist';
import similarity from 'string-similarity';

const uwu = new Uwuifier({ spaces: { faces: 0, actions: 0, stutters: 0 }, exclamations: 0 });
function appraise(text: string): number {
	return similarity.compareTwoStrings(text, uwu.uwuifySentence(text)) as number;
}

function toColour(h: number, s: number, v: number): number {
	h /= 360;

	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	let r: number, g: number, b: number;
	switch (i % 6) {
		case 0:
			(r = v), (g = t), (b = p);
			break;
		case 1:
			(r = q), (g = v), (b = p);
			break;
		case 2:
			(r = p), (g = v), (b = t);
			break;
		case 3:
			(r = p), (g = q), (b = v);
			break;
		case 4:
			(r = t), (g = p), (b = v);
			break;
		case 5:
		default:
			(r = v), (g = p), (b = q);
			break;
	}
	return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

export = {
	run: async (message) => {
		const content = message.isMessage()
			? (message.reference?.messageId && (await message.channel.messages.fetch(message.reference.messageId)).content) ??
			  message.content.replace(/^[^\s]+\s*/, '')
			: message.options.getString('text') ??
			  (await message.channel.messages.fetch(message.options.getString('id')))?.content;

		if (!content)
			message.reply({ embeds: [{ title: 'Ewwow', description: 'Nyo content to appwaise QwQ', color: colours.error }] });
		else {
			const rating = Math.pow(appraise(content), 1.3);
			const color = toColour(120 * rating, 0.75, 1);
			const description = `Astolto has ruled it a ${Math.round(rating * 100) / 10}/10${
				message.isMessage() && message.reference?.messageId
					? `\n[Original message](https://discord.com/channels/${message.guild.id}/${message.reference.channelId}/${message.reference.messageId})`
					: ''
			}`;

			message.reply({ embeds: [{ title: 'Your appraisal has arrived', description, color }] });
		}
	},
	name: 'Appraise',
	aliases: [
		'Assess',
		'Evaluate',
		'Judge',
		'Rate',
		'Review',
		'Scrutinise',
		'Appwaise',
		'Evawuate',
		'Wate',
		'Weview',
		'Scwutinyise',
	],
	examples: [
		(p) => `${p}appraise I wuv chu <3`,
		(p) => `${p}appwaise I wuv chu <3`,
		(p) => `${p}Rate I wuv chu <3`,
		(p) => `${p}scwutinyise I wuv chu <3`,
	],
	description: 'Appraises a replied to message or the text following the command.',
	interaction: 'on',
	arguments: [
		{
			type: 'String',
			name: 'text',
			description: 'The text you want to appraise',
			required: false,
		},
		{
			type: 'String',
			name: 'id',
			description: 'ID of the message you wish to appraise',
			required: false,
		},
	],
} as IntractableCommand;
