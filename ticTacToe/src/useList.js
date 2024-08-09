import { useState } from "react";

export const useList = () => {
	const [figure, setFigure] = useState("X");
	const [listOfMoves, setListOfMoves] = useState([]);
	const [matrix, setMatrix] = useState(createMatrix());
	const [gameHeader, setGameHeader] = useState("Следующий игрок: X");
	const [isGameEnded, setWinner] = useState(false);

	function createMatrix() {
		const matrix = [];
		let counter = 0;
		for (let row = 0; row < 3; row++) {
			let newRow = [];
			for (let index = 0; index < 3; index++) {
				newRow.push({ id: counter++, innerVal: "" });
			}
			matrix.push(newRow);
		}
		return matrix;
	}

	function checkWinning(matrix, movesList) {
		let placedFigure = figure;
		let figureId = movesList[movesList.length - 1];
		let row = Math.floor(figureId / matrix.length);
		let col = figureId % matrix.length;

		if (matrix[row].every((obj) => obj.innerVal === placedFigure)) {
			setWinner(true);
			return setGameHeader(`Победил игрок ${placedFigure}!`);
		}

		if (matrix.every((row) => row[col].innerVal === placedFigure)) {
			setWinner(true);
			return setGameHeader(`Победил игрок ${placedFigure}!`);
		}

		if (figureId % 2 === 0) {
			let rightDiagonalWin = true;
			let leftDiagonalWin = true;

			for (let i = 0; i < matrix.length; i++) {
				if (matrix[i][i].innerVal !== placedFigure) {
					rightDiagonalWin = false;
				}
				if (matrix[i][matrix.length - 1 - i].innerVal !== placedFigure) {
					leftDiagonalWin = false;
				}
			}

			if (rightDiagonalWin || leftDiagonalWin) {
				setWinner(true);
				return setGameHeader(`Победил игрок ${placedFigure}!`);
			}
		}
	}

	const placeFigure = (id) => {
		let nextFigure = figure === "X" ? "O" : "X";
		let newListOfMoves = listOfMoves;

		let isUpdated = false;

		const newMatrix = matrix.map((row) =>
			row.map((item) => {
				if (item.id === id && item.innerVal === "") {
					isUpdated = true;
					newListOfMoves = [...listOfMoves, id];
					return { ...item, innerVal: figure };
				} else {
					return item;
				}
			})
		);

		if (isUpdated) {
			setListOfMoves(newListOfMoves);
			setFigure(nextFigure);
			setMatrix(newMatrix);
			setGameHeader(`Следующий игрок: ${nextFigure}`);
			if (newListOfMoves.length >= 5) checkWinning(newMatrix, newListOfMoves);
		}
	};

	const undoMove = (moves) => {
		let deletedMove = listOfMoves.slice(-moves);

		setMatrix(
			matrix.map((row) =>
				row.map((item) => {
					if (deletedMove.includes(item.id)) {
						return { ...item, innerVal: "" };
					} else {
						return item;
					}
				})
			)
		);

		function chooseNextFigure() {
			if (moves === 1) return figure === "X" ? "O" : "X";
			if (moves === 2) return figure;
			return "X";
		}

		let nextFigure = chooseNextFigure();
		setFigure(chooseNextFigure);

		setWinner(false);
		setGameHeader(`Следующий игрок: ${nextFigure}`);
		setListOfMoves(listOfMoves.slice(0, -moves));
	};

	return { isGameEnded, placeFigure, undoMove, gameHeader, listOfMoves, matrix };
};
