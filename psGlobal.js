/** @param {NS} ns **/
export async function main(ns) {
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    let processes = ns.ps(server);
    if (!processes.length)
      continue;
    ns.tprint(`Processes running on ${server}:`);
    for (let process of processes) {
      if (server == "home" && process.filename == ns.getScriptName())
        continue;
      ns.tprint(`(PID - ${process.pid}) ${process.filename}${process.args[0] ? ` ${process.args[0]}` : ""}`);
    }
    ns.tprint("");
  }
}
