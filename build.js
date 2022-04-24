#!/usr/bin/env node

const { build } = require("esbuild");
const svgrPlugin = require("esbuild-plugin-svgr");

const options = {
  entryPoints: ["app/javascript/application.jsx"],
  outdir: "app/assets/builds",
  loader: {
    ".js": "jsx",
    ".svg": "dataurl",
  },
  minify: process.env.RAILS_ENV === "production",
  bundle: true,
  sourcemap: true,
  watch: true,
  plugins: [svgrPlugin()],
};

build(options)
  .then(() => console.log("⚡ Done"))
  .catch(() => process.exit(1));
// require("esbuild")
//   .build({
//     entryPoints: ["app/javascript/application.jsx"],
//     outdir: "app/assets/builds",
//     loader: { ".js": "jsx", ".svg": "dataurl" },
//     minify: process.env.RAILS_ENV === "production",
//     bundle: true,
//     sourcemap: true,
//     watch: true,
//   })
//   .then(() => console.log("⚡ Done"))
//   .catch(() => process.exit(1));
