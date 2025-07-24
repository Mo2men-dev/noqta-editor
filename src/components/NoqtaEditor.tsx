import { Extension } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function NoqtaEditor({
	initialContent,
	extensions,
}: {
	initialContent?: string;
	extensions?: Extension[];
}) {
	const editor = useEditor({
		extensions: [StarterKit, ...(extensions || [])],
		content: initialContent || "<p>Hello World!</p>",
	});

	return <EditorContent editor={editor} />;
}

export { NoqtaEditor };
