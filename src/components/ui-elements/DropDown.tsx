import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FONTS } from "../../constants/fonts";
import "../../styles/components/DropDown.css";
import type { DropDownProps } from "../../types/components";
import Button from "./Button";
import useDropDownAutoClose from "../../hooks/DropDownAutoClose";

function DropDown({ options, activeOption, onClickHandler }: DropDownProps) {
	const anchorRef = useRef<HTMLDivElement>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [coords, setCoords] = useState({ left: 0, top: 0 });
	const [container, setContainer] = useState<Element | null>(null);

	useEffect(() => {
		setContainer(document.getElementById("theme-wrapper"));
	}, []);

	useEffect(() => {
		if (dropdownOpen && anchorRef.current) {
			const rect = anchorRef.current.getBoundingClientRect();
			setCoords({
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
			});
		}
	}, [dropdownOpen, anchorRef]);

	useDropDownAutoClose(dropdownOpen, setDropdownOpen, anchorRef);
	return (
		<menu className="noqta-drop-menu">
			<div ref={anchorRef}>
				<Button
					title={activeOption.text || activeOption}
					className="noqta-drop-menu-header"
					onClick={() => setDropdownOpen(!dropdownOpen)}>
					<span
						className="noqta-drop-menu-active-option"
						style={{
							fontFamily: Object.keys(FONTS).includes(activeOption) ? activeOption : "",
						}}>
						{activeOption.text || activeOption}
					</span>
					<IoIosArrowDown
						style={{
							transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.2s ease-in-out",
						}}
					/>
				</Button>
			</div>
			{dropdownOpen &&
				container &&
				createPortal(
					<div
						style={{
							top: coords.top,
							left: coords.left,
						}}
						className="noqta-drop-menu-content">
						{options.map((option) => (
							<div
								className={`noqta-drop-menu-option ${activeOption === option ? "active" : ""}`}
								role="option"
								key={option}
								onClick={() => {
									onClickHandler(option);
									setDropdownOpen(false);
								}}
								style={{
									fontFamily: FONTS[option] ? option : "",
								}}>
								{FONTS[option] || option}
							</div>
						))}
					</div>,
					container
				)}
		</menu>
	);
}

export default DropDown;
