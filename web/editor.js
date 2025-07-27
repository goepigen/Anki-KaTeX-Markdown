import { renderMath } from "./renderMath.js";
import { markdown } from "./markdown.js";
import { getCSS } from "./getCSS.js";
import { getScript } from "./getScript.js";

let area = document.getElementById("markdown-area");
if (area) area.remove();

area = document.createElement("markdown-area");
area.id = "markdown-area";
area.style.display = "inline-block";
area.style.overflowY = "auto";
area.style.padding = "1%";
area.style.visibility = "hidden";
area.style.width = "98%";
area.style.height = "100%";

let fields = document.getElementById("fields");
if (fields !== null) {
  keyupFunc = function () {
    const text =
      "# Field 1\n" +
      fields.children[0].children[1].shadowRoot.children[2].innerHTML +
      "\n# Field 2\n" +
      fields.children[1].children[1].shadowRoot.children[2].innerHTML;
    render(text);
  };

  document.body.appendChild(area);
} else {
  fields = document.getElementsByClassName("fields")[0];

  keyupFunc = function () {
    const text =
      "# Field 1\n" +
      fields.children[0].getElementsByClassName("rich-text-editable")[0]
        .shadowRoot.children[2].innerHTML +
      "\n# Field 2\n" +
      fields.children[1].getElementsByClassName("rich-text-editable")[0]
        .shadowRoot.children[2].innerHTML;
    render(text);
  };

  fields.appendChild(area);
}

const getResources = [
  getCSS(
    "_katex.css",
    "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
  ),
  getCSS(
    "_highlight.css",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/default.min.css"
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

const main = function () {
  keyupFunc();
  document.addEventListener("keyup", keyupFunc);
};

Promise.all(getResources)
  .then(() =>
    getScript(
      "_mhchem.js",
      "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/contrib/mhchem.min.js"
    )
  )
  .then(main);

function render(text) {
  renderMath(text);
  markdown(text);
  area.style.visibility = "visible";
}
