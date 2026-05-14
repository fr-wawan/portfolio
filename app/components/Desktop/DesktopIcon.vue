<script lang="ts" setup>
import type { LucideIcon } from "lucide-vue-next";
defineProps<{
  label: string;
  icon: LucideIcon;
}>();
const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    @click="emit('click')"
    class="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors group w-20"
  >
    <div
      class="w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700 group-hover:border-zinc-500 transition-colors"
    >
      <component :is="icon" class="w-6 h-6 text-zinc-300" />
    </div>
    <span
      class="text-xs text-white text-center font-medium drop-shadow-lg leading-tight"
    >
      {{ label }}
    </span>
  </button>
</template>
