(() => {
  // web/renderMath.js
  function renderMath(text) {
    text = replaceInString(text);
    area.textContent = text;
    renderMathInElement(area, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }

  // web/markdown.js
  function markdown(ID) {
    let md = new markdownit({
      typographer: true,
      html: true,
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {
          }
        }
        return "";
      }
    }).use(markdownItMark);
    let text = replaceHTMLElementsInString(document.getElementById(ID).innerHTML);
    text = md.render(text);
    document.getElementById(ID).innerHTML = text.replace(
      /&lt;\/span&gt;/gi,
      "\\\\"
    );
  }

  // web/getCSS.js
  function getCSS(path, altURL) {
    return new Promise((resolve, reject) => {
      var css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.type = "text/css";
      css.onload = resolve;
      css.onerror = function() {
        var css_online = document.createElement("link");
        css_online.setAttribute("rel", "stylesheet");
        css_online.type = "text/css";
        css_online.onload = resolve;
        css_online.onerror = reject;
        css_online.href = altURL;
        document.head.appendChild(css_online);
      };
      css.href = path;
      document.head.appendChild(css);
    });
  }

  // web/getScript.js
  function getScript(path, altURL) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.onload = resolve;
      script.onerror = function() {
        let script_online = document.createElement("script");
        script_online.onload = resolve;
        script_online.onerror = reject;
        script_online.src = altURL;
        document.head.appendChild(script_online);
      };
      script.src = path;
      document.head.appendChild(script);
    });
  }

  // web/editor.js
  var area2 = document.getElementById("markdown-area");
  if (area2) area2.remove();
  area2 = document.createElement("markdown-area");
  area2.id = "markdown-area";
  area2.style.display = "inline-block";
  area2.style.overflowY = "auto";
  area2.style.padding = "1%";
  area2.style.visibility = "hidden";
  area2.style.width = "98%";
  area2.style.height = "100%";
  var fields = document.getElementById("fields");
  if (fields !== null) {
    keyupFunc = function() {
      const text = "# Field 1\n" + fields.children[0].children[1].shadowRoot.children[2].innerHTML + "\n# Field 2\n" + fields.children[1].children[1].shadowRoot.children[2].innerHTML;
      render(text);
    };
    document.body.appendChild(area2);
  } else {
    fields = document.getElementsByClassName("fields")[0];
    keyupFunc = function() {
      const text = "# Field 1\n" + fields.children[0].getElementsByClassName("rich-text-editable")[0].shadowRoot.children[2].innerHTML + "\n# Field 2\n" + fields.children[1].getElementsByClassName("rich-text-editable")[0].shadowRoot.children[2].innerHTML;
      render(text);
    };
    fields.appendChild(area2);
  }
  var getResources = [
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
    )
  ];
  var main = function() {
    keyupFunc();
    document.addEventListener("keyup", keyupFunc);
  };
  Promise.all(getResources).then(
    () => getScript(
      "_mhchem.js",
      "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/contrib/mhchem.min.js"
    )
  ).then(main);
  function render(text) {
    renderMath(text);
    markdown(text);
    area2.style.visibility = "visible";
  }
})();
