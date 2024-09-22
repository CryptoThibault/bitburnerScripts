/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0];
  
  if (!target) {
		ns.tprint("Please provide a target server as an argument");
		return;
	}

	if (!ns.serverExists(target)) {
		ns.tprint(`The server "${target}" does not exist`);
		return;
	}

	if (ns.hasRootAccess(target)) {
		ns.tprint(`Already have root access to ${target}`);
		return;
	}

	const tools = [
		{ file: "BruteSSH.exe", func: ns.brutessh },
		{ file: "FTPCrack.exe", func: ns.ftpcrack },
		{ file: "relaySMTP.exe", func: ns.relaysmtp },
		{ file: "HTTPWorm.exe", func: ns.httpworm },
		{ file: "SQLInject.exe", func: ns.sqlinject }
	];

	let portRequired = ns.getServerNumPortsRequired(target);

	function tryToNuke() {
		if (!portRequired) {
			ns.nuke(target);
			if (ns.hasRootAccess(target)) {
				ns.tprint(`Successfully obtained root access on ${target}`);
				return true;
			} else {
				ns.tprint(`Failed to obtain root access on ${target}`);
				return false;
			}
		}
		return false;
	}

	if (tryToNuke())
		return;

	for (let tool of tools) {
		if (ns.fileExists(tool.file, "home")) {
			ns.tprint(`Using ${tool.file} to open a port`);
			tool.func(target);
			portRequired--;
			if (tryToNuke())
				return;
		} else {
			ns.tprint(`${tool.file} is not available, skipping`);
		}
	}
	
	ns.tprint(`Unable to open all required ports for ${target}`);
}
