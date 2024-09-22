/** @param {NS} ns */
export async function main(ns) {
  const purchasePercentage = ns.args[0] || 0.2;

  const moneyForNodes = ns.getPlayer().money * purchasePercentage;
  while (ns.hacknet.numNodes() < ns.hacknet.maxNumNodes()) {
    const nodeCost = ns.hacknet.getPurchaseNodeCost();
    if (moneyForNodes >= nodeCost) {
      const newNodeIndex = ns.hacknet.purchaseNode();
      if (newNodeIndex !== -1) {
        ns.tprint(`Purchased Hacknet Node ${newNodeIndex} for \$${nodeCost}`);
      }
    } else {
      ns.tprint(`Not enough money to purchase more Hacknet Nodes. Stopping.`);
      break;
    }
    await ns.sleep(100);
  }
}
