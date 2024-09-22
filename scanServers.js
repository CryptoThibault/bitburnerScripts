/** @param {NS} ns */
export async function main(ns) {
  let visited = new Set();

  async function scanServers(current) {
    if (visited.has(current))
      return;
    visited.add(current);
    for (let server of ns.scan(current))
      scanServers(server);
  }

  await scanServers("home");
  
  const filename = "servers.txt";
  ns.write(filename, Array.from(visited).join("\n"), "w");
  ns.tprint(`Scanned servers have been written to ${filename}`);
}
