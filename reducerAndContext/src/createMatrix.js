export function createMatrix() {
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