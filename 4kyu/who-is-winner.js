/**
 * Solution for Connect Four kata
 * @see https://www.codewars.com/kata/56882731514ec3ec3d000009/javascript
 */
function whoIsWinner(piecesPositionList) {
  //return "Red", "Yellow" or "Draw"
  const charColumns = ["A", "B", "C", "D", "E", "F", "G"];

  const findWinner = (matrix) => {
    let winner = undefined;

    for ([rowIndex, row] of matrix.entries()) {
      for ([colIndex, color] of row.entries()) {
        let isHorizontalWinner,
          isVerticalWinner,
          isRightDiagonalWinner,
          isLeftDiagonalWinner = false;
        const isOfSameColor = (currentSlotColor) =>
          color && currentSlotColor === color;

        // Check for horizontal wins
        if (colIndex <= 3) {
          const horizontalFigure = [
            matrix[rowIndex][colIndex],
            matrix[rowIndex][colIndex + 1],
            matrix[rowIndex][colIndex + 2],
            matrix[rowIndex][colIndex + 3],
          ];
          isHorizontalWinner = horizontalFigure.every(isOfSameColor);
        }

        // Check for diagonal wins
        if (rowIndex <= 2) {
          if (colIndex >= 3) {
            const rightDiagonalFigure = [
              matrix[rowIndex][colIndex],
              matrix[rowIndex + 1][colIndex - 1],
              matrix[rowIndex + 2][colIndex - 2],
              matrix[rowIndex + 3][colIndex - 3],
            ];

            isRightDiagonalWinner = rightDiagonalFigure.every(isOfSameColor);
          }
          if (colIndex <= 3) {
            const leftDiagonalFigure = [
              matrix[rowIndex][colIndex],
              matrix[rowIndex + 1][colIndex + 1],
              matrix[rowIndex + 2][colIndex + 2],
              matrix[rowIndex + 3][colIndex + 3],
            ];

            isLeftDiagonalWinner = leftDiagonalFigure.every(isOfSameColor);
          }
        }

        // Check for vertical wins
        if (rowIndex <= 2) {
          const verticalFigure = [
            matrix[rowIndex][colIndex],
            matrix[rowIndex + 1][colIndex],
            matrix[rowIndex + 2][colIndex],
            matrix[rowIndex + 3][colIndex],
          ];
          isVerticalWinner = verticalFigure.every(isOfSameColor);
        }

        const isWinner =
          isHorizontalWinner ||
          isVerticalWinner ||
          isRightDiagonalWinner ||
          isLeftDiagonalWinner;

        if (isWinner) {
          winner = color;
          break;
        }
      }

      if (winner) {
        break;
      }
    }
    return winner;
  };

  const rows = Array.from(Array(6).keys());
  const matrix = rows.reduce(
    (carry, item) => [...carry, Array.from(Array(7).fill(""))],
    []
  );

  let winner = false;
  const drawnMatrix = piecesPositionList.reduce((carry, piece) => {
    const [char, color] = piece.split("_");
    const pieceCol = charColumns.indexOf(char);

    for ([rowIndex, row] of carry.entries()) {
      const isEmptySlot = row[pieceCol] === "";

      if (isEmptySlot) {
        carry[rowIndex][pieceCol] = color;
        break;
      }
    }

    winner = winner || findWinner(carry);
    return carry;
  }, matrix);

  return winner || "Draw";
}
