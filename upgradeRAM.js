/** @param {NS} ns */
export async function main(ns) {
  const maxLevel = 64;
  let currentRam = 1;

  while (currentRam < maxLevel) {
    currentRam *= 2;
    let anyUpgraded = true;

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      if (ns.hacknet.getNodeStats(i).ram < currentRam) {
        anyUpgraded = false;
        break;
      }
    }

    if (anyUpgraded)
      continue;

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      if (ns.hacknet.getNodeStats(i).ram < currentRam) {
        const ramUpgradeCost = ns.hacknet.getRamUpgradeCost(i);
        if (ramUpgradeCost <= ns.getPlayer().money) {
          ns.hacknet.upgradeRam(i);
          ns.tprint(`Upgraded RAM of Hacknet Node ${i} to ${currentRam}.00GB for $${ramUpgradeCost}`);
        }
        else {
          ns.tprint(`No more money to upgrade RAM of Hacknet Node ${i} to ${currentRam}.00GB`);
          return;
        }
      }
    }

    ns.tprint(`All RAM of Hacknet Nodes upgraded to level ${currentRam}`);
    await ns.sleep(100);
  }

  ns.tprint("All Hacknet Nodes have been upgraded to their maximum level");
}
