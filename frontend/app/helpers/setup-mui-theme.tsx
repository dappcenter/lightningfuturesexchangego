import { createMuiTheme } from "@material-ui/core";

export const setupMUITheme = () => {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });
}