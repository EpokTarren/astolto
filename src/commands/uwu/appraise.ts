import { TextChannel } from 'discord.js';
import { CommandResolvable } from 'mashujs';
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
					description: 'Nyo content to appwaise QwQ',
					color: colours.error,
				},
			});
		else {
			const rating = appraise(content);
			message.channel.send({
				embed: {
					title: 'Your appraisal has arrived',
					description:
						`Astolfo has ruled it a ${Math.round(rating * 100) / 10}/10` +
						`\n[Original message](https://discord.com/channels/${
							message?.reference?.guildID || message.guild.id
						}/${message?.reference?.channelID || message.channel.id}/${
							message?.reference?.messageID || message.id
						})`,
					color: toColour(120 * rating, 0.75, 1),
				},
			});
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
} as CommandResolvable;
