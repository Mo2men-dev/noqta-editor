import type { ColorInputProps } from "../types/components";

/**
 * ColorInput component for selecting colors in a color picker format.
 */
function ColorInput(props: ColorInputProps) {
	return (
		<input
			title={props.title}
			type="color"
			style={{
				border: "none",
				outlineWidth: "2px",
				outlineColor: "transparent",
				outlineOffset: "2px",
				background: "transparent",
				borderRadius: "9999px",
				width: "100%",
				cursor: "pointer",
				aspectRatio: "1 / 1",
			}}
			value={props.value}
			onChange={(e) => props.onChange?.(e)}
		/>
	);
}

export default ColorInput;
