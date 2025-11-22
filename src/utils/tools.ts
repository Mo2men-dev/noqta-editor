import { renderToMarkdown } from "@tiptap/static-renderer";
import { editor } from "../components/NoqtaEditor";

export const getMarkdownUtil = () => {
	if (editor) {
		const content = editor.getJSON();
		// @ts-ignore
		return renderToMarkdown({ content, extensions: editor.extensionManager.extensions });
	}
	return "";
};

export const downloadMarkdownUtil = (filename: string) => {
	if (editor) {
		const markdown = editor.getMarkdown();
		const blob = new Blob([markdown], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
};
