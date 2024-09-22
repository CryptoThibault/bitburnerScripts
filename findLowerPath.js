/** @param {NS} ns */
export async function main(ns) {
  let array =
    [
      [8],
      [2, 4],
      [2, 5, 1],
      [2, 9, 5, 4],
      [5, 2, 4, 4, 2],
      [4, 2, 7, 5, 9, 9],
      [6, 3, 8, 1, 2, 7, 1]
    ]
  let lower = -1;

  async function recursivePath(sum, i, j) {
    sum += array[i][j];
    if (i == array.length - 1) {
      if (lower == -1 || sum < lower)
        lower = sum;
      return;
    }
    recursivePath(sum, i + 1, j);
    recursivePath(sum, i + 1, j + 1);
  }

  recursivePath(0, 0, 0);
  ns.tprint(`The lower path sum to ${lower}`);
}
