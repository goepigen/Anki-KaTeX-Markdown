import { replaceHTMLElementsInString } from "./replaceHTMLElementsInString";
export function markdown(ID) {
  let md = new window.markdownit({
    typographer: true,
    html: true,
    highlight: function (str, lang) {
      if (lang && window.hljs?.getLanguage(lang)) {
        try {
          return window.hljs?.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
  }).use(window.markdownItMark);
  let text = replaceHTMLElementsInString(document.getElementById(ID).innerHTML);
  text = md.render(text);
  document.getElementById(ID).innerHTML = text.replace(
    /&lt;\/span&gt;/gi,
    "\\\\"
  );
}
