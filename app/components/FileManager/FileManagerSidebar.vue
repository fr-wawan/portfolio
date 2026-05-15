<script setup lang="ts">
import { Home, Folder } from "lucide-vue-next";
import { SIDEBAR_FOLDERS } from "~/data/file-system";

const props = defineProps<{
  currentPath: string;
}>();

const emit = defineEmits<{
  navigate: [path: string];
}>();
</script>

<template>
  <aside class="w-48 bg-zinc-800 border-r border-zinc-700 p-2 flex flex-col">
    <p class="text-xs text-zinc-500 uppercase tracking-wider mb-2 px-2">
      Places
    </p>

    <button
      v-for="folder in SIDEBAR_FOLDERS"
      :key="folder"
      class="flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors"
      :class="
        props.currentPath === folder
          ? 'bg-zinc-700 text-white'
          : 'text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200'
      "
      @click="emit('navigate', folder)"
    >
      <Home v-if="folder === 'Home'" class="w-4 h-4" />
      <Folder v-else class="w-4 h-4" />
      {{ folder }}
    </button>
  </aside>
</template>
