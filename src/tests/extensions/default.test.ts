import { expect } from "vitest";
import createDefaultExtensions from "../../extensions/default";

describe("createDefaultExtensions", () => {
	it("should return an array of extensions", () => {
		const extensions = createDefaultExtensions();
		expect(extensions).toBeInstanceOf(Array);
	});

	it("should include specific extensions by default", () => {
		const extensions = createDefaultExtensions();
		const extensionNames = extensions.map((ext) => ext.name);
		expect(extensionNames).toContain("bold");
		expect(extensionNames).toContain("italic");
		expect(extensionNames).toContain("paragraph");
		expect(extensionNames).toContain("heading");
	});

	it("should allow configuration of extensions", () => {
		const customConfig = {
			bold: { HTMLAttributes: { class: "custom-bold" } },
			italic: { HTMLAttributes: { class: "custom-italic" } },
		};
		const extensions = createDefaultExtensions(customConfig);
		const boldExtension = extensions.find((ext) => ext.name === "bold");
		const italicExtension = extensions.find((ext) => ext.name === "italic");

		expect(boldExtension?.options.HTMLAttributes.class).toBe("custom-bold");
		expect(italicExtension?.options.HTMLAttributes.class).toBe("custom-italic");
	});

	it("should handle false options to disable extensions", () => {
		const extensions = createDefaultExtensions({
			bold: false,
			italic: false,
		});
		const extensionNames = extensions.map((ext) => ext.name);
		expect(extensionNames).not.toContain("bold");
		expect(extensionNames).not.toContain("italic");
		expect(extensionNames).toContain("paragraph");
		expect(extensionNames).toContain("heading");
	});
});
