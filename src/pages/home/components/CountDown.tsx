import { Fragment, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Palettes
   « editions » = le style de la section « Editions Précédente »
   (dégradé nuit → indigo, accent cyan, constellation)
───────────────────────────────────────────────────────────── */
const palettes = {
  editions: {
    bgTop: "#070A1C",
    bg: "#26215F",
    cellBorder: "rgba(6,182,212,0.45)",
    dim: "#8A93B8",
    accent: "#06B6D4",
    num: "#FFFFFF",
    glow: "rgba(6,182,212,0.28)",
  },
  lancement: {
    bgTop: "#101A38",
    bg: "#070B18",
    cellBorder: "#4a5d93",
    dim: "#7585AD",
    accent: "#FF6B35",
    num: "#FF6B35",
    glow: "rgba(255,107,53,0.30)",
  },
  orbite: {
    bgTop: "#0F2A50",
    bg: "#0B1F3A",
    cellBorder: "#24466E",
    dim: "#7C97C2",
    accent: "#35C4FF",
    num: "#35C4FF",
    glow: "rgba(53,196,255,0.30)",
  },
} as const;

type PaletteName = keyof typeof palettes;
type Palette = (typeof palettes)[PaletteName];

/* ─────────────────────────────────────────────────────────────
   Logique : calcul + hook
───────────────────────────────────────────────────────────── */
function getTimeLeft(targetMs: number) {
  if (Number.isNaN(targetMs)) {
    return { done: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const s = Math.floor(Math.max(0, targetMs - Date.now()) / 1000);
  return {
    done: s === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function useCountdown(targetDate: string | Date) {
  const targetMs = new Date(targetDate).getTime();
  const [t, setT] = useState(() => getTimeLeft(targetMs));

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const next = getTimeLeft(targetMs);
      setT(next);
      if (!next.done) id = setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    tick();
    return () => clearTimeout(id);
  }, [targetMs]);

  return t;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ─────────────────────────────────────────────────────────────
   Constellation animée (canvas)
   Les points dérivent lentement, scintillent, et les lignes se
   forment / disparaissent selon la distance entre les points.
───────────────────────────────────────────────────────────── */
type Dot = { x: number; y: number; vx: number; vy: number; r: number; o: number; ph: number; sp: number; rgb: string };

function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK = 170; // distance max (px) pour relier deux points
    const MARGIN = 24;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let w = 0, h = 0, raf = 0, last = 0;
    let nodes: Dot[] = [];
    let dust: Dot[] = [];

    const makeNode = (): Dot => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(8, 20); // px / seconde
      return {
        x: rand(0, w), y: rand(0, h),
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        r: rand(0.9, 2.2), o: rand(0.45, 0.9),
        ph: rand(0, 6.28), sp: rand(0.8, 2),
        rgb: Math.random() < 0.2 ? "94,224,245" : "201,214,255",
      };
    };
    const makeDust = (): Dot => ({
      x: rand(0, w), y: rand(0, h), vx: 0, vy: 0,
      r: rand(0.4, 0.9), o: rand(0.2, 0.55),
      ph: rand(0, 6.28), sp: rand(0.5, 1.6), rgb: "201,214,255",
    });

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Lignes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const a = 0.22 * (1 - Math.sqrt(d2) / LINK);
            ctx.strokeStyle = `rgba(143,179,255,${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Petites étoiles (scintillent sur place)
      for (const d of dust) {
        const a = d.o * (0.65 + 0.35 * Math.sin(t * d.sp + d.ph));
        ctx.fillStyle = `rgba(${d.rgb},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.2832);
        ctx.fill();
      }

      // Nœuds : halo + cœur
      for (const n of nodes) {
        const a = n.o * (0.7 + 0.3 * Math.sin(t * n.sp + n.ph));
        ctx.fillStyle = `rgba(${n.rgb},0.07)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.2, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = `rgba(${n.rgb},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 6.2832);
        ctx.fill();
      }
    };

    const step = (dt: number) => {
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        // Sort d'un côté → réapparaît de l'autre
        if (n.x < -MARGIN) n.x = w + MARGIN;
        else if (n.x > w + MARGIN) n.x = -MARGIN;
        if (n.y < -MARGIN) n.y = h + MARGIN;
        else if (n.y > h + MARGIN) n.y = -MARGIN;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      draw(now / 1000);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduced || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const oldW = w, oldH = h;
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!nodes.length) {
        const area = w * h;
        nodes = Array.from({ length: Math.round(Math.min(70, Math.max(16, area / 12000))) }, makeNode);
        dust = Array.from({ length: Math.round(Math.min(120, Math.max(30, area / 5000))) }, makeDust);
      } else {
        // Garde les points en place proportionnellement
        [...nodes, ...dust].forEach((d) => {
          d.x *= w / oldW;
          d.y *= h / oldH;
        });
      }
      if (reduced) draw(0); // image fixe si « réduire les animations »
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    // N'anime que lorsque la carte est visible à l'écran
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(host);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Styles partagés
───────────────────────────────────────────────────────────── */
const CSS = `
  @keyframes cd-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: .15; } }
  .cd-colon { animation: cd-blink 1s step-end infinite; }

  .cd-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

  @media (max-width: 420px) { .cd-colon { display: none; } .cd-row { gap: .4rem !important; } }
  @media (prefers-reduced-motion: reduce) { .cd-colon { animation: none; } }
`;

const FONT = "'Segoe UI', system-ui, -apple-system, sans-serif";

/* ─────────────────────────────────────────────────────────────
   Case d'une unité de temps
───────────────────────────────────────────────────────────── */
function TimeCell({ value, label, c }: { value: number; label: string; c: Palette }) {
  return (
    <div
      aria-hidden
      style={{
        flex: "1 1 0",
        minWidth: "clamp(3.4rem, 9vw, 6.5rem)",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${c.cellBorder}`,
        borderRadius: "1rem",
        padding: "clamp(0.7rem, 2vw, 1rem) clamp(0.35rem, 1.6vw, 1.1rem)",
        textAlign: "center",
        // Halo doux autour de la case, comme la photo centrale du carrousel
        boxShadow: `0 0 24px ${c.glow}, inset 0 0 18px rgba(255,255,255,0.03)`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(1.6rem, 3.4vw, 2.7rem)",
          fontWeight: 700,
          color: c.num,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        {pad(value)}
      </div>
      <div style={{ fontSize: "0.75rem", color: c.dim, marginTop: "0.4rem" }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Composant Countdown
───────────────────────────────────────────────────────────── */
type Props = {
  targetDate?: string | Date;
  palette?: PaletteName;
  title?: string;
  doneTitle?: string;
  doneMessage?: string;
  /** Chevauchement vers le haut (px) — l'effet "décollé" */
  overlap?: number;
  /** Espace laissé sous le compteur avant la section suivante (px) */
  lift?: number;
};

export default function Countdown({
  targetDate = "2026-11-21T08:00:00+01:00",
  palette = "editions",
  title = "Aeroday 14.0 dans",
  doneTitle = "Mission lancée",
  doneMessage = "🚀 Aeroday — c'est parti !",
  overlap = 64,
  lift = 24,
}: Props) {
  const c = palettes[palette];
  const t = useCountdown(targetDate);

  const units = [
    { value: t.days, label: t.days > 1 ? "jours" : "jour" },
    { value: t.hours, label: t.hours > 1 ? "heures" : "heure" },
    { value: t.minutes, label: t.minutes > 1 ? "minutes" : "minute" },
    { value: t.seconds, label: t.seconds > 1 ? "secondes" : "seconde" },
  ];

  const spoken = units.map((u) => `${u.value} ${u.label}`).join(", ");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
        marginTop: -overlap,
        marginBottom: lift,
        width: "100%",
      }}
    >
      <style>{CSS}</style>

      <div
        role="timer"
        aria-label={title}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(1rem, 3vw, 1.6rem)",
          boxSizing: "border-box",
          maxWidth: "100%",
          // Dégradé nuit → indigo (la constellation animée est dessinée par-dessus)
          backgroundImage: `linear-gradient(180deg, ${c.bgTop} 0%, ${c.bg} 100%)`,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 0,
          padding: "clamp(1.1rem, 3.5vw, 1.8rem) clamp(1rem, 4vw, 2.4rem) clamp(1.5rem, 4vw, 2.2rem)",
          fontFamily: FONT,
          boxShadow: "0 24px 50px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.35)",
        }}
      >
        <Constellation />

        {/* Titre */}
        <h2
          style={{
            position: "relative",
            zIndex: 1,
            margin: 0,
            color: "#FFFFFF",
            fontSize: "clamp(1.15rem, 2.6vw, 1.7rem)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          {t.done ? doneTitle : title}
        </h2>

        {t.done ? (
          <div
            role="status"
            style={{
              position: "relative",
              zIndex: 1,
              color: c.accent,
              fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
              fontWeight: 700,
              padding: "0.5rem 1.5rem",
              textAlign: "center",
              textShadow: `0 0 20px ${c.glow}`,
            }}
          >
            {doneMessage}
          </div>
        ) : (
          <>
            <span className="cd-sr">{spoken}</span>
            <div
              className="cd-row"
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: "clamp(0.4rem, 1.2vw, 0.9rem)",
                maxWidth: "100%",
              }}
            >
              {units.map((u, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="cd-colon"
                      style={{
                        color: c.accent,
                        fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                        fontWeight: 700,
                        paddingBottom: "1rem",
                      }}
                    >
                      :
                    </span>
                  )}
                  <TimeCell value={u.value} label={u.label} c={c} />
                </Fragment>
              ))}
            </div>
          </>
        )}

        {/* Ligne lumineuse en bas, comme sous le carrousel */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: "6%",
            right: "6%",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${c.accent} 20%, ${c.accent} 80%, transparent)`,
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  );
}