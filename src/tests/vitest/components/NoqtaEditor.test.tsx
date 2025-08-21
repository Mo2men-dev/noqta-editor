import { Extension } from "@tiptap/core";
import { NoqtaEditor } from "../../../components/NoqtaEditor";
import { render, screen } from "@testing-library/react";

describe("NoqtaEditor", () => {
	it("renders without crashing", () => {
		render(<NoqtaEditor />);
		const editor = screen.getByRole("textbox");
		expect(editor).toBeInTheDocument();
		expect(editor).toHaveAttribute("contenteditable", "true");
		expect(editor).toHaveClass("ProseMirror");
	});

	it("renders with initial content", () => {
		const initialContent = "<p>Initial content</p>";
		render(<NoqtaEditor initialContent={initialContent} />);
		const editor = screen.getByRole("textbox");
		expect(editor).toHaveTextContent("Initial content");
	});

	it("applies custom extensions", () => {
		const customExtension = Extension.create({
			name: "customExtension",
			addGlobalAttributes() {
				return [
					{
						types: ["paragraph"],
						attributes: {
							style: {
								default: "color: red;",
							},
						},
					},
				];
			},
		});

		render(<NoqtaEditor initialContent="<p>Hello World!!</p>" extensions={[customExtension]} />);
		const paragraph = screen.getByText("Hello World!!");
		expect(paragraph).toBeInTheDocument();
		expect(paragraph.tagName).toBe("P");
		expect(paragraph).toHaveAttribute("style", "color: red;");
	});

	it("renders with default extensions", () => {
		const testContent = `
        <h1> Heading 1</h1>
        <h2> Heading 2</h2>
        <strong>Bold text</strong>
        <em>Italic text</em>
        <del>Strikethrough text</del>
        <code>code</code>
        `;

		render(<NoqtaEditor initialContent={testContent} />);
		const editor = screen.getByRole("textbox");
		expect(editor).toBeInTheDocument();

		const headings = screen.getAllByRole("heading");
		expect(headings).toHaveLength(2);
		expect(headings[0]).toHaveTextContent("Heading 1");
		expect(headings[1]).toHaveTextContent("Heading 2");

		const boldText = screen.getByRole("strong");
		expect(boldText).toHaveTextContent("Bold text");

		const italicText = screen.getByRole("emphasis");
		expect(italicText).toHaveTextContent("Italic text");

		const strikethroughText = screen.getByText("Strikethrough text");
		expect(strikethroughText.tagName).toBe("S");

		const codeText = screen.getByRole("code");
		expect(codeText).toHaveTextContent("code");
	});

	it("renders without excluded extensions", () => {
		const testContent = `
        <h1> Heading 1</h1>
        <h2> Heading 2</h2>
        <strong>Bold text</strong>
        <em>Italic text</em>
        <del>Strikethrough text</del>
        <code>code</code>
        `;

		render(
			<NoqtaEditor
				initialContent={testContent}
				defaultExtensionsConfig={{
					italic: false,
					bold: false,
				}}
			/>
		);
		const editor = screen.getByRole("textbox");
		expect(editor).toBeInTheDocument();

		const headings = screen.getAllByRole("heading");
		expect(headings).toHaveLength(2);
		expect(headings[0]).toHaveTextContent("Heading 1");
		expect(headings[1]).toHaveTextContent("Heading 2");

		expect(screen.queryByRole("strong")).not.toBeInTheDocument();
		expect(screen.queryByRole("emphasis")).not.toBeInTheDocument();

		const strikethroughText = screen.getByText("Strikethrough text");
		expect(strikethroughText.tagName).toBe("S");

		const codeText = screen.getByRole("code");
		expect(codeText).toHaveTextContent("code");
	});

	it("applies custom styles", () => {
		const customStyle = { backgroundColor: "#ff0000", padding: "10px" };
		render(<NoqtaEditor style={customStyle} />);
		const editor = screen.getByRole("textbox");
		expect(editor).toHaveStyle("background-color: #ff0000");
		expect(editor).toHaveStyle("padding: 10px");
	});
});
