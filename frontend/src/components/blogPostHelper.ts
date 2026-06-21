export type BlogPost = {
	url: string;
	frontmatter: {
		title: string;
		pubDate: string;
	};
};

export function getBlogPosts(limit?: number): BlogPost[] {
	const postModules = import.meta.glob<BlogPost>('../pages/blog/*.md', { eager: true });
	const allPosts = Object.values(postModules).sort(
		(a, b) => Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate),
	);

	if (limit === undefined) {
		return allPosts
	}

	return allPosts.slice(0, limit);
}
