/** @param {NS} ns */
export async function main(ns) {
  const purchasePercentage = ns.args[0] || 0.2;
  ns.tprint("Starting Hacknet management...");

  let pid = ns.run("purchaseNodes.js", 1, purchasePercentage);
  while (ns.isRunning(pid))
    await ns.sleep(100);

  pid = ns.run("upgradeLevels.js");
  while (ns.isRunning(pid))
    await ns.sleep(100);

  pid = ns.run("upgradeRAM.js");
  while (ns.isRunning(pid))
    await ns.sleep(100);

  pid = ns.run("upgradeCores.js");
  while (ns.isRunning(pid))
    await ns.sleep(100);

  ns.tprint("All Hacknet Nodes have been managed.");
}
