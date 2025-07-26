import { styleObjectToString, toKebabCase } from "../../utils/styling";

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
});
