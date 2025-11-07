---
title: "Paginación en Astro con Content Collections: rendimiento, SEO y accesibilidad en una sola receta"
description: "Cómo implementar paginación estática con Content Collections en Astro v4, optimizarla para Lighthouse, hacerla accesible (A11y) y evitar problemas SEO (canonical, prev/next, noindex en páginas profundas)."
tags: ["astro", "content-collections", "pagination", "seo", "accesibilidad", "performance"]
published: true
date: 2025-11-02
---

La paginación no es solo “partir una lista”. Afecta a **UX**, **crawl budget/SEO** y **rendimiento**. Aquí dejo mi guía práctica (código incluido) para un blog en **Astro v4** con **Content Collections**, cuidando **accesibilidad** y **Lighthouse** sin complicarse.

---

## 1) Por qué la paginación importa

**UX**: listas largas cansan y rompen el foco. **Rendimiento**: menos HTML, menos JS y menos imágenes ⇒ First Contentful Paint más rápido. **SEO**: evitas *thin pages* y controlas la **canónica** del listado para no dividir señales.

**Regla simple**: define un `PAGE_SIZE` realista (8–12 suele ir bien) y asegura navegación clara.

---

## 2) Modelo de datos con Content Collections

Mi colección `blog` queda tipada con los campos mínimos (título, fecha, tags, publicado):

```ts
// /src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(300),
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(false),
    date: z.string(), // ISO yyyy-mm-dd
    cover: z.string().optional(),
  })
});

export const collections = { blog };
```

**Convenciones** que uso en los `.md`:
- `published: true` para publicar.
- `date` ISO (`2025-11-07`).
- `tags` coherentes para habilitar filtros/SEO.

---

## 3) Paginación estática con `getStaticPaths`

Estructura de rutas:

- `/blog/index.astro` ⇒ **página 1** (canónica del listado).
- `/blog/page/[page].astro` ⇒ páginas 2..N.

```astro
---
// /src/pages/blog/page/[page].astro
import { getCollection } from 'astro:content';
const PAGE_SIZE = 10;

export async function getStaticPaths() {
  const all = await getCollection('blog', ({ data }) => data.published);
  const posts = all.sort((a, b) => b.data.date.localeCompare(a.data.date));
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  return Array.from({ length: totalPages - 1 }, (_, i) => {
    const page = i + 2; // porque /blog es la 1
    const start = (page - 1) * PAGE_SIZE;
    return {
      params: { page: String(page) },
      props: {
        page,
        totalPages,
        slice: posts.slice(start, start + PAGE_SIZE),
        PAGE_SIZE,
      }
    };
  });
}

const { page, totalPages, slice } = Astro.props;
---
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Blog — Página {page}</title>
    <link rel="canonical" href={`${Astro.site}blog/page/${page}`} />
    {page > 1 && <link rel="prev" href={`${Astro.site}blog/${page - 1 === 1 ? '' : `page/${page - 1}`}`} />}
    {page < totalPages && <link rel="next" href={`${Astro.site}blog/page/${page + 1}`} />}
    {page > 10 && <meta name="robots" content="noindex,follow" />}
  </head>
  <body>
    <main id="main">
      <h1>Blog — Página {page}</h1>
      <ul>
        {slice.map((post) => (
          <li>
            <a href={`/blog/${post.slug}/`}>
              <article>
                <h2>{post.data.title}</h2>
                <p>{post.data.description}</p>
                <time datetime={post.data.date}>{post.data.date}</time>
              </article>
            </a>
          </li>
        ))}
      </ul>

      <nav aria-label="Paginación" class="pagination">
        <ul>
          <li>{page > 1 ? <a rel="prev" href={`/blog/${page - 1 === 1 ? '' : `page/${page - 1}`}`} aria-label="Página anterior">◀</a> : <span aria-disabled="true">◀</span>}</li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <li>
              {p === page ? (
                <span aria-current="page">{p}</span>
              ) : (
                <a href={`/blog/${p === 1 ? '' : `page/${p}`}`}>{p}</a>
              )}
            </li>
          ))}
          <li>{page < totalPages ? <a rel="next" href={`/blog/page/${page + 1}`} aria-label="Página siguiente">▶</a> : <span aria-disabled="true">▶</span>}</li>
        </ul>
      </nav>

      <a class="skip" href="#main">Volver arriba</a>
    </main>

    <script is:inline>
      // Atajos de teclado: ← →
      document.addEventListener('keydown', (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        const prev = document.querySelector('a[rel="prev"]');
        const next = document.querySelector('a[rel="next"]');
        if (e.key === 'ArrowLeft' && prev) { window.location.assign(prev.getAttribute('href')); }
        if (e.key === 'ArrowRight' && next) { window.location.assign(next.getAttribute('href')); }
      });
      // En cada navegación, enfoca el H1 para avisar a lectores de pantalla
      document.getElementById('main')?.querySelector('h1')?.setAttribute('tabindex', '-1');
      document.getElementById('main')?.querySelector('h1')?.focus?.();
    </script>
  </body>
</html>
```

