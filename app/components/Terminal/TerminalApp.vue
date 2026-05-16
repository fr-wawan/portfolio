<script setup lang="ts">
import { TERMINAL_AUTOCOMPLETE_COMMANDS } from "~/config/terminal";

const props = defineProps<{
  initialCommand?: string;
}>();

const emit = defineEmits<{
  "matrix-mode": [];
  "open-app": [type: string];
}>();

const { history, push, clear } = useTerminalHistory();
const cmdHistory = useCommandHistory();
const { execute } = useCommandRegistry((event, payload) => {
  if (event === "matrix-mode") emit("matrix-mode");
  if (event === "open-app" && payload) emit("open-app", payload);
});

const currentDir = ref("~");
const containerRef = useTemplateRef("containerRef");
const promptRef = useTemplateRef("promptRef");

function handleSubmit(input: string) {
  const trimmed = input.trim();
  const output = execute(trimmed);

  if (output === "__CLEAR__") {
    clear();
    return;
  }

  push(trimmed, output);
  cmdHistory.push(trimmed);
  scrollToBottom();
}

function handleNavigate(direction: "up" | "down") {
  const value = cmdHistory.navigate(direction);
  promptRef.value?.setValue(value);
}

function handleAutocomplete(current: string) {
  const matches = TERMINAL_AUTOCOMPLETE_COMMANDS.filter((c) =>
    c.startsWith(current.toLowerCase()),
  );
  if (matches.length === 1) {
    promptRef.value?.setValue(matches[0] ?? "");
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight;
    }
  });
}

onMounted(() => {
  promptRef.value?.focus();
  if (props.initialCommand) {
    handleSubmit(props.initialCommand);
  }
});
</script>

<template>
  <div
    ref="containerRef"
    class="h-[100vh] bg-zinc-950 text-zinc-100 font-mono text-sm p-4 overflow-auto"
    @click="promptRef?.focus()"
  >
    <p v-if="history.length === 0" class="text-zinc-500 mb-4">
      Welcome to Portfolio Terminal. Type 'help' for available commands.
    </p>

    <div v-for="(item, i) in history" :key="i" class="mb-2">
      <div class="flex gap-2">
        <span class="text-green-400">user@portfolio</span>
        <span class="text-zinc-500">:</span>
        <span class="text-blue-400">{{ currentDir }}</span>
        <span class="text-zinc-500">$</span>
        <span class="text-zinc-100">{{ item.command }}</span>
      </div>

      <template v-if="item.output">
        <TerminalNeofetchBlock v-if="item.output === '__NEOFETCH__'" />
        <pre v-else class="mt-1 text-zinc-300 whitespace-pre-wrap">{{
          item.output
        }}</pre>
      </template>
    </div>

    <TerminalPrompt
      ref="promptRef"
      :current-dir="currentDir"
      @submit="handleSubmit"
      @navigate="handleNavigate"
      @autocomplete="handleAutocomplete"
    />
  </div>
</template>
