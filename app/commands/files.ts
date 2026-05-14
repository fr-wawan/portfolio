import { PORTFOLIO_DATA } from "~/data/portfolio";
import type { Command } from "~/types/terminal";

export const fileCommands: Record<string, Command> = {
  ls: {
    name: "ls",
    description: "List directory contents",
    execute: (args) => {
      if (args[0] === "projects" || args[0] === "projects/") {
        return PORTFOLIO_DATA.projects
          .map((p) => `${p.name}/    ${p.desc}`)
          .join("\n");
      }
      return "projects/  skills/  contact  resume.pdf";
    },
  },
  cat: {
    name: "cat",
    description: "Display file contents",
    execute: (args) => {
      if (args[0] === "contact") {
        return `Email:    ${PORTFOLIO_DATA.email}\nGitHub:   ${PORTFOLIO_DATA.github}\nLinkedIn: ${PORTFOLIO_DATA.linkedin}`;
      }
      if (args[0] === "resume.pdf") {
        return [
          "╔══════════════════════════════╗",
          `║  RESUME - ${PORTFOLIO_DATA.name}  ║`,
          "╠══════════════════════════════╣",
          "║  EXPERIENCE                  ║",
          "║  Mid Level Developer         ║",
          `║  Skills: ${PORTFOLIO_DATA.skills.slice(0, 4).join(", ")}  ║`,
          "╚══════════════════════════════╝",
        ].join("\n");
      }
      return `cat: ${args[0] ?? "missing operand"}: No such file or directory`;
    },
  },
};
