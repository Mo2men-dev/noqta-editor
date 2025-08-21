import type { Theme } from "../types/themes";

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

/**
 * Get CSS variables from a theme object.
 * This function converts a theme object into a format suitable for inline styles in React components.
 * @param theme The theme object containing styles.
 * @return A React.CSSProperties object containing CSS variables.
 */
export const getCssVariablesFromTheme = (theme: Theme): React.CSSProperties => {
	const cssEntries: [string, string][] = [];
	Object.entries(theme).forEach((entry) => {
		let variable: [string, string][] = [];
		const key = entry[0];
		const val = entry[1];

		if (typeof val === "object") {
			Object.entries(val).forEach((ele) => {
				variable.push([`--noqta-theme-${key}-${ele[0]}`, ele[1] as string]);
			});
		} else {
			variable.push([`--noqta-theme-${key}`, val as string]);
		}

		cssEntries.push(...variable);
	});

	const cssVariables = Object.fromEntries(cssEntries) as React.CSSProperties;
	return cssVariables;
};
