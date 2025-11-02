import { Editor } from "@tiptap/core";
import "../styles/components/ToolsMenuComponent.css";
import FontFormatingTools from "./editor-tools/FontFormatingTools";
import ContentFormatingTools from "./editor-tools/ContentFormatingTools";
import FontStylingTools from "./editor-tools/FontStylingTools";
import Button from "./ui-elements/Button";
import { BiImageAdd } from "react-icons/bi";
import useForceRerender from "../hooks/ForceRerender";

function ToolsMenuComponent({ editor }: { editor: Editor }) {
	// Force rerender on editor updates to reflect changes in button states
	useForceRerender(editor);

	return (
		<div id="tools-menu">
			<FontFormatingTools editor={editor} />
			<span id="separator"></span>
			<ContentFormatingTools editor={editor} />
			<span id="separator"></span>
			<FontStylingTools editor={editor} />
			<span id="separator"></span>
			<Button
				title="Add Image"
				onClick={() => {
					const url = window.prompt("Image URL");
					if (url) {
						editor
							.chain()
							.focus()
							.setImage({
								src: url,
								alt: "Image",
								title: "Image",
							})
							.run();
					}
				}}
				disabled={
					editor.isActive("codeBlock") || editor.isActive("customTable") || editor.isActive("image")
				}>
				<BiImageAdd />
			</Button>
		</div>
	);
}

export default ToolsMenuComponent;
