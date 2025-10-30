// src/lib/content.ts
import { getCollection, type CollectionEntry } from 'astro:content';

// ─────────────────────────────────────────────────────────────
// PROYECTOS
// ─────────────────────────────────────────────────────────────
export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects');
  // orden opcional por "order" descendente si lo usas; si no existe, 0.
  return all.sort(
    (a, b) => (b.data.order ?? 0) - (a.data.order ?? 0),
  );
}

export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.data.featured === true);
}

export async function countProjects(): Promise<number> {
  const all = await getCollection('projects');
  return all.length;
}

// ─────────────────────────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────────────────────────
export async function getRecentPosts(limit = 3): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  posts.sort((a, b) => {
    const da = new Date(a.data.date ?? 0).getTime();
    const db = new Date(b.data.date ?? 0).getTime();
    return db - da; // más nuevos primero
  });
  return posts.slice(0, limit);
}
