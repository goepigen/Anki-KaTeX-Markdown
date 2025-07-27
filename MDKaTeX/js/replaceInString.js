export function replaceInString(str) {
  str = str.replace(/<[\/]?pre[^>]*>/gi, "");
  str = str.replace(/<br\s*[\/]?[^>]*>/gi, "\\n");
  str = str.replace(/<div[^>]*>/gi, "\\n");
  // Thanks Graham A!
  str = str.replace(/<[\/]?span[^>]*>/gi, "");
  str.replace(/<\/div[^>]*>/g, "\\n");
  return replaceHTMLElementsInString(str);
}
