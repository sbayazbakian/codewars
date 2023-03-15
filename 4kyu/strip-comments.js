/**
 * Solution for Strip Comments kata
 * @see https://www.codewars.com/kata/51c8e37cee245da6b40000bd
 */
function solution(input, markers) {
  const lines = input.split("\n");
  const result = lines.map((line) => {
    let flag = false;
    const newLine = line.split("").reduce((carry, char) => {
      const isMarker = markers.filter((marker) => marker === char);
      if (isMarker.length > 0) {
        flag = true;
      }
      if (!flag) {
        carry += char;
      }
  
      return carry;
    }, "");

    return newLine.trim();
  }).join("\n");

  return result;
};