import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('blog');

  // Sort newest first (important for RSS readers)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate)
  );

  return rss({
    title: 'Economic Frictions',
    description:
      'An independent analytical journal exploring the hidden mechanisms that shape our markets and lives.',
    site: context.site,

    customData: `
      <language>en-us</language>
      <managingEditor>economicfrictions.com@gmail.com (Devansh)</managingEditor>
      <generator>Astro RSS</generator>
    `,

    items: sortedPosts.map((post) => ({
      title: post.data.title,

      // Always ensure valid date
      pubDate: new Date(post.data.pubDate),

      // Use summary if available, fallback to description
      description: post.data.summary || post.data.description || '',

      // Absolute URL (important for RSS compatibility)
      link: new URL(`/blog/${post.slug}/`, context.site).href,

      // Clean full HTML content for email / Kit
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),

      // Hero image support
      enclosure: post.data.heroImage
        ? {
            url: new URL(post.data.heroImage, context.site).href,
            length: 0,
            type: 'image/jpeg',
          }
        : undefined,

      author: 'economicfrictions.com@gmail.com (Devansh)',
    })),
  });
}