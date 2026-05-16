<script setup lang="ts">
import { ChevronUp, Terminal } from "lucide-vue-next";

const props = defineProps<{
  time: string;
  date: string;
  swipeY: number;
}>();

const emit = defineEmits<{
  unlock: [];
  touchStart: [e: TouchEvent];
  touchMove: [e: TouchEvent];
  touchEnd: [];
}>();
</script>

<template>
  <div
    class="min-h-[100vh] w-screen flex flex-col items-center justify-center relative overflow-hidden"
    @click="emit('unlock')"
    @touchstart="emit('touchStart', $event)"
    @touchmove="emit('touchMove', $event)"
    @touchend="emit('touchEnd')"
  >
    <MobileAnimatedBackground />

    <div class="absolute inset-0 backdrop-blur-sm bg-black/20" />

    <div
      class="relative z-10 text-center transition-transform duration-200"
      :style="{ transform: `translateY(-${props.swipeY * 0.3}px)` }"
    >
      <div class="text-7xl font-extralight text-white mb-2 tracking-tight">
        {{ props.time }}
      </div>
      <div class="text-lg text-zinc-300 font-light">{{ props.date }}</div>
    </div>

    <div
      class="absolute top-20 left-4 right-4 z-10 transition-all duration-200"
      :style="{
        opacity: 1 - props.swipeY / 100,
        transform: `translateY(-${props.swipeY * 0.5}px)`,
      }"
    >
      <div
        class="bg-zinc-800/80 backdrop-blur-md rounded-2xl p-4 border border-zinc-700/50"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
          >
            <Terminal class="w-5 h-5 text-white" />
          </div>
          <div>
            <div class="text-white text-sm font-medium">Portfolio OS</div>
            <div class="text-zinc-400 text-xs">
              Welcome! Explore my projects and skills.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-12 left-0 right-0 flex flex-col items-center z-10 transition-all duration-200"
      :style="{
        opacity: 1 - props.swipeY / 80,
        transform: `translateY(-${props.swipeY}px)`,
      }"
    >
      <ChevronUp class="w-6 h-6 text-zinc-400 animate-bounce" />
      <span class="text-sm text-zinc-400 mt-2">Swipe up to unlock</span>
    </div>
  </div>
</template>
