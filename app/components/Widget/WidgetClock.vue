<script setup lang="ts">
import { useClock } from "~/composables/useClock";

const { now, formatDate, seconds, hourDeg, minuteDeg, secondDeg, digitalTime } =
  useClock();
</script>

<template>
  <div
    class="absolute bottom-24 right-4 w-48 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-xl"
  >
    <div class="relative w-32 h-32 mx-auto mb-3">
      <div
        class="absolute inset-0 rounded-full border-2 border-white/20 bg-zinc-900"
      >
        <div
          v-for="i in 12"
          :key="i"
          class="absolute w-1 h-3 bg-white/60 rounded-full"
          :style="{
            top: '8%',
            left: '50%',
            transform: `translateX(-50%) rotate(${(i - 1) * 30}deg)`,
            transformOrigin: '50% 400%',
          }"
        />

        <div
          class="absolute w-1.5 h-10 bg-white rounded-full shadow-lg"
          :style="{
            bottom: '50%',
            left: '50%',
            transform: `translateX(-50%) rotate(${hourDeg}deg)`,
            transformOrigin: '50% 100%',
          }"
        />

        <div
          class="absolute w-1 h-14 bg-cyan-400 rounded-full shadow-lg"
          :style="{
            bottom: '50%',
            left: '50%',
            transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
            transformOrigin: '50% 100%',
          }"
        />

        <div
          class="absolute w-0.5 h-14 bg-red-500 rounded-full"
          :style="{
            bottom: '50%',
            left: '50%',
            transform: `translateX(-50%) rotate(${secondDeg}deg)`,
            transformOrigin: '50% 100%',
            transition: seconds === 0 ? 'none' : 'transform 0.1s linear',
          }"
        />

        <div
          class="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg"
        />
      </div>
    </div>

    <div class="text-center font-mono">
      <div class="text-2xl font-bold text-white tabular-nums">
        {{ digitalTime.hh }}<span class="animate-pulse">:</span
        >{{ digitalTime.mm
        }}<span class="text-white/40 text-lg">:{{ digitalTime.ss }}</span>
      </div>
      <div class="text-xs text-white/50 mt-1">
        {{ formatDate(now) }}
      </div>
    </div>
  </div>
</template>
