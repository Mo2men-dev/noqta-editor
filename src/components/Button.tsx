import React from "react";
import { useTheme } from "../context/ThemeContext";

function Button({
	title,
	icon,
	onClick,
	style = {},
}: {
	title: string;
	icon: string | React.ReactNode;
	onClick: () => void;
	style?: React.CSSProperties;
}) {
	const [hovered, setHovered] = React.useState(false);
	const theme = useTheme()!;
	return (
		<button
			onClick={onClick}
			onMouseDown={(e) => e.preventDefault()} // Prevent focus change on button click
			style={{
				display: "flex",
				alignItems: "center",
				cursor: "pointer",
				padding: "0.5rem",
				borderRadius: "0.5rem",
				transition: "all 0.2s ease",
				borderWidth: "1px",
				borderStyle: "solid",
				...theme.buttons.base,
				...style,
				...(hovered ? theme.buttons.hover : {}),
			}}
			title={title}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			{icon}
		</button>
	);
}

export default Button;
