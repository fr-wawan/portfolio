<script setup lang="ts">
import { computed } from "vue";
import { PORTFOLIO_DATA } from "~/data/portfolio";

function center(text: string, width = 80): string {
  const pad = Math.max(0, Math.floor((width - text.length) / 2));
  return " ".repeat(pad) + text;
}

const RESUME_CONTENT = [
  "=".repeat(80),
  center(PORTFOLIO_DATA.name.toUpperCase()),
  center(PORTFOLIO_DATA.role),
  center(`Age ${PORTFOLIO_DATA.age}  •  ${PORTFOLIO_DATA.location}`),
  "=".repeat(80),
  "",
  "CONTACT",
  "-".repeat(7),
  `  Email     :  ${PORTFOLIO_DATA.email}`,
  `  GitHub    :  ${PORTFOLIO_DATA.github}`,
  `  LinkedIn  :  ${PORTFOLIO_DATA.linkedin}`,
  "",
  "=".repeat(80),
  "",
  "SUMMARY",
  "-".repeat(7),
  ...(PORTFOLIO_DATA.summary.match(/.{1,76}/g)?.map((l) => `  ${l}`) ?? []),
  "",
  "=".repeat(80),
  "",
  "EXPERIENCE",
  "-".repeat(10),
  ...PORTFOLIO_DATA.experience.flatMap((exp) => [
    "",
    `  ${exp.title.toUpperCase()}`,
    `  ${exp.company}  |  ${exp.location}`,
    `  ${exp.period}`,
    ...exp.points.map((p) => `    •  ${p}`),
  ]),
  "",
  "=".repeat(80),
  "",
  "SKILLS",
  "-".repeat(6),
  "",
  `  ${PORTFOLIO_DATA.skills.join("  •  ")}`,
  "",
  "=".repeat(80),
  "",
  "PROJECTS",
  "-".repeat(8),
  ...PORTFOLIO_DATA.projects.flatMap((p) => [
    "",
    `  ${p.name}`,
    `    ${p.desc}`,
    `    Tech  :  ${p.tech.join(", ")}`,
  ]),
  "",
  "=".repeat(80),
  "",
  "AWARDS & ACHIEVEMENTS",
  "-".repeat(21),
  ...PORTFOLIO_DATA.awards.flatMap((a) => [
    "",
    `  •  ${a.title}`,
    `     ${a.issuer}  —  ${a.year}`,
  ]),
  "",
  "=".repeat(80),
].join("\n");

const lines = computed(() => RESUME_CONTENT.split("\n"));
const viewMode = ref<"clean" | "ascii">("clean");

const contactRows = computed(() => [
  { label: "Email", value: PORTFOLIO_DATA.email },
  { label: "GitHub", value: PORTFOLIO_DATA.github },
  { label: "LinkedIn", value: PORTFOLIO_DATA.linkedin },
]);

function toggleViewMode() {
  viewMode.value = viewMode.value === "clean" ? "ascii" : "clean";
}

function getLineClass(line: string): string {
  const base =
    "leading-5 h-5 text-[11px] sm:leading-6 sm:h-6 sm:text-sm whitespace-pre";
  const trimmed = line.trim();

  if (trimmed.match(/^={10,}/)) return `${base} text-zinc-600`;
  if (trimmed.match(/^-{5,}/)) return `${base} text-zinc-600`;
  if (trimmed.match(/^[A-Z][A-Z\s&]+$/) && trimmed.length > 2)
    return `${base} text-cyan-400 font-bold`;
  if (line.match(/^\s{4}•/)) return `${base} text-zinc-400`;
  if (trimmed.startsWith("•")) return `${base} text-zinc-300`;
  if (trimmed.match(/\d{4}\s*-\s*(Present|\d{4})/))
    return `${base} text-yellow-400`;
  if (trimmed.match(/^[A-Z][A-Z\s]+[A-Z]$/) && !trimmed.includes("•"))
    return `${base} text-green-400`;
  if (trimmed.match(/^(Email|GitHub|LinkedIn|Tech)\s*:/))
    return `${base} text-zinc-400`;

  return `${base} text-zinc-300`;
}
</script>

