import SiteStorage from '@generated/site-storage';
import { SneakyScript } from '@liqvid/hydration';
import { isClient } from '@liqvid/ssr';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { Children, cloneElement } from 'react';
import { capitalize, getBrowser } from './shared';

/**
 * Display tabs for different browsers, with the correct one selected by default based on the user agent.
 */
export function BrowserTabs({
  children,
  groupId = 'browser',
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const currentBrowser = isClient ? getBrowser() : 'unknown';

  const content = (
    <Tabs groupId={groupId} {...props}>
      {Children.map(children, (child: any) => {
        if (child.type !== TabItem) return child;

        const browser = child.props.value;
        return cloneElement(child, {
          attributes: {
            ...child.props.attributes,
            'data-value': browser,
          },
          default: browser === currentBrowser,
          label: capitalize(browser),
        });
      })}
    </Tabs>
  );

  if (isClient) return content;
  return (
    <>
      {content}
      <SneakyScript>{`
const cached = localStorage.getItem(${JSON.stringify(`docusaurus.tab.${groupId}${SiteStorage.namespace}`)});
const browser = cached ?? (${getBrowser})();
const container = document.currentScript.previousElementSibling;
const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
const tabs = Array.from(container.querySelectorAll(".tabs__item"));
for (let i = 0; i < tabs.length; ++i) {
  const tab = tabs[i];
  const isActive = tab.dataset.value === browser;
  tab.setAttribute("aria-selected", String(isActive));
  tab.setAttribute("tabindex", isActive ? 0 : -1);
  tab.classList.toggle("tabs__item--active", isActive);

  if (isActive) {
    panels[i].removeAttribute("hidden");
  } else {
    panels[i].setAttribute("hidden", "");
  }
}`}</SneakyScript>
    </>
  );
}
