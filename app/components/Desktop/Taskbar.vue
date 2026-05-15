<script lang="ts" setup>
import { Grid3X3 } from "lucide-vue-next";
import { apps } from "~/config/apps";
import type { AppType } from "~/config/apps";
import type { AppWindow } from "~/types/desktop";

const props = defineProps<{
  windows: AppWindow[];
}>();

const emit = defineEmits<{
  windowClick: [id: string];
  openApp: [type: AppType];
}>();

const time = ref(new Date());
const showLauncher = ref(false);

onMounted(() => {
  const timer = setInterval(() => (time.value = new Date()), 1000);
  onUnmounted(() => clearInterval(timer));
});

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

// Only apps with desktop: true appear in launcher
const launcherApps = Object.entries(apps)
  .filter(([, app]) => app.desktop)
  .map(([type, app]) => ({ type: type as AppType, ...app }));
</script>

<template>
  <Transition name="launcher">
    <div
      v-if="showLauncher"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      @click="showLauncher = false"
    >
      <div
        class="absolute bottom-16 left-4 bg-zinc-900/95 border border-zinc-700 rounded-lg p-4 min-w-[200px]"
        @click.stop
      >
        <div class="text-zinc-400 text-xs uppercase tracking-wider mb-3">
          Applications
        </div>
        <div class="space-y-1">
          <button
            v-for="app in launcherApps"
            :key="app.type"
            class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-700/50 transition-colors"
            @click="
              emit('openApp', app.type);
              showLauncher = false;
            "
          >
            <component :is="app.icon" class="w-5 h-5 text-zinc-400" />
            <span class="text-zinc-200 text-sm">{{ app.title }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <div
    class="fixed bottom-0 left-0 right-0 h-12 bg-zinc-900/95 border-t border-zinc-700 flex items-center px-2 z-50"
  >
    <button
      class="h-9 w-9 flex items-center justify-center rounded hover:bg-zinc-700/50 transition-colors"
      @click="showLauncher = !showLauncher"
    >
      <Grid3X3 class="w-5 h-5 text-zinc-300" />
    </button>

    <div class="w-px h-6 bg-zinc-700 mx-2" />

    <div class="flex-1 flex items-center gap-1 overflow-x-auto">
      <button
        v-for="win in windows"
        :key="win.id"
        :class="[
          'h-9 px-3 flex items-center gap-2 rounded transition-colors',
          win.isMinimized
            ? 'bg-zinc-800/50 hover:bg-zinc-700/50'
            : 'bg-zinc-700/70 hover:bg-zinc-600/70',
        ]"
        @click="emit('windowClick', win.id)"
      >
        <component :is="apps[win.type].icon" class="w-4 h-4 text-zinc-300" />
        <span class="text-sm text-zinc-200 max-w-[120px] truncate">
          {{ win.title }}
        </span>
      </button>
    </div>

    <div class="flex items-center gap-3 px-3">
      <div class="text-right">
        <div class="text-xs text-zinc-200">{{ formatTime(time) }}</div>
        <div class="text-xs text-zinc-400">{{ formatDate(time) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.launcher-enter-active,
.launcher-leave-active {
  transition: opacity 0.15s ease;
}
.launcher-enter-from,
.launcher-leave-to {
  opacity: 0;
}
</style>
