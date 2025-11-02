import { useEffect } from "react";

// A hook that closes drop down menus on outside click or ESC key press
function useDropDownAutoClose(
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	anchorRef: React.RefObject<HTMLDivElement | null>
) {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (e: MouseEvent) =>
			anchorRef.current && !anchorRef.current.contains(e.target as Node) && setIsOpen(false);

		const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);

		document.addEventListener("click", handleClick);
		document.addEventListener("keydown", handleEsc);

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen]);
}

export default useDropDownAutoClose;
