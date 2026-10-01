import React, { useEffect, useRef } from 'react';

const CosmicCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes - Cosmic stars with warm gold, champagne, and star-white
    const particleCount = Math.floor(Math.min(width, 1400) / 14);
    const particles = [];
    const colors = [
      'rgba(245, 230, 211, ', // warm champagne star
      'rgba(217, 180, 130, ', // golden sand / warm beige
      'rgba(251, 191, 36, ',  // amber cosmic glow
      'rgba(226, 232, 240, ', // star diamond white
      'rgba(147, 197, 253, ', // soft celestial blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.6 + 0.25,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap edges
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Mouse gentle repulsion / pull
        const dxM = mouseX - p1.x;
        const dyM = mouseY - p1.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 160) {
          p1.x -= (dxM / distM) * 0.4;
          p1.y -= (dyM / distM) * 0.4;
        }

        // Twinkling alpha
        const twinkle = Math.sin(Date.now() * 0.002 * p1.twinkleSpeed * 100 + p1.twinkleOffset) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(0.95, p1.baseAlpha + twinkle));

        // Particle circle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${currentAlpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 105) * 0.12;
            ctx.strokeStyle = `rgba(230, 210, 185, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    />
  );
};

export default CosmicCanvas;
