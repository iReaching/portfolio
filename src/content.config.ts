import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      techStack: z.array(z.string()).min(1),
      githubUrl: z.url(),
      repository: z.string().regex(/^[\w.-]+\/[\w.-]+$/),
      liveUrl: z.url().optional(),
      image: image(),
      imageAlt: z.string().min(1),
      imageCaption: z.string().min(1),
      category: z.enum(['Web applications', 'Game development']),
      role: z.string().min(1),
      featured: z.boolean().default(false),
      publishDate: z.coerce.date(),
      order: z.number().int().nonnegative(),
    }),
});
export const collections = { projects };
