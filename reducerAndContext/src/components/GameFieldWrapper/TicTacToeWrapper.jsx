import React, { createContext, useReducer } from "react";
import { createMatrix } from "../../createMatrix";
import { ticTacToeReducer } from "../../Reducers/ticTacToeReducer";
import { GameFieldWrapper } from "./GameFieldWrapper";

export const ticTacToeContext = createContext(null);
export const ticTacToeDispatchContext = createContext(null);

export function TicTacToeWrapper() {
	const restoredTicTacToe = JSON.parse(localStorage.getItem("ticTacToe"));

	const [state, dispatch] = useReducer(ticTacToeReducer, {
		title: restoredTicTacToe?.title || "Следующий игрок",
		matrix: restoredTicTacToe?.matrix || createMatrix(),
		isGameEnded: restoredTicTacToe?.isGameEnded || false,
		nextMove: restoredTicTacToe?.nextMove || "X",
		listOfMoves: restoredTicTacToe?.listOfMoves || [],
	});

	return (
		<ticTacToeContext.Provider value={state}>
			<ticTacToeDispatchContext.Provider value={dispatch}>
				<GameFieldWrapper />
			</ticTacToeDispatchContext.Provider>
		</ticTacToeContext.Provider>
	);
}
