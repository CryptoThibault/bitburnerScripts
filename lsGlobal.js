/** @param {NS} ns **/
export async function main(ns) {
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    let files;
    if (ns.args[0])
      files = ns.ls(server, ns.args[0]);
    else
      files = ns.ls(server);
    if (!files.length)
      continue;
    ns.tprint(`List files on ${server}:`);
    for (let file of files) {
      ns.tprint(file);
    }
    ns.tprint("");
  }
}
