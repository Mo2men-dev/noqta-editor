import type { Extension } from "@tiptap/react";
import {
	generateTableStyles,
	styleObjectToString,
	toCamelCase,
	toKebabCase,
} from "../../../utils/styling";
import type { Theme } from "../../../types/themes";

describe("Style conversions", () => {
	it("styleObjectToString: should convert a style object to a CSS string", () => {
		const style = {
			color: "red",
			backgroundColor: "blue",
			fontSize: "16px",
		};
		const result = styleObjectToString(style);
		expect(result).toBe("color: red; background-color: blue; font-size: 16px");
	});

	it("toKebabCase: should convert camelCase to kebab-case", () => {
		const camelCase = "backgroundColor";
		const result = toKebabCase(camelCase);
		expect(result).toBe("background-color");
	});

	it("toCamelCase: should convert kebab-case to camelCase", () => {
		const kebabCase = "background-color";
		const result = toCamelCase(kebabCase);
		expect(result).toBe("backgroundColor");
	});
});

describe("Table styles generation", () => {
	it("generateTableStyles: should generate CSS styles for tables", () => {
		const theme = {
			background: {
				primary: "#ffffff",
				hover: "#f0f0f0",
			},
			text: {
				primary: "#000000",
			},
			border: {
				primary: "#cccccc",
			},
		} as unknown as Theme;

		const extension = { options: { cellWidth: 100 } } as unknown as Extension;
		const result = generateTableStyles(extension, theme);
		expect(result).toContain("table {");
		expect(result).toContain("th {");
		expect(result).toContain("td {");
	});
});
