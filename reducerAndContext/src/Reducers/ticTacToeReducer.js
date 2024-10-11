import { checkWinning } from "../checkWinning";

export function ticTacToeReducer(state, action) {
	let newState;
	switch (action.type) {
		case "placeFigure": {
			let isUpdated = false;

			newState = {
				...state,
				matrix: state.matrix.map((row) =>
					row.map((item) => {
						if (item.id === action.payload.id && item.innerVal === "") {
							isUpdated = true;
							return { ...item, innerVal: action.payload.figure };
						} else {
							return item;
						}
					})
				),
			};

			if (isUpdated) {
				newState.listOfMoves = [...state.listOfMoves, action.payload.id];

				if (newState.listOfMoves.length >= 5) {
					newState.isGameEnded = checkWinning(newState.matrix, newState.listOfMoves, action.payload.figure);
				}

				if (newState.isGameEnded) {
					newState.title = "Победил игрок";
					newState.nextMove = action.payload.figure;
				} else {
					state.nextMove = action.payload.figure === "X" ? "O" : "X";
				}
			}
			break;
		}
		case "undoMove": {
			let deletedMove = [...state.listOfMoves].slice(-action.payload.moves);

			newState = {
				...state,
				isGameEnded: false,
				matrix: state.matrix.map((row) => row.map((item) => (deletedMove.includes(item.id) ? { ...item, innerVal: "" } : item))),
			};

			function chooseNextFigure() {
				if (action.payload.moves > 2) return "X";
				if (action.payload.moves === 1 && !state.isGameEnded) return state.nextMove === "X" ? "O" : "X";
				return newState.nextMove;
			}
			newState.listOfMoves = state.listOfMoves.slice(0, -action.payload.moves);

			newState.nextMove = chooseNextFigure();
			newState.title = "Следующий игрок";
			break;
		}
		default:
			newState = state;
			break;
	}

	localStorage.setItem("ticTacToe", JSON.stringify(newState));
	return newState;
}

