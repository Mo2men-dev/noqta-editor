import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function NoqtaEditor({ initialContent }: { initialContent?: string }) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: initialContent || "<p>Hello World!</p>",
	});

	return <EditorContent editor={editor} />;
}

export { NoqtaEditor };
