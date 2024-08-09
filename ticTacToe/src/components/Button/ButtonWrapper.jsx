import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./ButtonWrapper.css";

export const ButtonWrapper = ({ isGameEnded, id, placeFigure, innerVal }) => {
	const handelClick = () => {
		placeFigure(id);
	};
	return (
		<Button
			disabled={isGameEnded}
			className='button-wrapper'
			onClick={handelClick}
		>
			{innerVal === "X" ? <CloseOutlined /> : innerVal === "O" ? <MinusCircleOutlined /> : ""}
		</Button>
	);
};
