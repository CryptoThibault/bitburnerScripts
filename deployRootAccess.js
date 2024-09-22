/** @param {NS} ns */
export async function main(ns) {
  const script = "getRootAccess.js";
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n")
  const myServers = ns.getPurchasedServers();

  for (let server of servers) {
    if (server == "home" || myServers.includes(server))
      continue;
    ns.tprint(`${script} deployed targeting ${server}`);
    ns.run(script, 1, server);
    while (ns.isRunning(script, "home", server))
      await ns.sleep(100);
  }
  ns.tprint(`${script} has been deployed on all servers`);
}
