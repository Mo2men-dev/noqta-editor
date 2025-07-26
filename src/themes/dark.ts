import styleTokens from "../constants/styles";
import { type Theme } from "../types/themes";

export const darkTheme: Theme = {
	editor: {
		base: {
			backgroundColor: styleTokens.dark.colors.background,
			color: styleTokens.dark.colors.text,
		},
	},
	bubbleMenu: {
		base: {
			backgroundColor: styleTokens.dark.colors.background,
			color: styleTokens.dark.colors.text,
			borderColor: styleTokens.dark.colors.border,
		},
	},
	buttons: {
		base: {
			backgroundColor: styleTokens.dark.buttons.background,
			color: styleTokens.dark.buttons.text,
			borderColor: styleTokens.dark.buttons.border,
		},
		hover: {
			backgroundColor: styleTokens.dark.buttons.hover,
		},
	},
};
