<script setup lang="ts">
const emit = defineEmits<{
  complete: [];
}>();

const kernelMessages = [
  "[    0.000000] Linux version 6.5.0-portfolio (gcc version 12.3.0)",
  "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0-portfolio root=UUID=portfolio",
  "[    0.000000] BIOS-provided physical RAM map:",
  "[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
  "[    0.000001] Initializing cgroup subsys cpuset",
  "[    0.000002] Initializing cgroup subsys cpu",
  "[    0.000003] Initializing cgroup subsys cpuacct",
  "[    0.000124] NX (Execute Disable) protection: active",
  "[    0.000256] DMI: Portfolio Machine/Portfolio Board, BIOS 1.0.0 01/01/2024",
  "[    0.000512] Hypervisor detected: Portfolio VM",
  "[    0.001024] tsc: Fast TSC calibration using PIT",
  "[    0.002048] e820: update [mem 0x00000000-0x00000fff] usable ==> reserved",
  "[    0.004096] Kernel/User page tables isolation: enabled",
  "[    0.008192] ftrace: allocating 45678 entries in 179 pages",
  "[    0.016384] Calgary: detecting Calgary via BIOS EBDA area",
  "[    0.032768] Calgary: Unable to locate Rio Grande table",
  "[    0.065536] Memory: 16384000K/16777216K available",
  "[    0.131072] ACPI: Early table checksum verification disabled",
  "[    0.262144] ACPI: RSDP 0x00000000000E0000 000024 (v02 PORTFOLIO)",
  "[    0.524288] Loading portfolio modules...",
  "[    0.625000] portfolio_skills: TypeScript, React, Next.js loaded",
  "[    0.726000] portfolio_skills: Node.js, Python, Go loaded",
  "[    0.827000] portfolio_projects: initializing project registry",
  "[    0.928000] portfolio_contact: email and social handlers ready",
  "[    1.029000] portfolio_terminal: command interface initialized",
  "[    1.130000] portfolio_desktop: window manager starting",
  "[    1.231000] portfolio_fs: mounting virtual filesystem",
  "[    1.332000] systemd[1]: Detected architecture x86-64",
  "[    1.433000] systemd[1]: Running in initial RAM disk",
  "[    1.534000] systemd[1]: Set hostname to <portfolio>",
  "[    1.635000] systemd[1]: Reached target Local File Systems",
  "[    1.736000] systemd[1]: Started Portfolio Display Manager",
  "[    1.837000] systemd[1]: Startup finished in 1.837s",
];

const visibleLines = ref<string[]>([]);
const containerRef = ref<HTMLDivElement | null>(null);

watch(visibleLines, async () => {
  await nextTick();
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight;
  }
});

function getLineColor(line: string): string {
  if (line.includes("portfolio")) return "oklch(0.7 0.2 145)";
  if (line.includes("systemd")) return "oklch(0.75 0.12 200)";
  return "white";
}

onMounted(() => {
  let index = 0;

  const interval = setInterval(() => {
    if (index < kernelMessages.length) {
      visibleLines.value.push(kernelMessages[index] ?? "");
      index++;
    } else {
      clearInterval(interval);
      setTimeout(() => emit("complete"), 500);
    }
  }, 60);

  onUnmounted(() => clearInterval(interval));
});
</script>

<template>
  <div class="h-screen w-screen bg-black text-white font-mono relative">
    <div class="absolute inset-0 scanlines opacity-30" />

    <div
      ref="containerRef"
      class="h-full overflow-auto p-4 text-sm leading-relaxed"
    >
      <div
        v-for="(line, index) in visibleLines"
        :key="index"
        class="animate-fade-in"
        :style="{ color: getLineColor(line) }"
      >
        {{ line }}
      </div>

      <span class="inline-block w-2 h-4 bg-white animate-pulse ml-1" />
    </div>
  </div>
</template>
