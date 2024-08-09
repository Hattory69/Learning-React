import { Button, Flex } from "antd";
import React from "react";
import "./ControlBtns.css";

export const ControlBtns = ({ listOfMoves, undoMove }) => {
	const getBtnClasses = (threshold) => `control-btn ${listOfMoves.length > threshold ? "active" : ""}`;

	const handelBtnClick = (moves) => {
		undoMove(moves);
	};

	const controlBtnsList = [
		{ key: 1, classes: getBtnClasses(0), innerVal: "Вернуться в начало игры", moves: listOfMoves.length },
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
					onClick={() => handelBtnClick(moves)}
				>
					{innerVal}
				</Button>
			))}
		</Flex>
	);
};
