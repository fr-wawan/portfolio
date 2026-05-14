<script setup lang="ts">
const props = defineProps<{
  currentDir: string;
}>();

const emit = defineEmits<{
  submit: [value: string];
  navigate: [direction: "up" | "down"];
  autocomplete: [value: string];
}>();

const input = ref("");
const inputRef = useTemplateRef("inputRef");

function onKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case "Enter":
      emit("submit", input.value);
      input.value = "";
      break;

    case "ArrowUp":
      e.preventDefault();
      emit("navigate", "up");
      break;

    case "ArrowDown":
      e.preventDefault();
      emit("navigate", "down");
      break;

    case "Tab":
      e.preventDefault();
      emit("autocomplete", input.value);
      break;
  }
}

function setValue(val: string) {
  input.value = val;
}

defineExpose({ focus: () => inputRef.value?.focus(), setValue });
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-green-400">user@portfolio</span>
    <span class="text-zinc-500">:</span>
    <span class="text-blue-400">{{ currentDir }}</span>
    <span class="text-zinc-500">$</span>
    <input
      ref="inputRef"
      v-model="input"
      type="text"
      class="flex-1 bg-transparent outline-none text-zinc-100 caret-zinc-100"
      autocomplete="off"
      spellcheck="false"
      @keydown="onKeydown"
    />
  </div>
</template>
