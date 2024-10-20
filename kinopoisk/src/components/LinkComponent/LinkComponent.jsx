import React from "react";
import { Link } from "react-router-dom";
import "./linkComponent.css";

export function LinkComponent({ url }) {
	return (
		<Link
			className='link-style'
			to={url}
		/>
	);
}
