import { useEffect, useRef } from "react";

interface CanvasProps {
  className?: string;
}

export function ArchitecturalHeroCanvas({ className = "" }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Mouse movement creates smooth isometric perspective tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const isDesktop = w >= 992;
      const cx = isDesktop ? w * 0.67 : w * 0.5;
      const cy = isDesktop ? h * 0.70 : h * 0.72;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetTiltX = ((x - cx) / (w * 0.5)) * 12;
      targetTiltY = ((y - cy) / (h * 0.5)) * 8;
    };

    const handleMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Quad renderer helper
    const drawQuad = (
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      p4: { x: number; y: number },
      fillStyle?: string | CanvasGradient,
      strokeStyle?: string,
      lineWidth = 0.85
    ) => {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
      }
    };

    // Main animation loop: Continuous, realistic structural building construction
    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const cycleDuration = 14; // 14-second total loop
      const cycleTime = elapsed % cycleDuration;

      // Construction progress: 0 to 1
      // 0.0s - 7.5s: Continuous upward construction from foundation to roof
      // 7.5s - 12.0s: FULLY COMPLETED realistic skyscraper on display (4.5 seconds!)
      // 12.0s - 14.0s: Smooth fade and reset for next cycle
      let progress = 0;
      let globalAlpha = 1;

      if (cycleTime < 7.5) {
        const t = cycleTime / 7.5;
        // Ease-in-out smooth erection curve
        progress = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      } else if (cycleTime < 12.0) {
        // Complete building state: 100% finished
        progress = 1.0;
      } else {
        // Smooth cycle reset
        const t = (cycleTime - 12.0) / 2.0;
        progress = 1.0;
        globalAlpha = 1 - Math.sin(t * Math.PI * 0.5);
      }

      // Smooth camera tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = globalAlpha;

      const isDesktop = w >= 992;
      // Position properly: on desktop, in the open right side; on mobile, centered in the dedicated top visual area
      const cx = isDesktop ? w * 0.67 : w * 0.5;
      const cy = isDesktop ? h * 0.70 : Math.min(h * 0.82, h - 35);

      // Responsive building scale to ensure the skyscraper fits within mobile canvas height
      const bScale = isDesktop ? 1.0 : Math.min(0.82, Math.max(0.70, w / 450));
      const bScaleY = 0.58;
      const bProj = (x: number, y: number, z: number) => {
        const px = (x - y) * Math.cos(Math.PI / 6) * bScale;
        const py = (x + y) * Math.sin(Math.PI / 6) * bScaleY * bScale;
        return {
          x: cx + px + currentTiltX * 0.6,
          y: cy + py - (z * bScale) + currentTiltY * 0.45,
        };
      };

      // 1. Draw Architectural Engineering Ground Grid
      const gridSpan = 210 * bScale;
      const gridStep = 21 * bScale;
      const gridAlpha = Math.min(1, progress * 4);

      ctx.save();
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(12, 15, 22, ${0.06 * gridAlpha})`;
      ctx.beginPath();
      for (let x = -gridSpan; x <= gridSpan; x += gridStep) {
        const p1 = bProj(x, -gridSpan, 0);
        const p2 = bProj(x, gridSpan, 0);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      for (let y = -gridSpan; y <= gridSpan; y += gridStep) {
        const p1 = bProj(-gridSpan, y, 0);
        const p2 = bProj(gridSpan, y, 0);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Axis lines
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = `rgba(12, 15, 22, ${0.12 * gridAlpha})`;
      ctx.beginPath();
      const ox1 = bProj(-gridSpan, 0, 0);
      const ox2 = bProj(gridSpan, 0, 0);
      const oy1 = bProj(0, -gridSpan, 0);
      const oy2 = bProj(0, gridSpan, 0);
      ctx.moveTo(ox1.x, ox1.y);
      ctx.lineTo(ox2.x, ox2.y);
      ctx.moveTo(oy1.x, oy1.y);
      ctx.lineTo(oy2.x, oy2.y);
      ctx.stroke();
      ctx.restore();

      // 2. Concrete Ground Plinth / Podium Footing
      const podiumAlpha = Math.min(1, progress * 5);
      const pf0 = bProj(-115, -45, 0);
      const pf1 = bProj(105, -45, 0);
      const pf2 = bProj(105, 55, 0);
      const pf3 = bProj(-115, 55, 0);
      drawQuad(
        pf0,
        pf1,
        pf2,
        pf3,
        `rgba(12, 15, 22, ${0.05 * podiumAlpha})`,
        `rgba(12, 15, 22, ${0.28 * podiumAlpha})`,
        0.85
      );

      // Maximum building height
      const maxOverallHeight = 240;
      // Single global construction frontier height: NOTHING EVER EXISTS ABOVE THIS HEIGHT!
      const currentBuildZ = progress * maxOverallHeight;

      // 3. Robust Solid Skyscraper Tower Renderer
      // Strictly enforces that NO element is drawn above currentBuildZ (zero floating pieces)
      const renderSolidTower = (
        bx: number,
        by: number,
        baseZ: number,
        width: number,
        depth: number,
        targetHeight: number,
        floors: number,
        mullionsX = 4,
        mullionsY = 4,
        hasCrownSpire = false
      ) => {
        // If the construction frontier has not reached the base of this tower, do not render
        if (currentBuildZ <= baseZ) return;

        // Current height of this tower right now
        const actualTopZ = Math.min(baseZ + targetHeight, currentBuildZ);
        const activeHeight = actualTopZ - baseZ;
        if (activeHeight <= 0) return;

        const floorH = targetHeight / floors;
        const reachedFloors = Math.min(floors, Math.floor(activeHeight / floorH));

        // Frontier construction offsets:
        // Floors fully completed with solid glass: activeHeight - 20
        // Floors with steel frames / active casting: activeHeight - 20 to activeHeight
        const solidGlassZ = Math.max(baseZ, actualTopZ - (progress >= 1 ? 0 : 22));

        // Render each floor from baseZ up to actualTopZ
        for (let f = 0; f < floors; f++) {
          const zBot = baseZ + f * floorH;
          const zTop = baseZ + (f + 1) * floorH;

          // Do not render beyond the active construction frontier!
          if (zBot >= actualTopZ) break;

          const currentStoreyTop = Math.min(zTop, actualTopZ);
          const isFullStorey = currentStoreyTop >= zTop - 0.5;
          const isSolidGlass = zTop <= solidGlassZ || progress >= 1;

          // Corner vertices at base and top of this storey
          const c0 = bProj(bx, by, zBot);
          const c1 = bProj(bx + width, by, zBot);
          const c2 = bProj(bx + width, by + depth, zBot);
          const c3 = bProj(bx, by + depth, zBot);

          const ct0 = bProj(bx, by, currentStoreyTop);
          const ct1 = bProj(bx + width, by, currentStoreyTop);
          const ct2 = bProj(bx + width, by + depth, currentStoreyTop);
          const ct3 = bProj(bx, by + depth, currentStoreyTop);

          if (isSolidGlass) {
            // --- FULLY COMPLETED ARCHITECTURAL GLASS FACADE ---
            // Left Face: Elegant cool slate tinted architectural glass
            const leftGrad = ctx.createLinearGradient(c0.x, c0.y, ct3.x, ct3.y);
            leftGrad.addColorStop(0, "rgba(22, 30, 44, 0.22)");
            leftGrad.addColorStop(1, "rgba(38, 50, 70, 0.14)");
            drawQuad(c0, c3, ct3, ct0, leftGrad, "rgba(12, 15, 22, 0.45)", 0.85);

            // Right Face: Sunlit reflective curtain wall
            const rightGrad = ctx.createLinearGradient(c0.x, c0.y, ct1.x, ct1.y);
            rightGrad.addColorStop(0, "rgba(240, 245, 252, 0.82)");
            rightGrad.addColorStop(1, "rgba(255, 255, 255, 0.94)");
            drawQuad(c0, c1, ct1, ct0, rightGrad, "rgba(12, 15, 22, 0.45)", 0.85);

            // Vertical Glass Mullions (Left face)
            for (let m = 1; m < mullionsY; m++) {
              const frac = m / mullionsY;
              const mb = bProj(bx, by + depth * frac, zBot);
              const mt = bProj(bx, by + depth * frac, currentStoreyTop);
              ctx.beginPath();
              ctx.moveTo(mb.x, mb.y);
              ctx.lineTo(mt.x, mt.y);
              ctx.strokeStyle = "rgba(12, 15, 22, 0.22)";
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }

            // Vertical Glass Mullions (Right face)
            for (let m = 1; m < mullionsX; m++) {
              const frac = m / mullionsX;
              const mb = bProj(bx + width * frac, by, zBot);
              const mt = bProj(bx + width * frac, by, currentStoreyTop);
              ctx.beginPath();
              ctx.moveTo(mb.x, mb.y);
              ctx.lineTo(mt.x, mt.y);
              ctx.strokeStyle = "rgba(12, 15, 22, 0.24)";
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }

            // Specular architectural window reflection
            if (f % 2 === 0) {
              const pane = bProj(bx + width * 0.45, by, zBot + floorH * 0.4);
              ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
              ctx.fillRect(pane.x - 3, pane.y - 2, 6, 3);
            }
          } else {
            // --- ACTIVE STRUCTURAL STEEL ERECTION FRONTIER ---
            // Shaded backing for structural depth
            drawQuad(c0, c3, ct3, ct0, "rgba(12, 15, 22, 0.08)", "rgba(12, 15, 22, 0.65)", 1);
            drawQuad(c0, c1, ct1, ct0, "rgba(240, 245, 250, 0.55)", "rgba(12, 15, 22, 0.65)", 1);

            // Intermediate steel columns
            for (let m = 1; m < mullionsX; m++) {
              const frac = m / mullionsX;
              const mb = bProj(bx + width * frac, by, zBot);
              const mt = bProj(bx + width * frac, by, currentStoreyTop);
              ctx.beginPath();
              ctx.moveTo(mb.x, mb.y);
              ctx.lineTo(mt.x, mt.y);
              ctx.strokeStyle = "rgba(12, 15, 22, 0.55)";
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
            for (let m = 1; m < mullionsY; m++) {
              const frac = m / mullionsY;
              const mb = bProj(bx, by + depth * frac, zBot);
              const mt = bProj(bx, by + depth * frac, currentStoreyTop);
              ctx.beginPath();
              ctx.moveTo(mb.x, mb.y);
              ctx.lineTo(mt.x, mt.y);
              ctx.strokeStyle = "rgba(12, 15, 22, 0.50)";
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }

            // Active floor steel cross-bracing (X-bracing)
            ctx.strokeStyle = "rgba(12, 15, 22, 0.35)";
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(c0.x, c0.y);
            ctx.lineTo(ct1.x, ct1.y);
            ctx.moveTo(c1.x, c1.y);
            ctx.lineTo(ct0.x, ct0.y);
            ctx.stroke();
          }

          // Concrete Floor Slab at the top of every completed floor
          if (isFullStorey) {
            const slabColor = isSolidGlass ? "rgba(248, 250, 252, 0.95)" : "rgba(240, 243, 248, 0.92)";
            drawQuad(ct0, ct1, ct2, ct3, slabColor, "rgba(12, 15, 22, 0.5)", 0.9);

            // Perimeter spandrel beam
            ctx.beginPath();
            ctx.moveTo(ct0.x, ct0.y);
            ctx.lineTo(ct3.x, ct3.y);
            ctx.moveTo(ct0.x, ct0.y);
            ctx.lineTo(ct1.x, ct1.y);
            ctx.strokeStyle = "rgba(12, 15, 22, 0.65)";
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Active construction laser horizon (ONLY appears at the active frontier height)
        if (progress < 1 && actualTopZ < baseZ + targetHeight && actualTopZ > baseZ + 4) {
          const l0 = bProj(bx, by, actualTopZ);
          const l1 = bProj(bx + width, by, actualTopZ);
          const l3 = bProj(bx, by + depth, actualTopZ);

          ctx.strokeStyle = "rgba(12, 15, 22, 0.85)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(l3.x, l3.y);
          ctx.lineTo(l0.x, l0.y);
          ctx.lineTo(l1.x, l1.y);
          ctx.stroke();

          // Active construction frontier drafting dot
          ctx.beginPath();
          ctx.arc(l0.x, l0.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#0c0f16";
          ctx.fill();
        }

        // Rooftop Parapet, Mechanical Penthouse & Spire
        // ONLY renders when the tower is 100% physically completed at the roof level!
        if (actualTopZ >= baseZ + targetHeight - 0.5) {
          const topZ = baseZ + targetHeight;

          // Parapet edge
          const r0 = bProj(bx, by, topZ);
          const r1 = bProj(bx + width, by, topZ);
          const r2 = bProj(bx + width, by + depth, topZ);
          const r3 = bProj(bx, by + depth, topZ);
          drawQuad(r0, r1, r2, r3, "rgba(255, 255, 255, 0.95)", "rgba(12, 15, 22, 0.6)", 1.1);

          if (hasCrownSpire) {
            // Mechanical penthouse core anchored directly on roof slab
            const coreW = width * 0.46;
            const coreD = depth * 0.46;
            const coreH = 15;
            const coreX = bx + (width - coreW) * 0.5;
            const coreY = by + (depth - coreD) * 0.5;

            const cr0 = bProj(coreX, coreY, topZ);
            const cr1 = bProj(coreX + coreW, coreY, topZ);
            const cr2 = bProj(coreX + coreW, coreY + coreD, topZ);
            const cr3 = bProj(coreX, coreY + coreD, topZ);

            const cr0Top = bProj(coreX, coreY, topZ + coreH);
            const cr1Top = bProj(coreX + coreW, coreY, topZ + coreH);
            const cr2Top = bProj(coreX + coreW, coreY + coreD, topZ + coreH);
            const cr3Top = bProj(coreX, coreY + coreD, topZ + coreH);

            drawQuad(cr0, cr3, cr3Top, cr0Top, "rgba(20, 28, 40, 0.18)", "rgba(12, 15, 22, 0.55)", 0.85);
            drawQuad(cr0, cr1, cr1Top, cr0Top, "rgba(240, 245, 252, 0.85)", "rgba(12, 15, 22, 0.55)", 0.85);
            drawQuad(cr0Top, cr1Top, cr2Top, cr3Top, "rgba(255, 255, 255, 0.98)", "rgba(12, 15, 22, 0.7)", 1.1);

            // Apex architectural spire anchored in the core
            const spBase = bProj(coreX + coreW * 0.5, coreY + coreD * 0.5, topZ + coreH);
            const spTip = bProj(coreX + coreW * 0.5, coreY + coreD * 0.5, topZ + coreH + 28);

            ctx.beginPath();
            ctx.moveTo(spBase.x, spBase.y);
            ctx.lineTo(spTip.x, spTip.y);
            ctx.strokeStyle = "rgba(12, 15, 22, 0.85)";
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Architectural finial tip
            ctx.beginPath();
            ctx.arc(spTip.x, spTip.y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = "#0c0f16";
            ctx.fill();
          }
        }
      };

      // --- UNIFIED ARCHITECTURAL SKYSCRAPER COMPLEX ---
      // Rendered strictly from back to front with proper isometric painter's depth:

      // 1. Grand Ground Podium (Floors 1-2, baseZ = 0 to 24px)
      renderSolidTower(-105, -40, 0, 205, 90, 24, 2, 7, 5, false);

      // 2. West Commercial Wing (Floors 1-13, baseZ = 24 to 142px)
      renderSolidTower(-90, -10, 24, 60, 56, 118, 11, 4, 4, true);

      // 3. Central Landmark Skyscraper (Multi-Tiered, unified from podium to crown)
      // Tier 1 (Floors 3-14, baseZ = 24 to 134px)
      renderSolidTower(-18, -35, 24, 76, 76, 110, 11, 5, 5, false);

      // Tier 2 (Floors 15-20, baseZ = 134 to 184px, only builds when Tier 1 is solid)
      if (currentBuildZ > 134) {
        renderSolidTower(-10, -27, 134, 60, 60, 50, 5, 4, 4, false);
      }

      // Tier 3: Penthouse Crown & Spire (Floors 21-25, baseZ = 184 to 226px)
      if (currentBuildZ > 184) {
        renderSolidTower(-2, -19, 184, 44, 44, 42, 4, 3, 3, true);
      }

      // 4. East Innovation Tower (Floors 1-15, baseZ = 24 to 156px)
      renderSolidTower(48, -5, 24, 52, 52, 132, 12, 4, 4, true);

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    // Resize handler for crisp retina displays
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const isMobile = window.innerWidth <= 760;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: 560 };
      const width = Math.max(300, rect.width);
      const height = isMobile ? 270 : Math.max(500, rect.height);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`hero-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
