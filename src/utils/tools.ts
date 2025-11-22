import { renderToMarkdown } from "@tiptap/static-renderer";
import { editor } from "../components/NoqtaEditor";
import html2pdf from "html2pdf.js";

export const getMarkdownUtil = () => {
	if (editor) {
		const content = editor.getJSON();
		// @ts-ignore
		return renderToMarkdown({ content, extensions: editor.extensionManager.extensions });
	}
	return "";
};

export const exportPDFUtil = (filename: string) => {
	if (editor) {
		const html = editor.getHTML();
		const wrapper = document.createElement("div");
		wrapper.classList.add("pdf-export");
		wrapper.innerHTML = html;

		html2pdf()
			.set({
				margin: 25,
				filename: filename,
				jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
				enableLinks: true,
			})
			.from(wrapper)
			.save();
	}
};
