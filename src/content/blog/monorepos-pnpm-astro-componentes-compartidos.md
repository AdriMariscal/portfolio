---
title: "Monorepos con pnpm para micro‑productos: comparte UI y lógica entre sitios Astro"
description: "Por qué y cómo montar un monorepo con pnpm workspaces para reutilizar componentes, estilos y utilidades entre varios proyectos (Portfolio, Cartas Rápidas, etc.). Estructura, TypeScript paths, Astro, CSS compartido, releases con Changesets y despliegue en Netlify."
tags: ["monorepo", "pnpm", "astro", "typescript", "css", "tailwind", "changesets", "netlify", "ci/cd"]
published: true
date: 2025-11-03
---

Este es mi esquema práctico para **levantar un monorepo con pnpm** y **compartir UI y utilidades** entre varias apps **Astro** (por ejemplo: *Portfolio* y *Cartas Rápidas*), sin perder rendimiento ni SEO. Incluye **estructura**, **aliases TS**, **CSS tokens**, **Changesets** para releases y **despliegue en Netlify**.

> Objetivo: **reutilizar** (componentes, estilos, helpers), **acelerar DX** y **mantener versiones** con control fino, todo con **builds por app**.

---

## ¿Cuándo compensa un monorepo?
- **Reutilización real** de piezas (botones, tarjetas, layouts, hooks/útiles).
- **DX mejor**: una sola instalación de deps, `-C` para trabajar por app, Storybook/Playgrounds compartidos.
- **Versionado coherente**: Changesets gestiona releases de paquetes compartidos.
- **CI más simple**: un único repo con **builds por app**.

> Si cada proyecto es muy distinto o los equipos son separados, quizá **multi-repo** sea mejor. También si las piezas compartidas serán OSS independiente.

---

## Estructura propuesta

```
.
├─ apps/
│  ├─ portfolio/              # Astro app
│  └─ cartas-rapidas/         # Astro app
├─ packages/
│  ├─ ui/                     # @amc/ui  → componentes, estilos base
│  ├─ utils/                  # @amc/utils → helpers TS (fecha, i18n, etc.)
│  └─ config/                 # @amc/config → eslint, tailwind, tsconfig
├─ pnpm-workspace.yaml
├─ package.json               # scripts raíz, dev tooling
├─ tsconfig.base.json         # paths y opciones comunes
└─ .changeset/                # Changesets (versionado y changelogs)
```

**`pnpm-workspace.yaml`**
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**`package.json` (raíz, parcial)**
```json
{
  "private": true,
  "packageManager": "pnpm@9",
  "scripts": {
    "dev:portfolio": "pnpm -C apps/portfolio dev",
    "dev:cartas": "pnpm -C apps/cartas-rapidas dev",
    "build:portfolio": "pnpm -C apps/portfolio build",
    "build:cartas": "pnpm -C apps/cartas-rapidas build",
    "typecheck": "tsc -b",
    "changeset": "changeset",
    "release": "changeset version && pnpm install && changeset publish"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "changesets": "^2.27.0"
  }
}
```

> `pnpm -C <dir>` ejecuta el script **en esa app** sin hacer `cd` manual. DX top.

---

## TypeScript: `tsconfig.base.json`, path aliases y project references

**`tsconfig.base.json` (raíz)**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@amc/ui/*": ["packages/ui/src/*"],
      "@amc/utils/*": ["packages/utils/src/*"],
      "@amc/config/*": ["packages/config/*"]
    }
  }
}
```

**Referencias por proyecto** (opcional si compilas libs):
- `packages/ui/tsconfig.json` y `packages/utils/tsconfig.json` con `"composite": true`.
- `apps/*/tsconfig.json` con referencias a esos proyectos para `tsc -b` (typecheck incremental).

**`apps/portfolio/tsconfig.json`**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "noEmit": true },
  "references": [
    { "path": "../../packages/ui" },
    { "path": "../../packages/utils" }
  ]
}
```

> En **Astro** los path aliases también los resuelve **Vite**, así que no necesitas duplicarlos: basta con que `astro.config.mjs` lea `tsconfig.base.json` (Vite lo hace de serie).

---

## Astro: consumir paquetes locales

**Dependencias en apps** (usa `workspace:*`):
```json
// apps/portfolio/package.json
{
  "name": "portfolio",
  "private": true,
  "dependencies": {
    "astro": "^4.0.0",
    "@amc/ui": "workspace:*",
    "@amc/utils": "workspace:*"
  }
}
```

**Importar componentes compartidos**
```astro
---
import { Button, Card } from "@amc/ui";
import { formatDate } from "@amc/utils/date";
---

<Button as="a" href="/contact">Hablemos</Button>
<Card title="Últimos posts" />
```

