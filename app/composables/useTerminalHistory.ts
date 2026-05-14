import type { HistoryItem } from "~/types/terminal";

export function useTerminalHistory() {
  const history = ref<HistoryItem[]>([]);

  function push(command: string, output: string | object | null) {
    history.value.push({ command, output });
  }

  function clear() {
    history.value = [];
  }

  return { history, push, clear };
}
