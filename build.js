#!/usr/bin/env node

const { build } = require("esbuild");
const svgrPlugin = require("esbuild-plugin-svgr");

const options = {
  entryPoints: ["app/javascript/application.jsx"],
  outdir: "app/assets/builds",
  loader: {
    ".js": "jsx",
    ".svg": "dataurl",
    ".png": "dataurl",
  },
  minify: process.env.RAILS_ENV === "production",
  bundle: true,
  sourcemap: true,
  watch: true,
  plugins: [svgrPlugin()],
};

build(options)
  .then(() => {
    console.log("⚡ Done");
    if (process.env.RAILS_ENV === "production") process.exit(0);
  })
  .catch(() => process.exit(1));
