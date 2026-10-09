---
description: Guía de directrices, arquitectura y reglas obligatorias para el desarrollo de EB-Web-Oficial
---

# 📌 Reglas y Directrices del Proyecto (EB-Web-Oficial)

> [!IMPORTANT]
> **LECTURA OBLIGATORIA PREVIA A CUALQUIER ACCIÓN**:
> Como agente asistente de desarrollo, **debes leer y aplicar estrictamente las directrices de este archivo antes de realizar cualquier edición, refactorización o creación de código** en este repositorio.

---

## 🧑‍💻 Perfil y Rol del Desarrollador
Debes actuar en todo momento como un **Ingeniero y Programador Web Senior / Experto en Desarrollo Frontend**, aplicando las mejores prácticas de la industria, arquitecturas limpias, rendimiento óptimo, accesibilidad y máxima atención al detalle estético y estructural.

---

## 🏛️ Estructura del Proyecto

El repositorio sigue una estricta separación de responsabilidades en sus directorios:

```text
EB-Web-Oficial/
├── 404.html                     # Página de error 404 personalizada
├── index.html                   # Página principal y portfolio
├── AGENTS.md                    # Reglas obligatorias para el agente
├── Estilo/                      # Todos los archivos de estilos CSS
│   ├── styles.css
│   └── 404.css
├── Estructura/                  # Todas las páginas y vistas HTML secundarias
│   ├── gdg.html
│   └── universidad.html
├── Media/                       # Directorio central de recursos multimedia
│   ├── Aplicaciones/            # Iconos y logos de herramientas y software
│   ├── Footer/                  # Logotipos e imágenes exclusivas del pie de página
│   ├── Favicons/                # Iconos de pestaña y touch icons
│   └── ...                      # Subcarpetas temáticas estructuradas
└── Scripts/                     # Todos los archivos de lógica JavaScript
    ├── main.js
    └── ...                      # Scripts dedicados por página o módulo
```

---

## 💎 Calidad del Software y Gestión de Recursos

1. **Organización de Recursos Multimedia (`Media/`)**:
   - Todas las imágenes, logotipos, iconos e ilustraciones deben residir exclusivamente dentro de la carpeta `Media/`.
   - Los archivos deben estar **organizados en subcarpetas por temas relacionados**:
     - `Media/Footer/`: Logos y recursos de herramientas del pie de página (*Desarrollado con*, etc.).
     - `Media/Aplicaciones/`: Logos de aplicaciones, IDEs y tecnologías.
     - `Media/Favicons/`: Iconos de navegación y accesos directos.
   - Los nombres de archivo deben ser descriptivos, sin espacios (usar formato `kebab-case` o `PascalCase` coherente).
   - Optimizar resoluciones y pesos para garantizar cargas ultrarrápidas.

2. **Separación Estricta de Código (HTML / CSS / JS)**:
   - **Cero JavaScript inline**: Queda prohibido escribir código JS en línea dentro de los archivos HTML (atributos `onclick`, etiquetas `<script>` embebidas con lógica directa, etc.). Cada vista o funcionalidad debe tener su archivo `.js` externo dentro de la carpeta `Scripts/` (por ejemplo, `Scripts/main.js`, `Scripts/404.js`).
   - **Cero CSS inline**: Queda prohibido el uso del atributo `style="..."` o etiquetas `<style>` dentro de los archivos HTML. Todos los estilos deben definirse en hojas `.css` dentro de `Estilo/`.

3. **HTML5 Semántico Estricto (Prohibición de `<div>`)**:
   - Todo el marcado debe utilizar elementos semánticos de HTML5: `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<figure>`, etc.
   - **No utilizar etiquetas `<div>`**. Toda agrupación de contenido debe responder a un elemento semántico representativo de su propósito.

---

## 🎨 Estética, Identidad Visual y Responsive Design

1. **Diseño 100% Responsivo (Mobile-First)**:
   - Toda interfaz debe estar perfectamente adaptada a dispositivos móviles, tablets y escritorios, cuidando márgenes, tamaños táctiles y flujos de contenido sin desbordamientos horizontales.

2. **Sistema de Diseño y Acabado Premium**:
   - Estética moderna con soporte para modo oscuro (`dark-mode`) y modo claro (`light-mode`).
   - Uso de variables CSS (design tokens) para colores, tipografías, transiciones y sombras.
   - Efectos visuales cuidados: *Glassmorphism*, fondos dinámicos sutiles, microinteracciones y efectos hover suaves en botones y tarjetas de enlace.
   - Tipografía moderna cargada mediante Google Fonts (`Inter` para texto base y `Outfit` para títulos).
   - Iconografía homogénea (iconos Phosphor y vectores SVG limpios).

---

## 🌐 Idioma y Convenciones

1. **Idioma Principal**: El idioma principal del proyecto, textos de interfaz, contenidos, comentarios y explicaciones técnicas es el **Español** (con el Inglés como soporte secundario si aplica).
2. **Consistencia**: Cualquier cambio debe mantener la armonía con la estructura existente y respetar los estilos globales definidos en `Estilo/styles.css`.

---

## 🔍 Documentación Oficial de Referencia (SEO, Metadatos e Indexación en Google)

Al consultar o trabajar en tareas de SEO, indexación, rastreo, favicons o etiquetas meta, consultar siempre estas fuentes oficiales:

- **Favicons en resultados de búsqueda de Google**: [Definir un favicon que se muestre en los resultados de la Búsqueda](https://developers.google.com/search/docs/appearance/favicon-in-search?hl=es)
- **Robots Meta Tag y directivas de rastreo**: [Especificaciones de la etiqueta meta robots, data-nosnippet y el encabezado HTTP X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=es)
- **Etiquetas meta y especiales reconocidas por Google**: [Etiquetas especiales que interpreta Google](https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=es)

