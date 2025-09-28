function HorizontalCenter({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={className}
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
