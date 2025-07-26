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

export interface Theme {
	editor: ThemeComponent;
	bubbleMenu: ThemeComponent;
	buttons: ThemeComponent;
}

export interface StyleTokens {
	[key: string]: {
		colors: {
			[key: string]: string;
		};
		buttons: {
			[key: string]: string;
		};
	};
}
