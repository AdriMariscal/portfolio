---
title: "Portfolio Personal"
description: "Sitio personal hecho con Astro. Blog, proyectos y contacto."
tags: ["astro", "typescript", "netlify", "edge-functions", "forms", "seo", "lighthouse", "legal", "portfolio"]
repoUrl: 
demoUrl:
projectUrl: "https://adrianmariscal.netlify.app"
featured: true
published: true
date: 2025-10-24
status: "active"
changelog:
  - version: "v1.0.10"
    date: "2025-11-06"
    changes:
      - { type: "changed", text: "Migración a Astro 4 con content collections tipadas mediante content.config.ts." }
      - { type: "added", text: "Paginación del blog y páginas de etiquetas con slugificación coherente." }
      - { type: "changed", text: "Nuevo sistema de diseño: componentes Hero, ProjectCard y PostCard refinados; tokens CSS para contenedores y espaciados." }
      - { type: "added", text: "SEO avanzado: meta canonical, OG/Twitter tags y JSON-LD en posts; botón 'Volver' contextual." }
      - { type: "added", text: "Utilidades en /lib/content.ts para slugify, contar proyectos y enlaces de vuelta." }
      - { type: "docs", text: "Notas de lanzamiento v1.0.10 y reorganización de blog/páginas." }
  - version: "v0.4.1"
    date: "2025-11-01"
    changes:
      - { type: "changed", text: "Rediseño visual completo (home, tarjetas y tipografía) siguiendo la guía de marca." }
      - { type: "added", text: "Listado de blog mejorado (grid), etiquetas clicables y página /tags/[tag] con diseño consistente." }
      - { type: "added", text: "Sección legal completa: Aviso legal, Privacidad, Cookies y Términos." }
      - { type: "added", text: "Protección de STAGING con Netlify Edge Functions + variables de entorno." }
      - { type: "changed", text: "Página de proyectos: separación Activos/Inactivos y maquetación con márgenes adecuados." }
      - { type: "changed", text: "Detalle de proyecto: ficha armonizada y changelog con estilos; soporte de enlace principal (projectUrl)." }
      - { type: "fixed", text: "Estado 'activo' del menú robusto en local, staging y producción." }
      - { type: "docs", text: "Entrada del blog v0.4.1 (release notes) y contenidos legales." }
  - version: "v0.1.1"
    date: "2025-10-24"
    changes:
      - { type: "added", text: "Home mínima, listado de proyectos y blog." }
      - { type: "added", text: "Contacto con Netlify Forms (honeypot + /thanks)." }
      - { type: "docs", text: "Primera entrada del blog: lanzamiento v0.1.1." }
---

## Resumen
Portfolio en **Astro** con enfoque en rendimiento, SEO y accesibilidad. Incluye blog técnico, catálogo de proyectos y se apoya en content collections tipadas. Evoluciona por iteraciones, manteniendo un diseño consistente, una base legal al día y una arquitectura preparada para escalar.

## Contexto
El sitio es mi carta de presentación como **arquitecto Salesforce y desarrollador web**. A nivel operativo, mantengo un flujo **DEV → STAGING (protegido) → PROD** con versionado SemVer y notas de versión públicas.

## Stack
- **Astro** (content collections, rutas estáticas tipadas)
- **TypeScript**
- **Netlify** (build/deploy, Forms)
- **Edge Functions** (básica para proteger STAGING)
- **GitHub** (ramas `dev`/`staging`/`main`, PRs y tags)

## Resultados (v0.4.1)
- **Diseño** coherente con la guía de marca: tipografías, espaciados y color.
- **UX de contenido**: blog con etiquetas, página de tags y tarjetas legibles.
- **Legal**: Aviso legal, Privacidad, Cookies y Términos publicados.
- **DevOps**: STAGING con login, despliegues automáticos y PR previews.

## Resultados (v0.1.1)
- Sitio navegable y rápido.
- Flujo de versiones automatizado (dev → rc → release).
- Base lista para escalar diseño y contenido.

## Resultados (v1.0.10)
- **Arquitectura escalable:** migración a Astro v4 y adopción de content collections tipadas, con utilidades de contenido reutilizables.
- **Diseño modular:** nuevo sistema de diseño con tokens y componentes (Hero, ProjectCard, PostCard) que unifican la experiencia visual.
- **Blog paginado:** navegación organizada con páginas numeradas y páginas de etiquetas con slugificación coherente.
- **SEO avanzado:** meta canonical, OG/Twitter tags y JSON‑LD para posts; estructura de enlaces amigable y botón “Volver” para mejorar la navegación.
- **Accesibilidad y UX:** colores y contraste revisados, jerarquías de encabezados lógicas y navegación con teclado optimizada.

## Roadmap corto
- **Internacionalización** (i18n) y modo oscuro para ampliar audiencia y accesibilidad.
- **Buscador interno** en el blog.
- **Analítica conforme AEPD** cuando se active: revisión de cookies y consentimiento.
- **Mejoras DevEx:** pruebas visuales, chequeos Lighthouse en CI y entornos de preview por PR.
