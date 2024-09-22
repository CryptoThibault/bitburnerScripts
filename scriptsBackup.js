/** @param {NS} ns */
export async function main(ns) {
  const fileList = ns.ls("home", ".js");
  let output = "";

  for (let file of fileList) {
    const content = ns.read(file);
    output += `§\n${file}\n${content}\n`;
  }

  ns.write("scripts.txt", output, "w");

  ns.tprint(`All scripts have been saved on scripts.txt.`);
}
