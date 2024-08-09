import { Flex } from "antd";
import React from "react";
import { ButtonWrapper } from "../Button/ButtonWrapper";
import "./GameField.css";

export const GameField = ({ isGameEnded, figure, placeFigure, matrix }) => {
	return (
		<Flex
			className='game-field-wrapper'
			vertical
		>
			{matrix.map((arr, index) => (
				<Flex
					className='game-field-buttonWrapper'
					key={`row-${index}-${arr[0].id}`}
				>
					{arr.map((item) => (
						<ButtonWrapper
							isGameEnded={isGameEnded}
							key={item.id}
							innerVal={item.innerVal}
							id={item.id}
							figure={figure}
							placeFigure={placeFigure}
						/>
					))}
				</Flex>
			))}
		</Flex>
	);
};
