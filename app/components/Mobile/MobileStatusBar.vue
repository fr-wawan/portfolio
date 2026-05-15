<script setup lang="ts">
defineProps<{
  time: string;
}>();
</script>

<template>
  <div
    class="h-10 flex items-center justify-between px-4 shrink-0 relative z-10"
  >
    <span class="text-xs text-zinc-300 font-medium">{{ time }}</span>

    <div class="flex items-center gap-1">
      <!-- Signal bars -->
      <div class="flex gap-0.5">
        <div class="w-1 h-2 bg-white rounded-sm" />
        <div class="w-1 h-3 bg-white rounded-sm" />
        <div class="w-1 h-4 bg-white rounded-sm" />
        <div class="w-1 h-3 bg-zinc-500 rounded-sm" />
      </div>
      <!-- Battery -->
      <div
        class="w-6 h-3 rounded-sm bg-green-500 ml-1 flex items-center justify-end pr-0.5"
      >
        <div class="w-0.5 h-1.5 bg-green-900 rounded-sm" />
      </div>
    </div>
  </div>
</template>
