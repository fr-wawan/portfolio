<script setup lang="ts">
import {
  Terminal,
  Folder,
  FileText,
  Mail,
  Music,
  Gamepad2,
  Globe,
} from "lucide-vue-next";
import { DOCK_APPS, MOBILE_APPS } from "~/data/mobile-apps";
import type { MobileAppId } from "~/types/mobile";

const props = defineProps<{
  time: string;
}>();

const emit = defineEmits<{
  openApp: [id: MobileAppId];
}>();

const iconMap: Record<MobileAppId, unknown> = {
  terminal: Terminal,
  files: Folder,
  editor: FileText,
  browser: Globe,
  music: Music,
  snake: Gamepad2,
  contact: Mail,
};
</script>

<template>
  <div class="min-h-[100dvh] w-screen flex flex-col relative overflow-hidden">
    <MobileAnimatedBackground />


    <div class="flex-1 flex items-center justify-center p-6 relative z-10">
      <div class="grid grid-cols-3 gap-6 max-w-sm w-full">
        <button
          v-for="app in MOBILE_APPS"
          :key="app.id"
          class="flex flex-col items-center gap-2 active:scale-95 transition-transform"
          @click="emit('openApp', app.id)"
        >
          <div
            class="w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg shadow-black/30 border border-white/10"
            :style="{ background: app.color }"
          >
            <component :is="iconMap[app.id]" class="w-7 h-7 text-white" />
          </div>
          <span class="text-xs text-zinc-300 font-medium">{{ app.label }}</span>
        </button>
      </div>
    </div>

    <div class="pb-4 pt-2 relative z-10">
      <div
        class="mx-auto w-64 h-16 bg-zinc-800/60 backdrop-blur-md rounded-2xl border border-zinc-700/50 flex items-center justify-center gap-4 px-4"
      >
        <button
          v-for="app in DOCK_APPS"
          :key="app.id"
          class="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
          @click="emit('openApp', app.id)"
        >
          <component :is="iconMap[app.id]" class="w-6 h-6 text-zinc-300" />
        </button>
      </div>
    </div>

    <div class="h-8 flex items-center justify-center shrink-0 relative z-10">
      <div class="w-32 h-1 bg-zinc-500 rounded-full" />
    </div>
  </div>
</template>
