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

function getLineClass(line: string): string {
  const base = "leading-6 h-6 whitespace-pre";
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
  <div class="h-full flex flex-col bg-zinc-950 text-zinc-100 font-mono text-sm">
    <!-- Editor Content -->
    <div class="flex-1 overflow-auto">
      <div class="flex">
        <!-- Line Numbers -->
        <div
          class="w-12 bg-zinc-900 text-zinc-600 text-right pr-2 pt-2 select-none border-r border-zinc-800 shrink-0"
        >
          <div v-for="(_, i) in lines" :key="i" class="leading-6 h-6">
            {{ i + 1 }}
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 p-2 pl-4 min-w-0">
          <div v-for="(line, i) in lines" :key="i" :class="getLineClass(line)">
            {{ line || " " }}
          </div>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div
      class="h-6 bg-zinc-800 border-t border-zinc-700 flex items-center px-3 text-xs text-zinc-400 shrink-0"
    >
      <span class="bg-zinc-700 px-2 py-0.5 rounded text-zinc-300 mr-3"
        >-- NORMAL --</span
      >
      <span>resume.txt</span>
      <span class="mx-2">|</span>
      <span>{{ lines.length }} lines</span>
      <span class="flex-1" />
      <span>UTF-8</span>
      <span class="mx-2">|</span>
      <span>LF</span>
    </div>
  </div>
</template>
