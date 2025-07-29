import { getCSS } from "./getCSS";
import { getScript } from "./getScript";
export const getResources = () => [
  getCSS(
    "_katex.css",
    "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
  ),
  getCSS(
    "_highlight.css",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css"
  ),

  getScript(
    "_highlight.js",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"
  ),
  getScript(
    "_katex.min.js",
    "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js"
  ),
  getScript(
    "_auto-render.js",
    "https://cdn.jsdelivr.net/gh/Jwrede/Anki-KaTeX-Markdown/auto-render-cdn.js"
  ),
  getScript(
    "_markdown-it.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.0.4/markdown-it.min.js"
  ),
  getScript(
    "_markdown-it-mark.js",
    "https://cdn.jsdelivr.net/gh/Jwrede/Anki-KaTeX-Markdown/_markdown-it-mark.js"
  ),
];

export const getChemistryPackage = () =>
  getScript(
    "_mhchem.js",
    "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/contrib/mhchem.min.js"
  );
