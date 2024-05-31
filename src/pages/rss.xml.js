import rss from '@astrojs/rss';

export function GET() {
	let allPosts = import.meta.glob('./posts/*.md', { eager: true });
	let posts = Object.values(allPosts);

	posts = posts.sort((a, b) => {
		return parseInt(b.url.split('/posts/')[1].split('-')[0]) - parseInt(a.url.split('/posts/')[1].split('-')[0]);
	});

	//只保留 12，当前太多了
	posts.splice(12);

	return rss({
		title: 'Zwoker\'s 周刊',
		description: '记录工程师 zworker 记录收集的有趣项目',
		site: 'https://weekly.zworker.top/',
		customData: `<image><url>https://img.zworker.top/file/968bd16c448b5eaca45df.png</url></image>`,
		items: posts.map((item) => {
			const url = item.url;
			const oldTitle = url.split('/posts/')[1];
			const title = '第' + oldTitle.split('-')[0] + '期 - ' + oldTitle.split('-')[1];
			return {
				link: url,
				title,
				description: item.compiledContent(),
				pubDate: item.frontmatter.date,
			};
		}),
	});
}
