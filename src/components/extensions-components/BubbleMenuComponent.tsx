import { BubbleMenu } from "../extended-components/BubbleMenu";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import "../../styles/components/BubbleMenuComponent.css";
import FontFormatingTools from "../editor-tools/FontFormatingTools";

/**
 * A BubbleMenuComponent for Tiptap editor that provides text formatting options.
 */
function BubbleMenuComponent({ editor }: { editor: Editor }) {
	const [, setTick] = useState(0); // to force rerender on selection change

	useEffect(() => {
		if (!editor) return;
		const onSel = () => setTick((t) => t + 1); // small state just to force rerender
		editor.on("selectionUpdate", onSel);
		editor.on("update", onSel);
		return () => {
			editor.off("selectionUpdate", onSel);
			editor.off("update", onSel);
		};
	}, [editor]);

	return (
		<BubbleMenu
			editor={editor}
			className="noqta-bubble-menu"
			shouldShow={({ editor, from, to }: { editor: Editor; from: number; to: number }) => {
				return (
					from !== to && // Only show if there is a selection
					editor.isEditable && // Only show if the editor is editable
					!editor.isActive("codeBlock") && // Hide if in a code block
					!editor.can().chain().focus().toggleHeaderRow().run() // Hide if inside a table
				);
			}}
			options={{
				placement: "bottom",
			}}>
			<FontFormatingTools editor={editor} />
		</BubbleMenu>
	);
}

export default BubbleMenuComponent;
