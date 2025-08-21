import { createContext, useContext, type ReactNode } from "react";
import type { Theme } from "../types/themes";
import { getCssVariablesFromTheme } from "../utils/styling";

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<{ theme: Theme; children: ReactNode }> = ({
	children,
	theme,
}: {
	children: ReactNode;
	theme: Theme;
}) => {
	const cssVariables = getCssVariablesFromTheme(theme);
	return (
		<ThemeContext.Provider value={theme}>
			<div style={{ ...cssVariables, height: "100%" }}>{children}</div>
		</ThemeContext.Provider>
	);
};

// This is a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
