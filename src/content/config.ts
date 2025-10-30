// src/content/config.ts
import { defineCollection, z } from "astro:content";

/** BLOG POSTS */
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),                 // admite "YYYY-MM-DD" o Date
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
  }),
});

/** PROJECTS (ficha única por proyecto + changelog embebido) */
const changeItem = z.object({
  type: z.enum(["added", "changed", "fixed", "removed", "docs", "perf", "ops", "security"]),
  text: z.string(),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),

    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),

    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    date: z.coerce.date(),

    // Incluyo ambos por si usas uno u otro en distintos proyectos
    status: z.enum(["active", "paused", "completed", "archived"]).default("active"),

    changelog: z
      .array(
        z.object({
          // v1.2.3, 1.2.3, v1.2.3-rc.1, v1.2.3-dev.2
          version: z.string().regex(/^v?\d+\.\d+\.\d+(?:-(?:rc|dev)\.\d+)?$/),
          date: z.coerce.date(),
          changes: z.array(changeItem),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, projects };
