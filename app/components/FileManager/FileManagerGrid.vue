<script setup lang="ts">
import { Folder, FileText } from "lucide-vue-next";
import type { FileItem } from "~/types/file-manager";

const props = defineProps<{
  files: FileItem[];
  selectedFile: FileItem | null;
  viewMode: "grid" | "list";
}>();

const emit = defineEmits<{
  selectItem: [item: FileItem];
}>();

function isSelected(item: FileItem): boolean {
  return props.selectedFile?.name === item.name;
}
</script>

<template>
  <div v-if="props.viewMode === 'grid'" class="grid grid-cols-4 gap-4">
    <button
      v-for="item in props.files"
      :key="item.name"
      class="flex flex-col items-center gap-2 p-3 rounded-lg transition-colors"
      :class="
        isSelected(item)
          ? 'bg-blue-600/30 border border-blue-500'
          : 'hover:bg-zinc-800'
      "
      @click="emit('selectItem', item)"
    >
      <Folder v-if="item.type === 'folder'" class="w-12 h-12 text-yellow-400" />
      <FileText v-else class="w-12 h-12 text-zinc-400" />
      <span class="text-xs text-center truncate w-full">{{ item.name }}</span>
    </button>
  </div>

  <div v-else class="space-y-1">
    <button
      v-for="item in props.files"
      :key="item.name"
      class="w-full flex items-center gap-3 px-3 py-2 rounded transition-colors"
      :class="
        isSelected(item)
          ? 'bg-blue-600/30 border border-blue-500'
          : 'hover:bg-zinc-800'
      "
      @click="emit('selectItem', item)"
    >
      <Folder v-if="item.type === 'folder'" class="w-5 h-5 text-yellow-400" />
      <FileText v-else class="w-5 h-5 text-zinc-400" />
      <span class="text-sm">{{ item.name }}</span>
    </button>
  </div>
</template>
