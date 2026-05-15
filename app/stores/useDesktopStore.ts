import { defineStore } from "pinia";
import type { AppType } from "~/config/apps";
import type { AppWindow, WindowState } from "~/types/desktop";
import { apps } from "~/config/apps";

interface OpenWindowOptions {
  initialCommand?: string;
  position?: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
  initialPath?: string;
}

export const useDesktopStore = defineStore("desktop", () => {
  const windows = ref<AppWindow[]>([]);
  const highestZIndex = ref(1);

  function getWindowById(id: string) {
    return windows.value.find((window) => window.id === id);
  }

  function openWindow(type: AppType, options?: OpenWindowOptions) {
    const app = apps[type];

    if (!app) {
      console.warn(`Unknown app type: ${type}`);
      return;
    }

    const newZIndex = ++highestZIndex.value;

    const newWindow: AppWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title: app.title,
      isMinimized: false,
      isMaximized: false,

      position: options?.position ?? {
        x: 100 + (windows.value.length % 5) * 30,
        y: 50 + (windows.value.length % 5) * 30,
      },

      size: options?.size ?? {
        width: app.size.width,
        height: app.size.height,
      },

      zIndex: newZIndex,

      initialCommand: options?.initialCommand,
      initialPath: options?.initialPath,
    };

    windows.value.push(newWindow);
  }

  function closeWindow(id: string) {
    windows.value = windows.value.filter((window) => window.id !== id);
  }

  function minimizeWindow(id: string) {
    const window = getWindowById(id);

    if (!window) return;

    window.isMinimized = true;
  }

  function maximizeWindow(id: string) {
    const window = getWindowById(id);

    if (!window) return;

    window.isMaximized = !window.isMaximized;
  }

  function focusWindow(id: string) {
    const window = getWindowById(id);

    if (!window) return;

    const newZIndex = ++highestZIndex.value;

    window.zIndex = newZIndex;
    window.isMinimized = false;
  }

  function updateWindowState(id: string, state: Partial<WindowState>) {
    const window = getWindowById(id);

    if (!window) return;

    Object.assign(window, state);
  }

  return {
    windows,

    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowState,

    getWindowById,
  };
});
