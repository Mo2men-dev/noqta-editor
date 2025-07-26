import type { Extension } from "@tiptap/core";
import type { DefaultExtensions } from "./extensions";
import type { Theme } from "./themes";

export interface NoqtaEditorProps {
	initialContent?: string;
	extensions?: Extension[];
	defaultExtensionsConfig?: DefaultExtensions;
	theme?: Theme;
	style?: React.CSSProperties;
}
