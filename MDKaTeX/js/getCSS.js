export function getCSS(path, altURL) {
  return new Promise((resolve, reject) => {
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.type = "text/css";
    css.onload = resolve;
    css.onerror = function () {
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
