import React, { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
  angle: number;
  angleSpeed: number;
  hue: number;
}

export const Fireflies: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of subtle fireflies based on screen size (subtle & elegant)
    const count = Math.min(Math.floor(width / 60), 28);
    const fireflies: Firefly[] = [];

    for (let i = 0; i < count; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 1.2, // 1.2px to 3.0px
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45 - 0.1, // Slight upward drift
        alpha: Math.random() * 0.5 + 0.1,
        targetAlpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.03,
        hue: 42 + (Math.random() - 0.5) * 8, // Warm Champagne / Golden Amber
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // Smooth meandering motion using trigonometry
        f.angle += f.angleSpeed;
        f.x += f.vx + Math.cos(f.angle) * 0.35;
        f.y += f.vy + Math.sin(f.angle) * 0.35;

        // Wrap around viewport edges softly
        if (f.x < -20) f.x = width + 20;
        if (f.x > width + 20) f.x = -20;
        if (f.y < -20) f.y = height + 20;
        if (f.y > height + 20) f.y = -20;

        // Firefly breathing/pulsing luminescence
        f.alpha += (f.targetAlpha - f.alpha) * f.pulseSpeed;
        if (Math.abs(f.targetAlpha - f.alpha) < 0.05) {
          f.targetAlpha = Math.random() * 0.65 + 0.15;
        }

        // Render delicate layered glow
        const glowRadius = f.size * 5;
        const gradient = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          glowRadius
        );

        // Core gold sparkle & diffused warm halo
        gradient.addColorStop(0, `hsla(${f.hue}, 85%, 72%, ${f.alpha})`);
        gradient.addColorStop(0.35, `hsla(${f.hue}, 80%, 65%, ${f.alpha * 0.45})`);
        gradient.addColorStop(1, `hsla(${f.hue}, 80%, 55%, 0)`);

        ctx.beginPath();
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Tiny brilliant pin-point core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45, 95%, 90%, ${Math.min(f.alpha * 1.3, 0.95)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};
