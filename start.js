/** @param {NS} ns */
export async function main(ns) {
  const maxRam = ns.args[0] || 2;
  
  let pid = ns.run("killGlobal.js");
  while(ns.isRunning(pid))
    await ns.sleep(100);
  pid = ns.run("purchaseServers.js", 1, maxRam);
  while(ns.isRunning(pid))
    await ns.sleep(100);
  pid = ns.run("deployRootAccess.js");
  while(ns.isRunning(pid))
    await ns.sleep(100);
  pid = ns.run("deploy.js");
  while(ns.isRunning(pid))
    await ns.sleep(100);
  ns.run("manageHacknet.js");
}
