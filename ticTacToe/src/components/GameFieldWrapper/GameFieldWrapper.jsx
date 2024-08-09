import { Flex } from "antd";
import React from "react";
import { useList } from "../../useList";
import { ControlBtns } from "../ControlBtns/ControlBtns";
import { GameField } from "../GameField/GameField";
import "./GameFieldWrapper.css";

export const GameFieldWrapper = () => {
	const { isGameEnded, placeFigure, listOfMoves, matrix, undoMove, gameHeader } = useList();
	return (
		<Flex
			vertical
			className='ticTacToe-field'
		>
			<h2>{gameHeader}</h2>
			<Flex className='ticTacToe-field__content'>
				<GameField
					isGameEnded={isGameEnded}
					placeFigure={placeFigure}
					matrix={matrix}
				/>
				<ControlBtns
					undoMove={undoMove}
					listOfMoves={listOfMoves}
				/>
			</Flex>
		</Flex>
	);
};
