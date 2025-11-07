---
title: "UX para blogs en Astro: progreso de lectura, índice pegajoso y navegación “Anterior/Siguiente” accesible"
description: "Tres mejoras UX de alto impacto y bajo coste para tu blog en Astro: barra de progreso de lectura, índice de contenidos pegajoso (TOC) y navegación anterior/siguiente coherente. Todo con foco en accesibilidad, rendimiento y SEO (sin romper el diseño)."
tags: ["astro", "ux", "a11y", "accesibilidad", "seo", "perfomance", "blog"]
published: true
date: 2025-11-05
---

Pequeños detalles de **UX** mejoran la lectura sin añadir deuda técnica. Aquí explico cómo añado a mi blog en **Astro**: (1) **barra de progreso**, (2) **índice (TOC) pegajoso** y (3) **Prev/Sig. accesible**. Prioridades: *no estorbar*, **accesibilidad primero** y **JS ≈ 0**.
  
---

## Principios (para no romper nada)
- **Progresivo**: sin JS → contenido legible; con JS → mejoras.
- **Accesibilidad**: roles/etiquetas claros, foco visible, reduced‑motion respetado.
- **Cero CLS**: reserva alturas/anchos; transiciones por `transform`/`opacity`.
- **Encaje visual**: estilos mínimos, sin invadir tu *design system* (clases propias y aisladas).
- **SEO intacto**: canónicas estables; `rel="prev/next"` opcional y no dañino.

---

## 1) Barra de progreso de lectura (CSS + TS ligero)

**HTML** (en tu *layout* de post, arriba del `body`):
```astro
<!-- layouts/Post.astro -->
<div class="read-progress" aria-hidden="true"><div class="read-progress__bar"></div></div>
```

**CSS** (aislado, no pisa tu sistema):
```css
/* components/read-progress.css */
.read-progress{position:fixed;inset:0 auto auto 0;height:3px;width:100%;pointer-events:none;z-index:60;background:transparent}
.read-progress__bar{height:100%;width:100%;transform-origin:0 50%;transform:scaleX(var(--progress,0));background:var(--accent, #3b82f6);}
@media (prefers-reduced-motion: reduce){.read-progress__bar{transition:none}}
```

**TS inline** (una variable CSS, sin librerías):
```html
<script is:inline>
  // Evita trabajo innecesario
  const bar = document.querySelector('.read-progress__bar');
  if (bar) {
    const set = (v) => bar.style.setProperty('--progress', v.toFixed(4));
    const update = () => {
      const el = document.querySelector('article') || document.body;
      const h = el.scrollHeight - window.innerHeight;
      set(h > 0 ? window.scrollY / h : 0);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', () => { requestAnimationFrame(update); }, { passive: true });
  }
</script>
```

> **Cero CLS**: la barra usa `transform: scaleX()`; no re‑fluye el layout.

---

## 2) Índice (TOC) pegajoso con resalte de sección activa

### 2.1 Generar el TOC en el servidor (Astro + Content Collections)
```astro
---
// pages/blog/[slug].astro (esquema)
import { getCollection, getEntry } from "astro:content";
const { slug } = Astro.params;
const entry = await getEntry('blog', slug);
const { Content, headings } = await entry.render();
const toc = headings.filter(h => h.depth <= 3);
---

<main class="post">
  <aside class="toc" aria-label="Índice">
    <h2 class="sr-only">Índice</h2>
    <ol>
      {toc.map(h => (
        <li class={`toc-d${h.depth}`}>
          <a href={`#${h.slug}`} data-toc-item>{h.text}</a>
        </li>
      ))}
    </ol>
  </aside>

  <article>
    <Content />
  </article>
