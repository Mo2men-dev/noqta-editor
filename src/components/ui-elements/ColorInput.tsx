import type { ColorInputProps } from "../../types/components";
import "../../styles/components/ColorInput.css";
import Button from "./Button";
import { useRef, useState } from "react";
import { TbCancel } from "react-icons/tb";
import useDropDownAutoClose from "../../hooks/DropDownAutoClose";

/**
 * ColorInput component for selecting colors in a color picker format.
 */
function ColorInput(props: ColorInputProps) {
	const buttonRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [color, setColor] = useState(props.options[0]);

	useDropDownAutoClose(isOpen, setIsOpen, buttonRef);

	return (
		<div ref={buttonRef} className="noqta-color-input">
			<Button
				title="Select Color"
				onClick={() => setIsOpen(!isOpen)}
				style={{ color: color.color || "inherit" }}>
				{props.icon}
			</Button>
			{isOpen && (
				<div className="noqta-color-input-dropdown noqta-bubble-menu">
					{props.options.map((option) => (
						<Button
							key={option.color}
							onClick={() => {
								setIsOpen(false);
								setColor(option);
								props.handleClick(option.color);
							}}
							title={option.title}
							style={{
								backgroundColor: option.color,
								borderRadius: "100%",
								width: "1.2rem",
								height: "1.2rem",
								border: `1px ${option.border} solid`,
							}}></Button>
					))}
					{props.handleRemove && (
						<>
							<span id="separator"></span>
							<Button title="Reset" onClick={props.handleRemove}>
								<TbCancel />
							</Button>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default ColorInput;
