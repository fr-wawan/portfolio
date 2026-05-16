<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { MobileAppId } from "~/types/mobile";
import { PORTFOLIO_DATA } from "~/data/portfolio";

const props = defineProps<{
  appId: MobileAppId;
  appLabel: string;
  time: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div class="min-h-[100vh] w-screen bg-zinc-900 flex flex-col">
    <!-- App Header -->
    <div
      class="h-14 bg-zinc-800/50 backdrop-blur-md flex items-center px-4 border-b border-zinc-700/50 shrink-0"
    >
      <button
        class="p-2 -ml-2 hover:bg-zinc-700 rounded-lg transition-colors active:scale-95"
        @click="emit('close')"
      >
        <X class="w-5 h-5 text-zinc-300" />
      </button>
      <span class="ml-2 text-zinc-100 font-medium">{{ props.appLabel }}</span>
    </div>

    <div class="flex-1 overflow-hidden">
      <TerminalApp
        v-if="props.appId === 'terminal'"
        initial-command="neofetch"
      />

      <FileManager v-else-if="props.appId === 'files'" />

      <TextEditor v-else-if="props.appId === 'editor'" />

      <Browser v-else-if="props.appId === 'browser'" />

      <div
        v-else-if="props.appId === 'contact'"
        class="h-full bg-zinc-900 p-6 overflow-auto"
      >
        <h2 class="text-xl font-bold text-white mb-6">Get In Touch</h2>
        <div class="space-y-4">
          <a
            :href="`mailto:${PORTFOLIO_DATA.email}`"
            class="block bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl p-4 hover:from-zinc-700 hover:to-zinc-800 transition-all border border-zinc-700/50"
          >
            <div class="text-zinc-400 text-xs uppercase tracking-wider mb-1">
              Email
            </div>
            <div class="text-white font-medium">{{ PORTFOLIO_DATA.email }}</div>
          </a>
          <a
            :href="`${PORTFOLIO_DATA.github}`"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl p-4 hover:from-zinc-700 hover:to-zinc-800 transition-all border border-zinc-700/50"
          >
            <div class="text-zinc-400 text-xs uppercase tracking-wider mb-1">
              GitHub
            </div>
            <div class="text-white font-medium">
              {{ PORTFOLIO_DATA.github }}
            </div>
          </a>
          <a
            :href="`${PORTFOLIO_DATA.linkedin}`"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl p-4 hover:from-zinc-700 hover:to-zinc-800 transition-all border border-zinc-700/50"
          >
            <div class="text-zinc-400 text-xs uppercase tracking-wider mb-1">
              LinkedIn
            </div>
            <div class="text-white font-medium">
              {{ PORTFOLIO_DATA.linkedin }}
            </div>
          </a>
        </div>
      </div>

      <div
        v-else
        class="h-full flex items-center justify-center text-zinc-500 text-sm"
      >
        {{ props.appLabel }} — coming soon
      </div>
    </div>
  </div>
</template>
