import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function NoqtaEditor() {
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World!</p>",
	});

	return <EditorContent editor={editor} />;
}

export { NoqtaEditor };
