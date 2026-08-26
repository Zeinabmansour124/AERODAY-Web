import React, { useState } from 'react';
import aeroIMG from '../../../assets/images/9.jpeg'

// ============================================
// Challenge Résilience Urbaine — Séisme, Inondation, Drone & Aviation
// Composant TSX (React / Next.js)
// ============================================

const  ChallengeCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  return (
    <>
      {/* ========== CARTE CHALLENGE ========== */}
      <div
        className="ms-3"
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(15, 27, 60, 0.08)',
          position: 'relative',
        }}
      >
        {/* ========== BANDEAU CATASTROPHE + DRONE + AVIATION ========== */}
        <div
          style={{
            height: '220px',
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 20%, #0f3460 50%, #0a3d4d 75%, #065a60 100%)',
            position: 'relative',
            overflow: 'hidden',
            perspective: '1000px',
          }}
        >
          <style>{`
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
            @keyframes floodWave {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes modalFadeIn {
              from { opacity: 0; transform: scale(0.8) translateY(-20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* Nuages d'orage */}
          <div style={{ position: 'absolute', top: '8px', left: '5%', animation: 'cloudFloat 12s ease-in-out infinite' }}>
            <div style={{ width: '80px', height: '36px', background: 'rgba(30,30,50,0.7)', borderRadius: '40px', position: 'relative' }}>
              <div style={{ width: '45px', height: '42px', background: 'rgba(25,25,45,0.6)', borderRadius: '50%', position: 'absolute', top: '-18px', left: '12px' }} />
              <div style={{ width: '32px', height: '32px', background: 'rgba(28,28,42,0.5)', borderRadius: '50%', position: 'absolute', top: '-14px', right: '8px' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', top: '15px', right: '10%', animation: 'cloudFloat 14s ease-in-out infinite 3s' }}>
            <div style={{ width: '65px', height: '30px', background: 'rgba(30,30,50,0.6)', borderRadius: '30px', position: 'relative' }}>
              <div style={{ width: '38px', height: '38px', background: 'rgba(25,25,45,0.5)', borderRadius: '50%', position: 'absolute', top: '-16px', left: '8px' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', top: '5px', left: '50%', animation: 'cloudFloat 10s ease-in-out infinite 1.5s' }}>
            <div style={{ width: '55px', height: '26px', background: 'rgba(30,30,50,0.55)', borderRadius: '26px', position: 'relative' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(25,25,45,0.45)', borderRadius: '50%', position: 'absolute', top: '-14px', left: '6px' }} />
            </div>
          </div>

          {/* Éclairs */}
          <div style={{ position: 'absolute', top: '0', left: '20%', width: '2px', height: '60px', background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 50%, transparent 100%)', clipPath: 'polygon(40% 0, 60% 0, 50% 40%, 70% 40%, 30% 100%, 45% 100%, 55% 50%, 35% 50%)', animation: 'lightningFlash 5s ease-in-out infinite', filter: 'drop-shadow(0 0 8px #fff) drop-shadow(0 0 20px rgba(255,255,255,0.8))' }} />
          <div style={{ position: 'absolute', top: '5px', right: '25%', width: '2px', height: '50px', background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 50%, transparent 100%)', clipPath: 'polygon(40% 0, 60% 0, 45% 35%, 65% 35%, 25% 100%, 40% 100%, 55% 45%, 35% 45%)', animation: 'lightningFlash 7s ease-in-out infinite 2s', filter: 'drop-shadow(0 0 6px #fff)' }} />

          {/* Pluie */}
          <div style={{ position: 'absolute', top: '20px', left: '10%', animation: 'rainDrop 1.0s linear infinite' }}>
            <div style={{ width: '2px', height: '20px', background: 'linear-gradient(180deg, rgba(180,200,210,0.6), rgba(8,100,110,0.4))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '10px', left: '25%', animation: 'rainDrop 0.9s linear infinite 0.15s' }}>
            <div style={{ width: '2px', height: '18px', background: 'linear-gradient(180deg, rgba(180,200,210,0.5), rgba(8,100,110,0.3))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '30px', left: '40%', animation: 'rainDrop 1.1s linear infinite 0.4s' }}>
            <div style={{ width: '3px', height: '22px', background: 'linear-gradient(180deg, rgba(180,200,210,0.6), rgba(8,100,110,0.4))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '15px', left: '58%', animation: 'rainDrop 0.8s linear infinite 0.6s' }}>
            <div style={{ width: '2px', height: '16px', background: 'linear-gradient(180deg, rgba(180,200,210,0.5), rgba(8,100,110,0.3))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '25px', left: '72%', animation: 'rainDrop 1.0s linear infinite 0.25s' }}>
            <div style={{ width: '2px', height: '19px', background: 'linear-gradient(180deg, rgba(180,200,210,0.5), rgba(8,100,110,0.3))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '5px', left: '85%', animation: 'rainDrop 0.9s linear infinite 0.8s' }}>
            <div style={{ width: '2px', height: '15px', background: 'linear-gradient(180deg, rgba(180,200,210,0.4), rgba(8,100,110,0.2))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '35px', left: '15%', animation: 'rainDrop 1.2s linear infinite 0.05s' }}>
            <div style={{ width: '3px', height: '21px', background: 'linear-gradient(180deg, rgba(180,200,210,0.6), rgba(8,100,110,0.4))', borderRadius: '2px 2px 50% 50%' }} />
          </div>
          <div style={{ position: 'absolute', top: '12px', left: '48%', animation: 'rainDrop 1.0s linear infinite 0.5s' }}>
            <div style={{ width: '2px', height: '17px', background: 'linear-gradient(180deg, rgba(180,200,210,0.5), rgba(8,100,110,0.3))', borderRadius: '2px 2px 50% 50%' }} />
          </div>

          {/* AVION QUI SURVOLE */}
          <div style={{ position: 'absolute', top: '25px', left: '0', animation: 'planeFly 12s linear infinite', zIndex: 3 }}>
            <div style={{ position: 'relative', width: '60px', height: '20px' }}>
              {/* Corps */}
              <div style={{ position: 'absolute', top: '8px', left: '10px', width: '40px', height: '6px', background: 'linear-gradient(90deg, #e2e8f0, #94a3b8)', borderRadius: '3px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
              {/* Aile gauche */}
              <div style={{ position: 'absolute', top: '4px', left: '22px', width: '16px', height: '8px', background: 'linear-gradient(180deg, #cbd5e1, #94a3b8)', clipPath: 'polygon(0 100%, 50% 0, 100% 100%)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              {/* Aile droite */}
              <div style={{ position: 'absolute', top: '10px', left: '22px', width: '16px', height: '8px', background: 'linear-gradient(0deg, #cbd5e1, #94a3b8)', clipPath: 'polygon(0 0, 50% 100%, 100% 0)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              {/* Queue */}
              <div style={{ position: 'absolute', top: '3px', left: '6px', width: '10px', height: '12px', background: 'linear-gradient(180deg, #cbd5e1, #94a3b8)', clipPath: 'polygon(0 100%, 100% 40%, 100% 100%)' }} />
              {/* Feux de position */}
              <div style={{ position: 'absolute', top: '6px', right: '2px', width: '3px', height: '3px', background: '#ef4444', borderRadius: '50%', animation: 'planeBlink 1s ease-in-out infinite', boxShadow: '0 0 4px #ef4444' }} />
              <div style={{ position: 'absolute', top: '13px', left: '24px', width: '2px', height: '2px', background: '#22c55e', borderRadius: '50%', animation: 'planeBlink 1s ease-in-out infinite 0.5s', boxShadow: '0 0 3px #22c55e' }} />
            </div>
          </div>

          {/* DRONE DE SURVEILLANCE */}
          <div style={{ position: 'absolute', top: '35px', right: '18%', animation: 'droneHover 5s ease-in-out infinite', zIndex: 4 }}>
            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
              {/* Bras du drone */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(0deg)', width: '40px', height: '3px', background: '#334155', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', width: '40px', height: '3px', background: '#334155', borderRadius: '2px' }} />
              {/* Hélices */}
              <div style={{ position: 'absolute', top: '2px', left: '2px', width: '10px', height: '3px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite' }} />
              <div style={{ position: 'absolute', top: '2px', right: '2px', width: '10px', height: '3px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite 0.02s' }} />
              <div style={{ position: 'absolute', bottom: '2px', left: '2px', width: '10px', height: '3px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite 0.04s' }} />
              <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '3px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite 0.06s' }} />
              {/* Corps central */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '14px', height: '14px', background: 'linear-gradient(135deg, #475569, #1e293b)', borderRadius: '50%', border: '1px solid #64748b', boxShadow: '0 0 8px rgba(71,85,105,0.5)' }}>
                {/* LED centrale */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '5px', height: '5px', background: '#00d4ff', borderRadius: '50%', boxShadow: '0 0 6px #00d4ff, 0 0 12px rgba(0,212,255,0.5)', animation: 'droneBlink 1.5s ease-in-out infinite' }} />
              </div>
              {/* Faisceau de scan */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 0)', width: '60px', height: '80px', background: 'linear-gradient(180deg, rgba(0,212,255,0.15) 0%, transparent 100%)', clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0 100%)', animation: 'droneScan 3s ease-in-out infinite', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Fissures dans le sol */}
          <svg width="100%" height="100%" viewBox="0 0 800 220" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <path d="M 50 220 L 80 180 L 70 150 L 100 120 L 90 80 L 130 40" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="0" style={{ animation: 'crackAppear 3s ease-out infinite' }} />
            <path d="M 80 180 L 110 190 L 140 170" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeDasharray="150" strokeDashoffset="0" style={{ animation: 'crackAppear 3s ease-out infinite 0.5s' }} />
            <path d="M 700 220 L 670 190 L 680 160 L 650 130 L 660 90 L 620 50" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="2" strokeDasharray="200" strokeDashoffset="0" style={{ animation: 'crackAppear 3.5s ease-out infinite 1s' }} />
            <path d="M 670 190 L 640 200 L 610 185" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeDasharray="120" strokeDashoffset="0" style={{ animation: 'crackAppear 3.5s ease-out infinite 1.3s' }} />
            <path d="M 350 220 L 370 200 L 360 170 L 390 140 L 380 100" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeDasharray="180" strokeDashoffset="0" style={{ animation: 'crackAppear 4s ease-out infinite 2s' }} />
          </svg>

          {/* Ondes sismiques */}
          <div style={{ position: 'absolute', top: '55%', left: '30%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ position: 'absolute', width: '40px', height: '40px', border: '2px solid rgba(233,69,96,0.4)', borderRadius: '50%', animation: 'seismicWave 2s ease-out infinite' }} />
            <div style={{ position: 'absolute', width: '40px', height: '40px', border: '2px solid rgba(233,69,96,0.3)', borderRadius: '50%', animation: 'seismicWave 2s ease-out infinite 0.6s' }} />
            <div style={{ position: 'absolute', width: '40px', height: '40px', border: '2px solid rgba(233,69,96,0.2)', borderRadius: '50%', animation: 'seismicWave 2s ease-out infinite 1.2s' }} />
          </div>
          <div style={{ position: 'absolute', top: '65%', left: '70%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ position: 'absolute', width: '30px', height: '30px', border: '2px solid rgba(233,69,96,0.35)', borderRadius: '50%', animation: 'seismicWave 2.5s ease-out infinite 0.3s' }} />
            <div style={{ position: 'absolute', width: '30px', height: '30px', border: '2px solid rgba(233,69,96,0.25)', borderRadius: '50%', animation: 'seismicWave 2.5s ease-out infinite 0.9s' }} />
          </div>

          {/* Bâtiment central avec séisme */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '35px',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '80px',
              animation: 'buildingShake 4s ease-in-out infinite',
              zIndex: 2,
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '50px', height: '70px', background: 'linear-gradient(180deg, #2d3436 0%, #1a1a2e 100%)', borderRadius: '2px', border: '1px solid rgba(233,69,96,0.3)' }}>
                <div style={{ position: 'absolute', top: '10px', left: '8px', width: '10px', height: '12px', background: 'rgba(255,200,50,0.6)', borderRadius: '1px', boxShadow: '0 0 6px rgba(255,200,50,0.4)' }} />
                <div style={{ position: 'absolute', top: '10px', right: '8px', width: '10px', height: '12px', background: 'rgba(255,200,50,0.4)', borderRadius: '1px' }} />
                <div style={{ position: 'absolute', top: '30px', left: '8px', width: '10px', height: '12px', background: 'rgba(255,200,50,0.5)', borderRadius: '1px' }} />
                <div style={{ position: 'absolute', top: '30px', right: '8px', width: '10px', height: '12px', background: 'rgba(255,200,50,0.3)', borderRadius: '1px' }} />
                <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '14px', background: 'rgba(233,69,96,0.5)', borderRadius: '1px', boxShadow: '0 0 8px rgba(233,69,96,0.3)' }} />
              </div>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '28px solid transparent', borderRight: '28px solid transparent', borderBottom: '18px solid #e94560' }} />
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '12px', background: '#e94560' }}>
                <div style={{ position: 'absolute', top: '-3px', left: '-2px', width: '6px', height: '6px', background: '#e94560', borderRadius: '50%', boxShadow: '0 0 8px #e94560' }} />
              </div>
            </div>
          </div>

          {/* Eau qui monte — vagues d'inondation */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55px', animation: 'floodRise 3s ease-in-out infinite', zIndex: 3 }}>
            <svg width="100%" height="100%" viewBox="0 0 800 55" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
              <path d="M0 25 Q 40 15, 80 25 T 160 25 T 240 22 T 320 25 T 400 28 T 480 25 T 560 23 T 640 25 T 720 27 T 800 25 V 55 H 0 Z" fill="rgba(6,90,96,0.65)" />
              <path d="M0 35 Q 50 25, 100 35 T 200 35 T 300 32 T 400 35 T 500 38 T 600 35 T 700 33 T 800 35 V 55 H 0 Z" fill="rgba(8,126,139,0.45)" />
              <path d="M0 45 Q 60 38, 120 45 T 240 43 T 360 45 T 480 47 T 600 45 T 720 44 T 800 45 V 55 H 0 Z" fill="rgba(10,150,160,0.25)" />
            </svg>
          </div>

          {/* Débris qui tombent */}
          <div style={{ position: 'absolute', top: '20px', left: '35%', animation: 'debrisFall 3s linear infinite' }}>
            <div style={{ width: '8px', height: '8px', background: '#5c5c5c', borderRadius: '1px', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }} />
          </div>
          <div style={{ position: 'absolute', top: '10px', left: '62%', animation: 'debrisFall 2.5s linear infinite 0.7s' }}>
            <div style={{ width: '6px', height: '10px', background: '#4a4a4a', borderRadius: '1px' }} />
          </div>
          <div style={{ position: 'absolute', top: '30px', left: '48%', animation: 'debrisFall 3.5s linear infinite 1.2s' }}>
            <div style={{ width: '10px', height: '6px', background: '#6b6b6b', borderRadius: '1px' }} />
          </div>
          <div style={{ position: 'absolute', top: '15px', left: '78%', animation: 'debrisFall 2.8s linear infinite 0.4s' }}>
            <div style={{ width: '5px', height: '5px', background: '#555', borderRadius: '50%' }} />
          </div>

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '32px',
              zIndex: 10,
              background: '#e94560',
              color: '#FFFFFF',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 2px 12px rgba(233,69,96,0.4)',
            }}
          >
            Catastrophe Naturelle
          </div>
        </div>

        {/* ========== CONTENU CARTE ========== */}
        <div style={{ padding: '28px 32px 32px 32px' }}>
          <div style={{ background: '#f0f4f8', borderRadius: '12px', padding: '20px', marginBottom: '24px', borderLeft: '4px solid #e94560' }}>
           <div className="row align-items-center">
                       {/* Texte à gauche */}
                       <div className="col-lg-8 col-md-7">
                         <div
                           style={{
                             background: "#EDF6F9",
                             borderRadius: "12px",
                             padding: "20px",
                             borderLeft: "4px solid #FF9F1C",
                           }}
                         >
                           <ul
                             style={{
                               color: "#4a5568",
                               fontSize: "14px",
                               lineHeight: 1.8,
                               margin: 0,
                               paddingLeft: "18px",
                             }}
                           >
Les Ateliers Novices sont conçus pour les jeunes débutants en aéronautique, âgés de 6 à 17 ans. Au programme: Défis en aéromodélisme, Aero Entrepreneure Junior et CAO — des activités adaptées à chaque âge pour apprendre, imaginer et s’envoler vers l’innovation!
                           </ul>
                         </div>
                       </div>
           
                       {/* Image à droite */}
                       <div className="col-lg-4 col-md-5 text-center">
                         <img
                           src={aeroIMG}
                           alt="AéroChallenge"
                           className="img-fluid rounded"
                           style={{ maxHeight: "200px", objectFit: "cover" }}
                         />
                       </div>
                     </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleInscriptionClick}
              style={{
                background: '#e94560',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 16px rgba(233,69,96,0.3)',
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#d63a54'; (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#e94560'; (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              📝 S&apos;inscrire au challenge
            </button>
            <button
              onClick={handleCahierClick}
              style={{
                background: 'transparent',
                color: '#1a1a2e',
                border: '2px solid #1a1a2e',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#1a1a2e'; (e.target as HTMLButtonElement).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = '#1a1a2e'; }}
            >
              📄 Cahier des charges
            </button>
          </div>
        </div>
      </div>

      {/* ========== MODALE INSCRIPTION ========== */}
      {showModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1040, backdropFilter: 'blur(4px)' }}
            onClick={handleCloseModal}
          />
          <div
            className="position-fixed top-50 start-50 translate-middle"
            style={{ zIndex: 1050, width: '100%', maxWidth: '450px', animation: 'modalFadeIn 0.3s ease-out' }}
          >
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', background: '#fce4ec' }}>
                  <span style={{ fontSize: '35px' }}>🚫</span>
                </div>
              </div>
              <h4 className="text-center mb-3" style={{ color: '#1a1a2e', fontWeight: 700 }}>Inscription non disponible</h4>
              <p className="text-center mb-4" style={{ color: '#4a5568', fontSize: '15px', lineHeight: 1.6 }}>
                Les inscriptions pour ce challenge ne sont pas encore ouvertes.<br />Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button className="btn text-white border-0 py-3" onClick={handleCloseModal} style={{ background: '#e94560', borderRadius: '10px', fontSize: '16px', fontWeight: 700, transition: 'all 0.2s' }}>OK</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========== MODALE CAHIER DES CHARGES ========== */}
      {showCahierModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1040, backdropFilter: 'blur(4px)' }}
            onClick={handleCloseCahierModal}
          />
          <div
            className="position-fixed top-50 start-50 translate-middle"
            style={{ zIndex: 1050, width: '100%', maxWidth: '450px', animation: 'modalFadeIn 0.3s ease-out' }}
          >
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', background: '#e3f2fd' }}>
                  <span style={{ fontSize: '35px' }}>📄</span>
                </div>
              </div>
              <h4 className="text-center mb-3" style={{ color: '#1a1a2e', fontWeight: 700 }}>Cahier des charges indisponible</h4>
              <p className="text-center mb-4" style={{ color: '#4a5568', fontSize: '15px', lineHeight: 1.6 }}>
                Le cahier des charges pour ce challenge n&apos;est pas encore disponible.<br />Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button className="btn text-white border-0 py-3" onClick={handleCloseCahierModal} style={{ background: '#0f3460', borderRadius: '10px', fontSize: '16px', fontWeight: 700, transition: 'all 0.2s' }}>OK</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChallengeCard;