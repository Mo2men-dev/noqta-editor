import { Editor } from "@tiptap/core";
import { FaCode, FaLink, FaTable } from "react-icons/fa6";
import { MdCheckBox } from "react-icons/md";
import HorizontalCenter from "../../layout-components/HorizontalCenter";
import Button from "../ui-elements/Button";

/**
 * Content formatting tools for the editor.
 */
function ContentFormatingTools({ editor }: { editor: Editor }) {
	return (
		<HorizontalCenter className="content-formatting-tools">
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
	);
}

export default ContentFormatingTools;
