import { ref, computed, onMounted, onUnmounted } from "vue";

export function useClock() {
  const now = ref(new Date());
  let timer: ReturnType<typeof setInterval>;

  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date();
    }, 1000);
  });

  onUnmounted(() => clearInterval(timer));

  function formatTime(date: Date): string {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  const hours = computed(() => now.value.getHours());
  const minutes = computed(() => now.value.getMinutes());
  const seconds = computed(() => now.value.getSeconds());

  const hourDeg = computed(() => (hours.value % 12) * 30 + minutes.value * 0.5);
  const minuteDeg = computed(() => minutes.value * 6);
  const secondDeg = computed(() => seconds.value * 6);

  const digitalTime = computed(() => ({
    hh: String(hours.value).padStart(2, "0"),
    mm: String(minutes.value).padStart(2, "0"),
    ss: String(seconds.value).padStart(2, "0"),
  }));

  return {
    now,
    formatTime,
    formatDate,
    seconds,
    hourDeg,
    minuteDeg,
    secondDeg,
    digitalTime,
  };
}
