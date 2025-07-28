import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useTheme } from "../context/ThemeContext";
import { generateTableStyles } from "../utils/styling";
import Button from "./Button";
import styleTokens from "../constants/styles";

import {
	RiInsertColumnRight,
	RiInsertRowBottom,
	RiLayoutColumnFill,
	RiLayoutRowFill,
} from "react-icons/ri";
import { LuTableCellsSplit } from "react-icons/lu";
import { useMemo } from "react";
import { FaSquareH, FaTrash } from "react-icons/fa6";
import { TbTableColumn, TbTableRow } from "react-icons/tb";

import type { CustomTableComponentProps } from "../types/components";
import HorizontalCenter from "../layout-components/HorizontalCenter";

/**
 * CustomTableComponent is a React component that renders a table with various controls
 * for manipulating the table structure, such as adding or deleting rows and columns,
 * merging cells, and toggling header rows and columns.
 */
function CustomTableComponent(props: CustomTableComponentProps) {
	const theme = useTheme()!;

	const controls = useMemo(() => {
		return {
			addRowAfter: {
				label: "Add Row",
				icon: <RiInsertRowBottom />,
				action: () => props.editor.chain().focus().addRowAfter().run(),
			},
			addColumnAfter: {
				label: "Add Column",
				icon: <RiInsertColumnRight />,
				action: () => props.editor.chain().focus().addColumnAfter().run(),
			},
			mergeOrSplit: {
				label: "Merge Cells",
				icon: <LuTableCellsSplit />,
				action: () => props.editor.chain().focus().mergeOrSplit().run(),
			},
			toggleHeaderRow: {
				label: "Toggle Header Row",
				icon: <RiLayoutRowFill />,
				action: () => props.editor.chain().focus().toggleHeaderRow().run(),
			},
			toggleHeaderColumn: {
				label: "Toggle Header Column",
				icon: <RiLayoutColumnFill />,
				action: () => props.editor.chain().focus().toggleHeaderColumn().run(),
			},
			toggleHeaderCell: {
				label: "Toggle Header Cell",
				icon: <FaSquareH />,
				action: () => props.editor.chain().focus().toggleHeaderCell().run(),
			},
			deleteRow: {
				label: "Delete Row",
				icon: <TbTableRow />,
				action: () => props.editor.chain().focus().deleteRow().run(),
			},
			deleteColumn: {
				label: "Delete Column",
				icon: <TbTableColumn />,
				action: () => props.editor.chain().focus().deleteColumn().run(),
			},
			deleteTable: {
				label: "Delete Table",
				icon: <FaTrash />,
				action: () => props.editor.chain().focus().deleteTable().run(),
			},
		};
	}, []);

	return (
		<NodeViewWrapper
			style={{
				marginTop: "0.5rem",
				marginBottom: "0.5rem",
				overflow: "scroll",
				scrollbarWidth: "none",
			}}>
			<style>{generateTableStyles(props.extension, theme, styleTokens)}</style>

			{/* @ts-ignore  */}
			<NodeViewContent as="table" style={{ maxWidth: "100%" }}>
				{
					<colgroup>
						{props.node.children.map((_, index) => (
							<col key={index} style={{ minWidth: props.extension.options.cellMinWidth }} />
						))}
					</colgroup>
				}
			</NodeViewContent>
			<HorizontalCenter>
				{Object.values(controls).map((control) => (
					<Button
						key={control.label}
						title={control.label}
						icon={control.icon}
						onClick={control.action}
						style={{
							margin: "0.25rem 0",
						}}
					/>
				))}
			</HorizontalCenter>
		</NodeViewWrapper>
	);
}

export default CustomTableComponent;
