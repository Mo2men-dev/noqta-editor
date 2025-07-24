import { NoqtaEditor } from "../../../src";
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
});
