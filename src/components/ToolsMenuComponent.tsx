import Button from "./ui-elements/Button";
import FontStylingTools from "./editor-tools/FontStylingTools";
import FontFormatingTools from "./editor-tools/FontFormatingTools";
import ContentFormatingTools from "./editor-tools/ContentFormatingTools";

import { useState } from "react";
import useForceRerender from "../hooks/ForceRerender";

import { PiPlus } from "react-icons/pi";
import { BiImageAdd } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";

import type { NoqtaEditorInstance } from "../types/components";

import "../styles/components/ToolsMenuComponent.css";

/**
 * ToolsMenuComponent renders the tools menu for the NoqtaEditor.
 * It includes font styling, content formatting tools, and user-added tools.
 */
function ToolsMenuComponent({ editor }: { editor: NoqtaEditorInstance }) {
	const [showUserTools, setShowUserTools] = useState(false);

	// Force rerender on editor updates to reflect changes in button states
	useForceRerender(editor);

	return (
		<div id="tools-menu">
			{!showUserTools ? (
				<div className="tools-wrapper">
					{editor.userAddedTools && editor.userAddedTools.length > 0 ? (
						<Button title="Extra Tools" onClick={() => setShowUserTools(true)}>
							<PiPlus />
						</Button>
					) : (
						<span></span>
					)}
					<div className="tools">
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
								editor.isActive("codeBlock") ||
								editor.isActive("customTable") ||
								editor.isActive("image")
							}>
							<BiImageAdd />
						</Button>
					</div>
					{/* TODO: Add editor settings */}
					<span></span>
				</div>
			) : (
				<div className="tools-wrapper">
					<Button title="Back" onClick={() => setShowUserTools(false)}>
						<IoArrowBack />
					</Button>
					<div className="tools">
						{editor.userAddedTools?.map(([title, icon, action]) => (
							<Button key={title} title={title} onClick={action}>
								{icon}
							</Button>
						))}
					</div>
					{/* TODO: Add editor settings */}
					<span></span>
				</div>
			)}
		</div>
	);
}

export default ToolsMenuComponent;
