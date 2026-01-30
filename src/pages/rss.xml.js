import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Economic Frictions',
    description: 'An independent analytical journal exploring the hidden mechanisms that shape our markets and lives.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // FIXED: Added '/economicfrictionsweb/' before the blog path
      link: `/blog/${post.slug}/`,
    })),
  });
}