<template>
  <div
    class="h-full flex flex-col bg-zinc-950 text-zinc-100 font-mono text-xs sm:text-sm"
  >
    <!-- Mobile Content -->
    <div v-if="viewMode === 'clean'" class="flex-1 overflow-auto">
      <div class="p-4 space-y-5">
        <div>
          <div class="text-xl font-semibold text-white">
            {{ PORTFOLIO_DATA.name }}
          </div>
          <div class="text-sm text-zinc-300">{{ PORTFOLIO_DATA.role }}</div>
          <div class="text-xs text-zinc-500 mt-1">
            Age {{ PORTFOLIO_DATA.age }} • {{ PORTFOLIO_DATA.location }}
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs uppercase tracking-wider text-zinc-500">
            Contact
          </div>
          <div class="space-y-2">
            <div
              v-for="row in contactRows"
              :key="row.label"
              class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2"
            >
              <div class="text-[10px] uppercase tracking-wider text-zinc-500">
                {{ row.label }}
              </div>
              <div class="text-sm text-zinc-200 break-all">
                {{ row.value }}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs uppercase tracking-wider text-zinc-500">
            Summary
          </div>
          <p class="text-sm text-zinc-300 leading-relaxed">
            {{ PORTFOLIO_DATA.summary }}
          </p>
        </div>

        <div class="space-y-3">
          <div class="text-xs uppercase tracking-wider text-zinc-500">
            Experience
          </div>
          <div class="space-y-3">
            <div
              v-for="exp in PORTFOLIO_DATA.experience"
              :key="exp.title + exp.company"
              class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-3"
            >
              <div class="text-sm text-zinc-100 font-semibold">
                {{ exp.title }}
              </div>
              <div class="text-xs text-zinc-400">
                {{ exp.company }} • {{ exp.location }}
              </div>
              <div class="text-xs text-zinc-500 mt-1">{{ exp.period }}</div>
              <ul class="mt-2 space-y-1">
                <li
                  v-for="(point, i) in exp.points"
                  :key="i"
                  class="text-xs text-zinc-300 leading-relaxed"
                >
                  • {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs uppercase tracking-wider text-zinc-500">
            Skills
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in PORTFOLIO_DATA.skills"
              :key="skill"
              class="px-2 py-1 text-[11px] rounded bg-zinc-800 text-zinc-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-xs uppercase tracking-wider text-zinc-500">
            Projects
          </div>
          <div class="space-y-3">
            <div
              v-for="project in PORTFOLIO_DATA.projects"
              :key="project.name"
              class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-3"
            >
              <div class="text-sm text-zinc-100 font-semibold">
                {{ project.name }}
              </div>
              <div class="text-xs text-zinc-400 mt-1">
                {{ project.desc }}
              </div>
              <div class="text-xs text-zinc-500 mt-2">
                Tech: {{ project.tech.join(", ") }}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-xs uppercase tracking-wider text-zinc-500">
            Awards
          </div>
          <div class="space-y-2">
            <div
              v-for="award in PORTFOLIO_DATA.awards"
              :key="award.title + award.year"
              class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2"
            >
              <div class="text-sm text-zinc-100">{{ award.title }}</div>
              <div class="text-xs text-zinc-500">
                {{ award.issuer }} — {{ award.year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Content -->
    <div v-else class="flex-1 overflow-auto">
      <div class="flex">
        <div
          class="hidden sm:block w-12 bg-zinc-900 text-zinc-600 text-right pr-2 pt-2 select-none border-r border-zinc-800 shrink-0"
        >
          <div v-for="(_, i) in lines" :key="i" class="leading-6 h-6">
            {{ i + 1 }}
          </div>
        </div>

        <div class="flex-1 p-2 sm:pl-4 min-w-0">
          <div v-for="(line, i) in lines" :key="i" :class="getLineClass(line)">
            {{ line || " " }}
          </div>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div
      class="min-h-6 bg-zinc-800 border-t border-zinc-700 flex flex-wrap items-center gap-y-1 px-2 sm:px-3 text-[10px] sm:text-xs text-zinc-400 shrink-0"
    >
      <span class="bg-zinc-700 px-2 py-0.5 rounded text-zinc-300 mr-2">
        -- NORMAL --
      </span>
      <span class="truncate max-w-[120px] sm:max-w-none">resume.txt</span>
      <span class="mx-2 hidden sm:inline">|</span>
      <span class="hidden sm:inline">{{ lines.length }} lines</span>
      <span class="flex-1" />
      <button
        class="px-2 py-0.5 rounded border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        @click="toggleViewMode"
      >
        {{ viewMode === "clean" ? "ASCII" : "CLEAN" }}
      </button>
      <span class="mx-2 hidden sm:inline">|</span>
      <span>UTF-8</span>
      <span class="mx-2 hidden sm:inline">|</span>
      <span class="hidden sm:inline">LF</span>
    </div>
  </div>
</template>
