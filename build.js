// build.js
const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["web/editor.js"],
    bundle: true,
    outfile: "dist/editor.bundle.js", // Where Anki will read from
    format: "iife", // Wrap in a function for script injection
    target: ["chrome58"], // QtWebEngine compatibility
    minify: false,
    sourcemap: false,
  })
  .catch(() => process.exit(1));
