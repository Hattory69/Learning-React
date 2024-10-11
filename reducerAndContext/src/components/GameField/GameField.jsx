import { Flex } from "antd";
import React, { useContext } from "react";
import { ButtonWrapper } from "../Button/ButtonWrapper";
import { ticTacToeContext } from "../GameFieldWrapper/TicTacToeWrapper";
import "./GameField.css";

export const GameField = () => {
	const state = useContext(ticTacToeContext);
	return (
		<Flex
			className='game-field-wrapper'
			vertical
		>
			{state.matrix.map((arr) => (
				<Flex
					className='game-field-buttonWrapper'
					key={`${arr[0].id}`}
				>
					{arr.map(({ id, innerVal }) => (
						<ButtonWrapper
							key={id}
							id={id}
							innerVal={innerVal}
							isGameEnded={state.isGameEnded}
						/>
					))}
				</Flex>
			))}
		</Flex>
	);
};
