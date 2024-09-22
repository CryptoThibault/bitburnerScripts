/** @param {NS} ns **/
export async function main(ns) {
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    if (!ns.hasRootAccess(server))
      continue;
    let processes = ns.ps(server);
    for (let process of processes) {
        if (server == "home" && process.filename == ns.getScriptName())
          continue;
        if (process.filename == "reDeploy.js" || process.filename == "start.js")
          continue;
        ns.tprint(`Killing ${process.filename} on ${server}`);
        ns.kill(process.pid, server);
    }
  }
}
