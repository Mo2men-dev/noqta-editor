import { type MarkingRule } from "../types/extensions";
import { Editor, Mark } from "@tiptap/core";
import { Node, Schema } from "@tiptap/pm/model";
import { TextSelection, Transaction } from "@tiptap/pm/state";

/**
 * Check if the schema has any relevant marks.
 * @param schema The schema to check.
 * @returns True if there are relevant marks, false otherwise.
 */
export function hasRelevantMarks(schema: Schema): boolean {
	return !!(schema.marks.italic || schema.marks.bold || schema.marks.strike || schema.marks.code);
}

/**
 * Apply a marking rule to the editor's transaction.
 * @param editor The editor instance.
 * @param tr The transaction to modify.
 * @param rule The marking rule to apply.
 */
export function applyMarkingRule(editor: Editor, tr: Transaction, rule: MarkingRule) {
	const { state } = editor;
	const { doc, schema } = state;

	const replacments: {
		from: number;
		to: number;
		text: string;
		markType: string;
		symbol: string;
	}[] = [];

	doc.descendants((node: Node, pos: number) => {
		const text = node.textContent;

		rule.regex.forEach((regex) => {
			let match;
			const tempRegex = new RegExp(regex.source.source, regex.source.flags);

			while ((match = tempRegex.exec(text)) !== null) {
				const fullMatch = match[0]; // Full match including delimiters
				const capturedText = match[2] || match[1]; // Capture the text inside the delimiters
				const matchIndex = match.index;

				const from = pos + matchIndex + rule.offsetStart - (matchIndex === 0 ? 1 : 0);
				let to = from + fullMatch.length + rule.offsetEnd + (matchIndex === 0 ? 1 : 0);

				// Ensure the range is valid
				const range = TextSelection.create(doc, from, to);
				if (!range || range.empty) return;

				// For each mark/node, we check if the it already exists in the range
				// If it's already existing, we skip adding a new one
				const existingMarks = doc.rangeHasMark(from, to, schema.marks[rule.markType]);
				if (existingMarks) continue;

				replacments.push({
					from,
					to,
					text: capturedText,
					markType: rule.markType,
					symbol: regex.symbol,
				});
			}

			// Reset the regex lastIndex to avoid skipping matches
			tempRegex.lastIndex = 0;
		});

		return true;
	});

	// Reverse the replacements to avoid index shifting issues
	for (const replacement of replacments.reverse()) {
		let { from, to } = replacement;
		const { text, markType, symbol } = replacement;

		const mark = schema.marks[markType].create({ "data-symbol": symbol });
		let replacementText = [schema.text("\u00A0"), schema.text(text, [mark]), schema.text("\u00A0")];

		// If the replacement starts at the beginning of the text,
		// we don't need the leading space
		if (from === 0) {
			replacementText = [schema.text(text, [mark]), schema.text("\u00A0")];
		}

		// Adjust to include the leading space
		const prevChar = doc.textBetween(from - 1, from, undefined, "\n");
		if (prevChar.trim() === "") to = to + 1;

		tr.replaceWith(from, to, replacementText);

		// Move cursor back by the length of the symbol
		tr.setSelection(TextSelection.create(tr.doc, state.selection.from - symbol.length));
		tr.setMeta("addToHistory", false);
	}

	if (replacments.length > 0 && tr.docChanged) {
		editor.view.dispatch(tr);
	}
}

/**
 * Add attributes to a mark.
 * @param mark The mark to extend.
 * @param attributes The attributes to add.
 * @return The extended mark with added attributes.
 */
export function addAttributeToMark(mark: Mark, attributes: { attr: string; value?: any }[]) {
	const attributesObj: Record<string, any> = {};

	attributes.forEach((attr) => {
		attributesObj[attr.attr] = { default: attr.value || null };
	});

	return mark.extend({
		addAttributes() {
			return {
				...this.parent?.(),
				...attributesObj,
			};
		},
	});
}
