export function useCommandHistory() {
  const history = ref<string[]>([]);
  const index = ref(-1);

  function push(cmd: string) {
    if (cmd.trim()) history.value.push(cmd);
    index.value = -1;
  }

  function navigate(direction: "up" | "down"): string {
    if (direction === "up" && index.value < history.value.length - 1) {
      index.value++;
    } else if (direction === "down" && index.value > -1) {
      index.value--;
    }
    return index.value === -1
      ? ""
      : (history.value.at(-(index.value + 1)) ?? "");
  }

  function reset() {
    index.value = -1;
  }

  return { history, push, navigate, reset };
}
