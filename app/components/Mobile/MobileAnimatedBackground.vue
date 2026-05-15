<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationId: number;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
  }

  const particles: Particle[] = [];
  const NUM_PARTICLES = 50;
  const CONNECTION_DISTANCE = 100;

  function resize() {
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function animate() {
    ctx!.fillStyle = "#0f0f1a";
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    const gradient = ctx!.createRadialGradient(
      canvas!.width / 2,
      canvas!.height / 2,
      0,
      canvas!.width / 2,
      canvas!.height / 2,
      canvas!.height * 0.8,
    );
    gradient.addColorStop(0, "rgba(30, 40, 80, 0.4)");
    gradient.addColorStop(1, "rgba(15, 15, 26, 0)");
    ctx!.fillStyle = gradient;
    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;

      ctx!.beginPath();
      ctx!.fillStyle = `rgba(100, 150, 255, ${p.alpha})`;
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fill();
    }

    ctx!.strokeStyle = "rgba(100, 150, 255, 0.1)";
    ctx!.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DISTANCE) {
          ctx!.beginPath();
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particles[j].x, particles[j].y);
          ctx!.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", () => {});
});
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0" />
</template>
