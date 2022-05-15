const fs = require("fs");

const buildPathGroupsBasedOnEsbuildAliases = ({
  customJSRoot = "app/javascript/",
  customAliasPath = "config/esbuild/alias.js",
}) => {
  const rootOfProject = __dirname + `/../../`;

  const isFile = filePath =>
    fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

  const esbuildAliasPath = rootOfProject + customAliasPath;

  const hasEsbuildAliasConfig = isFile(esbuildAliasPath);

  const isRailsProject = isFile(rootOfProject + "Gemfile");

  const emptyPathGroups = [];

  if (!hasEsbuildAliasConfig || !isRailsProject) return emptyPathGroups;

  const aliases = require(esbuildAliasPath);

  const railsJSFilesRoot = rootOfProject + customJSRoot;

  const pathGroups = Object.entries(aliases).map(([name, path]) => {
    // sometimes alias might be already resolved to full absolute path
    const isAleadyAnAbsolutePath = path.includes("app/");

    const absolutePath = isAleadyAnAbsolutePath
      ? path
      : `${railsJSFilesRoot}${path}`;
    const wildCard =
      isFile(absolutePath + ".js") || isFile(absolutePath + ".jsx")
        ? ""
        : "/**";

    let group = "internal";
    if (["chakraui", "chakraicons"].includes(name)) {
      group = "external";
    }

    return { pattern: `${name}${wildCard}`, group };
  });

  return pathGroups;
};

module.exports = { buildPathGroupsBasedOnEsbuildAliases };
