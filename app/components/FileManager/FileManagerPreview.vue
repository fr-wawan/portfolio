<script setup lang="ts">
import { Github, ExternalLink, Lock, ShieldCheck, Clock3 } from "lucide-vue-next";
import { PORTFOLIO_DATA } from "~/data/portfolio";
import type { FileItem } from "~/types/file-manager";

const props = defineProps<{
  file: FileItem;
}>();

const selectedProject = computed(() =>
  PORTFOLIO_DATA.projects.find((p) => p.name === props.file.name),
);

const statusLabel = computed(() =>
  (selectedProject.value?.status ?? "private").toUpperCase(),
);
</script>

<template>
  <div
    class="w-full sm:w-1/2 border-t sm:border-t-0 sm:border-l border-zinc-700 p-4 overflow-auto bg-zinc-850"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-lg font-semibold text-zinc-100">
          {{ props.file.name }}
        </h3>
        <p v-if="props.file.description" class="text-sm text-zinc-400 mt-1">
          {{ props.file.description }}
        </p>
      </div>
      <span
        v-if="selectedProject"
        class="shrink-0 rounded px-2 py-1 text-[10px] font-semibold tracking-widest border"
        :class="{
          'text-red-400 border-red-500/30 bg-red-500/10':
            selectedProject.status === 'private',
          'text-green-400 border-green-500/30 bg-green-500/10':
            selectedProject.status === 'public',
          'text-yellow-400 border-yellow-500/30 bg-yellow-500/10':
            selectedProject.status === 'wip',
        }"
      >
        {{ statusLabel }}
      </span>
    </div>

    <div v-if="selectedProject" class="mt-4 space-y-4">
      <div class="grid grid-cols-1 gap-2 text-xs text-zinc-400">
        <div v-if="selectedProject.role" class="flex items-center gap-2">
          <ShieldCheck class="w-4 h-4 text-zinc-500" />
          <span>{{ selectedProject.role }}</span>
        </div>
        <div v-if="selectedProject.period" class="flex items-center gap-2">
          <Clock3 class="w-4 h-4 text-zinc-500" />
          <span>{{ selectedProject.period }}</span>
        </div>
        <div v-if="selectedProject.url" class="flex items-center gap-2">
          <Lock class="w-4 h-4 text-zinc-500" />
          <span class="truncate">{{ selectedProject.url }}</span>
        </div>
      </div>

      <p v-if="selectedProject.longDescription" class="text-sm text-zinc-300">
        {{ selectedProject.longDescription }}
      </p>

      <div v-if="selectedProject.techDetail?.length" class="space-y-2">
        <p class="text-xs text-zinc-500 uppercase tracking-wider">Tech Stack</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in selectedProject.techDetail"
            :key="tech.name"
            class="px-2 py-1 text-xs rounded border border-zinc-700 bg-zinc-800/70 text-zinc-200"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>

      <div v-else-if="props.file.tech" class="space-y-2">
        <p class="text-xs text-zinc-500 uppercase tracking-wider">Tech Stack</p>
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

      <div v-if="selectedProject.highlights?.length" class="space-y-2">
        <p class="text-xs text-zinc-500 uppercase tracking-wider">Highlights</p>
        <ul class="space-y-1">
          <li
            v-for="(h, i) in selectedProject.highlights"
            :key="i"
            class="text-sm text-zinc-300"
          >
            • {{ h }}
          </li>
        </ul>
      </div>

      <div class="flex flex-wrap gap-3">
        <a
          v-if="selectedProject.githubUrl"
          :href="selectedProject.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 rounded transition-colors"
        >
          <Github class="w-4 h-4" />
          GitHub
        </a>
        <a
          v-if="selectedProject.liveUrl"
          :href="selectedProject.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded transition-colors"
        >
          <ExternalLink class="w-4 h-4" />
          Live Demo
        </a>
      </div>
    </div>

    <div v-else>
      <div v-if="props.file.tech" class="mt-4">
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
  </div>
</template>
