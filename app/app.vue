<script setup lang="ts">
const isBooted = ref(false);
const { isMobile } = useIsMobile();
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="h-screen w-screen bg-black flex items-center justify-center">
        <div
          class="w-8 h-8 border-2 border-zinc-600 border-t-zinc-200 rounded-full animate-spin"
        />
      </div>
    </template>

    <MobileExperience v-if="isMobile" />

    <main class="h-screen w-screen overflow-hidden" v-else>
      <BootSequence v-if="!isBooted" @complete="isBooted = true" />
      <Desktop v-else />
    </main>
  </ClientOnly>
</template>
