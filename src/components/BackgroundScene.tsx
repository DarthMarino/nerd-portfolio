import { onMount, onCleanup, type Component } from "solid-js";
import Two from "two.js";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  shape: InstanceType<typeof Two.Path> | InstanceType<typeof Two.Circle> | InstanceType<typeof Two.Text>;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  phaseSpeed: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const TECH_LABELS = [
  { text: "TS",      color: "#3178c6" },
  { text: "Go",      color: "#00ADD8" },
  { text: "JS",      color: "#f7df1e" },
  { text: "SQL",     color: "#4479A1" },
  { text: "React",   color: "#61DAFB" },
  { text: "Node",    color: "#339933" },
  { text: "Solid",   color: "#2c4f7c" },
  { text: "Flutter", color: "#02569B" },
  { text: "SQLite",  color: "#003B57" },
  { text: "PG",      color: "#336791" },
  { text: "C#",      color: "#9b4f96" },
  { text: "C++",     color: "#00599C" },
  { text: "Rust",    color: "#CE412B" },
];

const SHAPE_COUNT   = 22;
const CONNECT_DIST  = 160;   // px — max distance to draw a connection line
const MAX_OPACITY   = 0.18;
const BASE_SPEED    = 0.22;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const rand  = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const randSign = () => (Math.random() < 0.5 ? 1 : -1);

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

// ─── Component ───────────────────────────────────────────────────────────────

