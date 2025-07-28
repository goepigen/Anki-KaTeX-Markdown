const esbuild = require("esbuild");

const builds = [
  {
    entryPoints: ["web/editor.js"],
    outfile: "dist/editor.bundle.js",
  },
  {
    entryPoints: ["web/card.js"],
    outfile: "dist/card.bundle.js",
  },
];

for (const config of builds) {
  esbuild
    .build({
      ...config,
      bundle: true,
      format: "iife", // for inline <script> or src loading
      target: ["chrome58"], // good QtWebEngine baseline
      minify: true,
      sourcemap: false,
    })
    .catch(() => process.exit(1));
}
