<script setup lang="ts">
import type { BootStage } from "~/types/boot";

const emit = defineEmits<{
  complete: [];
}>();

const stage = ref<BootStage>("grub");

function handleGrubComplete() {
  stage.value = "kernel";
}

function handleKernelComplete() {
  stage.value = "login";
}

function handleLoginComplete() {
  stage.value = "complete";
  emit("complete");
}

function handleSkip() {
  handleLoginComplete();
}
</script>

<template>
  <div class="fixed inset-0 z-50">
    <button
      @click="handleSkip"
      class="fixed top-4 right-4 z-[100] px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-sm font-mono rounded border border-zinc-600 transition-colors"
    >
      Skip →
    </button>

    <BootGrubScreen v-if="stage === 'grub'" @complete="handleGrubComplete()" />
    <BootKernelLog
      v-if="stage === 'kernel'"
      @complete="handleLoginComplete()"
    />
  </div>
</template>
