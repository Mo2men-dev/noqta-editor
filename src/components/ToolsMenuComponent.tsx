import { Editor } from "@tiptap/core";
import "../styles/components/ToolsMenuComponent.css";
import FontFormatingTools from "./editor-tools/FontFormatingTools";
import { useEffect, useState } from "react";
import ContentFormatingTools from "./editor-tools/ContentFormatingTools";
import FontStylingTools from "./editor-tools/FontStylingTools";

function ToolsMenuComponent({ editor }: { editor: Editor }) {
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
		<div id="tools-menu">
			<FontFormatingTools editor={editor} />
			<span className="separator"></span>
			<ContentFormatingTools editor={editor} />
			<span className="separator"></span>
			<FontStylingTools editor={editor} />
		</div>
	);
}

export default ToolsMenuComponent;