</main>
```

**CSS pegajoso** (columna lateral o dentro del flujo en móvil):
```css
.toc{position:sticky;top:6rem;max-height:calc(100dvh - 8rem);overflow:auto;padding:.5rem 0}
.toc a{display:block;padding:.25rem .5rem;border-left:2px solid transparent}
.toc a[aria-current="true"]{border-left-color:var(--accent,#3b82f6);font-weight:600}
.toc .toc-d3 a{padding-left:1rem}
@media (max-width: 960px){.toc{position:relative;top:auto;max-height:none}}
```

### 2.2 Resaltar la sección activa (IntersectionObserver, barato)
```html
<script is:inline>
  const links = [...document.querySelectorAll('[data-toc-item]')];
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const obs = new IntersectionObserver((ents) => {
    let current = null;
    for (const e of ents) if (e.isIntersecting) current = e.target.id;
    if (!current) return;
    for (const a of links) a.removeAttribute('aria-current');
    map.get(current)?.setAttribute('aria-current','true');
  }, { rootMargin: '0px 0px -70% 0px', threshold: [0,1] });
  document.querySelectorAll('article h2[id], article h3[id]').forEach(h => obs.observe(h));
</script>
```
> `aria-current="true"` **no cambia el foco**, solo comunica estado a lectores de pantalla.

---

## 3) Navegación **Anterior/Siguiente** accesible y coherente

Ordenamos por **fecha** y pintamos adyacentes del post abierto:
```astro
---
import { getCollection, getEntry } from "astro:content";
const { slug } = Astro.params;
const entry = await getEntry('blog', slug);
const posts = (await getCollection('blog', ({ data }) => data.published))
  .sort((a,b) => b.data.date.localeCompare(a.data.date));
const i = posts.findIndex(p => p.slug === slug);
const prev = posts[i+1]; // más antiguo
const next = posts[i-1]; // más nuevo
---

<nav class="post-pager" aria-label="Navegación del artículo">
  {prev ? <a rel="prev" href={`/blog/${prev.slug}/`}>
    <span aria-hidden="true">←</span> Anterior: {prev.data.title}
  </a> : <span aria-disabled="true">Inicio</span>}
  {next ? <a rel="next" href={`/blog/${next.slug}/`}>
    Siguiente: {next.data.title} <span aria-hidden="true">→</span>
  </a> : <span aria-disabled="true">Fin</span>}
</nav>
```

**Head opcional** (SEO, inocuo):
```astro
{prev && <link rel="prev" href={`${Astro.site}blog/${prev.slug}/`} />}
{next && <link rel="next" href={`${Astro.site}blog/${next.slug}/`} />}
```

**CSS mínimo**:
```css
.post-pager{display:flex;justify-content:space-between;gap:.5rem;margin-block:2rem}
.post-pager a{display:inline-flex;gap:.5rem;align-items:center}
.post-pager [aria-disabled="true"]{opacity:.5}
```

---

## 4) Rendimiento y SEO (detalles que marcan)
- **Cero CLS**: fija alturas de imágenes en tarjetas y evita insertar el TOC por encima del contenido.
- **prefers-reduced-motion**: sin animaciones bruscas; evita parallax en la barra de progreso.
- **Islas mínimas**: todo es HTML estático; los dos scripts son inline y pequeños.
- **Canonicals**: no cambian. Prev/Next solo enlaza entre posts adyacentes.
- **Accesibilidad**: `aria-label` en `nav`, `aria-current` en el TOC, `aria-disabled` cuando procede.

---

## 5) Checklist y medición

**Checklist**
- [x] Barra de progreso por `transform: scaleX()`.
- [x] TOC sticky (servidor) + resalte por observer.
- [x] Prev/Sig. por fecha con `rel="prev/next"` opcional en `<head>`.
- [x] Sin romper estilos globales: clases aisladas y variables (`--accent`) opcionales.
- [x] `prefers-reduced-motion` respetado y **sin CLS**.

**Medición** (muy simple con custom events):
```html
<script is:inline>
  // Scroll depth a 25/50/75/100%
  (function(){
    const marks = new Set(); const steps = [0.25,0.5,0.75,1];
    function send(p){ if(marks.has(p)) return; marks.add(p); window.plausible?.('scroll_depth', { props: { percent: p*100 } }); }
    const onScroll = () => { const el = document.querySelector('article')||document.body;
      const h = el.scrollHeight - innerHeight; const r = h>0 ? scrollY/h : 0; steps.forEach(s => { if (r >= s) send(s); }); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  })();
</script>
```

> Si no usas Plausible, cambia `window.plausible` por tu herramienta. También puedes disparar un evento `read_complete` cuando `r >= 1` y el tab siga activo ≥ N segundos.

---

¿Quieres que empaquete estas piezas en **componentes reutilizables** (`@amc/ui`) para tus distintos sitios Astro? Puedo dejar un `PostLayout.astro` y un `TOC.astro` listos para *drop‑in*.
