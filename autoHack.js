/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const scriptHost = ns.args[1] || "home";
  const maxRam = ns.args[2] || ns.getServerMaxRam(scriptHost) - ns.getServerUsedRam(scriptHost);

  if (!target) {
    ns.tprint("Please provide a target server as an argument");
    return;
  }

  if (!ns.serverExists(target)) {
    ns.tprint(`The target server ${target} does not exist`);
    return;
  }

  if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)) {
    ns.tprint(`Hacking level too low to attack ${target}`);
    return;
  }

  if (!ns.getServerMaxMoney(target)) {
      ns.tprint(`No money available on ${target}`);
      return;
    }

  if (!ns.serverExists(scriptHost)) {
    ns.tprint(`The script host server ${scriptHost} does not exist`);
    return;
  }

  if (!ns.getServerMaxRam(scriptHost)) {
    ns.tprint(`The RAM of ${scriptHost} is 0`);
    return;
  }

  if (maxRam > ns.getServerMaxRam(scriptHost) - ns.getServerUsedRam(scriptHost)) {
    ns.tprint(`The available RAM of ${scriptHost} is lower than ${maxRam}`);
    return;
  }

  const scripts = ["hack.js", "grow.js", "weaken.js"];

  for (const script of scripts) {
    if (!ns.fileExists(script, scriptHost)) {
      ns.tprint(`Required script ${script} is missing on ${scriptHost}`);
      return;
    }
  }

  let pid = -1;
  async function runAction(script, ramRequired) {
    if (ns.isRunning(pid))
      return false;

    const threads = Math.floor(maxRam / ramRequired);
    if (threads > 0) {
      pid = ns.exec(script, scriptHost, threads, target);
      ns.print(`Executed ${script} on ${scriptHost} with ${threads} threads targets ${target} at pid ${pid}`);
      return true;
    }
    return false;
  }

  let moneyRatio = 0.1;
  let securityRange = 5;

  while (true) {
    const currentMoney = ns.getServerMoneyAvailable(target);
    const currentSecurity = ns.getServerSecurityLevel(target);
    const maxMoney = ns.getServerMaxMoney(target);
    const minSecurity = ns.getServerMinSecurityLevel(target);
    const moneyThresh = maxMoney * moneyRatio;
    const securityThresh = minSecurity + securityRange;

    ns.print(`Current Money: ${currentMoney}, Current Security: ${currentSecurity}`);
    ns.print(`Money Threshold: ${moneyThresh}, Security Threshold: ${securityThresh}`);

    if (currentSecurity > securityThresh) {
      if (await runAction(scripts[2], ns.getScriptRam(scripts[2], scriptHost)))
        securityRange += 0.5;
    }
    else if (currentMoney < moneyThresh) {
      if (await runAction(scripts[1], ns.getScriptRam(scripts[1], scriptHost)))
        moneyRatio -= 0.01;
    } else {
      if (await runAction(scripts[0], ns.getScriptRam(scripts[0], scriptHost))) {
        moneyRatio = 0.1;
        securityRange = 5;
      }
    }
      await ns.sleep(1000);
  }
}
