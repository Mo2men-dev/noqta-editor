import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import { useState } from "react";
import { FONTS } from "../constants/fonts";
import "../styles/components/DropDown.css";
import type { DropDownProps } from "../types/components";

function DropDown({ title = "Dropdown", options, activeOption, onClickHandler }: DropDownProps) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	return (
		<menu className="noqta-drop-menu">
			<Button title={title} style={{ gap: "1rem" }} onClick={() => setDropdownOpen(!dropdownOpen)}>
				<span
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
			{dropdownOpen && (
				<div className="noqta-drop-menu-content">
					{options.map((option) => (
						<div
							className={`noqta-drop-menu-option ${activeOption === option ? "active" : ""}`}
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
				</div>
			)}
		</menu>
	);
}

export default DropDown;
