// src/lib/content.ts
import { getCollection, type CollectionEntry } from "astro:content";

/** Tipos convenientes */
export type ProjectEntry = CollectionEntry<"projects">;
export type BlogEntry = CollectionEntry<"blog">;

/** Posts publicados, ordenados por fecha (nueva → vieja) */
export async function getAllPosts(): Promise<BlogEntry[]> {
  const all = await getCollection("blog", ({ data }) => data.published !== false);
  return [...all].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/** Proyectos publicados, ordenados por fecha (nueva → vieja) */
export async function getAllProjects(): Promise<ProjectEntry[]> {
  const all = await getCollection("projects", ({ data }) => data.published !== false);
  return [...all].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/** Los N posts más recientes (por defecto 3) */
export async function getLatestPosts(limit = 3): Promise<BlogEntry[]> {
  const all = await getAllPosts();
  return all.slice(0, limit);
}

/** Proyectos destacados; si no hay, devuelve los N últimos */
export async function getFeaturedProjects(limit = 4): Promise<ProjectEntry[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.data.featured === true);
  const base = featured.length ? featured : all;
  return base.slice(0, limit);
}
