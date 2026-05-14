import type { Command } from "~/types/terminal";

export const funCommands: Record<string, Command> = {
  cowsay: {
    name: "cowsay",
    description: "Let a cow say something",
    execute: (args) => {
      const msg = args.join(" ") || "Moo!";
      return [
        ` ${"_".repeat(msg.length + 2)}`,
        `< ${msg} >`,
        ` ${"-".repeat(msg.length + 2)}`,
        "        \\   ^__^",
        "         \\  (oo)\\_______",
        "            (__)\\       )\\/",
        "                ||----w |",
        "                ||     ||",
      ].join("\n");
    },
  },
  sl: {
    name: "sl",
    description: "Easter egg",
    execute: () => `Choo choo! You typed 'sl' instead of 'ls'. Classic.`,
  },
};
