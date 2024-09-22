/** @param {NS} ns */
export async function main(ns) {
  const maxLevel = 200;
  let currentLevel = 1;
  let availableMoney = ns.getPlayer().money * 0.9;

  while (currentLevel++ < maxLevel) {
    let anyUpgraded = true;

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      if (ns.hacknet.getNodeStats(i).level < currentLevel) {
        anyUpgraded = false;
        break;
      }
    }

    if (anyUpgraded)
      continue;

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      if (ns.hacknet.getNodeStats(i).level < currentLevel) {
        const levelUpgradeCost = ns.hacknet.getLevelUpgradeCost(i);
        availableMoney -= levelUpgradeCost;
        if (availableMoney > 0) {
          ns.hacknet.upgradeLevel(i);
          ns.tprint(`Upgraded level of Hacknet Node ${i} to ${currentLevel} for $${levelUpgradeCost}`);
        }
        else {
          ns.tprint(`No more money to upgrade Hacknet Node ${i} to level ${currentLevel}`);
          return;
        }
      }
    }

    ns.tprint(`All Hacknet Nodes upgraded to level ${currentLevel}`);
    await ns.sleep(100);
  }

  ns.tprint("All Hacknet Nodes have been upgraded to their maximum level");
}
