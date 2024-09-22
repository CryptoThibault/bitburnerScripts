/** @param {NS} ns */
export async function main(ns) {
  ns.run("killGlobal.js");
  while (ns.isRunning("killGlobal.js"))
    await ns.sleep(100);
  ns.run("deploy.js");
}
