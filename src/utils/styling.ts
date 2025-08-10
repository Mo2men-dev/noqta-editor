import type { Extension } from "@tiptap/react";
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
 * Convert a kebab-case string to camelCase.
 * @param str The kebab-case string to convert.
 * @returns The camelCase version of the string.
 */
export function toCamelCase(str: string): string {
	return str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
}

/**
 * Generate CSS styles for tables based on the provided theme.
 * @param extension The Tiptap extension for the table.
 * @param theme The theme object containing style definitions.
 */
export function generateTableStyles(extension: Extension, theme: Theme): string {
	return `
        table {
            border-collapse: collapse;
            border-radius: 0.5rem;
            margin: 0 auto;
            color: ${theme.text.primary};
        }

        th {
            background-color: ${theme.background.hover};
        }
        
        td {
            background-color: ${theme.background.primary};
        }
        
        /* Add border for table cells based on cell position */
        td, th {
        	padding: 0.5rem;
            position: relative;
            border: 1px solid ${theme.border.primary};
        }

        .selectedCell:after {
            background: ${theme.background.active};
            opacity: 0.5;
            content: "";
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
            position: absolute;
            z-index: 2;
            width: 100%;
            height: 100%;
        }

        /* First column */
        td:first-child,
        th:first-child {
            border-left: none;
        }

        /* Last column */
        td:last-child,
        th:last-child {
            border-right: none;
        }
        
        /* First row */
        tr:first-child td,
        tr:first-child th {
            border-top: none;
        }
        
        /* Last row */
        tr:last-child td,
        tr:last-child th {
            border-bottom: none;
        }
        
        /* Top-left cell */
        tr:first-child td:first-child,
        tr:first-child th:first-child {
            border-top-left-radius: 0.5rem;
        }
        
        /* Top-right cell */
        tr:first-child td:last-child,
        tr:first-child th:last-child {
            border-top-right-radius: 0.5rem;
        }
        
        /* Bottom-left cell */
        tr:last-child td:first-child,
        tr:last-child th:first-child {
            border-bottom-left-radius: 0.5rem;
        }
        
        /* Bottom-right cell */
        tr:last-child td:last-child,
        tr:last-child th:last-child {
            border-bottom-right-radius: 0.5rem;
        }
        
        th, td {
            min-width: ${extension.options.cellMinWidth}px;
        }

        .column-resize-handle {
            background-color: ${theme.border.active};
            bottom: -2px;
            pointer-events: none;
            position: absolute;
            right: -2px;
            top: 0;
            width: 4px;
        }

        .table-controls {
            padding: 0.5rem;
        }
    `;
}
