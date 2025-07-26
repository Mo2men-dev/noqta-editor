import React from "react";
import { useTheme } from "../context/ThemeContext";
import type { ButtonProps } from "../types/components";

function Button(props: ButtonProps) {
	const [hovered, setHovered] = React.useState(false);
	const theme = useTheme()!;
	return (
		<button
			onClick={props.onClick}
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
				...theme?.buttons.base,
				...props.style,
				...(hovered ? theme?.buttons.hover : {}),
			}}
			title={props.title}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			{props.icon}
		</button>
	);
}

export default Button;
