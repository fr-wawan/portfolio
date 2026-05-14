<script lang="ts" setup>
import {
  Info,
  Terminal,
  LayoutGrid,
  Sparkles,
  RefreshCw,
} from "lucide-vue-next";

const props = defineProps<{
  x: number;
  y: number;
}>();

const emit = defineEmits<{
  close: [];
  action: [action: string];
}>();

const menuItems = [
  { id: "about", label: "About This System", icon: Info },
  { id: "terminal", label: "Open Terminal", icon: Terminal },
  { id: "divider1", label: "", icon: null },
  { id: "widgets", label: "Toggle Widgets", icon: LayoutGrid },
  { id: "matrix", label: "Enter the Matrix", icon: Sparkles },
  { id: "divider2", label: "", icon: null },
  { id: "refresh", label: "Refresh Desktop", icon: RefreshCw },
];

const adjustedX = computed(() => {
  return Math.min(props.x, window.innerWidth - 200);
});
const adjustedY = computed(() => {
  return Math.min(props.y, window.innerHeight - 200);
});
</script>

<template>
  <div
    class="fixed bg-zinc-900/95 border border-zinc-700 rounded-lg py-1 min-w-[180px] shadow-xl z-[100]"
    :style="{
      left: `${adjustedX}px`,
      top: `${adjustedY}px`,
    }"
    @click="(e) => e.stopPropagation()"
  >
    <template v-for="item in menuItems" :key="item.id">
      <div
        v-if="item.id.startsWith('divider')"
        className="h-px bg-zinc-700 my-1 mx-2"
      />
      <button
        @click="emit('action', item.id)"
        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700/50 transition-colors"
      >
        <component :is="item.icon" />
        <span>{{ item.label }}</span>
      </button>
    </template>
  </div>
</template>
