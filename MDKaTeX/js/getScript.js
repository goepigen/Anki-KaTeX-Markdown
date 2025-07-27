function getScript(path, altURL) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.onload = resolve;
    script.onerror = function () {
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
