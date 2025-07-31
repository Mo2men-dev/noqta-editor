import { smartSelectWrap } from "../plugins/smart-select-wrap";
import { smartSymbolClose } from "../plugins/smart-symbol-close";
import { MarkingRules } from "../constants/marking-rules";
import { applyMarkingRule, hasRelevantMarks } from "../utils/marks";

import { type SmartTypingOptions } from "../types/extensions";
import { Extension } from "@tiptap/core";

export const SmartTyping = Extension.create<SmartTypingOptions>({
	name: "smartTyping",

	addOptions() {
		return {
			smartSelectWrap: true,
			smartSymbolClose: true,
			showSymbols: false, // This option is used to determine if symbols should be shown in the editor
		};
	},

	addProseMirrorPlugins() {
		let plugins = [];
		if (this.options.smartSelectWrap) {
			plugins.push(smartSelectWrap);
		}
		if (this.options.smartSymbolClose) {
			plugins.push(smartSymbolClose);
		}
		return plugins;
	},

	onTransaction() {
		const { state } = this.editor;
		const tr = state.tr.setMeta("addToHistory", false);

		const schema = state.schema;
		if (!schema || !schema.marks) return;
		if (!hasRelevantMarks(schema)) return;

		MarkingRules.forEach((rule) => {
			applyMarkingRule(this.editor, tr, rule);
		});
	},
});
