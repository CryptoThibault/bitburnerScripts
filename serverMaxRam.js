/** @param {NS} ns */
export async function main(ns) {
  const maxRam = ns.getPurchasedServerMaxRam();
  let array = [];

  for (let i = 2; i <= maxRam; i *= 2)
    array.push(i);

  ns.tprint(array);
}
