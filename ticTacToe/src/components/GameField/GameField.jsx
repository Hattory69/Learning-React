import { Flex } from "antd";
import React from "react";
import { ButtonWrapper } from "../Button/ButtonWrapper";
import "./GameField.css";

export const GameField = ({ winner, figure, placeFigure, matrix }) => {
	return (
		<Flex
			className='game-field-wrapper'
			vertical
		>
			{matrix.map((arr, index) => (
				<Flex
					className='game-field-buttonWrapper'
					key={index}
				>
					{arr.map((item) => (
						<ButtonWrapper
							winner={winner}
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
