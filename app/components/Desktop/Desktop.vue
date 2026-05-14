<script lang="ts" setup>
import {
  FileText,
  Folder,
  Gamepad2,
  Globe,
  Music,
  Terminal,
} from "lucide-vue-next";
import type { AppWindow, WindowState } from "~/types/desktop";

const windows = ref<AppWindow[]>([]);
const contextMenu = ref<{ x: number; y: number } | null>(null);
const highestZindex = ref(1);
const showMatrix = ref(false);
const showWidgets = ref(true);

const desktopRef = ref(null);
const hasAutoLaunchedRef = ref(false);

const desktopIcons = [
  {
    id: "terminal",
    label: "Terminal",
    icon: Terminal,
    type: "terminal" as const,
  },
  { id: "files", label: "Files", icon: Folder, type: "files" as const },
  { id: "editor", label: "Resume", icon: FileText, type: "editor" as const },
  { id: "browser", label: "Browser", icon: Globe, type: "browser" as const },
  { id: "music", label: "Music", icon: Music, type: "music" as const },
  { id: "snake", label: "Games", icon: Gamepad2, type: "snake" as const },
];

const titles: Record<AppWindow["type"], string> = {
  terminal: "Terminal",
  files: "Files",
  editor: "resume.txt - Editor",
  browser: "Browser",
  about: "About This System",
  music: "Music Player",
  snake: "Snake Game",
};

const sizes: Record<AppWindow["type"], { width: number; height: number }> = {
  terminal: { width: 700, height: 450 },
  files: { width: 800, height: 500 },
  editor: { width: 700, height: 500 },
  browser: { width: 900, height: 600 },
  about: { width: 450, height: 350 },
  music: { width: 380, height: 580 },
  snake: { width: 360, height: 480 },
};

function openWindow(
  type: AppWindow["type"],
  options?: { initialCommand?: string; initialPath?: string },
) {
  const newZIndex = highestZindex.value + 1;
  highestZindex.value = newZIndex;

  const newWindow: AppWindow = {
    id: `${type}-${Date.now()}`,
    type,
    title: titles[type],
    isMinimized: false,
    isMaximized: false,
    position: {
      x: 100 + (windows.value.length % 5) * 30,
      y: 50 + (windows.value.length % 5) * 30,
    },
    size: sizes[type],
    zIndex: newZIndex,
    initialCommand: options?.initialCommand,
    initialPath: options?.initialPath,
  };

  windows.value.push(newWindow);
}

function getWindowById(id: string) {
  return windows.value.find((window) => window.id === id);
}

function closeWindow(id: string) {
  windows.value = windows.value.filter((window) => window.id !== id);
}

function minimizeWindow(id: string) {
  const window = getWindowById(id);

  if (window) window.isMinimized = true;
}

function maximizeWindow(id: string) {
  const window = getWindowById(id);

  if (window) window.isMaximized = !window.isMaximized;
}

function focusWindow(id: string) {
  const newZIndex = highestZindex.value + 1;
  highestZindex.value = newZIndex;

  const window = getWindowById(id);

  if (window) {
    window.zIndex = newZIndex;
    window.isMinimized = false;
  }
}

function updateWindowState(id: string, state: Partial<WindowState>) {
  windows.value = windows.value.map((window) =>
    window.id === id ? { ...window, ...state } : window,
  );
}
</script>

<template>
  <div
    class="h-screen w-screen overflow-hidden relative transition-opacity bg-[#0a0a14]"
  >
    <div class="absolute top-4 left-4 flex flex-col gap-4 z-10">
      <DesktopIcon
        v-for="icon in desktopIcons"
        :key="icon.id"
        :icon="icon.icon"
        :label="icon.label"
        @click="() => openWindow(icon.type)"
      />
    </div>
    <div class="relative z-20">
      <DesktopWindowManager
        :windows="windows"
        @close="closeWindow"
        @minimize="minimizeWindow"
        @maximize="maximizeWindow"
        @focus="focusWindow"
        @updateState="updateWindowState"
        @openWindow="openWindow"
      />
    </div>
  </div>
</template>
