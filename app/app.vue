<script setup lang="ts">
const isBooted = ref(false);

function handleBootComplete() {
  isBooted.value = true;
}
</script>

<template>
  <main className="h-screen w-screen overflow-hidden">
    <BootSequence v-if="!isBooted" @complete="handleBootComplete" />
    <Desktop v-if="isBooted" />
  </main>
</template>
