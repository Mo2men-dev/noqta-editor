/**
 * Convert a style object to a string representation for inline styles in React components.
 * @param style The style object to convert to a string.
 * @returns A string representation of the style object.
 */
export function styleObjectToString(style: React.CSSProperties): string {
	return Object.entries(style)
		.map(([key, value]) => `${toKebabCase(key)}: ${value}`)
		.join("; ");
}

/**
 * Convert a camelCase string to kebab-case.
 * @param str The camelCase string to convert.
 * @returns The kebab-case version of the string.
 */
export function toKebabCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
