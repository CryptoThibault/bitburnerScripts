/** @param {NS} ns */
export async function main(ns) {
  const maxCores = 16;
  let currentCores = 1;

  while (currentCores++ < maxCores) {
    let anyUpgraded = true;

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      if (ns.hacknet.getNodeStats(i).cores < currentCores) {
        anyUpgraded = false;
        break;
      }
    }

    if (anyUpgraded)
      continue;

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      if (ns.hacknet.getNodeStats(i).cores < currentCores) {
        const coresUpgradeCost = ns.hacknet.getCoreUpgradeCost(i);
        if (coresUpgradeCost <= ns.getPlayer().money) {
          ns.hacknet.upgradeCore(i);
          ns.tprint(`Upgraded Hacknet Node ${i} to ${currentCores} cores for $${coresUpgradeCost}`);
        }
        else {
          ns.tprint(`No more money to upgrade Hacknet Node ${i} to ${currentCores} cores`);
          return;
        }
      }
    }

    ns.tprint(`All Hacknet Node upgraded to ${currentCores} cores`);
    await ns.sleep(100);
  }

  ns.tprint("All Hacknet Nodes have been upgraded to their maximum level");
}
