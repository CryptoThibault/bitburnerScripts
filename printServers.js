/** @param {NS} ns */
export async function main(ns) {
  let nbYes = 0;
  let nbNo = 0;
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    const rootAccess = ns.hasRootAccess(server)
    rootAccess ? nbYes++ : nbNo++;
    ns.tprint(`[${server}] Root access: ${rootAccess ? "YES" : "NO"} Max RAM: ${ns.getServerMaxRam(server)}.00 GB`);
  }
  ns.tprint("");
  ns.tprint(`[All servers printed] Yes: ${nbYes} No: ${nbNo} Total: ${nbYes + nbNo}`);
}
