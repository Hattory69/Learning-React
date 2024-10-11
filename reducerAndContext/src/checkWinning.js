export function checkWinning(matrix, movesList, figure) {
	let figureId = movesList[movesList.length - 1];
	let row = Math.floor(figureId / matrix.length);
	let col = figureId % matrix.length;

	if (matrix[row].every((obj) => obj.innerVal === figure)) {
		return true;
	}

	if (matrix.every((row) => row[col].innerVal === figure)) {
		return true;
	}

	if (figureId % 2 === 0) {
		let rightDiagonalWin = true;
		let leftDiagonalWin = true;

		for (let i = 0; i < matrix.length; i++) {
			if (matrix[i][i].innerVal !== figure) {
				rightDiagonalWin = false;
			}
			if (matrix[i][matrix.length - 1 - i].innerVal !== figure) {
				leftDiagonalWin = false;
			}
		}

		if (rightDiagonalWin || leftDiagonalWin) {
			return true;
		}
	}
	return false;
}
