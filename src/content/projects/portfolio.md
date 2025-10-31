---
title: "Portfolio personal (adrianmariscal.netlify.app)"
description: "Sitio personal hecho con Astro. Blog, proyectos y contacto."
tags: ["astro", "netlify", "forms", "typescript", "portfolio"]
repoUrl:
demoUrl:
projectUrl: adrianmariscal.netlify.app
featured: true
published: true
date: 2025-10-24
status: "active"
changelog:
  - version: "v0.1.1"
    date: "2025-10-24"
    changes:
      - { type: "added",  text: "Home mínima, listado de proyectos y blog." }
      - { type: "added",  text: "Contacto con Netlify Forms (honeypot + /thanks)." }
      - { type: "docs",   text: "Primera entrada del blog: lanzamiento v0.1.1." }
---

## Resumen
Sitio base del portfolio con estructura limpia: **Home → Proyectos → Blog → Contacto**.
Objetivo: crecer por iteraciones sin bloquear el diseño.

## Contexto
Queríamos poner online una primera versión funcional para ir aprendiendo Astro + CI/CD y cerrar un circuito de **DEV → STAGING → PROD** con versionado SemVer.

## Stack
- **Astro** (content collections, rutas estáticas)
- **TypeScript**
- **Netlify** (deploy, Forms)
- **GitHub Actions** (tagging dev/rc/release)

## Resultados (v0.1.1)
- Sitio navegable y rápido.
- Flujo de versiones automatizado (dev → rc → release).
- Base para escalar diseño y contenido.

## Roadmap corto
- Diseño V1 con guía de marca.
- Listados con tarjetas ricas (estado, versión).
- Feed de changelog por proyecto.
