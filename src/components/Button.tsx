import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import type { ButtonProps } from "../types/components";

function Button(props: ButtonProps) {
	const [hovered, setHovered] = useState(false);
	const theme = useTheme()!;

	const applyStyles = () => {
		let styles = {
			backgroundColor: theme.background.primary || "transparent",
			color: theme.text.primary || "#000",
			borderColor: theme.border.primary,
		};

		if (hovered) {
			styles.backgroundColor = theme.background.hover || styles.backgroundColor;
			styles.color = theme.text.hover || styles.color;
			styles.borderColor = theme.border.hover || styles.borderColor;
		}
		if (props.active) {
			styles.backgroundColor = theme.background.active || styles.backgroundColor;
			styles.color = theme.text.secondary || styles.color;
			styles.borderColor = theme.border.active || styles.borderColor;
		}

		return styles;
	};

	return (
		<button
			onClick={props.onClick}
			onMouseDown={(e) => e.preventDefault()} // Prevent focus change on button click
			style={{
				display: "flex",
				alignItems: "center",
				cursor: props.disabled ? "default" : "pointer",
				padding: "0.5rem",
				borderRadius: "0.5rem",
				transition: "all 0.2s ease",
				borderWidth: "1px",
				borderStyle: "solid",
				opacity: props.disabled ? 0.5 : 1,
				...applyStyles(),
				...props.style,
			}}
			disabled={props.disabled}
			title={props.title}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			{props.icon}
		</button>
	);
}

export default Button;
