import { useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { darkTheme } from "../themes/dark";
import { ThemeProvider } from "../context/ThemeContext";
import type { NoqtaEditorInstance, NoqtaEditorProps } from "../types/components";

import BubbleMenuComponent from "./extensions-components/BubbleMenuComponent";
import createDefaultExtensions from "../extensions/default";

import "../styles/index.css";
import "../styles/syntax.css";
import "../styles/markdown.css";
import "../styles/pdf-export.css";
import "../styles/components/NoqtaEditor.css";

import ToolsMenuComponent from "./ToolsMenuComponent";
import { exportPDFUtil, getMarkdownUtil } from "../utils/tools";

let editor: NoqtaEditorInstance | null = null;

/**
 * NoqtaEditor is a React component that provides a rich text editor using [Tiptap](https://tiptap.dev/).
 */
function NoqtaEditor(props: NoqtaEditorProps) {
	const theme = props.theme || darkTheme;

	// Use the default extensions based on the provided configuration
	const defaultExtensions = useMemo(
		() => createDefaultExtensions(props.defaultExtensionsConfig),
		[props.defaultExtensionsConfig]
	);

	// Combine default extensions with any additional extensions provided via props
	const extensions = useMemo(() => {
		return props.extensions ? [...defaultExtensions, ...props.extensions] : defaultExtensions;
	}, [defaultExtensions, props.extensions]);

	editor = useEditor({
		extensions: extensions,
		content: props.initialContent || "Start typing...",
		editable: props.editable !== undefined ? props.editable : true,
		editorProps: {
			attributes: {
				id: "noqta-editor",
				role: "textbox",
			},
		},
	}) as NoqtaEditorInstance;

	if (editor) {
		// store user added tools on the editor instance without changing the Editor type
		editor.userAddedTools = props.userAddedTools ?? [];
		editor.getMarkdown = getMarkdownUtil;
		editor.exportPDF = exportPDFUtil;
	}

	return (
		<ThemeProvider theme={theme}>
			{editor && <BubbleMenuComponent editor={editor} />}
			{editor && (
				<EditorContent editor={editor} id="editor-container" style={props.style || {}}>
					{editor && <ToolsMenuComponent editor={editor} />}
				</EditorContent>
			)}
		</ThemeProvider>
	);
}

export { NoqtaEditor, editor };
