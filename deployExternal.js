/** @param {NS} ns */
export async function main(ns) {
	const script = "autoHack.js";
	const supportScripts = ["hack.js", "grow.js", "weaken.js"];
	ns.run("scanTargets.js");
  while (ns.isRunning("scanTargets.js"))
    await ns.sleep(100);
  const targets = ns.read("targets.txt").split("\n");

	for (let target of targets) {
    if (!ns.getServerMaxRam(target))
      continue;
    ns.scp(supportScripts, target);
		ns.run(script, 1, target, target);
		ns.tprint(`${script} deployed targeting ${target} from ${target}`);
	}
}
