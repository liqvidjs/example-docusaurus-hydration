// pretty sure this is all of them :P
export type Browser = 'chrome' | 'firefox' | 'safari';

// pretty sure this is all of them :P
export type OperatingSystem = 'linux' | 'mac' | 'windows';

/** Guess the user's browser based on the user agent string. */
export function getBrowser(): Browser {
  const { userAgent } = navigator;
  if (userAgent.includes('Chrome')) return 'chrome';
  if (userAgent.includes('Safari')) return 'safari';
  if (userAgent.includes('Firefox')) return 'firefox';
  return 'chrome';
}

/** Guess the user's operating system based on the platform string. */
export function getOS(): OperatingSystem {
  const { platform } = navigator;
  if (platform.includes('MacIntel')) return 'mac';
  if (platform.includes('Win32')) return 'windows';
  if (platform.includes('Linux')) return 'linux';
  return 'mac';
}

/** Capitalize the first letter of a string. */
export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
