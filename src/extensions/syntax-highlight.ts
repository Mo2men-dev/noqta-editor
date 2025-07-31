import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlockComponent from "../components/CodeBlockComponent";

import { all, createLowlight } from "lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { lowlightLangs } from "../constants/lowlightLangs";

const lowlight = createLowlight(all);

// Register languages with lowlight
lowlightLangs.forEach((lang) => {
	lowlight.register(lang[0], lang[1]);
});

lowlight.registerAlias({ javascript: ["js"], typescript: ["ts"], xml: ["html"] });

const SyntaxHighlight = CodeBlockLowlight.extend({
	addOptions() {
		return {
			lowlight,
			defaultLanguage: "plaintext",
			langs: lowlightLangs.map((lang) => lang[0]),
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
});

export default SyntaxHighlight;
