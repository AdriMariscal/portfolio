// src/lib/content.ts
import { getCollection } from "astro:content";

/** Nº total de proyectos (para la métrica del Hero) */
export async function countProjects() {
  const projects = await getCollection("projects");
  return projects.length;
}

/** Proyectos destacados (para la sección Featured) */
export async function getFeaturedProjects() {
  const projects = await getCollection("projects");
  return projects.filter((p) => p.data.featured === true);
}

/** Últimos posts (para “Últimos artículos” del index) */
export async function getRecentPosts(limit = 3) {
  const posts = await getCollection("blog");
  const published = posts.filter((p) => !p.data.draft);
  published.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return published.slice(0, limit);
}

export const toSlug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
