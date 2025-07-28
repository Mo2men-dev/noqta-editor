type ThemeSection = {
	[K in keyof React.CSSProperties]?: React.CSSProperties[K];
};

interface ThemeComponent {
	base: ThemeSection;
	hover?: ThemeSection;
	active?: ThemeSection;
	focus?: ThemeSection;
	disabled?: ThemeSection;
}

type TablesThemeComponent = {
	td: ThemeSection;
	th: ThemeSection;
	tr?: ThemeSection;
	thead?: ThemeSection;
	tbody?: ThemeSection;
	tfoot?: ThemeSection;
	table?: ThemeSection;
};

export interface Theme {
	editor: ThemeComponent;
	bubbleMenu: ThemeComponent;
	buttons: ThemeComponent;
	table: TablesThemeComponent;
}

export interface StyleTokens {
	[key: string]: {
		colors: {
			[key: string]: string;
		};
		buttons: {
			[key: string]: string;
		};
		table: {
			[key: string]: string;
		};
	};
}
