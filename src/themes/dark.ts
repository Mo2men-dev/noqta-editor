import styleTokens from "../constants/styles";
import { type Theme } from "../types/themes";

export const darkTheme: Theme = {
	editor: {
		base: {
			height: "100%",
			backgroundColor: styleTokens.dark.colors.background,
			padding: "1.25rem",
			borderRadius: "0.5rem",
			outline: "none",
			color: styleTokens.dark.colors.text,
		},
	},
	bubbleMenu: {
		base: {
			display: "flex",
			position: "absolute",
			zIndex: 1000,
			backgroundColor: styleTokens.dark.colors.background,
			padding: "0.25rem",
			borderRadius: "0.75rem",
			fontSize: "0.75rem",
			gap: "0.25rem",
			boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
			color: styleTokens.dark.colors.text,
			border: `2px solid ${styleTokens.dark.colors.border}`,
		},
	},
	buttons: {
		base: {
			backgroundColor: styleTokens.dark.buttons.background,
			padding: "0.5rem",
			borderRadius: "0.5rem",
			color: styleTokens.dark.buttons.text,
			transition: "all 0.2s ease",
			border: `1px solid ${styleTokens.dark.buttons.border}`,
		},
		hover: {
			backgroundColor: styleTokens.dark.buttons.hover,
		},
	},
};
