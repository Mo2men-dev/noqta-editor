function HorizontalCenter({ children }: { children?: React.ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				gap: "0.25rem",
				justifyContent: "center",
				alignItems: "center",
			}}>
			{children}
		</div>
	);
}

export default HorizontalCenter;
