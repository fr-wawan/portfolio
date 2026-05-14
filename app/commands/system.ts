import { PORTFOLIO_DATA } from "~/data/portfolio";
import type { Command } from "~/types/terminal";

export const systemCommands: Record<string, Command> = {
  whoami: {
    name: "whoami",
    description: "Display user information",
    execute: () =>
      `${PORTFOLIO_DATA.name}\nAge: ${PORTFOLIO_DATA.age}\nRole: ${PORTFOLIO_DATA.role}\nLocation: ${PORTFOLIO_DATA.location}`,
  },
  date: {
    name: "date",
    execute: () => new Date().toString(),
    description: "Show current date/time",
  },
  uptime: {
    name: "uptime",
    execute: () =>
      `up ${PORTFOLIO_DATA.age} years, 3 months, building cool stuff`,
    description: "Show system uptime",
  },
  neofetch: {
    name: "neofetch",
    execute: () => "__NEOFETCH__",
    description: "Display system info",
  },
};
