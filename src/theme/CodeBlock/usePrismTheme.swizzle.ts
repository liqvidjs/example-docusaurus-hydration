import { useThemeConfig } from '@docusaurus/theme-common';
import { useColorScheme } from "@liqvid/color-scheme/react";
import { PrismTheme } from "prism-react-renderer";

/**
 * Returns a color-mode-dependent Prism theme: whatever the user specified in
 * the config. Falls back to `palenight`.
 */
export function usePrismTheme(): PrismTheme {
  const {prism} = useThemeConfig();
  const {colorScheme} = useColorScheme();
  const lightModeTheme = prism.theme;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = colorScheme === 'dark' ? darkModeTheme : lightModeTheme;

  return prismTheme;
}
