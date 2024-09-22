/** @param {NS} ns */
export async function main(ns) {
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");
  const targetScores = [];

  for (let server of servers) {
    if (server == "home" || server == "darkweb" || ns.getPurchasedServers().includes(server))
      continue;
    if (!ns.hasRootAccess(server) || ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server))
      continue;
    if (!ns.getServerMaxMoney(server))
      continue;

    const score = ns.getServerMaxMoney(server) / (ns.getServerMinSecurityLevel(server)
      * ns.getServerRequiredHackingLevel(server) / ns.getHackingLevel());
    targetScores.push({server, score});
  }

  targetScores.sort((a, b) => b.score - a.score);
  const targets = targetScores.map(t => t.server);

  const filename = "targets.txt";
  ns.write(filename, targets.join("\n"), "w");
  ns.tprint(`Ranked targets have been written to ${filename}`);
}
