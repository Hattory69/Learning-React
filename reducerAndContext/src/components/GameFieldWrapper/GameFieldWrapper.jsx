import { Flex } from "antd";
import React, { useContext } from "react";
import { ControlBtns } from "../ControlBtns/ControlBtns";
import { GameField } from "../GameField/GameField";
import "./GameFieldWrapper.css";
import { ticTacToeContext } from "./TicTacToeWrapper";

export const GameFieldWrapper = () => {
	const state = useContext(ticTacToeContext);
	return (
		<Flex
			vertical
			className='ticTacToe-field'
		>
			<h2 className="ticTacToe-title">
				{state.title} {state.nextMove}
			</h2>
			<Flex className='ticTacToe-field__content'>
				<GameField />
				<ControlBtns />
			</Flex>
		</Flex>
	);
};
