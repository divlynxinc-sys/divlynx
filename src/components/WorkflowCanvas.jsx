import { useEffect, useRef } from "react";
import "../css/workflow.css";

export default function WorkflowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000, active: false };
    let nodes = [];
    let width = 0;
    let height = 0;
    let frame;
    let lastTime = performance.now();

    const buildNetwork = () => {
      const compact = width < 700;
      const count = compact ? 22 : 58;
      nodes = Array.from({ length: count }, (_, index) => {
        const homeY = (0.06 + ((index * 0.61803398875) % 1) * 0.88) * height;
        const direction = index % 2 === 0 ? 1 : -1;
        return {
          x: ((index * 0.754877666) % 1) * (width + 180) - 90,
          y: homeY,
          homeY,
          vx: 0,
          vy: 0,
          direction,
          speed: 0.78 + (index % 6) * 0.09,
          phase: index * 0.79,
          size: compact
            ? (index % 9 === 0 ? 1.35 : index % 4 === 0 ? 0.9 : 0.65)
            : (index % 11 === 0 ? 2.6 : index % 4 === 0 ? 1.6 : 1.05),
          amber: index % 8 === 0,
        };
      });

    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, width < 700 ? 3 : 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildNetwork();
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };
    const onPointerLeave = () => { pointer.active = false; };

    const update = (time) => {
      const delta = Math.min((time - lastTime) / 16.67, 2);
      const seconds = time / 1000;
      lastTime = time;

      if (!reducedMotion) {
        nodes.forEach((node) => {
          const targetY = node.homeY + Math.cos(seconds * 0.31 + node.phase) * 24;
          node.vx += (node.direction * node.speed - node.vx) * 0.045 * delta;
          node.vy += (targetY - node.y) * 0.0045 * delta;

          if (pointer.active) {
            const dx = node.x - pointer.x;
            const dy = node.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const radius = width < 700 ? 115 : 165;
            if (distance < radius && distance > 0) {
              const force = Math.pow(1 - distance / radius, 2) * 2.5 * delta;
              node.vx += (dx / distance) * force;
              node.vy += (dy / distance) * force;
            }
          }

          node.vx *= Math.pow(0.96, delta);
          node.vy *= Math.pow(0.92, delta);
          node.x += node.vx * delta;
          node.y += node.vy * delta;

          if (node.direction > 0 && node.x > width + 90) node.x = -90;
          if (node.direction < 0 && node.x < -90) node.x = width + 90;
        });
      }

      context.clearRect(0, 0, width, height);

      let linkIndex = 0;
      nodes.forEach((start, startIndex) => {
        nodes.slice(startIndex + 1).forEach((end, offset) => {
          const distance = Math.hypot(end.x - start.x, end.y - start.y);
          const compact = width < 700;
          const connectionRadius = compact ? 105 : 165;
          if (distance >= connectionRadius) return;

          const tension = (1 - distance / connectionRadius) * (compact ? 0.1 : 0.16);
          const startX = compact ? Math.round(start.x * 2) / 2 : start.x;
          const startY = compact ? Math.round(start.y * 2) / 2 : start.y;
          const endX = compact ? Math.round(end.x * 2) / 2 : end.x;
          const endY = compact ? Math.round(end.y * 2) / 2 : end.y;
          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.strokeStyle = `rgba(211,205,196,${tension})`;
          context.lineWidth = compact ? 0.5 : 0.7;
          context.stroke();

          if (!reducedMotion && linkIndex % 7 === 0) {
            const endIndex = startIndex + offset + 1;
            const progress = (seconds * 0.13 + ((startIndex * 17 + endIndex * 13) % 100) / 100) % 1;
            const signalX = start.x + (end.x - start.x) * progress;
            const signalY = start.y + (end.y - start.y) * progress;
            context.beginPath();
            context.arc(signalX, signalY, 1.4, 0, Math.PI * 2);
            context.fillStyle = "rgba(255,163,26,.88)";
            context.shadowColor = "rgba(247,132,0,.75)";
            context.shadowBlur = compact ? 3 : 7;
            context.fill();
            context.shadowBlur = 0;
          }
          linkIndex += 1;
        });
      });

      nodes.forEach((node) => {
        const compact = width < 700;
        const glowRadius = node.size * (compact ? 2.6 : 5);
        const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        glow.addColorStop(0, node.amber ? "rgba(255,163,26,.78)" : "rgba(237,233,227,.65)");
        glow.addColorStop(0.22, node.amber ? "rgba(247,132,0,.38)" : "rgba(237,233,227,.2)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        context.beginPath();
        context.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();
        context.beginPath();
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        context.fillStyle = node.amber ? "#ffa31a" : "rgba(237,233,227,.72)";
        context.fill();
      });

      if (!reducedMotion) frame = requestAnimationFrame(update);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    update(lastTime);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="neural-field" aria-hidden="true">
      <canvas ref={canvasRef} className="neural-field__canvas" />
      <div className="neural-field__focus" />
    </div>
  );
}
