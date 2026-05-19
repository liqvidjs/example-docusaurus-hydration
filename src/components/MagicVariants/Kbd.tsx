import { SneakyScript } from '@liqvid/hydration';
import { isClient } from '@liqvid/ssr';
import { useId } from 'react';
import { getOS } from './shared';

export type KbdProps =
  | {
      shortcut: string;
      osVariants?: never;
    }
  | {
      osVariants: {
        linux: string;
        mac: string;
        windows?: string;
      };
      shortcut?: never;
    };

// ⌘⇧↩⌥⎋⌃←↑→↓
/**
 * Display a keyboard shortcut sequence.
 * You can either provide a single shortcut string, or an object with different shortcuts for each OS.
 * Since Linux and Windows share many shortcuts, the Windows variant is optional and will fall back to the Linux one if not provided.
 */
export const Kbd = (props: KbdProps) => {
  const id = useId();

  if (typeof props.shortcut === 'string') {
    return <kbd>{localize(props.shortcut)}</kbd>;
  }

  const { osVariants } = props;

  const currentOS = isClient ? getOS() : 'linux';

  if (isClient) {
    return (
      <kbd>
        {localize(
          currentOS === 'mac'
            ? `mac(${osVariants[currentOS]})`
            : (osVariants[currentOS] ?? osVariants.linux),
        )}
      </kbd>
    );
  }

  return (
    <>
      <kbd id={`${id}-linux`}>{osVariants.linux}</kbd>
      <kbd id={`${id}-mac`}>{localize(`mac(${osVariants.mac})`)}</kbd>
      <kbd id={`${id}-windows`}>{osVariants.windows ?? osVariants.linux}</kbd>
      <SneakyScript>{`
			const os = (${getOS})();
      for (const opt of ["linux", "mac", "windows"]) {
        const elt = document.getElementById(${JSON.stringify(id)} + "-" + opt);
        if (opt === os) {
          elt.removeAttribute("id");
        } else {
          elt.remove();
        }
      }
`}</SneakyScript>
    </>
  );
};

/**
 * Apply Apple custom formatting of keyboard shortcuts, e.g. "mac(Ctrl+Shift+Enter)" becomes "⌃⇧↩".
 */
function localize(shortcut: string) {
  const $_ = shortcut.match(/^mac\((.+)\)$/);
  if (!$_) return shortcut;
  return $_[1]
    .split('+')
    .map((part) => {
      switch (part) {
        // modifiers
        case 'Alt':
          return '⌥';
        case 'Cmd':
          return '⌘';
        case 'Ctrl':
          return '⌃';
        case 'Shift':
          return '⇧';
        // arrows
        case 'Down':
          return '↓';
        case 'Up':
          return '↑';
        case 'Left':
          return '←';
        case 'Right':
          return '→';
        // other
        case 'Enter':
          return '↩';
        default:
          return part;
      }
    })
    .join('');
}
