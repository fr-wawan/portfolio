export function useLockScreen() {
  const isLocked = ref(true);
  const swipeY = ref(0);
  const startY = ref(0);

  function unlock() {
    isLocked.value = false;
  }

  function onTouchStart(e: TouchEvent) {
    startY.value = e.touches[0]?.clientY ?? 0;
  }

  function onTouchMove(e: TouchEvent) {
    const diff = startY.value - (e.touches[0]?.clientY ?? 0);

    if (diff > 0) {
      swipeY.value = Math.min(diff, 150);
    }
  }

  function onTouchEnd() {
    if (swipeY.value > 100) unlock();

    swipeY.value = 0;
  }

  return {
    isLocked,
    swipeY,
    unlock,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
