import { getCollection, type CollectionEntry } from "astro:content";

export async function getFeaturedProjects(limit = 4) {
  const all = await getCollection("projects", ({ data }) => data.published !== false);
  const featured = all.filter(p => p.data.featured === true);
  // si no hay destacados, usa los más nuevos como fallback
  const sorted = (featured.length ? featured : all).sort((a, b) => {
    const ad = a.data.date ? new Date(a.data.date).getTime() : 0;
    const bd = b.data.date ? new Date(b.data.date).getTime() : 0;
    return bd - ad;
  });
  return sorted.slice(0, limit);
}

export async function getLatestPosts(limit = 3) {
  const all = await getCollection("blog", ({ data }) => data.published !== false);
  const sorted = all.sort((a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return sorted.slice(0, limit);
}

export type ProjectEntry = CollectionEntry<'projects'>;
export type BlogEntry = CollectionEntry<'blog'>;
