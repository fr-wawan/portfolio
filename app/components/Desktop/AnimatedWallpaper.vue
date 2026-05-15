<script lang="ts" setup>
interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  color: string;
}

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

const STAR_COUNT = 180;
const SPEED = 1.8;
const COLORS = ["255,255,255", "180,200,255", "255,240,180", "200,220,255"];

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  let animationId = 0;
  let stars: Star[] = [];
  let nebulaCanvas: HTMLCanvasElement | null = null;
  let w = 0;
  let h = 0;

  function buildNebulaCanvas() {
    const nc = document.createElement("canvas");
    nc.width = w;
    nc.height = h;
    const nctx = nc.getContext("2d")!;

    const blobs = [
      { x: w * 0.2, y: h * 0.3, r: w * 0.35, c: "60,40,120" },
      { x: w * 0.75, y: h * 0.6, r: w * 0.3, c: "20,60,100" },
      { x: w * 0.5, y: h * 0.8, r: w * 0.25, c: "80,20,80" },
    ];

    for (const b of blobs) {
      const g = nctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, `rgba(${b.c},0.18)`);
      g.addColorStop(1, `rgba(${b.c},0)`);
      nctx.fillStyle = g;
      nctx.fillRect(0, 0, w, h);
    }

    return nc;
  }

  function resize() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    nebulaCanvas = buildNebulaCanvas();
  }

  function spawnStar(z?: number): Star {
    return {
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: z ?? Math.random() * w,
      px: 0,
      py: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "",
    };
  }

  function initStars() {
    stars = Array.from({ length: STAR_COUNT }, () => spawnStar());
  }

  function animate() {
    if (!ctx) return;

    const cx = w / 2;
    const cy = h / 2;
    const maxDepth = w;

    ctx.fillStyle = "#06060f";
    ctx.fillRect(0, 0, w, h);

    if (nebulaCanvas) ctx.drawImage(nebulaCanvas, 0, 0);

    // Fade trail: semitransparent overlay instead of full clear
    ctx.fillStyle = "rgba(6,6,15,0.35)";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      if (!star) return;

      const prevSx = star?.px;
      const prevSy = star?.py;

      star.z -= SPEED;

      if (star.z <= 0) {
        stars[i] = spawnStar(maxDepth);
        continue;
      }

      const k = 128 / star.z;
      const sx = star.x * k + cx;
      const sy = star.y * k + cy;

      if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
        stars[i] = spawnStar(maxDepth);
        continue;
      }

      const depth = 1 - star.z / maxDepth;
      const size = Math.max(0.4, depth * 2.5);
      const alpha = Math.max(0.1, depth);

      // Trail
      if (prevSx !== 0 && prevSy !== 0) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${star.color},${(alpha * 0.5).toFixed(2)})`;
        ctx.lineWidth = size * 0.4;
        ctx.moveTo(prevSx, prevSy);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      // Star dot
      ctx.beginPath();
      ctx.fillStyle = `rgba(${star.color},${alpha.toFixed(2)})`;
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();

      star.px = sx;
      star.py = sy;
    }

    animationId = requestAnimationFrame(animate);
  }

  function handleResize() {
    resize();
    initStars();
  }

  resize();
  initStars();
  animate();

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);
    nebulaCanvas = null;
  });
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 pointer-events-none"
    style="z-index: 0"
  />
</template>
