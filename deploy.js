/** @param {NS} ns */
export async function main(ns) {
  const remainingRam = 128;

  ns.run("deployExternal.js");
  while (ns.isRunning("deployExternal.js"))
    await ns.sleep(100);
  ns.run("deployInternal.js", 1, remainingRam);
}
