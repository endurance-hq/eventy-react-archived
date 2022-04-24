import { extendTheme } from "@chakra-ui/react";
import tailwindConfig from "root/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwind = resolveConfig(tailwindConfig);
const theme = extendTheme({
  colors: {
    indigo: { ...tailwind.theme.colors.indigo },
    slate: { ...tailwind.theme.colors.slate },
  },
});

export default theme;