**`packages/ui`** (ESM, tree‑shakeable):
```json
// packages/ui/package.json
{
  "name": "@amc/ui",
  "version": "0.1.0",
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./src/index.ts"
    }
  },
  "peerDependencies": {
    "astro": "^4"
  }
}
```

> `sideEffects: false` habilita tree‑shaking si solo exportas funciones/componentes puros y CSS por módulos.

---

## CSS compartido: tokens y utilidades comunes

### 1) **Tokens** (CSS variables) en `@amc/ui`
```css
/* packages/ui/styles/tokens.css */
:root{
  --amc-radius: 12px;
  --amc-space-1: .25rem;
  --amc-space-2: .5rem;
  --amc-space-3: 1rem;
  --amc-fg: 12 12 16;
  --amc-bg: 252 252 255;
  --amc-accent: 56 104 255;
}
```

### 2) **Utilidades Tailwind** compartidas
```js
// packages/config/tailwind.config.js
module.exports = {
  content: ["../../apps/**/*.{astro,ts,tsx,mdx,md}","../ui/**/*.{ts,tsx,astro}"],
  theme: {
    extend: {
      colors: {
        fg: "rgb(var(--amc-fg))",
        bg: "rgb(var(--amc-bg))",
        accent: "rgb(var(--amc-accent))"
      },
      borderRadius: { amc: "var(--amc-radius)" }
    }
  },
  plugins: []
};
```

**Consumirlo en cada app**
```js
// apps/portfolio/tailwind.config.js
const shared = require("@amc/config/tailwind.config.js");
module.exports = { ...shared };
```

Y en la app Astro:
```css
/* apps/portfolio/src/styles/global.css */
@import "@amc/ui/styles/tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> Ventaja: **tema consistente**, **CLS estable** (dimensiones) y **menos CSS duplicado**.

---

## Versionado y releases con **Changesets**

Inicializa:
```bash
pnpm dlx changeset init    # o pnpm changeset init si lo tienes como dep
```

Crea un changeset cuando cambie un paquete compartido:
```bash
pnpm changeset              # elige paquetes y tipo (patch/minor/major)
```

Publica (semver + tags + changelog):
```bash
pnpm release
```

> Puedes optar por **versionado independiente** (cada paquete su semver) o **grupo** si quieres lockstep. Para UI y utils suelo usar **independiente**.

---

## CI/CD en **Netlify** (builds por app)

Crea **un sitio por app** apuntando al mismo repo y define **Base directory** por sitio.

- **Base directory**: `apps/portfolio`
- **Build command**: `pnpm -C apps/portfolio build`
- **Publish directory**: `apps/portfolio/dist`
- **Node/PNPM**: variables `NODE_VERSION` y `PNPM_VERSION` en el panel (opcional).
- **Cache**: Netlify cachea `node_modules`/store de pnpm automáticamente; mantener la misma versión de pnpm ayuda.

Para la otra app (Cartas Rápidas), cambia `portfolio` por `cartas-rapidas` en base/command/publish.

> Si tu app necesita **env vars** distintas, defínelas por **site** en Netlify para aislar entornos.

---

## SEO y rendimiento en apps que comparten paquetes

- **Evita “dep bloat”**: marca `sideEffects: false`, exporta **entrypoints granulares** y no re‑exportes todo desde un único barrel si no hace falta.
- **Tree‑shaking real**: ESM puro (`type: "module"`), evita CJS en paquetes compartidos.
- **CSS mínimo**: importa solo tokens/utilidades; componentes con estilos aislados por módulo.
- **Imágenes y fuentes**: cada app gestiona sus assets (no desde el paquete, salvo iconos SVG).
- **No romper canonical**: cada app tiene su dominio/canonicals; no compartas rutas que generen duplicados entre sitios.

---

## Checklist final

- [x] `pnpm-workspace.yaml` con `apps/*` y `packages/*`.
- [x] `tsconfig.base.json` con **paths** a `@amc/*`.
- [x] Paquetes `@amc/ui`, `@amc/utils`, `@amc/config` con **ESM** y `sideEffects: false`.
- [x] Tailwind config compartido + **tokens CSS**.
- [x] Scripts `pnpm -C` por app; `typecheck` en raíz.
- [x] **Changesets** para versionado y publish.
- [x] Sitios en **Netlify** por app con **base dir** y **publish dir** correctos.

### Pitfalls típicos
- **Imports absolutos** que no respetan paths del TS config → revisa `tsconfig.base.json`.
- **CJS/ESM mix** en paquetes → usar solo ESM en compartidos.
- **Tailwind content** sin apuntar a `packages/ui` → clases “purgadas” por error.
- **Romper SSR** importando código *browser-only* desde `packages/utils` → usa `typeof window` guards o entrypoints separados.
- **Duplicar dependencias** por no usar `workspace:*`.

---

¿Quieres que deje una **plantilla mínima** del monorepo para arrancar en 5 minutos? Puedo preparar el zip con la estructura base y scripts listos para Netlify.
