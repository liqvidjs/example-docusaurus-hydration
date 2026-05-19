# Docusaurus Hydration

This repository shows how to use the `@liqvid/hydration` package in a Docusaurus project to read client-only values, such as light/dark mode, without encountering React hydration errors. In particular, this provides a solution for the following issues:

- https://github.com/facebook/docusaurus/issues/7986

- https://github.com/facebook/docusaurus/issues/9629

## Explanation

We have tried to do this with the minimal amount of swizzling possible. Here is a summary of what we changed from a default Docusaurus project.

### Code blocks

These changes are made so that Prism blocks use the correct light/dark theme on load:

- `theme/CodeBlock`: we eject-swizzle this to ensure that the correct Prism theme is applied for light/dark mode.
  - `Content/index.tsx`: we just need to use our patched `usePrismTheme()` instead of the built-in one
  - `index.tsx`: this is where we add the main hydration magic
  - `usePrismTheme.swizzle.ts`: change `useColorMode()` to Liqvid `useColorScheme()`

- `theme/Layout/Provider/index.tsx`: just need to add the `SyncDocusaurusColorSchemeWithLiqvid` provider

- `theme/Root.tsx`: add a `<script>` tag with the Prism config; the `CodeBlock` hydration scripts read from this
