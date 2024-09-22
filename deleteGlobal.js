/** @param {NS} ns */
export async function main(ns) {
	const file = ns.args[0];

	if (!file) {
		ns.tprint("Please provide the name of the file to delete");
		return;
	}
  
  ns.run("scanServers.js");
  while (ns.isRunning("scanServers.js"))
    await ns.sleep(100);
  const servers = ns.read("servers.txt").split("\n");
  
  for (let server of servers) {
    if (server != "home" && ns.fileExists(file, server)) {
		  ns.rm(file, server);
      ns.tprint(`File ${file} has been deleted from ${server}`);
    }
  }
}
