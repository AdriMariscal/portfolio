import { defineCollection, z } from 'astro:content';

const optionalDate = z.coerce.date().optional();

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    description: z.string().optional(),

      // Compatibilidad: acepta 'pubDate' y también 'date'
      pubDate: optionalDate,
      date: optionalDate,

      updatedDate: optionalDate,
    tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
    })
    // Normalizamos para que siempre haya 'pubDate' si alguna de las dos existe
    .transform((data) => ({
      ...data,
      pubDate: data.pubDate ?? data.date,
    })),
});

const projects = defineCollection({
  type: 'content',
  schema: z
    .object({
    title: z.string(),
      description: z.string().optional(),
    featured: z.boolean().default(false),

      // Acepta URL válidas, cadena vacía o null y normaliza a undefined
      repoUrl: z.union([z.string().url(), z.literal('')]).nullable().optional(),
      projectUrl: z.union([z.string().url(), z.literal('')]).nullable().optional(),
      demoUrl: z.union([z.string().url(), z.literal('')]).nullable().optional(),

      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      date: optionalDate,
    })
    .transform((d) => ({
      ...d,
      repoUrl: d.repoUrl || undefined,
      projectUrl: d.projectUrl || undefined,
      demoUrl: d.demoUrl || undefined,
    })),
});

export const collections = { blog, projects };
