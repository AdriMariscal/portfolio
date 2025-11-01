---
title: "v0.4.1 — Rediseño visual, blog con etiquetas y sección legal completa"
description: "Nueva versión mayor del portfolio: identidad visual consolidada, tarjetas de proyectos y posts mejoradas, páginas legales conforme a LSSI y RGPD, y flujo de despliegue con staging protegido."
pubDate: 2025-11-01
tags: ["release-notes", "astro", "netlify", "seo", "lighthouse", "legal", "lssi", "rgpd", "ux"]
draft: false
---

## Resumen

- **Rediseño completo** del _home_, tarjetas de **proyectos** y **posts**, con tipografías y colores de la guía de marca.  
- **Blog con etiquetas** y **página de etiquetas** (`/tags/[tag]`) para agrupar contenidos por tecnología y tema.  
- **Sección legal completa** (Aviso Legal, Privacidad, Cookies, Términos) alineada con **LSSI** y **RGPD**. :contentReference[oaicite:0]{index=0}  
- **Staging protegido** con autenticación básica en **Netlify Edge Functions** + variables de entorno; **Forms** operativos para contacto. :contentReference[oaicite:1]{index=1}  
- Objetivo de **Lighthouse ≥90** en rendimiento, accesibilidad, SEO y buenas prácticas. :contentReference[oaicite:2]{index=2}

---

## Por qué este cambio

Quería dos cosas:  
1) **Una imagen profesional coherente** con mi guía de marca (colores, escalas y espaciados que respiren), y  
2) **Arquitectura de contenidos escalable**, capaz de crecer con nuevos proyectos y artículos sin perder claridad.

A nivel de negocio, el portfolio ya no es solo un escaparate: también **capta demanda orgánica** (SEO), cualifica leads (blog técnico) y **acelera ventas** mostrando entregables reales.

---

## Qué hay de nuevo

### 1) UI/UX: más claro, más rápido
- **Hero** con propuesta de valor y CTAs diferenciados (“Contacto” y “Leer el blog”).  
- **Métricas destacadas** (años en Salesforce, nº de proyectos, objetivo Lighthouse). Lighthouse audita rendimiento, accesibilidad, SEO y más; sirve como _baseline_ de calidad. :contentReference[oaicite:3]{index=3}  
- **Tarjetas de proyecto** con _badges_ (estado, etiquetas) y enlaces condicionales a **Código**, **Demo** y **Ver proyecto** (solo si existen).  
- **Últimos artículos** en home: rejilla limpia (3), etiquetas clicables y fragmentos legibles.

### 2) Blog con etiquetas y página `/tags/[tag]`
- **Colección de contenidos tipada de Astro** para consultar posts y proyectos con seguridad de tipos. Esto facilita listados, filtros y paginación. :contentReference[oaicite:4]{index=4}  
- **Página de etiquetas** que agrupa artículos por tema (p. ej., `/tags/astro`, `/tags/salesforce`), ordenados por fecha, con el mismo _look_ que el listado principal.

### 3) Sección legal completa (España/EU)
- **Aviso legal** conforme al **art. 10 LSSI** (datos de identificación del prestador). :contentReference[oaicite:5]{index=5}  
- **Privacidad** alineada con **RGPD** (finalidades, base jurídica, derechos, DPO si aplica). :contentReference[oaicite:6]{index=6}  
- **Cookies** siguiendo la **Guía AEPD**: información clara, clasificación y consentimiento cuando proceda. (Aunque ahora no cargo cookies no técnicas). :contentReference[oaicite:7]{index=7}

> Nota: Cuando incorpore analítica o herramientas de terceros, aplicaré la guía de cookies de AEPD (clasificación, información por capas y consentimiento válido). :contentReference[oaicite:8]{index=8}

### 4) Flujo de despliegue y formularios
- **Staging protegido** con **Edge Functions** (Netlify) y variables `STAGING_USER` / `STAGING_PASS`. Declaraciones en `netlify.toml` para ejecutar la función en `/`. :contentReference[oaicite:9]{index=9}  
- **Formulario de contacto** con **Netlify Forms** (`data-netlify="true"` + nombre de formulario), envío y gestión desde el panel. :contentReference[oaicite:10]{index=10}

---

## Notas técnicas

- **Astro Content Collections** para `blog` y `projects`: `getCollection()` para obtener entradas, utilidades para ordenar por `pubDate` y filtrar por `featured` o `tags`. :contentReference[oaicite:11]{index=11}  
- **Etiquetas**: se “slugifican” de forma consistente para construir rutas amigables (`/tags/<tag>`).  
- **Accesibilidad**: jerarquías de encabezados, _focus states_ en enlaces, contraste en paleta de marca.  
- **Build & Deploy**: _pipelines_ a **Netlify** (prod) y _preview deploys_ para PRs. **Staging** protegido para pruebas con cliente.  
- **Versionado**: etiquetas semánticas `vMAJOR.MINOR.PATCH`. PRs promueven cambios de `dev → staging → main`. (Si automatizas _tags_ con Actions, recuerda el uso del `GITHUB_TOKEN` con permisos mínimos necesarios). :contentReference[oaicite:12]{index=12}

---

## Resultados de calidad (objetivo)

- **Lighthouse**: mantener **90–100** en rendimiento, accesibilidad, SEO y buenas prácticas. Estos rangos son recomendados por la documentación oficial. :contentReference[oaicite:13]{index=13}  
- **PSI**: comprobar que los valores se mantienen estables en móvil y escritorio, dado que PSI usa Lighthouse bajo el capó. :contentReference[oaicite:14]{index=14}

---

## Próximos pasos (roadmap v0.3.x)

1. **Sistema de diseño** (tokens y componentes reutilizables en Astro).  
2. **Contenido evergreen**: guías técnicas y casos reales (Salesforce, Astro, Netlify, rendimiento).  
3. **Analítica conforme a AEPD** (si la activo): revisar cookies y consentimiento. :contentReference[oaicite:15]{index=15}  
4. **Mejoras DevEx**: _preview environments_ por PR y test visuales.

---

## ¿Necesitas algo parecido?

Si quieres un **portfolio rápido, accesible y optimizado** (Astro + Netlify / Vercel) o una **página corporativa con cumplimiento legal** (LSSI/RGPD) y buen SEO técnico, cuéntame qué necesitas desde la [página de contacto](/contact).

