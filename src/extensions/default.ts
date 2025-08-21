/*
 * Default extensions for the rich text editor.
 * This file exports a function that creates an array of Tiptap extensions
 * based on the provided configuration options.
 *
 * Inspired by the Tiptap Starter Kit
 */

import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Code } from "@tiptap/extension-code";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { Text } from "@tiptap/extension-text";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { TrailingNode } from "@tiptap/extensions";
import { RichTextLink } from "./rich-text-links";
import { SmartTyping } from "./smart-typing";
import { TableCell, TableHeader, TableRow } from "@tiptap/extension-table";

import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import CustomTable from "./extended-tables";
import SyntaxHighlight from "./syntax-highlight";

import type { DefaultExtensions } from "../types/extensions";
import { addAttributeToMark } from "../utils/marks";

/**
 * Creates an array of default Tiptap extensions based on the provided configuration options.
 * @param {DefaultExtensions} options - Configuration options or false to disable specific extensions.
 * @returns {Array} An array of Tiptap extensions.
 */
const createDefaultExtensions = (
	options: DefaultExtensions = {
		blockquote: {},
		bold: {},
		bulletList: {},
		code: {},
		dropcursor: {},
		gapcursor: true,
		hardBreak: {},
		heading: {},
		history: {},
		horizontalRule: {},
		italic: {},
		listItem: {},
		orderedList: {},
		strike: {},
		underline: {},
		highlight: {},
		image: {},
		color: {},
		link: {},
		taskList: {},
		table: {},
		codeBlockLowlight: true,
		smartTyping: {},
	}
): Array<any> => {
	const extensions = [];

	if (options.blockquote !== false) {
		extensions.push(Blockquote.configure(options.blockquote));
	}
	if (options.bold !== false) {
		extensions.push(
			SmartTyping.options.showSymbols
				? addAttributeToMark(Bold.configure(options.bold), [{ attr: "data-symbol", value: "**" }])
				: Bold.configure(options.bold)
		);
	}
	if (options.bulletList !== false) {
		extensions.push(BulletList.configure(options.bulletList));
	}
	if (options.code !== false) {
		extensions.push(Code.configure(options.code));
	}
	if (options.dropcursor !== false) {
		extensions.push(Dropcursor.configure(options.dropcursor));
	}
	if (options.gapcursor !== false) {
		extensions.push(Gapcursor);
	}
	if (options.hardBreak !== false) {
		extensions.push(HardBreak.configure(options.hardBreak));
	}
	if (options.heading !== false) {
		extensions.push(Heading.configure(options.heading));
	}
	if (options.history !== false) {
		extensions.push(History.configure(options.history));
	}
	if (options.horizontalRule !== false) {
		extensions.push(HorizontalRule.configure(options.horizontalRule));
	}
	if (options.italic !== false) {
		extensions.push(
			SmartTyping.options.showSymbols
				? addAttributeToMark(Italic.configure(options.italic), [
						{ attr: "data-symbol", value: "*" },
				  ])
				: Italic.configure(options.italic)
		);
	}
	if (options.listItem !== false) {
		extensions.push(ListItem.configure(options.listItem));
	}
	if (options.orderedList !== false) {
		extensions.push(OrderedList.configure(options.orderedList));
	}
	if (options.strike !== false) {
		extensions.push(
			SmartTyping.options.showSymbols
				? addAttributeToMark(Strike.configure(options.strike), [
						{ attr: "data-symbol", value: "~~" },
				  ])
				: Strike.configure(options.strike)
		);
	}
	if (options.underline !== false) {
		extensions.push(Underline.configure(options.underline));
	}
	if (options.highlight !== false) {
		extensions.push(Highlight.configure({ multicolor: true, ...options.highlight }));
	}
	if (options.color !== false) {
		extensions.push(Color.configure(options.color), TextStyle);
	}
	if (options.taskList !== false) {
		extensions.push(TaskList.configure(options.taskList), TaskItem);
	}
	if (options.image !== false) {
		extensions.push(Image.configure({ inline: true, allowBase64: true, ...options.image }));
	}
	if (options.link !== false) {
		extensions.push(
			RichTextLink.configure({
				openOnClick: true,
				...options.link,
			})
		);
	}
	if (options.table !== false) {
		extensions.push(
			CustomTable.configure({
				resizable: true,
				cellMinWidth: 100,
				...options.table,
			}),
			TableCell,
			TableRow,
			TableHeader
		);
	}
	if (options.codeBlockLowlight !== false) {
		extensions.push(SyntaxHighlight);
	}
	if (options.smartTyping !== false) {
		extensions.push(SmartTyping.configure(options.smartTyping));
	}

	extensions.push(
		TrailingNode.configure({
			node: "paragraph",
		})
	);
	extensions.push(Paragraph);
	extensions.push(Document);
	extensions.push(Text);

	return extensions;
};

export default createDefaultExtensions;
