import React, { useState } from 'react';
import aeroIMg from '../../../assets/images/18.jpg'

// ============================================
// Challenge Résilience Urbaine — Incendie
// Composant TSX (React / Next.js)
// ============================================

const ChallengeCard: React.FC = () => {
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
        {/* ========== BANDEAU INCENDIE ========== */}
        <div
          style={{
            height: '220px',
            background: 'linear-gradient(180deg, #1a0a0a 0%, #2d0a0a 20%, #4a0e0e 45%, #7c1d1d 70%, #b83232 90%, #e63946 100%)',
            position: 'relative',
            overflow: 'hidden',
            perspective: '1000px',
          }}
        >
          <style>{`
            @keyframes flameRise {
              0% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.8; }
              25% { transform: translateY(-8px) scaleX(1.1) scaleY(1.15); opacity: 1; }
              50% { transform: translateY(-4px) scaleX(0.95) scaleY(1.05); opacity: 0.9; }
              75% { transform: translateY(-12px) scaleX(1.05) scaleY(1.2); opacity: 1; }
              100% { transform: translateY(0) scaleX(1) scaleY(1); opacity: 0.8; }
            }
            @keyframes flameFlicker {
              0%, 100% { opacity: 0.7; transform: scaleY(1) skewX(0deg); }
              20% { opacity: 1; transform: scaleY(1.15) skewX(-3deg); }
              40% { opacity: 0.8; transform: scaleY(0.95) skewX(2deg); }
              60% { opacity: 1; transform: scaleY(1.1) skewX(-2deg); }
              80% { opacity: 0.75; transform: scaleY(1.05) skewX(1deg); }
            }
            @keyframes smokeRise {
              0% { transform: translateY(0) translateX(0) scale(0.6); opacity: 0.6; }
              50% { transform: translateY(-60px) translateX(15px) scale(1.2); opacity: 0.35; }
              100% { transform: translateY(-120px) translateX(-10px) scale(1.8); opacity: 0; }
            }
            @keyframes sparkFly {
              0% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }
              100% { transform: translateY(-180px) translateX(var(--spark-x, 20px)) scale(0); opacity: 0; }
            }
            @keyframes emberGlow {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.3); }
            }
            @keyframes buildingBurn {
              0%, 100% { filter: brightness(1) drop-shadow(0 0 4px rgba(230,57,70,0.3)); }
              25% { filter: brightness(1.2) drop-shadow(0 0 8px rgba(230,57,70,0.6)); }
              50% { filter: brightness(0.9) drop-shadow(0 0 12px rgba(244,162,97,0.5)); }
              75% { filter: brightness(1.15) drop-shadow(0 0 6px rgba(230,57,70,0.4)); }
            }
            @keyframes heatWave {
              0% { transform: scaleY(1) translateY(0); opacity: 0.3; }
              50% { transform: scaleY(1.3) translateY(-5px); opacity: 0.15; }
              100% { transform: scaleY(1) translateY(0); opacity: 0.3; }
            }
            @keyframes alarmBlink {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            @keyframes modalFadeIn {
              from { opacity: 0; transform: scale(0.8) translateY(-20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes droneHover {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(6px, -4px) rotate(1deg); }
              50% { transform: translate(-3px, -2px) rotate(-1deg); }
              75% { transform: translate(4px, -6px) rotate(0.5deg); }
            }
            @keyframes dronePropeller {
              0% { transform: scaleX(1); }
              50% { transform: scaleX(0.1); }
              100% { transform: scaleX(1); }
            }
            @keyframes droneScan {
              0% { opacity: 0; }
              50% { opacity: 0.35; }
              100% { opacity: 0; }
            }
          `}</style>

          {/* Fond de chaleur / ondulation thermique */}
          <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '80px', background: 'linear-gradient(0deg, rgba(230,57,70,0.3), transparent)', animation: 'heatWave 2s ease-in-out infinite' }} />

          {/* Nuages de fumée */}
          <div style={{ position: 'absolute', bottom: '40px', left: '15%', animation: 'smokeRise 5s ease-out infinite' }}>
            <div style={{ width: '60px', height: '30px', background: 'rgba(80,80,80,0.5)', borderRadius: '30px', filter: 'blur(8px)' }}>
              <div style={{ width: '35px', height: '35px', background: 'rgba(100,100,100,0.4)', borderRadius: '50%', position: 'absolute', top: '-15px', left: '8px' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '30px', left: '45%', animation: 'smokeRise 6s ease-out infinite 1.5s' }}>
            <div style={{ width: '50px', height: '25px', background: 'rgba(70,70,70,0.45)', borderRadius: '25px', filter: 'blur(6px)' }}>
              <div style={{ width: '28px', height: '28px', background: 'rgba(90,90,90,0.35)', borderRadius: '50%', position: 'absolute', top: '-12px', left: '6px' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '50px', left: '70%', animation: 'smokeRise 4.5s ease-out infinite 0.8s' }}>
            <div style={{ width: '55px', height: '28px', background: 'rgba(75,75,75,0.48)', borderRadius: '28px', filter: 'blur(7px)' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(95,95,95,0.38)', borderRadius: '50%', position: 'absolute', top: '-14px', left: '7px' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '35px', left: '30%', animation: 'smokeRise 5.5s ease-out infinite 2.5s' }}>
            <div style={{ width: '45px', height: '22px', background: 'rgba(85,85,85,0.4)', borderRadius: '22px', filter: 'blur(5px)' }}>
              <div style={{ width: '26px', height: '26px', background: 'rgba(100,100,100,0.3)', borderRadius: '50%', position: 'absolute', top: '-10px', left: '5px' }} />
            </div>
          </div>

          {/* Flammes en bas */}
          <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'flex-end', gap: '2px', zIndex: 2 }}>
            <div style={{ width: '18px', height: '50px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 40%, #e63946 70%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.2s ease-in-out infinite', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '22px', height: '70px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 35%, #e63946 65%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.5s ease-in-out infinite 0.2s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '16px', height: '45px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 45%, #e63946 75%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.1s ease-in-out infinite 0.4s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '28px', height: '85px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 30%, #e63946 60%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.3s ease-in-out infinite 0.1s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '20px', height: '60px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 40%, #e63946 70%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.4s ease-in-out infinite 0.3s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '24px', height: '75px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 35%, #e63946 65%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.2s ease-in-out infinite 0.5s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '15px', height: '40px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 50%, #e63946 80%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.6s ease-in-out infinite 0.15s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
            <div style={{ width: '19px', height: '55px', background: 'linear-gradient(180deg, #FFD23F 0%, #FF5A1F 40%, #e63946 70%, transparent 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', animation: 'flameRise 1.1s ease-in-out infinite 0.35s', transformOrigin: 'bottom center', filter: 'blur(0.5px)' }} />
          </div>

          {/* Bâtiment en feu au centre */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '30px',
              transform: 'translateX(-50%)',
              width: '70px',
              height: '90px',
              animation: 'buildingBurn 2s ease-in-out infinite',
              zIndex: 3,
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Corps du bâtiment */}
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '55px', height: '75px', background: 'linear-gradient(180deg, #3d1f1f 0%, #2a1212 100%)', borderRadius: '2px', border: '1px solid rgba(230,57,70,0.4)' }}>
                {/* Fenêtres avec lueur de feu */}
                <div style={{ position: 'absolute', top: '10px', left: '8px', width: '10px', height: '12px', background: 'rgba(255,210,63,0.7)', borderRadius: '1px', boxShadow: '0 0 8px rgba(255,90,31,0.6)', animation: 'emberGlow 1.5s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '10px', right: '8px', width: '10px', height: '12px', background: 'rgba(255,90,31,0.5)', borderRadius: '1px', boxShadow: '0 0 6px rgba(230,57,70,0.4)' }} />
                <div style={{ position: 'absolute', top: '30px', left: '8px', width: '10px', height: '12px', background: 'rgba(255,90,31,0.6)', borderRadius: '1px', boxShadow: '0 0 7px rgba(255,90,31,0.5)', animation: 'emberGlow 1.8s ease-in-out infinite 0.3s' }} />
                <div style={{ position: 'absolute', top: '30px', right: '8px', width: '10px', height: '12px', background: 'rgba(255,210,63,0.5)', borderRadius: '1px', boxShadow: '0 0 5px rgba(255,210,63,0.4)' }} />
                <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '14px', height: '16px', background: 'rgba(230,57,70,0.6)', borderRadius: '1px', boxShadow: '0 0 10px rgba(230,57,70,0.5)', animation: 'emberGlow 1.2s ease-in-out infinite 0.6s' }} />
              </div>
              {/* Toit */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '32px solid transparent', borderRight: '32px solid transparent', borderBottom: '20px solid #5c2a2a' }} />
              {/* Antenne */}
              <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '10px', background: '#e63946' }}>
                <div style={{ position: 'absolute', top: '-3px', left: '-2px', width: '6px', height: '6px', background: '#e63946', borderRadius: '50%', boxShadow: '0 0 8px #e63946', animation: 'alarmBlink 1s ease-in-out infinite' }} />
              </div>
            </div>
          </div>

          {/* Étincelles qui volent */}
          <div style={{ position: 'absolute', bottom: '60px', left: '40%', animation: 'sparkFly 2.5s linear infinite' }}>
            <div style={{ width: '3px', height: '3px', background: '#FFD23F', borderRadius: '50%', boxShadow: '0 0 6px #FFD23F, 0 0 12px #FF5A1F' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '50px', left: '55%', animation: 'sparkFly 3s linear infinite 0.5s' }}>
            <div style={{ width: '2px', height: '2px', background: '#FF5A1F', borderRadius: '50%', boxShadow: '0 0 4px #FF5A1F' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '70px', left: '48%', animation: 'sparkFly 2s linear infinite 1s' }}>
            <div style={{ width: '4px', height: '4px', background: '#FFD23F', borderRadius: '50%', boxShadow: '0 0 8px #FFD23F, 0 0 16px #FF5A1F' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '45px', left: '35%', animation: 'sparkFly 2.8s linear infinite 0.3s' }}>
            <div style={{ width: '2px', height: '2px', background: '#e63946', borderRadius: '50%', boxShadow: '0 0 5px #e63946' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '65px', left: '60%', animation: 'sparkFly 2.2s linear infinite 0.8s' }}>
            <div style={{ width: '3px', height: '3px', background: '#FFD23F', borderRadius: '50%', boxShadow: '0 0 6px #FFD23F' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '55px', left: '42%', animation: 'sparkFly 3.2s linear infinite 1.2s' }}>
            <div style={{ width: '2px', height: '2px', background: '#FF5A1F', borderRadius: '50%', boxShadow: '0 0 4px #FF5A1F' }} />
          </div>

          {/* Drone de surveillance incendie */}
          <div style={{ position: 'absolute', top: '30px', right: '15%', animation: 'droneHover 4s ease-in-out infinite', zIndex: 4 }}>
            <div style={{ position: 'relative', width: '36px', height: '36px' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(0deg)', width: '32px', height: '2px', background: '#334155', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', width: '32px', height: '2px', background: '#334155', borderRadius: '2px' }} />
              <div style={{ position: 'absolute', top: '2px', left: '2px', width: '8px', height: '2px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite' }} />
              <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '2px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite 0.02s' }} />
              <div style={{ position: 'absolute', bottom: '2px', left: '2px', width: '8px', height: '2px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite 0.04s' }} />
              <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '8px', height: '2px', background: '#94a3b8', borderRadius: '2px', animation: 'dronePropeller 0.08s linear infinite 0.06s' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: 'linear-gradient(135deg, #475569, #1e293b)', borderRadius: '50%', border: '1px solid #64748b', boxShadow: '0 0 6px rgba(71,85,105,0.5)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '4px', background: '#FF5A1F', borderRadius: '50%', boxShadow: '0 0 4px #FF5A1F' }} />
              </div>
              {/* Faisceau thermique */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 0)', width: '40px', height: '60px', background: 'linear-gradient(180deg, rgba(255,90,31,0.12) 0%, transparent 100%)', clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0 100%)', animation: 'droneScan 3s ease-in-out infinite', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '32px',
              zIndex: 10,
              background: '#e63946',
              color: '#FFFFFF',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 2px 12px rgba(230,57,70,0.5)',
            }}
          >
            🔥 Incendie
          </div>
        </div>

        {/* ========== CONTENU CARTE ========== */}
        <div style={{ padding: '28px 32px 32px 32px' }}>
          <div style={{ background: '#fef2f2', borderRadius: '12px', padding: '20px', marginBottom: '24px', borderLeft: '4px solid #e63946' }}>
            <div className="row align-items-center g-4">
              {/* Texte à gauche */}
              <div className="col-lg-8 col-md-7">
                <ul style={{ color: '#4a5568', fontSize: '14px', lineHeight: 1.8, margin: 0, paddingLeft: '18px' }}>
                  Le Challenge AéroEntrepreneur est une compétition alliant aéronautique et entrepreneuriat, destinée aux jeunes porteurs d'un esprit d'innovation et d'initiative. Durant 24 heures, les équipes devront concevoir et proposer des solutions aux problématiques qui leur seront présentées au début du challenge. Tout au long de l'événement, les participants bénéficieront de l'accompagnement de coaches spécialisés dans les deux domaines, ainsi que de formations ciblées pour enrichir leurs compétences.
                </ul>
              </div>
              
              {/* Image à droite */}
              <div className="col-lg-4 col-md-5 text-center">
                <img 
                  src={aeroIMg} 
                  alt="AéroChallenge"
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* ========== BOUTONS CENTRÉS ========== */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handleInscriptionClick}
              style={{
                background: '#e63946',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 16px rgba(230,57,70,0.3)',
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#c62828'; (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#e63946'; (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              📝 S'inscrire au challenge
            </button>
            <button
              onClick={handleCahierClick}
              style={{
                background: 'transparent',
                color: '#1a0a0a',
                border: '2px solid #1a0a0a',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#1a0a0a'; (e.target as HTMLButtonElement).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = '#1a0a0a'; }}
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
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', background: '#fef2f2' }}>
                  <span style={{ fontSize: '35px' }}>🚫</span>
                </div>
              </div>
              <h4 className="text-center mb-3" style={{ color: '#1a0a0a', fontWeight: 700 }}>Inscription non disponible</h4>
              <p className="text-center mb-4" style={{ color: '#4a5568', fontSize: '15px', lineHeight: 1.6 }}>
                Les inscriptions pour ce challenge ne sont pas encore ouvertes.<br />Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button 
                  className="btn text-white border-0 py-3" 
                  onClick={handleCloseModal} 
                  style={{ 
                    background: '#e63946', 
                    borderRadius: '10px', 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    transition: 'all 0.2s' 
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#c62828'; }}
                  onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#e63946'; }}
                >
                  OK
                </button>
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
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '70px', height: '70px', background: '#fef2f2' }}>
                  <span style={{ fontSize: '35px' }}>📄</span>
                </div>
              </div>
              <h4 className="text-center mb-3" style={{ color: '#1a0a0a', fontWeight: 700 }}>Cahier des charges indisponible</h4>
              <p className="text-center mb-4" style={{ color: '#4a5568', fontSize: '15px', lineHeight: 1.6 }}>
                Le cahier des charges pour ce challenge n'est pas encore disponible.<br />Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button 
                  className="btn text-white border-0 py-3" 
                  onClick={handleCloseCahierModal} 
                  style={{ 
                    background: '#7c1d1d', 
                    borderRadius: '10px', 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    transition: 'all 0.2s' 
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#5c1414'; }}
                  onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#7c1d1d'; }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChallengeCard;