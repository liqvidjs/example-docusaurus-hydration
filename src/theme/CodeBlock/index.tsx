import { docusaurusPersistColorScheme } from '@liqvid/color-scheme/docusaurus';
import { HydrateElement } from '@liqvid/hydration';
import CodeBlockInit from '@theme-original/CodeBlock';
import type { PrismTheme } from 'prism-react-renderer';
import type React from 'react';
import type { ReactNode } from 'react';

export default function CodeBlock(
  props: React.ComponentProps<typeof CodeBlockInit>,
): ReactNode {
  return (
    <HydrateElement
      from={[docusaurusPersistColorScheme]}
      hydrationFn={(node, colorSchemeSpecifier) => {
        // get effective color scheme
        let colorScheme;
        if (colorSchemeSpecifier === 'system') {
          colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
        } else {
          colorScheme = colorSchemeSpecifier;
        }

        // load prism config from JSON data island
        const prismConfig = JSON.parse(
          document.getElementById('__docusaurus-prism-config')!.textContent,
        );
        const theme: PrismTheme =
          colorScheme === 'dark' ? prismConfig.darkTheme : prismConfig.theme;

        // apply root styles
        Object.assign(
          (node.querySelector('.prism-code') as HTMLElement).style,
          {
            '--prism-background-color': theme.plain.backgroundColor,
            '--prism-color': theme.plain.color,
          },
        );

        Object.assign(
          (node.querySelector('.prism-code') as HTMLElement).style,
          theme.plain,
        );

        // apply token styles
        for (const { style, types } of theme.styles) {
          for (const selector of types) {
            for (const child of node.querySelectorAll(`.token.${selector}`)) {
              Object.assign((child as HTMLElement).style, style);
            }
          }
        }
      }}
    >
      <div>
        <CodeBlockInit {...props} />
      </div>
    </HydrateElement>
  );
}
