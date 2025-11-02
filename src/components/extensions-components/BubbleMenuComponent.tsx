import { BubbleMenu } from "../extended-components/BubbleMenu";
import { Editor } from "@tiptap/core";
import "../../styles/components/BubbleMenuComponent.css";
import FontFormatingTools from "../editor-tools/FontFormatingTools";
import { MdFormatColorText } from "react-icons/md";
import { PiHighlighterBold } from "react-icons/pi";
import HorizontalCenter from "../layout-components/HorizontalCenter";
import ColorInput from "../ui-elements/ColorInput";
import useForceRerender from "../../hooks/ForceRerender";
import { HIGHLIGHT_COLORS, TEXT_COLORS } from "../../constants/colorOptions";

/**
 * A BubbleMenuComponent for Tiptap editor that provides text formatting options.
 */
function BubbleMenuComponent({ editor }: { editor: Editor }) {
	const highlight = (color: string) => {
		editor.chain().focus().toggleHighlight({ color }).run();
	};

	const textColor = (color: string) => {
		editor.chain().focus().setColor(color).run();
	};

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
					icon={<PiHighlighterBold />}
					options={HIGHLIGHT_COLORS}
					handleClick={highlight}
					handleRemove={() => editor.chain().focus().unsetHighlight().run()}
				/>
				<ColorInput
					title="Text Color"
					icon={<MdFormatColorText />}
					options={TEXT_COLORS}
					handleClick={textColor}
				/>
			</HorizontalCenter>
		</BubbleMenu>
	);
}

export default BubbleMenuComponent;
