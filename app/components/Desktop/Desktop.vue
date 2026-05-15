<script lang="ts" setup>
import { apps } from "~/config/apps";
import type { AppWindow, WindowState } from "~/types/desktop";

const desktop = useDesktopStore();

const { windows } = storeToRefs(desktop);

const {
  openWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  focusWindow,
  updateWindowState,
} = desktop;

const contextMenu = ref<{ x: number; y: number } | null>(null);
const showMatrix = ref(false);
const showWidgets = ref(true);

const desktopRef = useTemplateRef("desktopRef");

const desktopIcons = computed(() =>
  typedEntries(apps)
    .filter(([_, app]) => app.desktop)
    .map(([type, app]) => ({
      type,
      label: app.title,
      icon: app.icon,
    })),
);

function handleContextMenuAction(action: string) {
  contextMenu.value = null;

  if (action === "about") {
    openWindow("about");
  } else if (action === "terminal") {
    openWindow("terminal");
  } else if (action === "widgets") {
    showWidgets.value = !showWidgets.value;
  } else if (action === "refresh") {
    if (desktopRef.value) {
      desktopRef.value.style.opacity = "0.8";
      setTimeout(() => {
        if (desktopRef.value) {
          desktopRef.value.style.opacity = "1";
        }
      }, 100);
    }
  }
}

function handleContextMenu(e: MouseEvent) {
  contextMenu.value = { x: e.clientX, y: e.clientY };
}

function handleDesktopClick() {
  contextMenu.value = null;
}

onMounted(() => {
  openWindow("terminal", { initialCommand: "neofetch" });
  openWindow("browser", { position: { x: 750, y: 80 } });
});
</script>

<template>
  <div
    class="h-screen w-screen overflow-hidden relative transition-opacity bg-[#0a0a14]"
    ref="desktopRef"
    @contextmenu.prevent="handleContextMenu"
    @click="handleDesktopClick"
  >
    <DesktopAnimatedWallpaper />
    <div class="absolute top-4 left-4 flex flex-col gap-4 z-10">
      <DesktopIcon
        v-for="(icon, index) in desktopIcons"
        :key="index"
        :icon="icon.icon"
        :label="icon.label"
        @click="() => openWindow(icon.type)"
      />
    </div>

    <div className="z-10" v-if="showWidgets">
      <WidgetSystemMonitor />
      <WidgetClock />
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

    <DesktopContextMenu
      v-if="contextMenu"
      :x="contextMenu.x"
      :y="contextMenu.y"
      @close="contextMenu = null"
      @click.stop
      @action="handleContextMenuAction"
    />

    <DesktopTaskbar
      :windows="windows"
      @windowClick="focusWindow"
      @openApp="openWindow"
    />
  </div>
</template>
