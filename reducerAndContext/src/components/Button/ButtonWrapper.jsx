import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useContext } from "react";
import { ticTacToeContext, ticTacToeDispatchContext } from "../GameFieldWrapper/TicTacToeWrapper";
import "./ButtonWrapper.css";

export const ButtonWrapper = ({ isGameEnded, id, innerVal }) => {
	const dispatch = useContext(ticTacToeDispatchContext);
	const state = useContext(ticTacToeContext);
	return (
		<Button
			disabled={isGameEnded}
			className='button-wrapper'
			onClick={() => {
				dispatch({
					type: "placeFigure",
					payload: {
						id: id,
						figure: state.nextMove,
					},
				});
			}}
		>
			{innerVal === "X" ? <CloseOutlined /> : innerVal === "O" ? <MinusCircleOutlined /> : ""}
		</Button>
	);
};
