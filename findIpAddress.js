/** @param {NS} ns */
export async function main(ns) {
  const s = "11222175245";
  let result = [];

  for (let i = 1; i < 4 && i < s.length - 2; i++) {
    for (let j = i + 1; j < i + 4 && j < s.length - 1; j++) {
      for (let k = j + 1; k < j + 4 && k < s.length; k++) {
        let part1 = s.substring(0, i);
        let part2 = s.substring(i, j);
        let part3 = s.substring(j, k);
        let part4 = s.substring(k);

        if (isValidSegment(part1) && isValidSegment(part2) &&
          isValidSegment(part3) && isValidSegment(part4)) {
          result.push(`${part1}.${part2}.${part3}.${part4}`);
        }
      }
    }
  }

  ns.tprint(result);
}

function isValidSegment(segment) {
  if (segment.length > 1 && segment[0] === '0') {
    return false;
  }
  let num = parseInt(segment);
  return num >= 0 && num <= 255;
}
