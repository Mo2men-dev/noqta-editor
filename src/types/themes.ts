type ThemeSection = {
	primary: string;
	secondary?: string;
	hover?: string;
	active?: string;
	focus?: string;
	disabled?: string;
};

export interface Theme {
	background: ThemeSection;
	text: ThemeSection;
	border: ThemeSection;
	shadow?: string;
}
