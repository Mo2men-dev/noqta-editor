import type { BlockquoteOptions } from "@tiptap/extension-blockquote";
import type { BoldOptions } from "@tiptap/extension-bold";
import type { BulletListOptions } from "@tiptap/extension-bullet-list";
import type { CodeOptions } from "@tiptap/extension-code";
import type { DropcursorOptions } from "@tiptap/extension-dropcursor";
import type { HardBreakOptions } from "@tiptap/extension-hard-break";
import type { HeadingOptions } from "@tiptap/extension-heading";
import type { HistoryOptions } from "@tiptap/extension-history";
import type { HorizontalRuleOptions } from "@tiptap/extension-horizontal-rule";
import type { ItalicOptions } from "@tiptap/extension-italic";
import type { ListItemOptions } from "@tiptap/extension-list-item";
import type { OrderedListOptions } from "@tiptap/extension-ordered-list";
import type { StrikeOptions } from "@tiptap/extension-strike";
import type { LinkOptions } from "@tiptap/extension-link";
import type { TaskListOptions } from "@tiptap/extension-list";
import type { HighlightOptions } from "@tiptap/extension-highlight";
import type { ColorOptions } from "@tiptap/extension-text-style";
import type { UnderlineOptions } from "@tiptap/extension-underline";
import type { ImageOptions } from "@tiptap/extension-image";
import type { TableOptions } from "@tiptap/extension-table";

export interface DefaultExtensions {
	blockquote?: Partial<BlockquoteOptions> | false;
	bold?: Partial<BoldOptions> | false;
	bulletList?: Partial<BulletListOptions> | false;
	code?: Partial<CodeOptions> | false;
	dropcursor?: Partial<DropcursorOptions> | false;
	gapcursor?: boolean;
	hardBreak?: Partial<HardBreakOptions> | false;
	heading?: Partial<HeadingOptions> | false;
	history?: Partial<HistoryOptions> | false;
	horizontalRule?: Partial<HorizontalRuleOptions> | false;
	italic?: Partial<ItalicOptions> | false;
	listItem?: Partial<ListItemOptions> | false;
	orderedList?: Partial<OrderedListOptions> | false;
	strike?: Partial<StrikeOptions> | false;
	underline?: Partial<UnderlineOptions> | false;
	highlight?: Partial<HighlightOptions> | false;
	color?: Partial<ColorOptions> | false;
	link?: Partial<LinkOptions> | false;
	taskList?: Partial<TaskListOptions> | false;
	image?: Partial<ImageOptions> | false;
	table?: Partial<TableOptions> | false;
	codeBlockLowlight?: boolean;
}

/**
 * The options available to customize the `RichTextLink` extension.
 */
export type RichTextLinkOptions = LinkOptions;
