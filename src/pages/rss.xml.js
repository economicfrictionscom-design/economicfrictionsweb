import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: 'Economic Frictions',
    description:
      'An independent analytical journal exploring the hidden mechanisms that shape our markets and lives.',
    site: context.site,

    customData: `
      <language>en-us</language>
      <managingEditor>economicfrictions.com@gmail.com (Devansh)</managingEditor>
      <webMaster>economicfrictions.com@gmail.com (Devansh)</webMaster>
    `,

    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,

      description: post.data.description,

      // Absolute link (important for email platforms)
      link: `/blog/${post.slug}/`,

      // Full HTML content inside email
      content: post.body,

      // Hero Image Support
      enclosure: post.data.heroImage
        ? {
            url: new URL(post.data.heroImage, context.site).href,
            type: 'image/jpeg',
          }
        : undefined,

      // Optional: categories if you add them later
      categories: post.data.categories || [],

      author: 'economicfrictions.com@gmail.com (Devansh)',
    })),
  });
}