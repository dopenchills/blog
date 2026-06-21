export type BlogPost = {
	url: string;
	frontmatter: {
		title: string;
		pubDate: string;
	};
};

const postModules = import.meta.glob<BlogPost>('../pages/blog/*.md', { eager: true });

export function getAllPosts(): BlogPost[] {
	return Object.values(postModules).sort(
		(a, b) => Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate),
	);
}

export function getRecentPosts(limit = 3): BlogPost[] {
	return getAllPosts().slice(0, limit);
}
