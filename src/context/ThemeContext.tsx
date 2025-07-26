import React, { createContext, useContext, type ReactNode } from "react";
import type { Theme } from "../types/themes";

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<{ theme: Theme; children: ReactNode }> = ({
	children,
	theme,
}) => {
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

// This is a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
