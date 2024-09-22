/** @param {NS} ns */
export async function main(ns) {
  const remainingRam = ns.args[0] || 0;
  let availableRam = ns.getServerMaxRam("home") - ns.getServerUsedRam("home");

  if (remainingRam >= availableRam) {
    ns.tprint(`Remaining RAM (${remainingRam}GB) is bigger than available RAM (${availableRam}GB)`);
    return;
  }

  const script = "autoHack.js";
  const supportScripts = ["hack.js", "grow.js", "weaken.js"];
  ns.run("scanTargets.js");
  while (ns.isRunning("scanTargets.js"))
    await ns.sleep(100);
  const targets = ns.read("targets.txt").split("\n");

  if (!targets.length) {
    ns.tprint("No targets found in targets.txt");
    return;
  }

  let i = 1;
  for (let server of ns.getPurchasedServers()) {
    if (i >= targets.length)
      i = 1;
    let target = targets[i++];
    ns.scp(supportScripts, server);
    ns.run(script, 1, target, server);
    ns.tprint(`${script} deployed targeting ${target} from ${server}`);
  }

  availableRam = ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
  if (availableRam > remainingRam) {
    const homeTarget = targets[0];
    ns.run(script, 1, homeTarget, "home", availableRam - remainingRam);
    ns.tprint(`${script} deployed targeting ${homeTarget} from home`);
  }
}