Y la **página 1** (`/src/pages/blog/index.astro`) comparte plantilla, cambiando `page = 1` y el `slice = posts.slice(0, PAGE_SIZE)`, con **canónica** a `/blog/`:

```astro
<link rel="canonical" href={`${Astro.site}blog/`}/>
<link rel="next" href={`${Astro.site}blog/page/2`} />
```

> Nota SEO: Google anunció que ya no usa `rel="prev/next"` como señal, pero es inofensivo y útil para navegadores/UX. Mantengo **prev/next** y una **canónica consistente**.

---

## 4) Navegación accesible (A11y)

- Usa `<nav aria-label="Paginación">` y marca la página actual con `aria-current="page"`.
- Controles prev/next **deshabilitados** con `aria-disabled`.
- **Foco gestionado** tras el cambio de página (enfoco el `<h1>`), y atajos de teclado ←/→.
- Mantén el tamaño de zona de clic generoso y el contraste AA mínimo.

CSS mínimo para lectores de pantalla sin imponer tu *design system*:

```css
.pagination ul { display: flex; gap: .5rem; list-style: none; padding: 0; }
.pagination a, .pagination span { display: inline-block; padding: .5rem .75rem; }
.pagination [aria-current="page"] { outline: 2px solid currentColor; }
.skip { position: fixed; bottom: 1rem; right: 1rem; }
```

---

## 5) SEO del paginado (canónica, prev/next, thin pages)

- **Canónica del listado** → `/blog/` (página 1). El resto: `/blog/page/N`.
- **Prev/next** entre páginas adyacentes.
- Evita *thin pages*: si tienes pocas entradas, **no generes** 10 páginas vacías. Calcula `totalPages` y crea solo las necesarias.
- Páginas muy profundas (p. ej., `> 10`): puedes marcar `noindex,follow` para priorizar el *crawl budget* en contenido actual.

---

## 6) Medición con Lighthouse (qué mirar y cómo mejorar)

En listados miro tres cosas:

- **LCP**: evita imágenes grandes en la tarjeta. Usa `loading="lazy"` y tamaños fijos para prevenir **CLS**.
- **TBT**: el listado debe ser *islas cero* o mínimo JS. El script de atajos es inline y corto.
- **CLS**: define alturas de miniaturas/headers para que no “salte” el contenido al cargar.

Extra: preconecta a tu CDN/tus fuentes si lo necesitas y **minimiza el CSS crítico** del listado.

---

## 7) Extras: paginación híbrida y búsqueda

**Híbrida (Islas)**: si quieres cambiar `PAGE_SIZE` o filtrar por tag sin recargar, puedes montar una isla con un componente ligero (p. ej., Preact) y **hidratarla bajo demanda**. Mantén la ruta estática para SEO y deja la interacción a la isla.

**Búsqueda + paginado (Netlify Functions)**: para catálogos grandes, crea un endpoint `/api/search` que reciba `q`, `page` y `pageSize`, devuelva JSON y renderiza del lado del cliente una grilla paginada. Útil para no reconstruir todo el sitio ante cada cambio de contenido.

```ts
// /netlify/functions/search.ts (esqueleto)
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const q = (event.queryStringParameters?.q || '').toLowerCase();
  const page = parseInt(event.queryStringParameters?.page || '1', 10);
  const pageSize = parseInt(event.queryStringParameters?.pageSize || '10', 10);
  // Buscar en un índice (JSON, MiniSearch, etc.)
  const results = [];
  const slice = results.slice((page - 1) * pageSize, page * pageSize);
  return { statusCode: 200, body: JSON.stringify({ page, pageSize, total: results.length, items: slice }) };
};
```

---

## Resumen y checklist

- [x] Content Collections tipadas (`/src/content/config.ts`).
- [x] Rutas estáticas `/blog/` + `/blog/page/[page].astro`.
- [x] Canónica estable, `prev/next`, `noindex` en páginas muy profundas.
- [x] A11y: nav con `aria-label`, `aria-current`, foco y atajos.
- [x] Lighthouse: LCP/CLS/TBT bajo control (tarjetas ligeras, lazy). 

Si quieres que te ayude a migrar tu blog a esta receta o a medir el impacto en Lighthouse/SEO, escríbeme desde la **[página de contacto](/contact)**.
