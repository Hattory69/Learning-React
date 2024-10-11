import { Button, Flex } from "antd";
import React, { useContext } from "react";
import { ticTacToeContext, ticTacToeDispatchContext } from "../GameFieldWrapper/TicTacToeWrapper";
import "./ControlBtns.css";

export const ControlBtns = () => {
	const state = useContext(ticTacToeContext);
	const dispatch = useContext(ticTacToeDispatchContext);

	const getBtnClasses = (threshold) => `control-btn ${state.listOfMoves.length > threshold ? "active" : ""}`;

	const controlBtnsList = [
		{ key: 1, classes: getBtnClasses(0), innerVal: "Вернуться в начало игры", moves: state.listOfMoves.length },
		{ key: 2, classes: getBtnClasses(0), innerVal: "Вернуться на ход назад", moves: 1 },
		{ key: 3, classes: getBtnClasses(1), innerVal: "Вернуться на два хода назад", moves: 2 },
	];

	return (
		<Flex
			className='control-wrapper'
			vertical
		>
			{controlBtnsList.map(({ key, classes, innerVal, moves }) => (
				<Button
					key={key}
					className={classes}
					onClick={() =>
						dispatch({
							type: "undoMove",
							payload: {
								moves: moves,
							},
						})
					}
				>
					{innerVal}
				</Button>
			))}
		</Flex>
	);
};
