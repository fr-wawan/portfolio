<script lang="ts" setup>
import { X, Minus, Square } from "lucide-vue-next";
import type { WindowState } from "~/types/desktop";

const props = defineProps<{
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}>();

const emit = defineEmits<{
  close: [];
  minimize: [];
  maximize: [];
  focus: [];
  updateState: [state: Partial<WindowState>];
}>();

const isDragging = ref(false);
const isResizing = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const windowRef = useTemplateRef<HTMLDivElement>("windowRef");

const windowStyle = computed(() => {
  if (props.isMaximized) {
    return {
      top: 0,
      left: 0,
      width: "100%",
      height: "calc(100% - 48px)",
      zIndex: props.zIndex,
    };
  }
  return {
    top: `${props.position.y}px`,
    left: `${props.position.x}px`,
    width: `${props.size.width}px`,
    height: `${props.size.height}px`,
    zIndex: props.zIndex,
  };
});

function handleHeaderMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const isHeader =
    target === e.currentTarget || !!target.closest(".window-title");
  if (!isHeader) return;

  isDragging.value = true;
  dragOffset.value = {
    x: e.clientX - props.position.x,
    y: e.clientY - props.position.y,
  };
  emit("focus");
}

function handleResizeMouseDown(e: MouseEvent) {
  e.stopPropagation();
  isResizing.value = true;
  emit("focus");
}

function handleMouseMove(e: MouseEvent) {
  if (props.isMaximized) return;

  if (isDragging.value) {
    const newX = Math.max(
      0,
      Math.min(
        e.clientX - dragOffset.value.x,
        window.innerWidth - props.size.width,
      ),
    );
    const newY = Math.max(
      0,
      Math.min(
        e.clientY - dragOffset.value.y,
        window.innerHeight - props.size.height - 48,
      ),
    );
    emit("updateState", { position: { x: newX, y: newY } });
  }

  if (isResizing.value) {
    const newWidth = Math.max(300, e.clientX - props.position.x);
    const newHeight = Math.max(200, e.clientY - props.position.y);
    emit("updateState", { size: { width: newWidth, height: newHeight } });
  }
}

function handleMouseUp() {
  isDragging.value = false;
  isResizing.value = false;
}

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<template>
  <div
    v-if="!isMinimized"
    ref="windowRef"
    class="fixed bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl flex flex-col"
    :style="windowStyle"
    @click="emit('focus')"
  >
    <div
      class="h-10 bg-zinc-800 border-b border-zinc-700 flex items-center px-3 cursor-move select-none shrink-0"
      @mousedown="handleHeaderMouseDown"
      @dblclick="emit('maximize')"
    >
      <div class="flex items-center gap-2">
        <button
          class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group"
          @click.stop="emit('close')"
        >
          <X class="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
        </button>
        <button
          class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center group"
          @click.stop="emit('minimize')"
        >
          <Minus
            class="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100"
          />
        </button>
        <button
          class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group"
          @click.stop="emit('maximize')"
        >
          <Square
            class="w-1.5 h-1.5 text-green-900 opacity-0 group-hover:opacity-100"
          />
        </button>
      </div>

      <div class="flex-1 text-center window-title">
        <span class="text-sm text-zinc-300 font-medium">{{ title }}</span>
      </div>

      <div class="w-14" />
    </div>

    <div class="flex-1 overflow-hidden">
      <slot />
    </div>

    <div
      v-if="!isMaximized"
      class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
      @mousedown.stop="handleResizeMouseDown"
    >
      <svg
        class="w-4 h-4 text-zinc-600"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M14 14H12V12H14V14ZM14 10H12V8H14V10ZM10 14H8V12H10V14Z" />
      </svg>
    </div>
  </div>
</template>
