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

const isSidebarOpen = ref(false);

function onSelectItem(item: FileItem) {
  handleItemClick(item);

  if (item.type === "file" && item.name === "resume.txt") {
    emit("openFile", item.name);
  }
}

function onChangeViewMode(mode: ViewMode) {
  setViewMode(mode);
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar() {
  isSidebarOpen.value = false;
}
</script>

<template>
  <div class="h-full flex bg-zinc-900 text-zinc-100">
    <div class="hidden sm:block">
      <FileManagerSidebar :current-path="currentPath" @navigate="navigateTo" />
    </div>

    <Transition name="sidebar-drawer">
      <div
        v-if="isSidebarOpen"
        class="sm:hidden fixed inset-0 z-40"
        @click="closeSidebar"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div class="absolute left-0 top-0 bottom-0 w-64" @click.stop>
          <FileManagerSidebar
            :current-path="currentPath"
            @navigate="(path) => {
              navigateTo(path);
              closeSidebar();
            }"
          />
        </div>
      </div>
    </Transition>

    <div class="flex-1 flex flex-col">
      <FileManagerToolbar
        :current-path="currentPath"
        :view-mode="viewMode"
        @navigate-home="navigateToHome"
        @change-view-mode="onChangeViewMode"
        @toggle-sidebar="toggleSidebar"
      />

      <div class="flex-1 flex flex-col sm:flex-row overflow-hidden">
        <div
          class="p-4 overflow-auto"
          :class="selectedFile ? 'w-full sm:w-1/2' : 'flex-1'"
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

<style scoped>
.sidebar-drawer-enter-active,
.sidebar-drawer-leave-active {
  transition: opacity 0.2s ease;
}

.sidebar-drawer-enter-from,
.sidebar-drawer-leave-to {
  opacity: 0;
}

.sidebar-drawer-enter-active .w-64,
.sidebar-drawer-leave-active .w-64 {
  transition: transform 0.2s ease;
}

.sidebar-drawer-enter-from .w-64,
.sidebar-drawer-leave-to .w-64 {
  transform: translateX(-16px);
}
</style>
