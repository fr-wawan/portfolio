<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Activity, Cpu, MemoryStick, Database, Wifi } from "lucide-vue-next";

interface Stats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

const stats = ref<Stats>({
  cpu: 23,
  memory: 45,
  disk: 62,
  network: 0,
});

const history = ref<number[]>(Array(20).fill(20));

let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  interval = setInterval(() => {
    const newCpu = Math.max(
      5,
      Math.min(95, stats.value.cpu + (Math.random() - 0.5) * 20),
    );
    const newMemory = Math.max(
      30,
      Math.min(80, stats.value.memory + (Math.random() - 0.5) * 5),
    );
    const newNetwork = Math.random() * 100;

    stats.value = {
      cpu: newCpu,
      memory: newMemory,
      disk: stats.value.disk,
      network: newNetwork,
    };

    history.value = [...history.value.slice(1), newCpu];
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

function cpuBarColor(value: number): string {
  if (value > 80) return "#ef4444";
  if (value > 50) return "#f59e0b";
  return "#22c55e";
}

function networkActive(index: number): boolean {
  return index < stats.value.network / 10;
}
</script>

<template>
  <div
    class="absolute top-4 right-4 w-64 bg-black/70 backdrop-blur-md rounded-lg border border-white/10 p-4 font-mono text-xs text-white/90 shadow-xl"
  >
    <!-- Header -->
    <div class="flex items-center gap-2 mb-4 text-emerald-400">
      <Activity class="w-4 h-4" />
      <span class="font-semibold tracking-wide uppercase text-[10px]"
        >System Monitor</span
      >
    </div>

    <!-- CPU -->
    <div class="mb-4">
      <div class="flex justify-between mb-1">
        <span class="flex items-center gap-1 text-white/60">
          <Cpu class="w-3 h-3" />
          CPU
        </span>
        <span class="text-cyan-400 tabular-nums"
          >{{ stats.cpu.toFixed(0) }}%</span
        >
      </div>
      <!-- Bar graph -->
      <div class="h-8 bg-white/5 rounded overflow-hidden flex items-end gap-px">
        <div
          v-for="(value, i) in history"
          :key="i"
          class="flex-1 transition-all duration-300"
          :style="{ height: `${value}%`, background: cpuBarColor(value) }"
        />
      </div>
    </div>

    <!-- Memory -->
    <div class="mb-4">
      <div class="flex justify-between mb-1">
        <span class="flex items-center gap-1 text-white/60">
          <MemoryStick class="w-3 h-3" />
          Memory
        </span>
        <span class="text-purple-400 tabular-nums"
          >{{ stats.memory.toFixed(0) }}%</span
        >
      </div>
      <div class="h-2 bg-white/5 rounded overflow-hidden">
        <div
          class="h-full bg-purple-500 transition-all duration-500"
          :style="{ width: `${stats.memory}%` }"
        />
      </div>
      <div class="text-[10px] text-white/30 mt-1">
        {{ (stats.memory * 0.16).toFixed(1) }} GB / 16 GB
      </div>
    </div>

    <!-- Disk -->
    <div class="mb-4">
      <div class="flex justify-between mb-1">
        <span class="flex items-center gap-1 text-white/60">
          <Database class="w-3 h-3" />
          Disk
        </span>
        <span class="text-orange-400 tabular-nums">{{ stats.disk }}%</span>
      </div>
      <div class="h-2 bg-white/5 rounded overflow-hidden">
        <div
          class="h-full bg-orange-500"
          :style="{ width: `${stats.disk}%` }"
        />
      </div>
      <div class="text-[10px] text-white/30 mt-1">
        {{ (stats.disk * 5.12).toFixed(0) }} GB / 512 GB SSD
      </div>
    </div>

    <!-- Network -->
    <div>
      <div class="flex justify-between mb-1">
        <span class="flex items-center gap-1 text-white/60">
          <Wifi class="w-3 h-3" />
          Network
        </span>
        <span class="text-blue-400 tabular-nums"
          >{{ stats.network.toFixed(0) }} KB/s</span
        >
      </div>
      <div class="flex gap-1">
        <div
          v-for="i in 10"
          :key="i"
          class="flex-1 h-3 rounded-sm transition-all duration-200"
          :class="networkActive(i - 1) ? 'bg-blue-500' : 'bg-white/10'"
        />
      </div>
    </div>
  </div>
</template>
