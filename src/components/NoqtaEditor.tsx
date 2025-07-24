import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import type { NoqtaEditorProps } from "../types/components";

/**
 * NoqtaEditor is a React component that provides a rich text editor using [Tiptap](https://tiptap.dev/).
 */
function NoqtaEditor(props: NoqtaEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit, ...(props.extensions || [])],
		content: props.initialContent || "<p>Hello World!</p>",
	});

	return <EditorContent editor={editor} />;
}

export { NoqtaEditor };
