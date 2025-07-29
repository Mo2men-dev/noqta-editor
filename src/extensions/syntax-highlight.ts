import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import c from "highlight.js/lib/languages/c";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import kotlin from "highlight.js/lib/languages/kotlin";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";

import { all, createLowlight } from "lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockComponent from "../components/CodeBlockComponent";

const lowlight = createLowlight(all);

lowlight.register("css", css);
lowlight.register("javascript", js);
lowlight.register("typescript", ts);
lowlight.register("xml", html);
lowlight.register("c", c);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("kotlin", kotlin);
lowlight.register("python", python);
lowlight.register("ruby", ruby);
lowlight.register("rust", rust);

lowlight.registerAlias("js", "javascript");
lowlight.registerAlias("ts", "typescript");
lowlight.registerAlias("html", "xml");

const SyntaxHighlight = CodeBlockLowlight.extend({
	addOptions() {
		return {
			lowlight,
			defaultLanguage: "plaintext",
			langs: [
				"javascript",
				"typescript",
				"css",
				"html",
				"plaintext",
				"c",
				"java",
				"cpp",
				"kotlin",
				"python",
				"ruby",
				"rust",
			],
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer(CodeBlockComponent);
	},
	addKeyboardShortcuts() {
		return {
			Tab: () => {
				if (this.editor.isActive("codeBlock")) {
					const { state, view } = this.editor;
					const { tr } = state;
					const { selection } = tr;

					// Check if the selection is a code block
					if (selection.$from.parent.type.name === "codeBlock") {
						tr.insertText("\t", selection.from, selection.to);
						view.dispatch(tr);
						return true;
					}
				}
			},
		};
	},
}).configure({
	lowlight,
	defaultLanguage: "plaintext",
});

export default SyntaxHighlight;
