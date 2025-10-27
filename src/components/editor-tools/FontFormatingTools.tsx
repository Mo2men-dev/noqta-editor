import { Editor } from "@tiptap/core";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa6";
import HorizontalCenter from "../layout-components/HorizontalCenter";
import Button from "../ui-elements/Button";
import { PiHighlighterBold } from "react-icons/pi";
import ColorInput from "../ui-elements/ColorInput";
import { useState } from "react";

/**
 * Font formatting tools for the editor.
 */
function FontFormatingTools({ editor }: { editor: Editor }) {
	const [highlightColor, setHighlightColor] = useState("#ffff00");
	return (
		<HorizontalCenter className="font-formatting-tools">
			<Button
				title="Bold"
				children={<FaBold />}
				active={editor.isActive("bold")}
				onClick={() =>
					editor
						.chain()
						.focus()
						.toggleBold()
						.updateAttributes("bold", { "data-symbol": "**" })
						.run()
				}
			/>
			<Button
				title="Italic"
				children={<FaItalic />}
				active={editor.isActive("italic")}
				onClick={() =>
					editor
						.chain()
						.focus()
						.toggleItalic()
						.updateAttributes("italic", { "data-symbol": "*" })
						.run()
				}
			/>
			<Button
				title="Strikethrough"
				children={<FaStrikethrough />}
				active={editor.isActive("strike")}
				onClick={() =>
					editor
						.chain()
						.focus()
						.toggleStrike()
						.updateAttributes("strike", { "data-symbol": "~~" })
						.run()
				}
			/>
			<Button
				title="Underline"
				active={editor.isActive("underline")}
				children={<FaUnderline />}
				onClick={() => editor.chain().focus().toggleUnderline().run()}
			/>
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
			</HorizontalCenter>
		</HorizontalCenter>
	);
}

export default FontFormatingTools;
