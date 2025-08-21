import type { Theme } from "../../../types/themes";
import { getCssVariablesFromTheme, styleObjectToString, toKebabCase } from "../../../utils/styling";

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

	it("getCssVariablesFromTheme: should convert theme object to CSS variables", () => {
		const lightTheme: Theme = {
			background: {
				primary: "#eee",
				hover: "#ddd",
				active: "#ccc",
			},
			text: {
				primary: "#000",
				secondary: "#304fcb",
			},
			border: {
				primary: "#304fcb",
				hover: "#9eb1ff",
				active: "#fff",
			},
			shadow: "#304fcb92",
		};

		const result = getCssVariablesFromTheme(lightTheme);
		expect(result).toEqual({
			"--noqta-theme-background-primary": "#eee",
			"--noqta-theme-background-hover": "#ddd",
			"--noqta-theme-background-active": "#ccc",
			"--noqta-theme-text-primary": "#000",
			"--noqta-theme-text-secondary": "#304fcb",
			"--noqta-theme-border-primary": "#304fcb",
			"--noqta-theme-border-hover": "#9eb1ff",
			"--noqta-theme-border-active": "#fff",
			"--noqta-theme-shadow": "#304fcb92",
		});
	});
});
