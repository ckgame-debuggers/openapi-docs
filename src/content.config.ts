import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/blog' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const notce = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/notices' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog, docs };
