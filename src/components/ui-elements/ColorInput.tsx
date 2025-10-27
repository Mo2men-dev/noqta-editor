import type { ColorInputProps } from "../../types/components";
import "../../styles/components/ColorInput.css";
import Button from "./Button";

/**
 * ColorInput component for selecting colors in a color picker format.
 */
function ColorInput(props: ColorInputProps) {
	return (
		<Button title="Select Color" onClick={() => {}} style={{ color: props.color || "inherit" }}>
			<input
				className="noqta-color-input"
				title={props.title}
				type="color"
				value={props.value}
				onChange={(e) => props.onChange?.(e)}
			/>
			{props.icon}
		</Button>
	);
}

export default ColorInput;
