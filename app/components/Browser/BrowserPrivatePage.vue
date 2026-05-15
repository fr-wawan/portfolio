<script setup lang="ts">
import { Lock } from "lucide-vue-next";
import type { Project } from "~/types/project";

defineProps<{ project: Project }>();

type Tab = "overview" | "stack" | "highlights";
const activeTab = ref<Tab>("overview");
const activeScreenshot = ref<null | { src: string; alt?: string }>(null);

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "stack", label: "Tech Stack" },
  { id: "highlights", label: "Highlights" },
];

function openScreenshot(src: string, alt?: string) {
  activeScreenshot.value = { src, alt };
}

function closeScreenshot() {
  activeScreenshot.value = null;
}
</script>

<template>
  <div class="h-full overflow-auto p-4 sm:p-8 bg-zinc-950">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <div
        class="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
      >
        <span class="text-lg">
          <Lock class="text-red-400" />
        </span>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-zinc-500 truncate">{{ project.url }}</p>
          <p class="text-xs text-red-400 mt-0.5">
            ERR_PRIVATE_NETWORK — This project runs on a private server
          </p>
        </div>
        <span
          class="shrink-0 rounded px-2 py-0.5 text-xs font-bold tracking-widest border"
          :class="{
            'text-red-400 border-red-500/30 bg-red-500/10':
              (project.status ?? 'private') === 'private',
            'text-yellow-400 border-yellow-500/30 bg-yellow-500/10':
              project.status === 'wip',
          }"
        >
          {{ (project.status ?? "PRIVATE").toUpperCase() }}
        </span>
      </div>

      <div class="text-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
          {{ project.name }}
        </h1>
        <p class="text-zinc-400">{{ project.desc }}</p>
        <div class="flex flex-wrap items-center justify-center gap-2 mt-3">
          <span
            v-if="project.role"
            class="text-xs text-zinc-400 bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
          >
            {{ project.role }}
          </span>
          <span
            v-if="project.period"
            class="text-xs text-zinc-400 bg-zinc-800 border border-zinc-700 rounded px-2 py-1"
          >
            {{ project.period }}
          </span>
        </div>
      </div>

      <div class="flex flex-wrap gap-1 border-b border-zinc-700">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-3 sm:px-4 py-2 text-sm border-b-2 -mb-px transition-colors whitespace-nowrap"
          :class="
            activeTab === tab.id
              ? 'text-zinc-100 border-white'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          "
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <Transition
        enter-active-class="transition-all duration-200"
        leave-active-class="transition-all duration-150"
        enter-from-class="opacity-0 translate-y-1"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <div :key="activeTab">
          <template v-if="activeTab === 'overview'">
            <p
              v-if="project.longDescription"
              class="text-sm text-zinc-400 leading-relaxed"
            >
              {{ project.longDescription }}
            </p>

            <div
              v-if="!project.screenshots || project.screenshots.length === 0"
              class="aspect-video bg-zinc-800 rounded-lg flex flex-col items-center justify-center gap-2 border border-zinc-700 mt-5"
            >
              <span class="text-3xl opacity-30">
                <Lock class="text-white" />
              </span>
              <p class="text-sm text-zinc-600">
                Screenshots unavailable — client confidentiality
              </p>
            </div>

            <div v-else class="grid grid-cols-1 gap-4 mt-5">
              <div
                v-for="(ss, i) in project.screenshots"
                :key="i"
                class="flex flex-col gap-2"
              >
                <button
                  class="group relative overflow-hidden rounded-lg border border-zinc-700"
                  @click="openScreenshot(ss.src, ss.alt)"
                >
                  <img
                    :src="ss.src"
                    :alt="ss.alt"
                    class="w-full transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
                  />
                </button>
                <p
                  v-if="ss.caption"
                  class="text-white text-center text-zinc-400 text-sm"
                >
                  {{ ss.caption }}
                </p>
              </div>
            </div>
          </template>

          <template v-else-if="activeTab === 'stack'">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div
                v-for="tech in project.techDetail ??
                project.tech.map((t) => ({ name: t, color: '#52525b' }))"
                :key="typeof tech === 'string' ? tech : tech.name"
                class="flex items-center gap-2.5 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 hover:border-zinc-500 transition-colors"
              >
                <span
                  class="size-2.5 rounded-full shrink-0"
                  :style="{
                    background:
                      typeof tech === 'string' ? '#52525b' : tech.color,
                  }"
                />
                <span class="text-sm text-zinc-300 truncate">
                  {{ typeof tech === "string" ? tech : tech.name }}
                </span>
              </div>
            </div>
          </template>

          <template v-else-if="activeTab === 'highlights'">
            <div
              v-if="project.highlights && project.highlights.length"
              class="flex flex-col gap-3"
            >
              <div
                v-for="(h, i) in project.highlights"
                :key="i"
                class="flex items-baseline gap-4 rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3"
              >
                <span
                  class="text-xs font-bold text-blue-400 tracking-wider shrink-0 font-mono"
                >
                  {{ String(i + 1).padStart(2, "0") }}
                </span>
                <span class="text-sm text-zinc-400 leading-relaxed">{{
                  h
                }}</span>
              </div>
            </div>
            <p v-else class="text-sm text-zinc-600">No highlights added yet.</p>
          </template>
        </div>
      </Transition>

      <div
        class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 border-t border-zinc-700"
      >
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-center text-sm rounded-lg transition-colors border border-zinc-700 no-underline"
        >
          View Source Code
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white text-center text-sm rounded-lg transition-colors no-underline"
        >
          Visit Live Site
        </a>
        <p
          v-if="!project.githubUrl && !project.liveUrl"
          class="text-sm text-zinc-600 self-center"
        >
          Source & demo unavailable for this project
        </p>
      </div>
    </div>
  </div>

  <Transition
    enter-active-class="transition-opacity duration-150"
    leave-active-class="transition-opacity duration-150"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="activeScreenshot"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      @click="closeScreenshot"
    >
      <img
        :src="activeScreenshot.src"
        :alt="activeScreenshot.alt ?? ''"
        class="max-h-[90vh] max-w-[90vw] rounded-lg border border-zinc-700"
      />
    </div>
  </Transition>
</template>
