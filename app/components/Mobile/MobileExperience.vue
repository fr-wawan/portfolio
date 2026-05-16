<script setup lang="ts">
import { ref, computed } from "vue";
import type { MobileAppId } from "~/types/mobile";
import { MOBILE_APPS } from "~/data/mobile-apps";
import { useLockScreen } from "~/composables/useLockScreen";
import { useClock } from "~/composables/useClock";

const { isLocked, swipeY, unlock, onTouchStart, onTouchMove, onTouchEnd } =
  useLockScreen();
const { now, formatTime, formatDate } = useClock();

const activeApp = ref<MobileAppId | null>(null);
const transitionName = ref("android-app");

const currentTime = computed(() => formatTime(now.value));
const currentDate = computed(() => formatDate(now.value));

const activeAppLabel = computed(
  () => MOBILE_APPS.find((a) => a.id === activeApp.value)?.label ?? "",
);

const view = computed(() =>
  isLocked.value ? "lock" : activeApp.value ? "app" : "home",
);

watch(view, (next, prev) => {
  if (prev === "lock" && next === "home") {
    transitionName.value = "android-unlock";
    return;
  }
  if (prev === "home" && next === "app") {
    transitionName.value = "android-app";
    return;
  }
  if (prev === "app" && next === "home") {
    transitionName.value = "android-app";
    return;
  }
  transitionName.value = "android-app";
});

function openApp(id: MobileAppId) {
  activeApp.value = id;
}

function closeApp() {
  activeApp.value = null;
}
</script>

<template>
  <div class="min-h-[100vh] w-screen bg-[#0a0a14]">
    <MobileLockScreen
      v-if="isLocked"
      :time="currentTime"
      :date="currentDate"
      :swipe-y="swipeY"
      @unlock="unlock"
      @touch-start="onTouchStart"
      @touch-move="onTouchMove"
      @touch-end="onTouchEnd"
    />

    <template v-else>
      <MobileStatusBar :time="currentTime" />

      <Transition :name="transitionName" mode="out-in">
        <MobileAppView
          v-if="activeApp"
          :app-id="activeApp"
          :app-label="activeAppLabel"
          :time="currentTime"
          @close="closeApp"
        />
        <MobileHomeScreen v-else :time="currentTime" @open-app="openApp" />
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.android-app-enter-active,
.android-app-leave-active {
  transition:
    transform 0.2s cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 0.2s ease;
}

.android-app-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.android-app-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.android-unlock-enter-active,
.android-unlock-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.android-unlock-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.android-unlock-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
