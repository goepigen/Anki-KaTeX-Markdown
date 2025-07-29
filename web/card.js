import { markdown } from "./markdown.js";
import { renderMath } from "./renderMath.js";
import { getResources, getChemistryPackage } from "./resources.js";

Promise.all(getResources())
  .then(getChemistryPackage)
  .then(render)
  .catch(() => {
    document
      .querySelectorAll("div[id]")
      .forEach((div) => (div.style.visibility = "visible"));
  });

function render() {
  const ids = Array.from(document.querySelectorAll("div[id^='mdkatex-']")).map(
    (div) => div.id
  );
  ids.forEach((id) => {
    renderMath(id);
    markdown(id);
    document.getElementById(id).style.visibility = "visible";
  });
}
