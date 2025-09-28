import { MdFormatColorText } from "react-icons/md";
import { FONTS } from "../../constants/fonts";
import Button from "../ui-elements/Button";
import ColorInput from "../ui-elements/ColorInput";
import DropDown from "../ui-elements/DropDown";
import HorizontalCenter from "../layout-components/HorizontalCenter";
import { useState } from "react";
import type { Editor } from "@tiptap/core";
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa6";

/**
 * Font styling tools for the editor.
 */
function FontStylingTools({ editor }: { editor: Editor }) {
	const [textColor, setTextColor] = useState("#ffffff");
	const [font, setFont] = useState("Atkinson Hyperlegible");

	return (
		<HorizontalCenter className="font-styling-tools">
			<Button
				title="Align Left"
				children={<FaAlignLeft />}
				active={editor.isActive({ textAlign: "left" })}
				onClick={() => editor.chain().focus().toggleTextAlign("left").run()}
			/>
			<Button
				title="Align Center"
				children={<FaAlignCenter />}
				active={editor.isActive({ textAlign: "center" })}
				onClick={() => editor.chain().focus().toggleTextAlign("center").run()}
			/>
			<Button
				title="Align Right"
				active={editor.isActive({ textAlign: "right" })}
				children={<FaAlignRight />}
				onClick={() => editor.chain().focus().toggleTextAlign("right").run()}
			/>
			<Button
				title="Align Justify"
				children={<FaAlignJustify />}
				active={editor.isActive({ textAlign: "justify" })}
				onClick={() => editor.chain().focus().toggleTextAlign("justify").run()}
			/>
			<HorizontalCenter>
				<ColorInput
					title="Text Color"
					value={textColor}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)}
				/>
				<Button
					title="Text Color"
					children={<MdFormatColorText />}
					style={{ color: textColor }}
					onClick={() => editor.chain().focus().setColor(textColor).run()}
				/>
			</HorizontalCenter>
			<DropDown
				activeOption={font}
				options={Object.keys(FONTS)}
				onClickHandler={(option: any) => {
					setFont(option);
					editor.chain().focus().setFontFamily(option).run();
				}}
			/>
		</HorizontalCenter>
	);
}

export default FontStylingTools;
