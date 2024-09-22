/** @param {NS} ns */
export async function main(ns) {
  const maxServers = ns.getPurchasedServerLimit();
  const serverMaxRam = ns.getPurchasedServerMaxRam();
  const maxRam = ns.args[0] > serverMaxRam ? serverMaxRam : ns.args[0] || serverMaxRam;
  const serverPrefix = "hack-";
  const serverCost = ns.getPurchasedServerCost(maxRam);
  const servers = ns.getPurchasedServers();

  for (let server of servers) {
    if (ns.getServerMaxRam(server) < maxRam) {
      const upgradeCost = ns.getPurchasedServerUpgradeCost(server, maxRam);
      if (ns.getPlayer().money >= upgradeCost) {
        ns.upgradePurchasedServer(server, maxRam);
        ns.tprint(`Server ${server} upgraded with ${maxRam}GB RAM for \$${upgradeCost}`);
      } else {
        ns.tprint(`Not enough money to upgrade ${server}, cost: \$${upgradeCost}`);
        return;
      }
    }
  }

  if (ns.getPurchasedServers().length >= maxServers) {
    ns.tprint(`All ${maxServers} servers are already purchased.`);
    return;
  }

  for (let i = ns.getPurchasedServers().length; i < maxServers; i++) {
    const hostname = `${serverPrefix}${i.toString().padStart(2, "0")}`
    if (ns.getPlayer().money >= serverCost) {
      ns.purchaseServer(hostname, maxRam);
      ns.tprint(`Server ${hostname} purchased with ${maxRam}GB RAM for \$${serverCost}`);
    } else {
      ns.tprint(`Not enough money to purchase ${hostname}, cost: \$${serverCost}`);
      return;
    }
  }
  ns.tprint("All servers purchased.");
}
