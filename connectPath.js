/** @param {NS} ns */
export async function main(ns) {
  const targetServer = ns.args[0];

  if (!targetServer) {
    ns.tprint("Please provide a server name as an argument.");
    return;
  }

  const path = findPath(ns, targetServer, 'home');
  if (!path) {
    ns.tprint(`Server ${targetServer} not found.`);
    return;
  }

  let connectCommand = "";
  for (let i = 1; i < path.length; i++) {
    connectCommand += `connect ${path[i]}; `;
  }

  ns.tprint(`To connect to ${targetServer}, use the following command:`);
  ns.tprint(connectCommand.trim());
}

function findPath(ns, target, server, visited = []) {
  if (server === target) return visited.concat(server);
  for (const neighbor of ns.scan(server)) {
    if (!visited.includes(neighbor)) {
      const path = findPath(ns, target, neighbor, visited.concat(server));
      if (path) return path;
    }
  }
  return null;
}
