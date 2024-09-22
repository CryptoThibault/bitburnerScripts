/** @param {NS} ns **/
export async function main(ns) {
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    let totalRam = ns.getServerMaxRam(server);
    let usedRam = ns.getServerUsedRam(server);
    if (server == "home")
      usedRam -= ns.getScriptRam(ns.getScriptName());
    let availableRam = totalRam - usedRam;
    let usedPercentage = totalRam > 0 ? (usedRam / totalRam * 100).toFixed(2) : 0;

    ns.tprint(`Server: ${server}`);
    ns.tprint(`Total:     ${totalRam.toFixed(2)}GB`);
    ns.tprint(`Used:      ${usedRam.toFixed(2)}GB (${usedPercentage}%)`);
    ns.tprint(`Available: ${availableRam.toFixed(2)}GB`);
    ns.tprint("");
  }
}
