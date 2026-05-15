<script setup lang="ts">
import type { FileItem } from "~/types/file-manager";
import type { ViewMode } from "~/composables/useFileManager";
import { useFileManager } from "~/composables/useFileManager";

const props = defineProps<{
  initialPath?: string;
}>();

const emit = defineEmits<{
  openFile: [path: string];
}>();

const {
  currentPath,
  selectedFile,
  viewMode,
  currentFiles,
  navigateTo,
  navigateToHome,
  handleItemClick,
  setViewMode,
} = useFileManager(props.initialPath);

function onSelectItem(item: FileItem) {
  handleItemClick(item);

  if (item.type === "file" && item.name === "resume.txt") {
    emit("openFile", item.name);
  }
}

function onChangeViewMode(mode: ViewMode) {
  setViewMode(mode);
}
</script>

<template>
  <div class="h-full flex bg-zinc-900 text-zinc-100">
    <FileManagerSidebar :current-path="currentPath" @navigate="navigateTo" />

    <div class="flex-1 flex flex-col">
      <FileManagerToolbar
        :current-path="currentPath"
        :view-mode="viewMode"
        @navigate-home="navigateToHome"
        @change-view-mode="onChangeViewMode"
      />

      <div class="flex-1 flex overflow-hidden">
        <div
          class="p-4 overflow-auto"
          :class="selectedFile ? 'w-1/2' : 'flex-1'"
        >
          <FileManagerGrid
            :files="currentFiles"
            :selected-file="selectedFile"
            :view-mode="viewMode"
            @select-item="onSelectItem"
          />
        </div>

        <FileManagerPreview v-if="selectedFile" :file="selectedFile" />
      </div>
    </div>
  </div>
</template>
