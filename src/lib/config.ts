// src/lib/config.ts
export const SITE = {
  title: "Adrián Mariscal",
  description: "Arquitecto Salesforce & dev web ligero. Proyectos, blog y contacto.",
  url: "https://adrianmariscal.netlify.app", // mantén en sync con astro.config.mjs (opción `site`)
  lang: "es",
  author: "Adrián Mariscal",
};

export const THEME = {
  color: "#0B1F3B", // theme-color/meta; coincide con tu primario
};

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
] as const;
