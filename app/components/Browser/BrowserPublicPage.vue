<script setup lang="ts">
import type { Project } from "~/types/project";

defineProps<{ project: Project }>();

const iframeLoaded = ref(false);
const iframeError = ref(false);

function onLoad() {
  iframeLoaded.value = true;
}
function onError() {
  iframeLoaded.value = true;
  iframeError.value = true;
}
</script>

<template>
  <div class="relative w-full h-full bg-zinc-950">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!iframeLoaded"
        class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-950"
      >
        <div
          class="size-7 rounded-full border-2 border-zinc-800 border-t-blue-500 animate-spin"
        />
        <span class="font-mono text-[11px] text-zinc-600"
          >Connecting to {{ project.url }}</span
        >
      </div>
    </Transition>

    <div
      v-if="iframeError"
      class="flex h-full flex-col items-center justify-center gap-3 px-6 text-center font-mono"
    >
      <span class="text-3xl">🌐</span>
      <p class="text-[13px] sm:text-[14px] text-zinc-200">
        Couldn't load live preview
      </p>
      <p class="text-[12px] text-zinc-600">
        The site may block embedding. Visit directly instead.
      </p>
      <a
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-2 rounded-md bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white hover:bg-blue-500 transition-colors no-underline"
      >
        Open {{ project.name }} ↗
      </a>
    </div>

    <iframe
      v-if="!iframeError"
      :src="project.liveUrl"
      :title="project.name"
      class="w-full h-[100vh] border-none transition-opacity duration-300"
      :class="iframeLoaded ? 'opacity-100' : 'opacity-0'"
      allow="fullscreen"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>
