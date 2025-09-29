import type { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";

function useForceRerender(editor: Editor) {
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
}

export default useForceRerender;
