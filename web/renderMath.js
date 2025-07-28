import { replaceInString } from "./replaceInString";
export function renderMath(ID) {
  let text = document.getElementById(ID).innerHTML;
  text = replaceInString(text);
  document.getElementById(ID).textContent = text;
  try {
    window.renderMathInElement(document.getElementById(ID), {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  } catch (e) {
    console.log("FAILED", e);
  }
}
