import { BubbleMenu } from "../extended-components/BubbleMenu";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import "../../styles/components/BubbleMenuComponent.css";
import FontFormatingTools from "../editor-tools/FontFormatingTools";
import { MdFormatColorText } from "react-icons/md";
import { PiHighlighterBold } from "react-icons/pi";
import HorizontalCenter from "../layout-components/HorizontalCenter";
import ColorInput from "../ui-elements/ColorInput";
import useForceRerender from "../../hooks/ForceRerender";

/**
 * A BubbleMenuComponent for Tiptap editor that provides text formatting options.
 */
function BubbleMenuComponent({ editor }: { editor: Editor }) {
	const [textColor, setTextColor] = useState("#ffffff");
	const [highlightColor, setHighlightColor] = useState("#ffff00");
	useForceRerender(editor);
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
			<HorizontalCenter>
				<ColorInput
					title="Highlight Color"
					color={highlightColor}
					icon={<PiHighlighterBold />}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setHighlightColor(e.target.value);
						editor.chain().focus().toggleHighlight({ color: e.target.value }).run();
					}}
				/>
				<ColorInput
					title="Text Color"
					value={textColor}
					icon={<MdFormatColorText />}
					color={textColor}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setTextColor(e.target.value);
						editor.chain().focus().setColor(e.target.value).run();
					}}
				/>
			</HorizontalCenter>
		</BubbleMenu>
	);
}

export default BubbleMenuComponent;
