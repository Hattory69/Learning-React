import { Button, Flex } from "antd";
import React from "react";
import "./ControlBtns.css";

export const ControlBtns = ({ listofMooves, undoMove }) => {
	const firstBtnsClasses = `control-btn ` + (listofMooves.length > 0 ? "active" : "");
	const secondBtnClass = `control-btn ` + (listofMooves.length > 1 ? "active" : "");

	const handeBtnClick = (moves) => {
		undoMove(moves);
	};
	return (
		<Flex
			className='control-wrapper'
			vertical
		>
			<Button
				className={firstBtnsClasses}
				onClick={() => handeBtnClick(listofMooves.length)}
			>
				Вернуться в начло игры
			</Button>
			<Button
				className={firstBtnsClasses}
				onClick={() => handeBtnClick(1)}
			>
				Вернуться на ход назад
			</Button>
			<Button
				className={secondBtnClass}
				onClick={() => handeBtnClick(2)}
			>
				Вернуться на два хода назад
			</Button>
		</Flex>
	);
};
