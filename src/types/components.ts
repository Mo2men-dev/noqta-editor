import type { Editor, Extension } from "@tiptap/core";
import type { DefaultExtensions } from "./extensions";
import type { Theme } from "./themes";
import { Node } from "@tiptap/pm/model";
import type { useEditor } from "@tiptap/react";

// A user added tool is represented as a tuple containing:
// [tool name, tool icon or string (ReactNode), tool action (function)]
export type UserAddedTool = [string, React.ReactNode, () => void];

export interface NoqtaEditorInstance extends ReturnType<typeof useEditor> {
	// Define any methods or properties you want to expose from the editor instance
	userAddedTools?: UserAddedTool[];
	getMarkdown: () => string;
	exportPDF: (filename: string) => void;
}

export interface NoqtaEditorProps {
	initialContent?: string;
	extensions?: Extension[];
	defaultExtensionsConfig?: DefaultExtensions;
	theme?: Theme;
	style?: React.CSSProperties;
	editable?: boolean;
	userAddedTools?: UserAddedTool[];
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
