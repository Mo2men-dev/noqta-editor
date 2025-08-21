import type { Theme } from "../types/themes";

export const darkTheme: Theme = {
	background: {
		primary: "#222",
		hover: "#1a1a1a",
		active: "#333",
		focus: "#333",
		disabled: "#444",
	},
	text: {
		primary: "#fff",
		secondary: "#7a52ff",
	},
	border: {
		primary: "#333",
		hover: "#444",
		active: "#555",
	},
	shadow: "#000",
};

export const lightTheme: Theme = {
	background: {
		primary: "#eee",
		hover: "#ddd",
		active: "#ccc",
	},
	text: {
		primary: "#000",
		secondary: "#304fcb",
	},
	border: {
		primary: "#304fcb",
		hover: "#9eb1ff",
		active: "#fff",
	},
	shadow: "#304fcb92",
};
