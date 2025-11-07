---
title: "Unit economics para micro-productos web: cómo decidir qué construir y a qué precio"
description: "Marco práctico para elegir y priorizar micro-productos: estimar demanda SEO, calcular costes reales (hosting, dominios, ancho de banda, soporte), fijar precios (one-off vs suscripción) y validar con métricas mínimas (CTR, conversión, payback). Incluye fórmulas y checklist legal LSSI/RGPD."
tags: ["unit economics", "pricing", "seo", "validación", "micro-productos", "lssi", "rgpd", "netlify", "arsys"]
published: true
date: 2025-11-04
---

Los **unit economics** evitan que un proyecto sea un **hobby caro**. Aquí dejo mi marco mínimo viable para **decidir qué construir**, **a qué precio** y **cuándo escalar**, aplicable a micro‑productos (ej.: *Cartas Rápidas*, utilidades nicho, plantillas, etc.).

---

## 1) Por qué importan los unit economics
- Sin números, es fácil **subestimar costes** (email, ancho de banda, soporte) y **sobreestimar demanda**.
- El objetivo no es una contabilidad perfecta, sino **decisiones rápidas** con hipótesis explícitas que puedas validar.

> Regla de oro: define **hipótesis** (precio, conversión, coste) → **experimento** → **métrica** → **siguiente decisión**.

---

## 2) Estimar demanda y competencia (SEO → intención → dificultad)
1. **Idea → keyword**: lista 5–10 consultas con **intención transaccional/mixta** ("generar carta de reclamación", "modelo contrato simple").
2. **Volumen y dificultad**: estima **volumen** y **competencia**; prioriza *colas medias/largas* donde puedas aportar valor único.
3. **SERP**: ¿qué formato vence? (guía, herramienta, plantilla). Copia **intención** pero mejora **oferta** (UX, claridad, rapidez).
4. **Estacionalidad**: revisa meses pico/valle para ajustar expectativas y *cashflow*.

> Señales de viabilidad:  
> (a) 2–3 keywords con intención clara,  
> (b) SERP con soluciones mejorables,  
> (c) volumen razonable para tu objetivo (p. ej., ≥ 2k impresiones/mes).

---

## 3) Costes: fijos y variables (no olvides el soporte)
**Fijos (€/mes, prorrateados)**: dominio, hosting (**Arsys/Netlify**), email transaccional, analítica (Plausible), monitorización, herramientas (Fathom/Hotjar/Stripe Tax…), tiempo de mantenimiento mínimo.

**Variables (por conversión/cliente)**: pasarela de pago, ancho de banda/AI/API, soporte (tiempo por ticket), devoluciones/chargebacks.

> Consejos:  
> • Valora tu **tiempo** (€/h) aunque al principio lo "regales".  
> • Mide **soporte por ticket** en minutos; aunque sean 5 min de media, impacta el margen.  
> • Evita dependencias con **coste incremental alto** (APIs por uso) sin precio que lo cubra.

---

## 4) Modelos de precio: ¿cuál uso?

- **One‑off (pago único)**: ideal para **plantillas** o utilidades cerradas. Requiere lanzamientos frecuentes o catálogo ancho.
- **Suscripción**: producto **vivo** con valor recurrente (datos, actualizaciones, sync). Ojo a **churn** y soporte.
- **Freemium**: útil si el coste marginal del free es ~0 y la experiencia empuja al upgrade (no regales tu valor central).
- **Bundles**: agrupa micro‑productos complementarios con descuento y reduce CAC total.

> Pista rápida: si el **valor** sucede **una vez** (p. ej., descargar un pack), **one‑off**. Si el valor es **continuo** (datos, backups, actualizaciones), **suscripción**.

---

## 5) Fórmulas clave (simplificadas)

### 5.1 Punto de equilibrio (venta única)
```
unidades = ceil( costes_fijos_mensuales / (precio - coste_variable_por_venta) )
```

**Ejemplo** (hipótesis realistas para un micro‑producto):  

- `costes_fijos_mensuales = 21 €` (dominio 1 €, hosting 9 €, email 2 €, analítica 9 €)  

- `precio = 12 €`  

- `coste_variable_por_venta = 1,28 €` (pasarela + soporte + ancho de banda aproximado)  

`margen_unitario ≈ 12 - 1,28 = 10,72 €`  

`unidades = ceil( 21 / 10,72 ) = ceil( 1,96 ) = 2`  

→ Con **2 ventas/mes** cubres fijos. A partir de ahí, contribución positiva.

### 5.2 Payback (suscripción)
```
contribución_mensual_por_usuario = ARPU * margen - coste_variable_mensual
meses_para_payback = costes_fijos_mensuales / contribución_mensual_por_usuario
```
**Ejemplo**: `ARPU = 4 €`, `margen = 0,85`, `coste_variable_mensual = 0,20 €`  

