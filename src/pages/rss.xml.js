import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: 'Economic Frictions',
    description: 'An independent analytical journal exploring the hidden mechanisms that shape our markets and lives.',
    site: context.site,
    
    customData: `
      <language>en-us</language>
      <managingEditor>economicfrictions.com@gmail.com (Devansh)</managingEditor>
    `,

    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description || '', 
      
      // Creates the full URL (e.g., https://www.economicfrictions.com/blog/post-name)
      link: `/blog/${post.slug}/`,

      // Converts Markdown to clean HTML so Kit can read it
      content: sanitizeHtml(parser.render(post.body)),

      // Passes the hero image to Kit's RSS reader
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