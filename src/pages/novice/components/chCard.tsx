import React, { useState } from "react";
import aeroIMG from "../../../assets/images/9.jpeg";

// ============================================
// Challenge Résilience Urbaine — Séisme, Inondation, Drone & Aviation
// Composant TSX (React / Next.js)
// ============================================

const CAHIER_AERO_URL =
  "https://drive.google.com/file/d/1iW34RtbPM23m0sT_yY1x7CKOYmOpxNCs/view";
const CAHIER_CAO_URL =
  "https://drive.google.com/file/d/1J-D4eyaOKtfTzjr2a-wRzRFqcKucpXzG/view";

// ---------- Styles réutilisables ----------
const redButtonStyle: React.CSSProperties = {
  background: "#e94560",
  color: "#FFFFFF",
  border: "none",
  padding: "14px 28px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.2s",
  boxShadow: "0 4px 16px rgba(233,69,96,0.3)",
};

const redHoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = "#d63a54";
  e.currentTarget.style.transform = "translateY(-2px)";
};
const redHoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = "#e94560";
  e.currentTarget.style.transform = "translateY(0)";
};

// ---------- Données de l'animation ----------
const RAIN_DROPS = [
  { top: 20, left: 10, w: 2, h: 20, dur: 1.0, delay: 0, a: 0.6, b: 0.4 },
  { top: 10, left: 25, w: 2, h: 18, dur: 0.9, delay: 0.15, a: 0.5, b: 0.3 },
  { top: 30, left: 40, w: 3, h: 22, dur: 1.1, delay: 0.4, a: 0.6, b: 0.4 },
  { top: 15, left: 58, w: 2, h: 16, dur: 0.8, delay: 0.6, a: 0.5, b: 0.3 },
  { top: 25, left: 72, w: 2, h: 19, dur: 1.0, delay: 0.25, a: 0.5, b: 0.3 },
  { top: 5, left: 85, w: 2, h: 15, dur: 0.9, delay: 0.8, a: 0.4, b: 0.2 },
  { top: 35, left: 15, w: 3, h: 21, dur: 1.2, delay: 0.05, a: 0.6, b: 0.4 },
  { top: 12, left: 48, w: 2, h: 17, dur: 1.0, delay: 0.5, a: 0.5, b: 0.3 },
];

const DEBRIS = [
  { top: 20, left: 35, dur: 3, delay: 0, w: 8, h: 8, bg: "#5c5c5c", r: "1px" },
  { top: 10, left: 62, dur: 2.5, delay: 0.7, w: 6, h: 10, bg: "#4a4a4a", r: "1px" },
  { top: 30, left: 48, dur: 3.5, delay: 1.2, w: 10, h: 6, bg: "#6b6b6b", r: "1px" },
  { top: 15, left: 78, dur: 2.8, delay: 0.4, w: 5, h: 5, bg: "#555", r: "50%" },
];

const CLOUDS = [
  { top: 8, left: "5%", right: undefined, dur: 12, delay: 0, w: 80, h: 36, bg: "rgba(30,30,50,0.7)" },
  { top: 15, left: undefined, right: "10%", dur: 14, delay: 3, w: 65, h: 30, bg: "rgba(30,30,50,0.6)" },
  { top: 5, left: "50%", right: undefined, dur: 10, delay: 1.5, w: 55, h: 26, bg: "rgba(30,30,50,0.55)" },
];

const CRACKS = [
  { d: "M 50 220 L 80 180 L 70 150 L 100 120 L 90 80 L 130 40", c: "rgba(0,0,0,0.5)", w: 2, len: 200, dur: 3, delay: 0 },
  { d: "M 80 180 L 110 190 L 140 170", c: "rgba(0,0,0,0.4)", w: 1.5, len: 150, dur: 3, delay: 0.5 },
  { d: "M 700 220 L 670 190 L 680 160 L 650 130 L 660 90 L 620 50", c: "rgba(0,0,0,0.45)", w: 2, len: 200, dur: 3.5, delay: 1 },
  { d: "M 670 190 L 640 200 L 610 185", c: "rgba(0,0,0,0.35)", w: 1.5, len: 120, dur: 3.5, delay: 1.3 },
  { d: "M 350 220 L 370 200 L 360 170 L 390 140 L 380 100", c: "rgba(0,0,0,0.3)", w: 1.5, len: 180, dur: 4, delay: 2 },
];

