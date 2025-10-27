import type { ButtonProps } from "../../types/components";
import "../../styles/components/Button.css";

function Button(props: ButtonProps) {
	return (
		<button
			className={`noqta-button ${props.active ? "active" : ""} ${props.className || ""}`}
			onClick={props.onClick}
			onMouseDown={(e) => e.preventDefault()} // Prevent focus change on button click
			style={{
				...props.style,
			}}
			disabled={props.disabled}
			title={props.title}>
			{props.children}
		</button>
	);
}

export default Button;
