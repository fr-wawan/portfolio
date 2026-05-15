<script setup lang="ts">
const emit = defineEmits<{
  complete: [];
}>();
const countdown = ref(3);
const selectedOption = ref(0);

const options = [
  "Portfolio OS GNU/Linux",
  "Portfolio OS GNU/Linux (recovery mode)",
];

let timer: ReturnType<typeof setInterval> | null = null;

function startCountdown() {
  timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      stopCountdown();
      emit("complete");
    }
  }, 1000);
}

function stopCountdown() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      selectedOption.value =
        (selectedOption.value - 1 + options.length) % options.length;
      break;

    case "ArrowDown":
      event.preventDefault();
      selectedOption.value = (selectedOption.value + 1) % options.length;
      break;

    case "Enter":
      stopCountdown();
      emit("complete");
      break;

    default:
      break;
  }
}

onMounted(() => {
  startCountdown();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  stopCountdown();
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="h-screen w-screen bg-black text-white font-mono flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-zinc-700">
      <div class="text-center text-zinc-400 text-sm">GNU GRUB version 2.06</div>
    </div>

    <!-- Menu -->
    <main class="flex-1 flex flex-col items-center justify-center">
      <div class="w-full max-w-2xl px-8">
        <div class="border border-zinc-600 bg-zinc-900/50 rounded">
          <div
            v-for="(option, index) in options"
            :key="index"
            class="px-4 py-2 cursor-pointer transition-colors"
            :class="
              selectedOption === index
                ? 'bg-white text-black'
                : 'text-zinc-300 hover:bg-zinc-800'
            "
            @click="selectedOption = index"
          >
            {{ option }}
          </div>
        </div>

        <div class="mt-6 text-center text-zinc-500 text-sm">
          Use the ↑ and ↓ keys to select which entry is highlighted.
        </div>
        <div class="mt-2 text-center text-zinc-500 text-sm">
          Press enter to boot the selected OS.
        </div>
        <div class="mt-4 text-center">
          <span class="text-zinc-400"
            >The highlighted entry will be executed automatically in
          </span>
          <span class="text-white font-bold">{{ countdown }}</span>
          <span class="text-zinc-400">s.</span>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <div class="p-4 border-t border-zinc-700 text-zinc-500 text-xs text-center">
      Press F1 for help, or c for a command-line.
    </div>
  </div>
</template>
