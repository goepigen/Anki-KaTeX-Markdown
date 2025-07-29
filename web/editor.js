import { markdown } from "./markdown.js";
import { getScript } from "./getScript.js";
import { replaceInString } from "./replaceInString.js";
import { getChemistryPackage, getResources } from "./resources.js";

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

const main = function () {
  keyupFunc();
  document.addEventListener("keyup", keyupFunc);
};

Promise.all(getResources()).then(getChemistryPackage).then(main);

function renderMath(text) {
  text = replaceInString(text);
  area.textContent = text;
  window.renderMathInElement(area, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
}

function render(text) {
  renderMath(text);
  markdown(text);
  area.style.visibility = "visible";
}
