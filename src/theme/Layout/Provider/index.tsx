import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders } from '@docusaurus/theme-common';
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from '@docusaurus/theme-common/internal';
import { SyncDocusaurusColorSchemeWithLiqvid } from '@liqvid/color-scheme/docusaurus';
import type { Props } from '@theme/Layout/Provider';
import type { ReactNode } from 'react';

const Provider = composeProviders([
  ColorModeProvider,
  SyncDocusaurusColorSchemeWithLiqvid,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);

export default function LayoutProvider({ children }: Props): ReactNode {
  return <Provider>{children}</Provider>;
}
