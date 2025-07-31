import type { EditorView } from "@tiptap/pm/view";
import { Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";

const WRAPPING_SYMBOLS: Record<string, string> = {
	"*": "*",
	_: "_",
	"~": "~",
	'"': '"',
	"'": "'",
	"`": "`",
	"(": ")",
	"[": "]",
	"{": "}",
	"<": ">",
};

/**
 * This plugin auto-closes common formatting symbols on input.
 */
const smartSymbolClose = new Plugin({
	key: new PluginKey("smartSymbolClose"),
	props: {
		handleTextInput(view: EditorView, from: number, to: number, text: string): boolean {
			const closing = WRAPPING_SYMBOLS[text.trim()];
			if (!closing) return false;

			// Don't auto-close (, [, {, < if not inside a code block
			const insideCodeBlock = view.state.selection.$from.parent.type.name === "codeBlock";
			if (!insideCodeBlock && (text === "(" || text === "[" || text === "{" || text === "<")) {
				return false;
			}

			// Don't auto-close if inside any mark
			const insideMark = view.state.selection.$from.marks().length > 0;
			if (insideMark) return false;

			const { state, dispatch } = view;
			const tr = state.tr;

			const prevChar = state.doc.textBetween(from, from, undefined, "\n");
			const nextChar = state.doc.textBetween(to, to + 1, undefined, "\n");

			if (WRAPPING_SYMBOLS[text] && WRAPPING_SYMBOLS[text] === nextChar) {
				tr.setSelection(TextSelection.create(tr.doc, to + 1));
				dispatch(tr);
				return true;
			}

			// Check if the previous and next characters are whitespace
			if (prevChar.trim() || nextChar.trim()) return false;

			// Insert both the opening and closing symbols
			tr.insertText(text + closing, from, to);

			// Move the cursor between the two symbols
			tr.setSelection(TextSelection.create(tr.doc, from + text.length));

			dispatch(tr);
			return true;
		},
	},
});

export { smartSymbolClose };
