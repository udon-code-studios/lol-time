/** Capitalizes first letter of each word in `str`. */
export function capitalize(str: string): string {
  return str.toLowerCase().replace(new RegExp("\\b\\w", "g"), (c) => c.toUpperCase());
}

/** Converts number of seconds to 'MMm SSs' format */
export function formatDuration(duration: number | undefined): string {
  if (duration === undefined) {
    return `0m 0s`;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return `${minutes}m ${seconds}s`;
}
