/** Capitalizes first letter of each word in `str`. */
export function capitalize(str: string): string {
  return str.toLowerCase().replace(new RegExp("\\b\\w", "g"), (c) => c.toUpperCase());
}
