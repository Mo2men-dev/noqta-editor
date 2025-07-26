import React, { createContext, useContext, type ReactNode } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider: React.FC<{ theme: any; children: ReactNode }> = ({
	children,
	theme,
}) => {
	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

// This is a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
