import rss, { pagesGlobToRssItems } from '@astrojs/rss';

// TODO: Use content collection
export async function GET(context) {
  return rss({
    title: 'Blog - Ryo Sakaguchi',
    description: 'Blog - Ryo Sakaguchi',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./blog/*.{md,mdx}'),
    ),
  });
}
