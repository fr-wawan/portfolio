<script lang="ts" setup>
import type { AppWindow, WindowState } from "~/types/desktop";

const props = defineProps<{
  windows: AppWindow[];
  onMatrixMode?: () => void;
}>();

const emit = defineEmits<{
  close: [id: string];
  minimize: [id: string];
  maximize: [id: string];
  focus: [id: string];
  updateState: [id: string, state: Partial<WindowState>];
  openWindow: [
    type: AppWindow["type"],
    options?: { initialCommand?: string; initialPath?: string },
  ];
  matrixMode: [];
}>();
</script>

<template>
  <TransitionGroup name="window-open" tag="div" class="contents" appear>
    <DesktopWindow
      v-for="win in windows"
      :key="win.id"
      :id="win.id"
      :title="win.title"
      :is-minimized="win.isMinimized"
      :is-maximized="win.isMaximized"
      :position="win.position"
      :size="win.size"
      :z-index="win.zIndex"
      @close="emit('close', win.id)"
      @minimize="emit('minimize', win.id)"
      @maximize="emit('maximize', win.id)"
      @focus="emit('focus', win.id)"
      @update-state="(state) => emit('updateState', win.id, state)"
    >
      <TerminalApp
        v-if="win.type === 'terminal'"
        :initial-command="win.initialCommand"
        @matrix-mode="emit('matrixMode')"
        @open-app="(type) => emit('openWindow', type as AppWindow['type'])"
      />

      <div v-else class="p-4 text-zinc-400">Unknown application</div>
    </DesktopWindow>
  </TransitionGroup>
</template>

<style scoped>
.window-open-enter-active,
.window-open-leave-active {
  transition: opacity 0.16s ease, transform 0.18s ease;
}

.window-open-enter-from,
.window-open-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.window-open-enter-to,
.window-open-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