`contribución ≈ 4 * 0,85 - 0,20 = 3,20 €`  

`meses_para_payback ≈ 21 / 3,20 = 6,56` → ~**7 meses**.

Para cubrir fijos con suscripciones:  

`usuarios_necesarios = ceil( costes_fijos_mensuales / contribución ) = ceil( 21 / 3,20 ) = 7`

### 5.3 LTV y CAC objetivo
```
LTV ≈ ARPU * margen * (1 / churn_mensual)
CAC_objetivo ≤ LTV / 3
```
**Ejemplo**: `ARPU = 4 €`, `margen = 0,85`, `churn = 0,06`  

`LTV ≈ 4 * 0,85 * (1/0,06) = 56,67 €`  

`CAC_objetivo ≤ 18,89 €`

> Usa estas fórmulas como **semáforos**. Si CAC real > LTV/3, no escales aún.

---

## 6) Roadmap 0 → 1 (validación rápida)

1. **Landing + demo** (GIF/video o sandbox) y propuesta de valor ultra clara. 

2. **Captura de emails** (interés) y espera a ≥ **100** antes de construir features grandes. 

3. **MLP** (Producto Mínimo Monetizable): una única acción de alto valor (pagar/descargar/generar). 

4. **Métricas mínimas** en Plausible: fuente → CTR → conversión (página/pago). 

5. **Itera precio y oferta**: testea `7–19 €` en one‑off o `3–9 €/mes` si es recurrente. 

6. **Soporte y refunds**: define política simple y mide tiempo por ticket → retroalimenta tu margen.

**Funnel ejemplo (SEO)**: 10.000 impresiones → **CTR 3%** = 300 visitas → **CVR 2%** = 6 ventas →  

Ingresos `= 6 * 12 = 72 €` → Coste variable `= 6 * 1,28 = 7,68 €` →  

Contribución `= 72 - 7,68 = 64,32 €` → Beneficio tras fijos `= 64,32 - 21 = 43,32 €`.

---

## 7) SEO práctico para micro‑productos
- **Página problema → solución** con *copy* directo, pruebas sociales y CTA único.
- **FAQs** con *schema* (FAQPage) y **enlaces internos** desde tu **portfolio** y posts relacionados.
- **Velocidad**: Astro de salida es rápido; cuida imágenes, `loading="lazy"` y CSS sin bloat.
- **Evita canibalización**: una keyword = una URL. Redirecciones 301 al consolidar.
- **Top of funnel**: una guía comparativa que alimente el producto con enlaces contextuales.

---

## 8) Legal mínima (España) — LSSI/RGPD **checklist**
> No es asesoría legal. Es mi **lista de mínimos** para salir sin riesgos obvios.

- **Aviso legal**: identificación (nombre/NIF, email), actividad y condiciones básicas.
- **Privacidad**: base jurídica, finalidades, terceros (procesadores), plazo de conservación y **derechos ARSULIPO** (acceso, rectificación, supresión, limitación, portabilidad, oposición).
- **Cookies**: consentimiento **previo** para no esenciales; panel granular; **carga diferida** hasta aceptar.
- **Contrato/Condiciones de venta**: precio con impuestos, entregables, reembolsos (excepción de desistimiento en **contenidos digitales** si se ejecutan de inmediato), soporte.
- **Encargados**: acuerdos de tratamiento (ej.: email/analytics/pagos). Prioriza **proveedores UE/EEE** o con **SCCs**.
- **Seguridad**: registros de acceso, copias de seguridad, política de datos y brechas.

---

## 9) Checklist final
- [x] Hipótesis de **demanda** y **competencia** anotadas.
- [x] Costes **fijos** y **variables** estimados (con tu tiempo valorado).
- [x] Modelo de precio elegido y **fórmulas** calculadas.
- [x] **Landing + demo** y lista de correo activas.
- [x] Métricas en **Plausible** (fuente → conversión) y panel semanal.
- [x] **Textos legales** y cookies con consentimiento previo.
- [x] Plan de **soporte** y política de reembolsos.

---

## 10) Pitfalls típicos
- Subestimar **soporte** (cada ticket erosiona margen).  

- Precios sin datos: define **objetivo de margen** y ajusta con evidencias.  

- Depender de **APIs caras** sin trasladar coste al precio.  

- Olvidar **canónicas**/duplicados al crear variantes de landing.  

- No medir: sin **impresiones/CTR/CVR**, no hay decisiones.

¿Quieres que te deje una **hoja de cálculo** con las fórmulas y campos editables? Si te sirve, la preparo con tus rangos de precios y costes reales.
