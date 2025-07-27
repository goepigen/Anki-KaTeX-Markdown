export function renderMath(text) {
  text = replaceInString(text);
  area.textContent = text;
  renderMathInElement(area, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
}
