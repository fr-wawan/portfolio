export interface HistoryItem {
  command: string;
  output: string | object | null;
  type?: "text" | "component";
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => string | object | null;
}

export type CommandRegistry = Record<string, Command>;
