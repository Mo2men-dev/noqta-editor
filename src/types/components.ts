import type { Editor, Extension } from "@tiptap/core";
import type { DefaultExtensions } from "./extensions";
import type { Theme } from "./themes";
import { Node } from "@tiptap/pm/model";

export interface NoqtaEditorProps {
	initialContent?: string;
	extensions?: Extension[];
	defaultExtensionsConfig?: DefaultExtensions;
	theme?: Theme;
	style?: React.CSSProperties;
	editable?: boolean;
}

export type ButtonProps = {
	title: string;
	icon: string | React.ReactNode;
	onClick: () => void;
	style?: React.CSSProperties;
};

export type ColorInputProps = {
	title?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CustomTableComponentProps = {
	editor: Editor;
	node: Node;
	extension: any;
};
