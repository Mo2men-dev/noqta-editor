import { useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { darkTheme } from "../themes/dark";
import { ThemeProvider } from "../context/ThemeContext";
import { styleObjectToString } from "../utils/styling";
import type { NoqtaEditorProps } from "../types/components";

import BubbleMenuComponent from "./extensions-components/BubbleMenuComponent";
import createDefaultExtensions from "../extensions/default";

import "../styles/index.css";
import "../styles/syntax.css";
import "../styles/markdown.css";
import "../styles/components/NoqtaEditor.css";
import ToolsMenuComponent from "./ToolsMenuComponent";

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

	const editor = useEditor({
		extensions: extensions,
		content: props.initialContent || "Start typing...",
		editable: props.editable !== undefined ? props.editable : true,
		editorProps: {
			attributes: {
				id: "noqta-editor",
				style: styleObjectToString(props.style || {}),
				role: "textbox",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{editor && <BubbleMenuComponent editor={editor} />}
			{editor && (
				<EditorContent editor={editor} id="editor-container">
					{editor && <ToolsMenuComponent editor={editor} />}
				</EditorContent>
			)}
		</ThemeProvider>
	);
}

export { NoqtaEditor };
