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
	children?: string | React.ReactNode;
	onClick: () => void;
	className?: string;
	style?: React.CSSProperties;
	active?: boolean;
	disabled?: boolean;
};

export type ColorInputProps = {
	title?: string;
	value?: string;
	icon: React.ReactNode;
	options: {
		color: string;
		border: string;
		title: string;
	}[];
	handleClick: (color: string) => void;
	handleRemove?: () => void;
};

export type CustomTableComponentProps = {
	editor: Editor;
	node: Node;
	extension: any;
};

export type DropDownProps = {
	options: any[];
	activeOption: any;
	onClickHandler: (option: string) => void;
};
