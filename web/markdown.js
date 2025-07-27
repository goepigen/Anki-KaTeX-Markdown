export function markdown(ID) {
  let md = new markdownit({
    typographer: true,
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
  }).use(markdownItMark);
  let text = replaceHTMLElementsInString(document.getElementById(ID).innerHTML);
  text = md.render(text);
  document.getElementById(ID).innerHTML = text.replace(
    /&lt;\/span&gt;/gi,
    "\\\\"
  );
}