const BackgroundScene: Component = () => {
  let containerRef: HTMLDivElement | undefined;
  let two: InstanceType<typeof Two>;
  let particles: Particle[] = [];
  let lines: InstanceType<typeof Two.Line>[] = [];
  let lineGroup: InstanceType<typeof Two.Group>;
  let shapeGroup: InstanceType<typeof Two.Group>;
  let animFrameId: number;

  // ── Init ──────────────────────────────────────────────────────────────────

  const init = () => {
    if (!containerRef) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    two = new Two({ type: Two.Types.svg, width: W, height: H });
    two.appendTo(containerRef);

    lineGroup  = two.makeGroup();
    shapeGroup = two.makeGroup();

    // ── Geometric shapes ──────────────────────────────────────────────────
    // sides: 0 = circle, 2 = line (skip), 3..8 = polygons
    const sideCounts = [0, 3, 4, 5, 6, 8];

    for (let i = 0; i < SHAPE_COUNT; i++) {
      const sides = sideCounts[Math.floor(Math.random() * sideCounts.length)];
      const size = rand(10, 40);
      const x = rand(0, W);
      const y = rand(0, H);
      const opacity = rand(0.04, MAX_OPACITY);

      let shape: InstanceType<typeof Two.Path> | InstanceType<typeof Two.Circle> | InstanceType<typeof Two.Polygon>;

      if (sides === 0) {
        shape = two.makeCircle(x, y, size);
      } else {
        shape = two.makePolygon(x, y, size, sides);
      }

      shape.stroke    = `rgba(200,210,255,${opacity * 1.5})`;
      shape.linewidth = rand(0.5, 1.5);
      (shape as any).noFill();

      shapeGroup.add(shape);

      particles.push({
        shape,
        x,
        y,
        vx: randSign() * rand(0.05, BASE_SPEED),
        vy: randSign() * rand(0.05, BASE_SPEED),
        phase: rand(0, Math.PI * 2),
        phaseSpeed: rand(0.005, 0.02),
        orbitRadius: rand(8, 30),
        orbitSpeed: randSign() * rand(0.002, 0.008),
        orbitAngle: rand(0, Math.PI * 2),
        size,
      });
    }

    // ── Tech label particles ───────────────────────────────────────────────
    for (const { text, color } of TECH_LABELS) {
      const x = rand(30, W - 30);
      const y = rand(30, H - 30);
      const opacity = rand(0.08, 0.28);
      const [r, g, b] = hexToRgb(color);

      const label = two.makeText(text, x, y);
      label.size     = rand(11, 20);
      label.fill     = `rgba(${r},${g},${b},${opacity})`;
      label.stroke   = `rgba(${r},${g},${b},${opacity * 0.4})`;
      (label as any).linewidth = 0.5;
      (label as any).family    = "monospace";
      label.weight   = "600";

      shapeGroup.add(label);

      particles.push({
        shape: label as unknown as InstanceType<typeof Two.Path>,
        x,
        y,
        vx: randSign() * rand(0.03, BASE_SPEED * 0.6),
        vy: randSign() * rand(0.03, BASE_SPEED * 0.6),
        phase: rand(0, Math.PI * 2),
        phaseSpeed: rand(0.003, 0.012),
        orbitRadius: rand(5, 18),
        orbitSpeed: randSign() * rand(0.001, 0.006),
        orbitAngle: rand(0, Math.PI * 2),
        size: 14,
      });
    }

    // Pre-allocate connection lines (max possible = n*(n-1)/2, but we reuse)
    const maxLines = Math.floor((particles.length * (particles.length - 1)) / 2);
    for (let i = 0; i < Math.min(maxLines, 200); i++) {
      const line = two.makeLine(0, 0, 0, 0);
      line.stroke  = "transparent";
      line.opacity = 0;
      lineGroup.add(line);
      lines.push(line);
    }

    // ── Animation loop ────────────────────────────────────────────────────
    let tick = 0;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      tick++;

      const W2 = two.width;
      const H2 = two.height;

      // Move particles
      for (const p of particles) {
        p.phase += p.phaseSpeed;
        p.orbitAngle += p.orbitSpeed;

        // Drift + gentle sine wave
        p.x += p.vx + Math.sin(p.phase) * 0.12;
        p.y += p.vy + Math.cos(p.phase * 0.7) * 0.09;

        // Wrap around edges with margin
        const margin = p.size + 20;
        if (p.x < -margin)    p.x = W2 + margin;
        if (p.x > W2 + margin) p.x = -margin;
        if (p.y < -margin)    p.y = H2 + margin;
        if (p.y > H2 + margin) p.y = -margin;

        // Slow random drift nudge every ~180 frames
        if (tick % 180 === 0) {
          p.vx += randSign() * rand(0, 0.04);
          p.vy += randSign() * rand(0, 0.04);
          // Clamp speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > BASE_SPEED) {
            p.vx = (p.vx / speed) * BASE_SPEED;
            p.vy = (p.vy / speed) * BASE_SPEED;
          }
        }

        // Apply position
        p.shape.translation.set(p.x, p.y);

        // Gentle rotation for geometric shapes (not text)
        if (!(p.shape instanceof Two.Text)) {
          p.shape.rotation += p.orbitSpeed * 0.4;
        }
      }

      // Update connection lines
      let lineIdx = 0;
      for (let i = 0; i < particles.length && lineIdx < lines.length; i++) {
        for (let j = i + 1; j < particles.length && lineIdx < lines.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const ln = lines[lineIdx];
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
            ln.vertices[0].set(a.x, a.y);
            ln.vertices[1].set(b.x, b.y);
            ln.stroke  = `rgba(150,180,255,${alpha})`;
            ln.opacity = 1;
            lineIdx++;
          }
        }
      }

      // Hide unused lines
      for (let k = lineIdx; k < lines.length; k++) {
        lines[k].opacity = 0;
      }

      two.update();
    };

    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      two.width  = window.innerWidth;
      two.height = window.innerHeight;
      const renderer = (two as any).renderer;
      if (renderer && renderer.setSize) renderer.setSize(two.width, two.height);
    };
    window.addEventListener("resize", onResize);
    (two as any)._resizeHandler = onResize;
  };

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  onMount(() => init());

  onCleanup(() => {
    cancelAnimationFrame(animFrameId);
    window.removeEventListener("resize", (two as any)?._resizeHandler);
    two?.clear();
    // Remove the SVG element
    if (containerRef) containerRef.innerHTML = "";
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        "z-index": "1",
        "pointer-events": "none",
        overflow: "hidden",
      }}
    />
  );
};

export default BackgroundScene;
