import { defineCollection, z } from "astro:content";

export const collections = {
  projects: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string().max(280),
      tags: z.array(z.string()).default([]),
      cover: z.string().optional(),         // p.ej. /images/...
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      featured: z.boolean().default(false),
      published: z.boolean().default(true),
      date: z.coerce.date().optional(),     // permite '2025-10-24' en frontmatter
    }),
  }),
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string().max(280),
      tags: z.array(z.string()).default([]),
      cover: z.string().optional(),
      published: z.boolean().default(true),
      date: z.coerce.date(),
    }),
  }),
};
