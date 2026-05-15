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

  return { now, formatTime, formatDate };
}
