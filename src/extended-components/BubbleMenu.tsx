/**
 * BubbleMenu component for Tiptap editor
 * credit: https://github.com/ueberdosis/tiptap/blob/develop/packages/react/src/menus/BubbleMenu.tsx
 */

import { BubbleMenuPlugin, type BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu";
import { useCurrentEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BubbleMenuProps = Omit<
	Optional<BubbleMenuPluginProps, "pluginKey">,
	"element" | "editor"
> & {
	editor: BubbleMenuPluginProps["editor"] | null;
	className?: string;
	children: React.ReactNode;
	updateDelay?: number;
	style?: React.CSSProperties;
};

export const BubbleMenu = (props: BubbleMenuProps) => {
	const [element, setElement] = useState<HTMLDivElement | null>(null);
	const { editor: currentEditor } = useCurrentEditor();

	useEffect(() => {
		if (!element) {
			return;
		}

		if (props.editor?.isDestroyed || currentEditor?.isDestroyed) {
			return;
		}

		const {
			pluginKey = "bubbleMenu",
			editor,
			options = {},
			updateDelay,
			shouldShow = null,
		} = props;

		const menuEditor = editor || currentEditor;

		if (!menuEditor) {
			console.warn(
				"BubbleMenu component is not rendered inside of an editor component or does not have editor prop."
			);
			return;
		}

		const plugin = BubbleMenuPlugin({
			updateDelay,
			editor: menuEditor,
			element,
			pluginKey,
			shouldShow,
			options,
		});

		menuEditor.registerPlugin(plugin);
		return () => {
			menuEditor.unregisterPlugin(pluginKey);
		};
	}, [props.editor, currentEditor, element]);

	return (
		<div
			ref={setElement}
			className={props.className}
			style={{ visibility: "hidden", ...props.style }}>
			{props.children}
		</div>
	);
};

export default BubbleMenu;
