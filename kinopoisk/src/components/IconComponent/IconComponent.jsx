import React from "react";

export function IconComponent({ icon, iconStyle, viewBox }) {
	return (
		<svg
			className={iconStyle}
			viewBox={viewBox || "0 0 100 100"}
		>
			<use xlinkHref={`${icon.url}`} />
		</svg>
	);
}
