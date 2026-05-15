<script setup lang="ts">
import { PORTFOLIO_DATA } from "~/data/portfolio";
import type { Project } from "~/types/project";

const projects = PORTFOLIO_DATA.projects ?? [];

const projectKey = (p: Project) => p.id ?? p.name;

const activeId = ref<string>(projects[0] ? projectKey(projects[0]) : "");

const activeProject = computed<Project | null>(
  () =>
    projects.find((p) => projectKey(p) === activeId.value) ??
    projects[0] ??
    null,
);

const isLoading = ref(false);

function selectProject(id: string) {
  if (!id || id === activeId.value) return;
  isLoading.value = true;
  activeId.value = id;
  setTimeout(() => (isLoading.value = false), 300);
}

const displayUrl = computed(() => {
  if (!activeProject.value) return "";
  return (
    activeProject.value.url ??
    `https://portfolio.dev/projects/${activeProject.value.id ?? activeProject.value.name}`
  );
});

const isPublic = computed(
  () =>
    activeProject.value?.status === "public" && !!activeProject.value?.liveUrl,
);
</script>

<template>
  <div class="h-full flex flex-col bg-zinc-900">
    <div
      class="bg-zinc-800 border-b border-zinc-700 flex flex-wrap items-center px-2 sm:px-3 py-2 gap-2 shrink-0"
    >
      <button
        class="p-1.5 sm:p-2 rounded hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        disabled
      >
        <svg
          class="w-4 h-4 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        class="p-1.5 sm:p-2 rounded hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        disabled
      >
        <svg
          class="w-4 h-4 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
      <button
        class="p-1.5 sm:p-2 rounded hover:bg-zinc-700 transition-colors"
        @click="selectProject(activeId)"
      >
        <svg
          class="w-4 h-4 text-zinc-400"
          :class="{ 'animate-spin': isLoading }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"
          />
        </svg>
      </button>

      <div
        class="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded border border-zinc-700 w-full sm:flex-1 order-last sm:order-none"
      >
        <svg
          class="w-3.5 h-3.5 shrink-0"
          :class="isPublic ? 'text-green-500' : 'text-zinc-500'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span class="text-xs sm:text-sm text-zinc-400 truncate">
          {{ displayUrl }}
        </span>
        <span
          class="ml-auto shrink-0 text-[10px] sm:text-xs font-semibold tracking-wide"
          :class="{
            'text-red-400': (activeProject?.status ?? 'private') === 'private',
            'text-green-400': activeProject?.status === 'public',
            'text-yellow-400': activeProject?.status === 'wip',
          }"
        >
          {{ (activeProject?.status ?? "private").toUpperCase() }}
        </span>
      </div>
    </div>

    <div
      class="bg-zinc-800 border-b border-zinc-700 flex items-center px-2 py-1 gap-1 overflow-x-auto shrink-0"
    >
      <button
        v-for="project in projects"
        :key="projectKey(project)"
        class="flex items-center gap-2 px-3 py-1.5 rounded-t text-xs sm:text-sm transition-colors whitespace-nowrap"
        :class="
          activeId === projectKey(project)
            ? 'bg-zinc-900 text-zinc-100'
            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
        "
        @click="selectProject(projectKey(project))"
      >
        <span>{{ "🌐" }}</span>
        <span class="truncate max-w-24 sm:max-w-40">{{ project.name }}</span>
      </button>
    </div>

    <div
      v-if="!activeProject"
      class="flex-1 flex items-center justify-center bg-zinc-950"
    >
      <p class="text-sm text-zinc-600">No project selected</p>
    </div>

    <div v-else class="flex-1 bg-zinc-950 relative overflow-hidden">
      <Transition
        enter-active-class="transition-all duration-200"
        leave-active-class="transition-all duration-150"
        enter-from-class="opacity-0 translate-y-1"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <div :key="activeId" class="h-full overflow-hidden">
          <BrowserPublicPage v-if="isPublic" :project="activeProject" />
          <BrowserPrivatePage v-else :project="activeProject" />
        </div>
      </Transition>
    </div>
  </div>
</template>
