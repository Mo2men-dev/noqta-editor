import { useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import type { NoqtaEditorProps } from "../types/components";

import createDefaultExtensions from "../extensions/default";

import "../styles/index.css";
import "../styles/markdown.css";

/**
 * NoqtaEditor is a React component that provides a rich text editor using [Tiptap](https://tiptap.dev/).
 */
function NoqtaEditor(props: NoqtaEditorProps) {
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
	});

	return <EditorContent editor={editor} id="editor-container" />;
}

export { NoqtaEditor };
