import { useEffect, useState } from "react";

export const useList = () => {
	const [figure, setFigure] = useState("X");
	const [listofMooves, setListOfMooves] = useState([]);
	const [matrix, setMatrix] = useState(
		Array.from({ length: 3 }, (_, indexA) => Array.from({ length: 3 }, (_, indexB) => ({ id: indexA * 3 + indexB, innerVal: "" })))
	);
	const [gameHeader, setGameHeader] = useState("Следующий игрок: X");
	const [winner, setWinner] = useState("");

	function checkWinning(matrix) {
		let placedFigure = figure === "X" ? "O" : "X";
		let figureId = listofMooves[listofMooves.length - 1];
		let row = Math.floor(figureId / matrix.length);
		let col = figureId % matrix.length;

		if (matrix[row].every((obj) => obj.innerVal === placedFigure)) {
			setWinner("figure");
			return setGameHeader(`Победил игрок ${placedFigure}!`);
		}

		if (matrix.every((row) => row[col].innerVal === placedFigure)) {
			setWinner("figure");
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
				setWinner("figure");
				return setGameHeader(`Победил игрок ${placedFigure}!`);
			}
		}
	}

	useEffect(() => {
		setGameHeader(`Следующий игрок: ${figure}`);
		if (listofMooves.length >= 5) checkWinning(matrix);
	}, [matrix]);

	const placeFigure = (id) => {
		setMatrix(
			matrix.map((row) =>
				row.map((item) => {
					if (item.id === id && item.innerVal === "") {
						setFigure(figure === "X" ? "O" : "X");
						setListOfMooves([...listofMooves, id]);
						return { ...item, innerVal: figure };
					} else {
						return item;
					}
				})
			)
		);
	};

	const undoMove = (moves) => {
		let deletedMove = listofMooves.slice(-moves);
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
		setFigure(() => {
			setWinner(null);
			if (moves === 1) return figure === "X" ? "O" : "X";
			if (moves === 2) return figure;
			return "X";
		});
		setListOfMooves(listofMooves.slice(0, -moves));
	};

	return { winner, placeFigure, undoMove, gameHeader, listofMooves, matrix };
};
