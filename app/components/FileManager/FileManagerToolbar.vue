<script setup lang="ts">
import { Home, ChevronRight, List, Grid } from "lucide-vue-next";
import type { ViewMode } from "~/composables/useFileManager";

const props = defineProps<{
  currentPath: string;
  viewMode: ViewMode;
}>();

const emit = defineEmits<{
  navigateHome: [];
  changeViewMode: [mode: ViewMode];
}>();
</script>

<template>
  <div
    class="h-10 bg-zinc-800 border-b border-zinc-700 flex items-center px-3 gap-2"
  >
    <button
      class="p-1.5 rounded hover:bg-zinc-700 transition-colors"
      @click="emit('navigateHome')"
    >
      <Home class="w-4 h-4 text-zinc-400" />
    </button>

    <div class="flex items-center text-sm text-zinc-400">
      <span
        class="hover:text-zinc-200 cursor-pointer"
        @click="emit('navigateHome')"
        >Home</span
      >
      <template v-if="props.currentPath !== 'Home'">
        <ChevronRight class="w-4 h-4 mx-1" />
        <span class="text-zinc-200">{{ props.currentPath }}</span>
      </template>
    </div>

    <div class="flex-1" />

    <div class="flex gap-1">
      <button
        class="p-1.5 rounded transition-colors"
        :class="props.viewMode === 'list' ? 'bg-zinc-700' : 'hover:bg-zinc-700'"
        @click="emit('changeViewMode', 'list')"
      >
        <List class="w-4 h-4 text-zinc-400" />
      </button>
      <button
        class="p-1.5 rounded transition-colors"
        :class="props.viewMode === 'grid' ? 'bg-zinc-700' : 'hover:bg-zinc-700'"
        @click="emit('changeViewMode', 'grid')"
      >
        <Grid class="w-4 h-4 text-zinc-400" />
      </button>
    </div>
  </div>
</template>
