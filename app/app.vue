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

    <main class="h-screen w-screen overflow-hidden bg-[#0a0a14]" v-else>
      <Transition name="boot-fade" mode="out-in">
        <BootSequence v-if="!isBooted" @complete="isBooted = true" />
        <Desktop v-else />
      </Transition>
    </main>
  </ClientOnly>
</template>

<style scoped>
.boot-fade-enter-active,
.boot-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.boot-fade-enter-from,
.boot-fade-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.995);
}

.boot-fade-enter-to,
.boot-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
