import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
	const allPosts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);

	if (limit === undefined) {
		return allPosts;
	}

	return allPosts.slice(0, limit);
}
