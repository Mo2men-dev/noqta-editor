/**
 * ColorInput component for selecting colors in a color picker format.
 */
function ColorInput({
	title,
	value,
	onChange,
}: {
	title?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<input
			title={title}
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
			value={value}
			onChange={(e) => onChange?.(e)}
		/>
	);
}

export default ColorInput;
