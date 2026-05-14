import { systemCommands } from "~/commands/system";
import { fileCommands } from "~/commands/files";
import { funCommands } from "~/commands/fun";
import type { CommandRegistry } from "~/types/terminal";

export function useCommandRegistry(
  emit: (event: "matrix-mode" | "open-app", payload?: string) => void,
) {
  const registry: CommandRegistry = {
    ...systemCommands,
    ...fileCommands,
    ...funCommands,

    help: {
      name: "help",
      description: "Show this help message",
      execute: () =>
        Object.values(registry)
          .map((cmd) => `  ${cmd.name.padEnd(16)}${cmd.description}`)
          .join("\n"),
    },

    clear: {
      name: "clear",
      description: "Clear terminal",
      execute: () => "__CLEAR__",
    },

    echo: {
      name: "echo",
      description: "Echo text",
      execute: (args) => args.join(" "),
    },

    sudo: {
      name: "sudo",
      description: "Try something dangerous",
      execute: (args) => {
        if (args.join(" ").toLowerCase() === "hire me") {
          return "🎉 HIRE_REQUEST_ACCEPTED — Email: hello@alexdev.io";
        }
        return `sudo: ${args.join(" ")}: command not found`;
      },
    },

    matrix: {
      name: "matrix",
      description: "Enter the Matrix",
      execute: () => {
        emit("matrix-mode");
        return "Entering the Matrix...";
      },
    },
  };

  function execute(rawInput: string): string | object | null {
    const [command, ...args] = rawInput.trim().split(" ");
    if (!command) return null;
    const handler = registry[command.toLowerCase()];
    if (!handler)
      return `Command not found: ${command}. Type 'help' for available commands.`;
    return handler.execute(args);
  }

  return { execute };
}
