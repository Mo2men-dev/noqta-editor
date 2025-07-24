import type { Extension } from "@tiptap/core";
import type { DefaultExtensions } from "./extensions";

export interface NoqtaEditorProps {
	initialContent?: string;
	extensions?: Extension[];
	defaultExtensionsConfig?: DefaultExtensions;
}
