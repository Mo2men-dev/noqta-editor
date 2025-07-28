import { Table } from "@tiptap/extension-table";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CustomTableComponent from "../components/CustomTableComponent";

const CustomTable = Table.configure({
	resizable: true,
	handleWidth: 5,
	cellMinWidth: 100,
	lastColumnResizable: true,
	allowTableNodeSelection: false,
	HTMLAttributes: {},
});

const CustomTableWithNodeView = CustomTable.extend({
	name: "customTable",
	addNodeView() {
		return ReactNodeViewRenderer(CustomTableComponent, { contentDOMElementTag: "tbody" });
	},
});

export default CustomTableWithNodeView;
