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

const currentTime = computed(() => formatTime(now.value));
const currentDate = computed(() => formatDate(now.value));

const activeAppLabel = computed(
  () => MOBILE_APPS.find((a) => a.id === activeApp.value)?.label ?? "",
);

function openApp(id: MobileAppId) {
  activeApp.value = id;
}

function closeApp() {
  activeApp.value = null;
}
</script>

<template>
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

  <MobileAppView
    v-else-if="activeApp"
    :app-id="activeApp"
    :app-label="activeAppLabel"
    :time="currentTime"
    @close="closeApp"
  />

  <MobileHomeScreen v-else :time="currentTime" @open-app="openApp" />
</template>
