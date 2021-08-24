import { get } from 'https';
import { IntractableCommand } from 'mashujs';

async function req(url: string): Promise<string> {
	return new Promise((resolve, reject) =>
		get(url, (res) => {
			let data = '';
			res.on('data', (d) => (data += d));
			res.on('end', () => resolve(data));
		}).on('error', reject)
	);
}

const halfHour = 1800000;
const day = halfHour * 48;
const icons = new Map<string, string>();

async function getIcon(user: string): Promise<string> {
	const about = JSON.parse(await req(`https://www.reddit.com/user/${user}/about.json`)) as {
		data: { icon_img: string; subreddit: { over_18: boolean } };
		error?: number;
	};
	const avatar = about.error || about.data.subreddit.over_18 ? '' : about.data.icon_img.replace(/\?.+/, '');
	icons.set(user, avatar);
	setTimeout(() => icons.delete(user), day);
	return avatar;
}

interface RedditPost {
	data: {
		author: string;
		title: string;
		pinned: boolean;
		over_18: boolean;
		permalink: string;
		url?: string;
	};
}

let posts: { author: string; title: string; url: string; image: string }[] = [];
let updated = 0;

async function updatePosts() {
	updated = Date.now();
	posts = (JSON.parse(await req('https://www.reddit.com/r/Astolfo.json?limit=100')).data.children as RedditPost[])
		.map((post) => post.data)
		.filter(({ over_18, pinned, url }) => !over_18 && !pinned && url.match(/(png|jpg|jpeg|gif)$/))
		.map(({ author, title, url, permalink }) => ({
			author,
			title,
			image: url,
			url: `https://reddit.com${permalink}`,
		}));
}

export = {
	run: async (message) => {
		if (Date.now() - updated > halfHour) await updatePosts();

		const { author, title, image, url } = posts[Math.floor(Math.random() * posts.length)];
		const authorIcon = icons.get(author) ?? (await getIcon(author));

		message.reply({
			embeds: [
				{
					author: { name: '/u/' + author, iconURL: authorIcon || undefined },
					title,
					url,
					image: { url: image },
					footer: { text: 'Image randomly fetched from /r/Astolfo/' },
				},
			],
		});
	},
	name: 'Astolfo',
	aliases: ['Rider'],
	description: 'Sends a random image from /r/Astolfo.',
	examples: [(p) => `${p}astolfo`, (p) => `${p}rider`],
	interaction: 'on',
} as IntractableCommand;
