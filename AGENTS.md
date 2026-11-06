---
description: Guía de directrices, arquitectura y reglas obligatorias para el desarrollo de EB-Web-Oficial
---

# 📌 Reglas y Directrices del Proyecto (EB-Web-Oficial)

> [!IMPORTANT]
> **LECTURA OBLIGATORIA PREVIA A CUALQUIER ACCIÓN**:
> Como agente asistente de desarrollo, **debes leer y aplicar estrictamente las directrices de este archivo antes de realizar cualquier edición, refactorización o creación de código** en este repositorio.
> Asimismo, **debes consultar siempre [AGENT_HISTORY.md](AGENT_HISTORY.md)** para conocer de forma resumida el contexto de las peticiones previas y modificaciones realizadas, optimizando el contexto y ahorrando tokens.

---

## 🧑‍💻 Perfil y Rol del Desarrollador

Debes actuar en todo momento como un **Ingeniero y Programador Web Senior / Experto en Desarrollo Frontend**, aplicando las mejores prácticas de la industria, arquitecturas limpias, rendimiento óptimo, accesibilidad y máxima atención al detalle estético y estructural.

---

## 🏛️ Estructura del Proyecto

El repositorio sigue una estricta separación de responsabilidades en sus directorios y una arquitectura de **URLs limpias mediante directorios (Método 1)**:

```text
EB-Web-Oficial/
├── .gitignore                   # Exclusiones de Git (incluye AGENT_HISTORY.md local)
├── 404.html                     # Página de error 404 personalizada
├── index.html                   # Página principal y portfolio (/)
├── AGENTS.md                    # Reglas obligatorias para el agente
├── AGENT_HISTORY.md             # Historial de consultas y cambios (exclusivo en local, ignorado por git)
├── robots.txt                   # Directivas de rastreo para buscadores
├── sitemap.xml                  # Mapa del sitio con URLs limpias sin .html
├── Estilo/                      # Hojas de estilos CSS del proyecto
│   ├── styles.css
│   ├── 404.css
│   ├── nightclub.css
│   └── hackaton2026.css
├── Estructura/                  # Directorio de todas las páginas y vistas secundarias
│   ├── gdg/                     # Vista y perfil del GDG (/Estructura/gdg/)
│   │   └── index.html
│   ├── hackaton2026/            # Vista del Hackathon Talent4Cyber (/Estructura/hackaton2026/)
│   │   └── index.html
│   └── universidad/             # Vista de estudios de Grado (/Estructura/universidad/)
│       └── index.html
├── Media/                       # Directorio central de recursos multimedia
│   ├── Aplicaciones/            # Iconos y logos de herramientas y software
│   ├── Footer/                  # Logotipos e imágenes exclusivas del pie de página
│   ├── Favicons/                # Iconos de pestaña y touch icons
│   └── ...                      # Subcarpetas temáticas estructuradas
└── Scripts/                     # Todos los archivos de lógica JavaScript
    ├── main.js
    ├── translations.js
    ├── nightclub.js
    └── ...                      # Scripts dedicados por página o módulo
```

---

## 💎 Calidad del Software y Gestión de Recursos

1. **Organización de Recursos Multimedia (`Media/`)**:
   - Todas las imágenes, logotipos, iconos e ilustraciones deben residir exclusivamente dentro de la carpeta `Media/`.
   - Los archivos deben estar **organizados en subcarpetas por temas relacionados**:
     - `Media/Footer/`: Logos y recursos de herramientas del pie de página (_Desarrollado con_, etc.).
     - `Media/Aplicaciones/`: Logos de aplicaciones, IDEs y tecnologías.
     - `Media/Favicons/`: Iconos de navegación y accesos directos.

   - Nomenclatura y renombrado genérico de imágenes: Cada vez que se proporcione, agregue o procese una nueva imagen para el proyecto, se le debe asignar un nombre descriptivo y genérico (por ejemplo, si es el logo de una empresa, nombrarlo como logo-empresa.png o manteniendo su extensión correspondiente).
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
   - Efectos visuales cuidados: _Glassmorphism_, fondos dinámicos sutiles, microinteracciones y efectos hover suaves en botones y tarjetas de enlace.
   - Tipografía moderna cargada mediante Google Fonts (`Inter` para texto base y `Outfit` para títulos).
   - Iconografía homogénea (iconos Phosphor y vectores SVG limpios).

---

## 🌐 Idioma y Convenciones

1. **Idioma y Soporte Bilingüe**: El proyecto cuenta con soporte bilingüe en Español (por defecto) e Inglés mediante el selector de idioma y el diccionario reactivo en `Scripts/main.js` (con persistencia en `localStorage` y atributos semánticos `data-i18n`). Todos los textos y secciones deben mantener consistencia en ambos idiomas.
2. **Consistencia**: Cualquier cambio debe mantener la armonía con la estructura existente y respetar los estilos globales definidos en `Estilo/styles.css`.

---

## 🚀 Despliegue en GitHub Pages y URLs Limpias (Arquitectura de Directorios)

Para garantizar URLs limpias, semánticas y sin extensiones `.html` en GitHub Pages, el sitio implementa la **arquitectura de directorios con `index.html` (Método 1)** organizada bajo el directorio `Estructura/`:

1. **Estructura de Vistas**:
   - Cada página o subsección secundaria reside en su propia carpeta dentro de `Estructura/` con un archivo llamado `index.html` en su interior (ej. `/Estructura/universidad/index.html`, `/Estructura/gdg/index.html`, `/Estructura/hackaton2026/index.html`).
   - Los servidores web resuelven automáticamente la URL del directorio (`https://enriquebdel.github.io/Estructura/universidad/`) sirviendo el archivo `index.html` de forma transparente.

2. **Buenas Prácticas para Enlaces (`<a>`), Recursos y SEO**:
   - **Enlaces a subpáginas desde la raíz**: Enlazar siempre hacia la carpeta con barra final (`href="Estructura/universidad/"`, `href="Estructura/gdg/"`), evitando que el navegador realice una redirección innecesaria (301).
   - **Enlaces de retorno**: Enlazar a la raíz mediante `href="../../"` desde las páginas dentro de `Estructura/<pagina>/`, o `href="./"` desde páginas de la raíz.
   - **Rutas a recursos (CSS, JS, Media)**: Al estar a dos niveles de profundidad, las páginas secundarias deben referenciar los recursos con prefijo `../../` (ej. `../../Estilo/styles.css`, `../../Scripts/main.js`, `../../Media/...`).
   - **Etiquetas canónicas y Open Graph**: Deben reflejar la URL canónica sin extensión `.html` (ej. `<link rel="canonical" href="https://enriquebdel.github.io/Estructura/universidad/">`).
   - **Mapa del sitio (`sitemap.xml`)**: Debe listar todas las URLs de páginas canónicas finalizando en barra `/`.

---

## 🔍 Documentación Oficial de Referencia (SEO, Metadatos e Indexación en Google)

Al consultar o trabajar en tareas de SEO, indexación, rastreo, favicons o etiquetas meta, consultar siempre estas fuentes oficiales:

- **Favicons en resultados de búsqueda de Google**: [Definir un favicon que se muestre en los resultados de la Búsqueda](https://developers.google.com/search/docs/appearance/favicon-in-search?hl=es)
- **Robots Meta Tag y directivas de rastreo**: [Especificaciones de la etiqueta meta robots, data-nosnippet y el encabezado HTTP X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=es)
- **Etiquetas meta y especiales reconocidas por Google**: [Etiquetas especiales que interpreta Google](https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=es)
