// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    date: z.coerce.date(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    date: z.coerce.date(),
    status: z.enum(["active", "paused", "completed"]).default("active"),
    changelog: z
      .array(
        z.object({
          version: z.string().regex(/^v?\d+\.\d+\.\d+(?:-(?:rc|dev)\.\d+)?$/),
          date: z.coerce.date(),
          changes: z.array(
            z.object({
              type: z.enum(["added","changed","fixed","removed","docs","perf","ops"]),
              text: z.string(),
            })
          ),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, projects };
