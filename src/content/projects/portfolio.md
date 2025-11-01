---
title: "Portfolio Personal"
description: "Sitio personal hecho con Astro. Blog, proyectos y contacto."
tags: ["astro", "typescript", "netlify", "edge-functions", "forms", "seo", "lighthouse", "legal", "portfolio"]
repoUrl: "https://github.com/AdriMariscal/portfolio"
demoUrl:
projectUrl: "https://adrianmariscal.netlify.app"
featured: true
published: true
date: 2025-10-24
status: "active"
changelog:
  - version: "v0.4.1"
    date: "2025-11-01"
    changes:
      - { type: "changed", text: "Rediseño visual completo (home, tarjetas y tipografía) siguiendo la guía de marca." }
      - { type: "added",   text: "Listado de blog mejorado (grid), etiquetas clicables y página /tags/[tag] con diseño consistente." }
      - { type: "added",   text: "Sección legal completa: Aviso legal, Privacidad, Cookies y Términos." }
      - { type: "added",   text: "Protección de STAGING con Netlify Edge Functions + variables de entorno." }
      - { type: "changed", text: "Página de proyectos: separación Activos/Inactivos y maquetación con márgenes adecuados." }
      - { type: "changed", text: "Detalle de proyecto: ficha armonizada y changelog con estilos; soporte de enlace principal (projectUrl)." }
      - { type: "fixed",   text: "Estado 'activo' del menú robusto en local, staging y producción." }
      - { type: "docs",    text: "Entrada del blog v0.4.1 (release notes) y contenidos legales." }

  - version: "v0.1.1"
    date: "2025-10-24"
    changes:
      - { type: "added",  text: "Home mínima, listado de proyectos y blog." }
      - { type: "added",  text: "Contacto con Netlify Forms (honeypot + /thanks)." }
      - { type: "docs",   text: "Primera entrada del blog: lanzamiento v0.1.1." }
---

## Resumen
Portfolio en **Astro** con enfoque rendimiento/SEO, blog técnico y catálogo de proyectos. El objetivo es evolucionarlo por iteraciones, manteniendo un diseño consistente y una base legal al día.

## Contexto
El sitio es mi carta de presentación como **arquitecto Salesforce** y **desarrollador web**. A nivel operativo, mantengo un flujo **DEV → STAGING (protegido) → PROD** con versionado SemVer y notas de versión públicas.

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

## Roadmap corto
- **Design System** (tokens y componentes reutilizables).
- **Contenido evergreen** (guías, casos reales y artículos técnicos).
- **Analítica conforme AEPD** si se activa (y, entonces, gestión de cookies).
- **Pruebas visuales** y chequeos Lighthouse en CI.
