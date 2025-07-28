import {
	FaBold,
	FaItalic,
	FaStrikethrough,
	FaLink,
	FaUnderline,
	FaCode,
	FaTable,
} from "react-icons/fa6";
import { MdCheckBox } from "react-icons/md";
import { PiHighlighterBold } from "react-icons/pi";

import { BubbleMenu } from "../extended-components/BubbleMenu";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext";
import { Editor } from "@tiptap/core";
import { useState } from "react";
import ColorInput from "./ColorInput";
import HorizontalCenter from "../layout-components/HorizontalCenter";

/**
 * A BubbleMenuComponent for Tiptap editor that provides text formatting options.
 */
function BubbleMenuComponent({ editor }: { editor: Editor }) {
	const theme = useTheme()!;
	const [highlightColor, setHighlightColor] = useState("#ffff00");
	const [textColor, setTextColor] = useState("#ffffff");
	return (
		<BubbleMenu
			editor={editor}
			style={{
				display: "flex",
				position: "absolute",
				zIndex: 1000,
				padding: "0.25rem",
				borderRadius: "0.75rem",
				fontSize: "0.75rem",
				gap: "0.25rem",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
				borderWidth: "2px",
				borderStyle: "solid",
				...theme?.bubbleMenu.base,
			}}
			shouldShow={({ editor, from, to }: { editor: Editor; from: number; to: number }) => {
				return (
					from !== to && // Only show if there is a selection
					editor.isEditable && // Only show if the editor is editable
					!editor.isActive("codeBlock") // Hide if in a code block
				);
			}}
			options={{
				placement: "bottom",
			}}>
			<HorizontalCenter>
				<Button
					title="Bold"
					icon={<FaBold />}
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
					icon={<FaItalic />}
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
					icon={<FaStrikethrough />}
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
					icon={<FaUnderline />}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
				/>
				<Button
					title="Task List"
					icon={<MdCheckBox />}
					onClick={() => editor.chain().focus().toggleTaskList().run()}
				/>
				<Button
					title="Code"
					icon={<FaCode />}
					onClick={() => editor.chain().focus().toggleCode().run()}
				/>
				<Button
					title="Link"
					icon={<FaLink />}
					onClick={() => {
						const url = window.prompt("URL");
						if (url) {
							editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
						}
					}}
				/>
				<Button
					title="Table"
					icon={<FaTable />}
					onClick={() =>
						editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
					}
				/>
			</HorizontalCenter>
			<hr
				style={{
					border: "2px solid #333",
					marginTop: "auto",
					marginBottom: "auto",
					borderRadius: "9999px",
				}}
			/>
			<HorizontalCenter>
				<Button
					title="Highlight"
					icon={<PiHighlighterBold />}
					style={{ color: highlightColor }}
					onClick={() => editor.chain().focus().toggleHighlight({ color: highlightColor }).run()}
				/>
				<ColorInput
					title="Highlight Color"
					value={highlightColor}
					onChange={(e) => setHighlightColor(e.target.value)}
				/>
			</HorizontalCenter>
			<hr
				style={{
					border: "2px solid #333",
					marginTop: "auto",
					marginBottom: "auto",
					borderRadius: "9999px",
				}}
			/>
			<HorizontalCenter>
				<ColorInput
					title="Text Color"
					value={textColor}
					onChange={(e) => {
						editor.chain().focus().setColor(e.target.value).run();
						setTextColor(e.target.value);
					}}
				/>
			</HorizontalCenter>
		</BubbleMenu>
	);
}

export default BubbleMenuComponent;
