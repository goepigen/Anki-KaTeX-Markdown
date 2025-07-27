export function replaceHTMLElementsInString(str) {
  str = str.replace(/&nbsp;/gi, " ");
  str = str.replace(/&tab;/gi, "	");
  str = str.replace(/&gt;/gi, ">");
  str = str.replace(/&lt;/gi, "<");
  return str.replace(/&amp;/gi, "&");
}
