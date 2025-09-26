import type { ColorInputProps } from "../../types/components";
import "../../styles/components/ColorInput.css";

/**
 * ColorInput component for selecting colors in a color picker format.
 */
function ColorInput(props: ColorInputProps) {
	return (
		<input
			className="noqta-color-input"
			title={props.title}
			type="color"
			value={props.value}
			onChange={(e) => props.onChange?.(e)}
		/>
	);
}

export default ColorInput;
