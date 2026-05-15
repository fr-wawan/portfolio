<script setup lang="ts">
import { Github, ExternalLink } from "lucide-vue-next";
import type { FileItem } from "~/types/file-manager";

const props = defineProps<{
  file: FileItem;
}>();
</script>

<template>
  <div class="w-1/2 border-l border-zinc-700 p-4 overflow-auto bg-zinc-850">
    <h3 class="text-lg font-semibold mb-2">{{ props.file.name }}</h3>

    <p v-if="props.file.description" class="text-sm text-zinc-400 mb-4">
      {{ props.file.description }}
    </p>

    <div v-if="props.file.tech" class="mb-4">
      <p class="text-xs text-zinc-500 uppercase tracking-wider mb-2">
        Tech Stack
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in props.file.tech"
          :key="tech"
          class="px-2 py-1 text-xs rounded bg-zinc-700 text-zinc-300"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <div v-if="props.file.links" class="flex gap-3">
      <a
        v-if="props.file.links.github"
        :href="props.file.links.github"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-3 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 rounded transition-colors"
      >
        <Github class="w-4 h-4" />
        GitHub
      </a>
      <a
        v-if="props.file.links.live"
        :href="props.file.links.live"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded transition-colors"
      >
        <ExternalLink class="w-4 h-4" />
        Live Demo
      </a>
    </div>

    <div
      v-if="props.file.content && !props.file.description"
      class="mt-4 p-3 bg-zinc-800 rounded font-mono text-sm text-zinc-300 whitespace-pre-wrap"
    >
      <template v-if="Array.isArray(props.file.content)">
        <template v-for="(seg, i) in props.file.content" :key="i">
          <a
            v-if="seg.type === 'link'"
            :href="seg.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            {{ seg.label }}
          </a>
          <span v-else>{{ seg.value }}</span>
        </template>
      </template>
      <span v-else>{{ props.file.content }}</span>
    </div>
  </div>
</template>
