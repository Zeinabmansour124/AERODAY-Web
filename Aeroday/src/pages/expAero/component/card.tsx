import React, { useState } from 'react';

// ============================================
// Challenge Card — Exposition Aéronautique Tunisie
// ============================================
const ChallengeCard_AeroExpoTunisia: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  const exhibitors = [
    { name: 'Tunisair', type: 'Compagnie' },
    { name: 'Sabca', type: 'Aérostructures' },
    { name: 'Stelia', type: 'Aéronautique' },
    { name: 'TAI', type: 'MRO' },
    { name: 'Sfax Aero', type: 'Maintenance' },
    { name: 'Tunisavia', type: 'Aviation' },
  ];

  return (
    <>
      {/* ========== CARTE PRINCIPALE ========== */}
      <div
        className="ms-3"
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(15, 27, 60, 0.08)',
          position: 'relative',
          maxWidth: '920px',
          width: '100%',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {/* Banner Tunisie — Crépuscule Méditerranéen */}
        <div
          style={{
            height: '320px',
            background: 'linear-gradient(180deg, #0B1026 0%, #1a2744 25%, #2d4a6f 55%, #c75b39 80%, #d4a574 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            @keyframes planeFly {
              0% { transform: translateX(-40px) translateY(5px); }
              50% { transform: translateX(0) translateY(-5px); }
              100% { transform: translateX(40px) translateY(3px); }
            }
            @keyframes propSpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes sunPulse {
              0%, 100% { box-shadow: 0 0 30px rgba(231,80,50,0.4), 0 0 80px rgba(199,91,57,0.2); }
              50% { box-shadow: 0 0 50px rgba(231,80,50,0.6), 0 0 100px rgba(199,91,57,0.3); }
            }
            @keyframes duneShift {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(-5px); }
            }
            @keyframes spotlightTun {
              0% { transform: rotate(-20deg) translateX(-40px); opacity: 0.2; }
              50% { transform: rotate(20deg) translateX(40px); opacity: 0.6; }
              100% { transform: rotate(-20deg) translateX(-40px); opacity: 0.2; }
            }
            @keyframes palmSway {
              0%, 100% { transform: rotate(-2deg); }
              50% { transform: rotate(2deg); }
            }
            @keyframes modalFadeIn {
              from { opacity: 0; transform: scale(0.8) translateY(-20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.3; transform: scale(0.8); }
            }
          `}</style>

          {/* Étoiles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${5 + (i * 7) % 45}%`,
                left: `${5 + (i * 11) % 90}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: '#fff',
                borderRadius: '50%',
                opacity: 0.3 + (i % 4) * 0.15,
                animation: `twinkle ${2 + (i % 5)}s ease-in-out infinite ${i * 0.25}s`,
              }}
            />
          ))}

          {/* Soleil couchant méditerranéen */}
          <div style={{
            position: 'absolute',
            top: '45px',
            right: '10%',
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, #dc2626 100%)',
            animation: 'sunPulse 4s ease-in-out infinite',
          }} />

          {/* Projecteurs style salon */}
          <div style={{ position: 'absolute', top: 0, left: '15%', width: '3px', height: '160px', background: 'linear-gradient(180deg, rgba(231,0,19,0.3), transparent)', transformOrigin: 'top center', animation: 'spotlightTun 10s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: 0, right: '20%', width: '3px', height: '140px', background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)', transformOrigin: 'top center', animation: 'spotlightTun 12s ease-in-out infinite 3s' }} />

          {/* Avion stylisé */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            height: '70px',
            animation: 'planeFly 6s ease-in-out infinite',
          }}>
            {/* Fuselage */}
            <div style={{
              position: 'absolute',
              top: '26px',
              left: '15px',
              width: '230px',
              height: '16px',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #e2e8f0 100%)',
              borderRadius: '0 50px 50px 0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }} />
            {/* Nez */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '240px',
              width: '0',
              height: '0',
              borderLeft: '18px solid #e2e8f0',
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
            }} />
            {/* Queue — Rouge Tunisie */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '20px',
              width: '28px',
              height: '22px',
              background: '#E70013',
              borderRadius: '2px 8px 0 0',
              transform: 'skewX(-8deg)',
              boxShadow: '0 2px 8px rgba(231,0,19,0.4)',
            }} />
            {/* Aile gauche */}
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '90px',
              width: '90px',
              height: '7px',
              background: 'linear-gradient(180deg, #f1f5f9, #cbd5e1)',
              transform: 'rotate(-6deg)',
              borderRadius: '2px',
              transformOrigin: 'right center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }} />
            {/* Aile droite */}
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '90px',
              width: '90px',
              height: '7px',
              background: 'linear-gradient(180deg, #f1f5f9, #cbd5e1)',
              transform: 'rotate(6deg)',
              borderRadius: '2px',
              transformOrigin: 'right center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }} />
            {/* Moteurs */}
            <div style={{
              position: 'absolute',
              top: '38px',
              left: '110px',
              width: '16px',
              height: '12px',
              background: '#475569',
              borderRadius: '0 0 50% 50%',
            }}>
              <div style={{ position: 'absolute', top: '1px', left: '2px', width: '12px', height: '8px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', animation: 'propSpin 0.08s linear infinite' }} />
            </div>
            <div style={{
              position: 'absolute',
              top: '38px',
              left: '170px',
              width: '16px',
              height: '12px',
              background: '#475569',
              borderRadius: '0 0 50% 50%',
            }}>
              <div style={{ position: 'absolute', top: '1px', left: '2px', width: '12px', height: '8px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', animation: 'propSpin 0.08s linear infinite' }} />
            </div>
            {/* Feux */}
            <div style={{ position: 'absolute', top: '24px', left: '255px', width: '4px', height: '4px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 6px #ef4444', animation: 'pulse 1.2s infinite' }} />
            <div style={{ position: 'absolute', top: '24px', left: '18px', width: '4px', height: '4px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 6px #22c55e', animation: 'pulse 1.2s infinite 0.6s' }} />
          </div>

          {/* Drone de surveillance */}
          <div style={{
            position: 'absolute',
            top: '55px',
            right: '10%',
            width: '36px',
            height: '36px',
            animation: 'planeFly 5s ease-in-out infinite 1s',
          }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '14px', height: '7px', background: '#E70013', borderRadius: '2px' }} />
            {[-45, 45, 135, -135].map((deg, i) => (
              <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: '18px', height: '1.5px', background: '#E70013', transformOrigin: '0 50%', transform: `rotate(${deg}deg)` }}>
                <div style={{ position: 'absolute', right: '-3px', top: '-3px', width: '6px', height: '6px', borderRadius: '50%', borderTop: '1.5px solid rgba(255,255,255,0.6)', animation: 'propSpin 0.08s linear infinite' }} />
              </div>
            ))}
          </div>

          {/* Dunes du désert tunisien */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            background: 'linear-gradient(180deg, transparent, rgba(212,165,116,0.3))',
          }} />
          <svg width="100%" height="70" viewBox="0 0 920 70" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.6 }}>
            <path d="M 0 70 Q 150 20 300 55 T 600 35 T 920 60 L 920 70 Z" fill="rgba(199,91,57,0.25)" style={{ animation: 'duneShift 8s ease-in-out infinite' }} />
            <path d="M 0 70 Q 200 45 400 60 T 700 40 T 920 55 L 920 70 Z" fill="rgba(212,165,116,0.2)" style={{ animation: 'duneShift 10s ease-in-out infinite 2s' }} />
          </svg>

          {/* Silhouette minaret */}
          <div style={{ position: 'absolute', bottom: '35px', left: '8%' }}>
            <div style={{ width: '4px', height: '45px', background: 'rgba(15,23,42,0.5)', borderRadius: '2px 2px 0 0' }}>
              <div style={{ position: 'absolute', top: '-6px', left: '-4px', width: '12px', height: '8px', background: 'rgba(15,23,42,0.5)', borderRadius: '50% 50% 0 0' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '35px', left: '14%' }}>
            <div style={{ width: '3px', height: '35px', background: 'rgba(15,23,42,0.35)', borderRadius: '2px 2px 0 0' }} />
          </div>

          {/* Palmier stylisé */}
          <div style={{ position: 'absolute', bottom: '30px', right: '8%', animation: 'palmSway 5s ease-in-out infinite', transformOrigin: 'bottom center' }}>
            <div style={{ width: '3px', height: '50px', background: 'rgba(20,50,30,0.5)', borderRadius: '2px' }}>
              <div style={{ position: 'absolute', top: '-2px', left: '-12px', width: '28px', height: '14px', background: 'rgba(34,197,94,0.25)', borderRadius: '50% 50% 0 0', transform: 'rotate(-20deg)' }} />
              <div style={{ position: 'absolute', top: '0px', left: '-4px', width: '20px', height: '10px', background: 'rgba(34,197,94,0.2)', borderRadius: '50% 50% 0 0', transform: 'rotate(10deg)' }} />
            </div>
          </div>

          {/* Badge Tunisie */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              zIndex: 10,
              background: '#E70013',
              color: '#FFFFFF',
              padding: '6px 18px',
              borderRadius: '24px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            Exposition Aeronautique
          </div>
        </div>

        {/* Contenu carte */}
        <div style={{ padding: '28px 32px 32px 32px' }}>
          <h2 style={{
            color: '#0F172A',
            fontSize: '22px',
            fontWeight: 700,
            margin: '0 0 10px 0',
            textAlign: 'left',
          }}>
            HALL INSAT
          </h2>

          <p style={{
            color: '#475569',
            fontSize: '13.5px',
            lineHeight: 1.7,
            margin: '0 0 16px 0',
            textAlign: 'left',
          }}>
Plongez au cœur d’une exposition aéronautique où l’imagination des jeunes s’élève aux côtés du savoir des experts. Dans le hall de l’INSAT, les stands deviennent un ciel d’échanges et d’inspirations, où brillent projets audacieux, innovations et rêves d’altitude.           </p>

          {/* Grille exposants tunisiens */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '20px',
          }}>
            {exhibitors.map((ex, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '12px 10px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(15,23,42,0.06)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#E70013';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{
                  color: '#0F172A',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '2px',
                }}>
                  {ex.name}
                </div>
                <div style={{
                  color: '#64748B',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {ex.type}
                </div>
              </div>
            ))}
          </div>

          {/* Infos pratiques */}
          

          {/* Boutons */}
          <div style={{ 
            display: 'flex', 
            gap: '14px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
          }}>
            <button
              onClick={handleInscriptionClick}
              style={{
                background: '#E70013',
                color: '#FFFFFF',
                border: 'none',
                padding: '11px 28px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 14px rgba(231, 0, 19, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#B8000F';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = '#E70013';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Remplir formulaire
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
            style={{ zIndex: 1050, width: '100%', maxWidth: '420px', animation: 'modalFadeIn 0.3s ease-out' }}
          >
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #E70013' }}>
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', background: '#FEF2F2' }}>
                  <span style={{ fontSize: '30px' }}>📝</span>
                </div>
              </div>
              <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '18px' }}>
                Inscription non disponible
              </h4>
              <p className="mb-4" style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.5 }}>
                Les inscriptions pour ce salon ne sont pas encore ouvertes.<br />
                Veuillez revenir ultérieurement.
              </p>
              <button
                className="btn text-white border-0 px-4 py-2"
                onClick={handleCloseModal}
                style={{ background: '#E70013', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#B8000F')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#E70013')}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}

      
    </>
  );
};

export default ChallengeCard_AeroExpoTunisia;