const KEYFRAMES = `
  @keyframes crackAppear {
    0% { stroke-dashoffset: 200; opacity: 0; }
    20% { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes lightningFlash {
    0%, 88%, 100% { opacity: 0; }
    89% { opacity: 0.9; }
    90% { opacity: 0; }
    91% { opacity: 0.7; }
    92% { opacity: 0; }
    93% { opacity: 1; }
    94% { opacity: 0.2; }
    95% { opacity: 0; }
  }
  @keyframes buildingShake {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    2% { transform: translateX(-52%) translateY(-1px); }
    4% { transform: translateX(-48%) translateY(1px); }
    6% { transform: translateX(-51%) translateY(-2px); }
    8% { transform: translateX(-49%) translateY(2px); }
    10% { transform: translateX(-50%) translateY(0); }
    12% { transform: translateX(-53%) translateY(-1px); }
    14% { transform: translateX(-47%) translateY(1px); }
    16% { transform: translateX(-50%) translateY(0); }
  }
  @keyframes seismicWave {
    0% { transform: scale(0.5); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes floodRise {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes debrisFall {
    0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translateY(220px) rotate(180deg); opacity: 0; }
  }
  @keyframes rainDrop {
    0% { transform: translateY(0); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translateY(200px); opacity: 0; }
  }
  @keyframes cloudFloat {
    0%, 100% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(8px) translateY(-3px); }
    50% { transform: translateX(-4px) translateY(2px); }
    75% { transform: translateX(6px) translateY(-2px); }
  }
  @keyframes droneHover {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(8px, -6px) rotate(2deg); }
    50% { transform: translate(-4px, -3px) rotate(-1deg); }
    75% { transform: translate(6px, -8px) rotate(1deg); }
  }
  @keyframes dronePropeller {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(0.1); }
    100% { transform: scaleX(1); }
  }
  @keyframes droneScan {
    0% { opacity: 0; }
    50% { opacity: 0.4; }
    100% { opacity: 0; }
  }
  @keyframes droneBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes planeFly {
    0% { transform: translateX(-120px) translateY(20px) scale(0.6); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateX(500px) translateY(-30px) scale(0.6); opacity: 0; }
  }
  @keyframes planeBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.9) translateY(-20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .challenge-banner *, .challenge-modal { animation: none !important; }
  }
`;

const ChallengeCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  // Next.js : l'import d'image renvoie un objet { src }, CRA/Vite renvoie une string
  const imgSrc =
    typeof aeroIMG === "string" ? aeroIMG : (aeroIMG as { src: string }).src;

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* ========== CARTE CHALLENGE ========== */}
      <div
        className="ms-3"
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(15, 27, 60, 0.08)",
          position: "relative",
        }}
      >
        {/* ========== BANDEAU CATASTROPHE + DRONE + AVIATION ========== */}
        <div
          className="challenge-banner"
          aria-hidden="true"
          style={{
            height: "220px",
            background:
              "linear-gradient(180deg, #0f172a 0%, #1e293b 20%, #0f3460 50%, #0a3d4d 75%, #065a60 100%)",
            position: "relative",
            overflow: "hidden",
            perspective: "1000px",
          }}
        >
          {/* Nuages d'orage */}
          {CLOUDS.map((c, i) => (
            <div
              key={`cloud-${i}`}
              style={{
                position: "absolute",
                top: `${c.top}px`,
                left: c.left,
                right: c.right,
                animation: `cloudFloat ${c.dur}s ease-in-out infinite ${c.delay}s`,
              }}
            >
              <div
                style={{
                  width: `${c.w}px`,
                  height: `${c.h}px`,
                  background: c.bg,
                  borderRadius: "40px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${c.h + 8}px`,
                    height: `${c.h + 8}px`,
                    background: "rgba(25,25,45,0.55)",
                    borderRadius: "50%",
                    position: "absolute",
                    top: `-${c.h / 2}px`,
                    left: "10px",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Éclairs */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              width: "2px",
              height: "60px",
              background:
                "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
              clipPath:
                "polygon(40% 0, 60% 0, 50% 40%, 70% 40%, 30% 100%, 45% 100%, 55% 50%, 35% 50%)",
              animation: "lightningFlash 5s ease-in-out infinite",
              filter:
                "drop-shadow(0 0 8px #fff) drop-shadow(0 0 20px rgba(255,255,255,0.8))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "25%",
              width: "2px",
              height: "50px",
              background:
                "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
              clipPath:
                "polygon(40% 0, 60% 0, 45% 35%, 65% 35%, 25% 100%, 40% 100%, 55% 45%, 35% 45%)",
              animation: "lightningFlash 7s ease-in-out infinite 2s",
              filter: "drop-shadow(0 0 6px #fff)",
            }}
          />

          {/* Pluie */}
          {RAIN_DROPS.map((d, i) => (
            <div
              key={`rain-${i}`}
              style={{
                position: "absolute",
                top: `${d.top}px`,
                left: `${d.left}%`,
                animation: `rainDrop ${d.dur}s linear infinite ${d.delay}s`,
              }}
            >
              <div
                style={{
                  width: `${d.w}px`,
                  height: `${d.h}px`,
                  background: `linear-gradient(180deg, rgba(180,200,210,${d.a}), rgba(8,100,110,${d.b}))`,
                  borderRadius: "2px 2px 50% 50%",
                }}
              />
            </div>
          ))}

          {/* AVION QUI SURVOLE */}
          <div
            style={{
              position: "absolute",
              top: "25px",
              left: 0,
              animation: "planeFly 12s linear infinite",
              zIndex: 3,
            }}
          >
            <div style={{ position: "relative", width: "60px", height: "20px" }}>
              {/* Corps */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "10px",
                  width: "40px",
                  height: "6px",
                  background: "linear-gradient(90deg, #e2e8f0, #94a3b8)",
                  borderRadius: "3px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              />
              {/* Aile gauche */}
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "22px",
                  width: "16px",
                  height: "8px",
                  background: "linear-gradient(180deg, #cbd5e1, #94a3b8)",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                }}
              />
              {/* Aile droite */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "22px",
                  width: "16px",
                  height: "8px",
                  background: "linear-gradient(0deg, #cbd5e1, #94a3b8)",
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                }}
              />
              {/* Queue */}
              <div
                style={{
                  position: "absolute",
                  top: "3px",
                  left: "6px",
                  width: "10px",
                  height: "12px",
                  background: "linear-gradient(180deg, #cbd5e1, #94a3b8)",
                  clipPath: "polygon(0 100%, 100% 40%, 100% 100%)",
                }}
              />
              {/* Feux de position */}
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "2px",
                  width: "3px",
                  height: "3px",
                  background: "#ef4444",
                  borderRadius: "50%",
                  animation: "planeBlink 1s ease-in-out infinite",
                  boxShadow: "0 0 4px #ef4444",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "13px",
                  left: "24px",
                  width: "2px",
                  height: "2px",
                  background: "#22c55e",
                  borderRadius: "50%",
                  animation: "planeBlink 1s ease-in-out infinite 0.5s",
                  boxShadow: "0 0 3px #22c55e",
                }}
              />
            </div>
          </div>

          {/* DRONE DE SURVEILLANCE */}
          <div
            style={{
              position: "absolute",
              top: "35px",
              right: "18%",
              animation: "droneHover 5s ease-in-out infinite",
              zIndex: 4,
            }}
          >
            <div style={{ position: "relative", width: "44px", height: "44px" }}>
              {/* Bras */}
              {[0, 90].map((deg) => (
                <div
                  key={`arm-${deg}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                    width: "40px",
                    height: "3px",
                    background: "#334155",
                    borderRadius: "2px",
                  }}
                />
              ))}
              {/* Hélices */}
              {[
                { pos: { top: "2px", left: "2px" }, delay: 0 },
                { pos: { top: "2px", right: "2px" }, delay: 0.02 },
                { pos: { bottom: "2px", left: "2px" }, delay: 0.04 },
                { pos: { bottom: "2px", right: "2px" }, delay: 0.06 },
              ].map((p, i) => (
                <div
                  key={`prop-${i}`}
                  style={{
                    position: "absolute",
                    ...p.pos,
                    width: "10px",
                    height: "3px",
                    background: "#94a3b8",
                    borderRadius: "2px",
                    animation: `dronePropeller 0.08s linear infinite ${p.delay}s`,
                  }}
                />
              ))}
              {/* Corps central */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "14px",
                  height: "14px",
                  background: "linear-gradient(135deg, #475569, #1e293b)",
                  borderRadius: "50%",
                  border: "1px solid #64748b",
                  boxShadow: "0 0 8px rgba(71,85,105,0.5)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "5px",
                    height: "5px",
                    background: "#00d4ff",
                    borderRadius: "50%",
                    boxShadow: "0 0 6px #00d4ff, 0 0 12px rgba(0,212,255,0.5)",
                    animation: "droneBlink 1.5s ease-in-out infinite",
                  }}
                />
              </div>
              {/* Faisceau de scan */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "60px",
                  height: "80px",
                  background:
                    "linear-gradient(180deg, rgba(0,212,255,0.15) 0%, transparent 100%)",
                  clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
                  animation: "droneScan 3s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Fissures dans le sol */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 220"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          >
            {CRACKS.map((c, i) => (
              <path
                key={`crack-${i}`}
                d={c.d}
                fill="none"
                stroke={c.c}
                strokeWidth={c.w}
                strokeDasharray={c.len}
                strokeDashoffset="0"
                style={{
                  animation: `crackAppear ${c.dur}s ease-out infinite ${c.delay}s`,
                }}
              />
            ))}
          </svg>

          {/* Ondes sismiques */}
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "30%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {[
              { a: 0.4, delay: 0 },
              { a: 0.3, delay: 0.6 },
              { a: 0.2, delay: 1.2 },
            ].map((w, i) => (
              <div
                key={`wave1-${i}`}
                style={{
                  position: "absolute",
                  width: "40px",
                  height: "40px",
                  border: `2px solid rgba(233,69,96,${w.a})`,
                  borderRadius: "50%",
                  animation: `seismicWave 2s ease-out infinite ${w.delay}s`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              top: "65%",
              left: "70%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {[
              { a: 0.35, delay: 0.3 },
              { a: 0.25, delay: 0.9 },
            ].map((w, i) => (
              <div
                key={`wave2-${i}`}
                style={{
                  position: "absolute",
                  width: "30px",
                  height: "30px",
                  border: `2px solid rgba(233,69,96,${w.a})`,
                  borderRadius: "50%",
                  animation: `seismicWave 2.5s ease-out infinite ${w.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Bâtiment central avec séisme */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "35px",
              transform: "translateX(-50%)",
              width: "60px",
              height: "80px",
              animation: "buildingShake 4s ease-in-out infinite",
              zIndex: 2,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50px",
                  height: "70px",
                  background: "linear-gradient(180deg, #2d3436 0%, #1a1a2e 100%)",
                  borderRadius: "2px",
                  border: "1px solid rgba(233,69,96,0.3)",
                }}
              >
                {[
                  { top: 10, side: "left", a: 0.6, glow: true },
                  { top: 10, side: "right", a: 0.4, glow: false },
                  { top: 30, side: "left", a: 0.5, glow: false },
                  { top: 30, side: "right", a: 0.3, glow: false },
                ].map((w, i) => (
                  <div
                    key={`win-${i}`}
                    style={{
                      position: "absolute",
                      top: `${w.top}px`,
                      [w.side]: "8px",
                      width: "10px",
                      height: "12px",
                      background: `rgba(255,200,50,${w.a})`,
                      borderRadius: "1px",
                      boxShadow: w.glow ? "0 0 6px rgba(255,200,50,0.4)" : undefined,
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "14px",
                    background: "rgba(233,69,96,0.5)",
                    borderRadius: "1px",
                    boxShadow: "0 0 8px rgba(233,69,96,0.3)",
                  }}
                />
              </div>
              {/* Toit */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "28px solid transparent",
                  borderRight: "28px solid transparent",
                  borderBottom: "18px solid #e94560",
                }}
              />
              {/* Antenne */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "2px",
                  height: "12px",
                  background: "#e94560",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-3px",
                    left: "-2px",
                    width: "6px",
                    height: "6px",
                    background: "#e94560",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px #e94560",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Eau qui monte — vagues d'inondation */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "55px",
              animation: "floodRise 3s ease-in-out infinite",
              zIndex: 3,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 55"
              preserveAspectRatio="none"
              style={{ position: "absolute", bottom: 0 }}
            >
              <path
                d="M0 25 Q 40 15, 80 25 T 160 25 T 240 22 T 320 25 T 400 28 T 480 25 T 560 23 T 640 25 T 720 27 T 800 25 V 55 H 0 Z"
                fill="rgba(6,90,96,0.65)"
              />
              <path
                d="M0 35 Q 50 25, 100 35 T 200 35 T 300 32 T 400 35 T 500 38 T 600 35 T 700 33 T 800 35 V 55 H 0 Z"
                fill="rgba(8,126,139,0.45)"
              />
              <path
                d="M0 45 Q 60 38, 120 45 T 240 43 T 360 45 T 480 47 T 600 45 T 720 44 T 800 45 V 55 H 0 Z"
                fill="rgba(10,150,160,0.25)"
              />
            </svg>
          </div>

          {/* Débris qui tombent */}
          {DEBRIS.map((d, i) => (
            <div
              key={`debris-${i}`}
              style={{
                position: "absolute",
                top: `${d.top}px`,
                left: `${d.left}%`,
                animation: `debrisFall ${d.dur}s linear infinite ${d.delay}s`,
              }}
            >
              <div
                style={{
                  width: `${d.w}px`,
                  height: `${d.h}px`,
                  background: d.bg,
                  borderRadius: d.r,
                }}
              />
            </div>
          ))}

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "32px",
              zIndex: 10,
              background: "#e94560",
              color: "#FFFFFF",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 2px 12px rgba(233,69,96,0.4)",
            }}
          >
            Catastrophe Naturelle
          </div>
        </div>

        {/* ========== CONTENU CARTE ========== */}
        <div style={{ padding: "28px 32px 32px 32px" }}>
          <div
            style={{
              background: "#f0f4f8",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
              borderLeft: "4px solid #e94560",
            }}
          >
            <div className="row align-items-center">
              {/* Texte à gauche */}
              <div className="col-lg-8 col-md-7">
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  Les Ateliers Novices sont conçus pour les jeunes débutants en
                  aéronautique, âgés de 6 à 17 ans. Au programme : défis en
                  aéromodélisme, Aero Entrepreneur Junior et CAO — des
                  activités adaptées à chaque âge pour apprendre, imaginer et
                  s'envoler vers l'innovation !
                </p>
              </div>

              {/* Image à droite */}
              <div className="col-lg-4 col-md-5 text-center">
                <img
                  src={imgSrc}
                  alt="AéroChallenge"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          {/* ========== BOUTONS CENTRÉS ========== */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => window.open("https://docs.google.com/forms/u/1/d/e/1FAIpQLSc83r8F0J4LcxbRhm6hYJvzTCmAZ9jQvEuP78_ZrdTGPuPhxw/viewform")}
              style={redButtonStyle}
              onMouseEnter={redHoverIn}
              onMouseLeave={redHoverOut}
            >
              📝 S'inscrire au challenge
            </button>
            <button
              onClick={handleCahierClick}
              style={{
                background: "transparent",
                color: "#1a1a2e",
                border: "2px solid #1a1a2e",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a2e";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a1a2e";
              }}
            >
              📄 Cahier des charges
            </button>
          </div>
        </div>
      </div>

      

      {/* ========== MODALE CAHIER DES CHARGES ========== */}
      {showCahierModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
            backdropFilter: "blur(4px)",
          }}
          onClick={handleCloseCahierModal}
        >
          <div
            className="challenge-modal bg-white rounded-4 shadow-lg p-4 p-md-5"
            style={{
              width: "100%",
              maxWidth: "450px",
              animation: "modalFadeIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "70px", height: "70px", background: "#e3f2fd" }}
              >
                <span style={{ fontSize: "35px" }}>📄</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <button
                onClick={() => window.open(CAHIER_AERO_URL, "_blank", "noopener,noreferrer")}
                style={redButtonStyle}
                onMouseEnter={redHoverIn}
                onMouseLeave={redHoverOut}
              >
                Cahier des charges aéromodélisme junior
              </button>

              <button
                onClick={() => window.open(CAHIER_CAO_URL, "_blank", "noopener,noreferrer")}
                style={redButtonStyle}
                onMouseEnter={redHoverIn}
                onMouseLeave={redHoverOut}
              >
                Cahier des charges CAO junior
              </button>

              <button
                onClick={() => window.open("https://drive.google.com/file/d/15mJalaRy8qAzk--B78FkCfAo58t5F1q-/view?fbclid=IwY2xjawVKzu9leHRuA2FlbQIxMABwZG9mBWJyaWQRMTEzYWFlVG9ocHpFd1VibmtzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeG23ytltrkejIsWNw8Gj67eKIQ92s27hcmK-T0XWSp87HTy5DIqrg7pFVEYM_aem_Z7jevqHUPJqzkyRnvMyjaw")}
                style={redButtonStyle}
                onMouseEnter={redHoverIn}
                onMouseLeave={redHoverOut}
              >
                Cahier des charges aeroentrepreneur junior 
              </button>

              <div className="d-grid">
                <button
                  className="btn text-white border-0 py-3"
                  onClick={handleCloseCahierModal}
                  style={{
                    background: "#0f3460",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#0a284a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#0f3460";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeCard;