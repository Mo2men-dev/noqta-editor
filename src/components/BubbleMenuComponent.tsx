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
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import HorizontalCenter from "../layout-components/HorizontalCenter";
import "../styles/components/BubbleMenuComponent.css";

/**
 * A BubbleMenuComponent for Tiptap editor that provides text formatting options.
 */
function BubbleMenuComponent({ editor }: { editor: Editor }) {
	const [, setTick] = useState(0); // to force rerender on selection change
	const [highlightColor, setHighlightColor] = useState("#ffff00");
	const [textColor, setTextColor] = useState("#ffffff");

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
			<HorizontalCenter>
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
				<Button
					title="Task List"
					active={editor.isActive("taskList")}
					children={<MdCheckBox />}
					onClick={() => editor.chain().focus().toggleTaskList().run()}
				/>
				<Button
					title="Code"
					active={editor.isActive("code")}
					children={<FaCode />}
					onClick={() => editor.chain().focus().toggleCode().run()}
				/>
				<Button
					title="Link"
					children={<FaLink />}
					active={editor.isActive("link")}
					onClick={() => {
						const url = window.prompt("URL");
						if (url) {
							editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
						}
					}}
				/>
				<Button
					title="Table"
					children={<FaTable />}
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
					children={<PiHighlighterBold />}
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
