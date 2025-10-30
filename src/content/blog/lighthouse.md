---
title: "Qué es Google Lighthouse (y por qué debería importarte)"
description: "Guía rápida para entender Lighthouse: qué mide, cómo leer sus puntuaciones y cómo lo uso para construir sitios rápidos, accesibles y mantenibles."
tags: ["lighthouse", "seo", "performance", "accesibilidad", "web"]
published: true
date: 2025-10-30
---

**Lighthouse** es una herramienta de auditoría de Google que analiza una página web y te da una puntuación (de 0 a 100) en cuatro áreas clave:

- **Performance**: velocidad de carga y respuesta percibida (LCP, CLS, TBT…).
- **Accesibilidad**: buenas prácticas para que cualquiera pueda usar tu web.
- **Best Practices**: seguridad y estándares web modernos.
- **SEO**: aspectos técnicos que ayudan a los buscadores a entender tu sitio.

> **¿Por qué importa?** Porque una web rápida y accesible convierte mejor, posiciona mejor y es más barata de mantener.

## Cómo leer las puntuaciones

- **90–100**: excelente. Queda pulir detalles finos.
- **50–89**: hay mejoras claras con buen retorno (imágenes, fuentes, bloqueos de render…).
- **0–49**: problemas serios de base (carga excesiva de JS, recursos sin optimizar, HTML/CSS desordenado).

No te obsesiones con el 100/100; lo importante es **mejorar la experiencia real** de tus usuarios sin complicar el proyecto.

## Mi enfoque

En proyectos nuevos uso **Astro** + contenido estructurado y despliegue en Netlify. Así consigo puntuaciones de **~98/100** de media manteniendo el código simple y fácil de evolucionar.

### Qué suelo aplicar

- Imágenes responsivas (formatos modernos, `width/height`, lazy).
- CSS mínimo y componentes reutilizables.
- Carga diferida de JS y cero hidrata­ción cuando no hace falta.
- Metadatos SEO/OG correctos y accesibilidad desde el diseño.

## ¿Lo aplicamos a tu caso?

Si quieres una revisión rápida de tu sitio con acciones concretas de mejora, **[contáctame](/contact)** y te preparo un plan con prioridades y estimación.
