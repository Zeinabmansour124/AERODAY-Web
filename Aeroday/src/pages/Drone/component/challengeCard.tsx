import React, { useState } from 'react';

const ChallengeCard_NaturalDisaster_General: React.FC = () => {
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
          maxWidth: '920px',
          width: '100%',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {/* Bandeau Catastrophe Naturelle */}
        <div
          style={{
            height: '320px',
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 60%, #475569 100%)',
            position: 'relative',
            overflow: 'hidden',
            perspective: '1000px',
          }}
        >
          <style>{`
            @keyframes droneHover {
              0%, 100% { transform: translateY(0) translateX(0) rotate(-2deg); }
              25% { transform: translateY(-6px) translateX(4px) rotate(1deg); }
              50% { transform: translateY(-3px) translateX(-3px) rotate(-1deg); }
              75% { transform: translateY(-8px) translateX(2px) rotate(2deg); }
            }
            @keyframes dronePropeller {
              0% { transform: rotateY(0deg); }
              100% { transform: rotateY(360deg); }
            }
            @keyframes droneScan {
              0%, 100% { opacity: 0.3; height: 0; }
              50% { opacity: 0.7; height: 120px; }
            }
            @keyframes lightningFlash {
              0%, 90%, 100% { opacity: 0; }
              92% { opacity: 1; }
              94% { opacity: 0; }
              96% { opacity: 0.8; }
            }
            @keyframes cloudFloat {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(20px); }
            }
            @keyframes debrisFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(3deg); }
            }
            @keyframes crackPulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.8; }
            }
            @keyframes waveExpand {
              0% { transform: scale(0.3) rotateX(70deg); opacity: 1; }
              100% { transform: scale(2.5) rotateX(70deg); opacity: 0; }
            }
            @keyframes rainDrop {
              0% { transform: translateY(0); opacity: 0; }
              10% { opacity: 0.6; }
              90% { opacity: 0.6; }
              100% { transform: translateY(200px); opacity: 0; }
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

          {/* Ciel orageux */}
          <div style={{ position: 'absolute', top: '8px', left: '5%', animation: 'cloudFloat 12s ease-in-out infinite' }}>
            <div style={{ width: '100px', height: '40px', background: 'rgba(30,41,59,0.7)', borderRadius: '40px', position: 'relative' }}>
              <div style={{ width: '55px', height: '48px', background: 'rgba(15,23,42,0.6)', borderRadius: '50%', position: 'absolute', top: '-20px', left: '15px' }} />
              <div style={{ width: '40px', height: '38px', background: 'rgba(30,41,59,0.5)', borderRadius: '50%', position: 'absolute', top: '-16px', right: '10px' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', top: '15px', right: '10%', animation: 'cloudFloat 15s ease-in-out infinite 3s' }}>
            <div style={{ width: '80px', height: '32px', background: 'rgba(30,41,59,0.6)', borderRadius: '30px', position: 'relative' }}>
              <div style={{ width: '45px', height: '42px', background: 'rgba(15,23,42,0.5)', borderRadius: '50%', position: 'absolute', top: '-18px', left: '10px' }} />
            </div>
          </div>

          {/* Éclairs */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <path d="M 180 10 L 150 60 L 170 60 L 140 120" fill="none" stroke="#fbbf24" strokeWidth="2.5" opacity="0" style={{ animation: 'lightningFlash 5s infinite' }} />
            <path d="M 400 5 L 370 50 L 390 50 L 360 100" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0" style={{ animation: 'lightningFlash 7s infinite 2s' }} />
          </svg>

          {/* Pluie */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${10 + (i * 15) % 40}px`,
                left: `${8 + (i * 11) % 84}%`,
                animation: `rainDrop ${1.2 + (i % 3) * 0.3}s linear infinite ${i * 0.2}s`,
              }}
            >
              <div style={{
                width: '2px',
                height: `${14 + (i % 3) * 4}px`,
                background: 'linear-gradient(180deg, rgba(203,213,225,0.5), rgba(148,163,184,0.2))',
                borderRadius: '2px',
              }} />
            </div>
          ))}

          {/* Fissures au sol */}
          <svg width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.5 }}>
            <path d="M 50 220 L 80 180 L 75 160 L 100 140 L 95 120" fill="none" stroke="#64748b" strokeWidth="2" style={{ animation: 'crackPulse 3s ease-in-out infinite' }} />
            <path d="M 350 220 L 320 190 L 325 170 L 300 150 L 305 130" fill="none" stroke="#64748b" strokeWidth="1.5" style={{ animation: 'crackPulse 4s ease-in-out infinite 1s' }} />
            <path d="M 200 220 L 190 200 L 210 185 L 200 165" fill="none" stroke="#64748b" strokeWidth="1.2" style={{ animation: 'crackPulse 3.5s ease-in-out infinite 0.5s' }} />
          </svg>

          {/* Ondes sismiques */}
          <div style={{ position: 'absolute', bottom: '15%', left: '15%', transformStyle: 'preserve-3d' }}>
            <div style={{ position: 'absolute', width: '120px', height: '120px', border: '2px solid rgba(100,116,139,0.4)', borderRadius: '50%', transform: 'rotateX(70deg)', animation: 'waveExpand 3s ease-out infinite' }} />
            <div style={{ position: 'absolute', width: '120px', height: '120px', border: '2px solid rgba(148,163,184,0.3)', borderRadius: '50%', transform: 'rotateX(70deg)', animation: 'waveExpand 3s ease-out infinite 1s' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '10%', right: '20%', transformStyle: 'preserve-3d' }}>
            <div style={{ position: 'absolute', width: '100px', height: '100px', border: '2px solid rgba(100,116,139,0.35)', borderRadius: '50%', transform: 'rotateX(70deg)', animation: 'waveExpand 2.5s ease-out infinite 0.5s' }} />
          </div>

          {/* DRONE 1 */}
          <div style={{
            position: 'absolute',
            top: '35px',
            left: '20%',
            width: '48px',
            height: '48px',
            animation: 'droneHover 4s ease-in-out infinite',
            zIndex: 5,
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '18px',
              height: '10px',
              background: '#334155',
              borderRadius: '3px',
              border: '1px solid #475569',
            }}>
              <div style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '4px',
                height: '4px',
                background: '#ef4444',
                borderRadius: '50%',
                boxShadow: '0 0 4px #ef4444',
                animation: 'lightningFlash 2s infinite',
              }} />
              <div style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '4px',
                height: '4px',
                background: '#22c55e',
                borderRadius: '50%',
                boxShadow: '0 0 4px #22c55e',
              }} />
            </div>
            {[-45, 45, 135, -135].map((deg, idx) => (
              <div key={idx} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '22px',
                height: '2px',
                background: '#475569',
                transformOrigin: '0 50%',
                transform: `rotate(${deg}deg)`,
              }}>
                <div style={{
                  position: 'absolute',
                  right: '-5px',
                  top: '-4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  borderTop: '2px solid rgba(203,213,225,0.6)',
                  animation: 'dronePropeller 0.1s linear infinite',
                }} />
              </div>
            ))}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              background: 'linear-gradient(180deg, rgba(6,182,212,0.3), transparent)',
              animation: 'droneScan 3s ease-in-out infinite',
              borderRadius: '0 0 50% 50%',
            }} />
          </div>

          {/* DRONE 2 */}
          <div style={{
            position: 'absolute',
            top: '55px',
            right: '15%',
            width: '40px',
            height: '40px',
            animation: 'droneHover 5s ease-in-out infinite 1s',
            zIndex: 5,
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '9px',
              background: '#1e293b',
              borderRadius: '2px',
              border: '1px solid #334155',
            }}>
              <div style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '3px',
                height: '3px',
                background: '#f59e0b',
                borderRadius: '50%',
                boxShadow: '0 0 3px #f59e0b',
              }} />
            </div>
            {[-45, 45, 135, -135].map((deg, idx) => (
              <div key={idx} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '18px',
                height: '2px',
                background: '#334155',
                transformOrigin: '0 50%',
                transform: `rotate(${deg}deg)`,
              }}>
                <div style={{
                  position: 'absolute',
                  right: '-4px',
                  top: '-3px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  borderTop: '1.5px solid rgba(203,213,225,0.5)',
                  animation: 'dronePropeller 0.08s linear infinite',
                }} />
              </div>
            ))}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              background: 'linear-gradient(180deg, rgba(245,158,11,0.25), transparent)',
              animation: 'droneScan 4s ease-in-out infinite 1s',
              borderRadius: '0 0 50% 50%',
            }} />
          </div>

          {/* Débris flottants */}
          <div style={{ position: 'absolute', bottom: '20px', left: '10%', animation: 'debrisFloat 4s ease-in-out infinite' }}>
            <div style={{ width: '14px', height: '7px', background: 'rgba(148,163,184,0.4)', borderRadius: '1px', transform: 'rotate(-15deg)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '25px', right: '25%', animation: 'debrisFloat 5s ease-in-out infinite 1.5s' }}>
            <div style={{ width: '10px', height: '10px', background: 'rgba(100,116,139,0.3)', borderRadius: '2px', transform: 'rotate(20deg)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '16px', left: '60%', animation: 'debrisFloat 3.5s ease-in-out infinite 0.8s' }}>
            <div style={{ width: '8px', height: '8px', background: 'rgba(148,163,184,0.35)', borderRadius: '50%' }} />
          </div>

          {/* Badge — style AéroChallenge */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              zIndex: 10,
              background: '#64748b',
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
            Videographie Par Drone
          </div>
        </div>

        {/* Contenu carte — dimensions AéroChallenge */}
        <div style={{ padding: '28px 32px 32px 32px' }}>
          

          

          {/* Bloc objectif — compact */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            borderLeft: '4px solid #64748b',
          }}>
            <p style={{
              color: '#475569',
              fontSize: '13px',
              lineHeight: 1.7,
              margin: 0,
            }}>
              le Challenge de Vidéographie par Drone invite les participants à explorer le ciel comme une toile de création, transformant l’outil aéronautique en instrument narratif et visuel. Cette année, le challenge s’inscrit sous le thème : "Simuler une performance acrobatique dans un cirque". Pour l’édition 2026, le challenge propose aux participants de recréer la magie et la maîtrise d’une performance acrobatique dans un cirque, à travers l’objectif de leur drone. Ce challenge permet aux participants de montrer leur créativité, leur maîtrise technique et leur sens artistique en capturant la fluidité, la précision et l’émotion des acrobaties entre les espaces verts et les bâtiments.            </p>
          </div>

          {/* Boutons — centrés, dimensions AéroChallenge */}
          <div style={{ 
            display: 'flex', 
            gap: '14px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
          }}>
            <button
              onClick={handleInscriptionClick}
              style={{
                background: '#64748b',
                color: '#FFFFFF',
                border: 'none',
                padding: '11px 28px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 14px rgba(100, 116, 139, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#475569';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = '#64748b';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              S'inscrire au challenge
            </button>
            <button
              onClick={handleCahierClick}
              style={{
                background: 'transparent',
                color: '#0F172A',
                border: '2px solid #0F172A',
                padding: '11px 28px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#0F172A';
                (e.target as HTMLButtonElement).style.color = '#FFFFFF';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = 'transparent';
                (e.target as HTMLButtonElement).style.color = '#0F172A';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Cahier des charges
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
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #64748b' }}>
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', background: '#f1f5f9' }}>
                  <span style={{ fontSize: '30px' }}>📝</span>
                </div>
              </div>
              <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '18px' }}>
                Inscription non disponible
              </h4>
              <p className="mb-4" style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.5 }}>
                Les inscriptions pour ce challenge ne sont pas encore ouvertes.<br />
                Veuillez revenir ultérieurement.
              </p>
              <button
                className="btn text-white border-0 px-4 py-2"
                onClick={handleCloseModal}
                style={{ background: '#64748b', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#475569')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#64748b')}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}

      {/* ========== MODALE CAHIER ========== */}
      {showCahierModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1040, backdropFilter: 'blur(4px)' }}
            onClick={handleCloseCahierModal}
          />
          <div
            className="position-fixed top-50 start-50 translate-middle"
            style={{ zIndex: 1050, width: '100%', maxWidth: '420px', animation: 'modalFadeIn 0.3s ease-out' }}
          >
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #0F172A' }}>
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', background: '#f1f5f9' }}>
                  <span style={{ fontSize: '30px' }}>📄</span>
                </div>
              </div>
              <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '18px' }}>
                Cahier des charges indisponible
              </h4>
              <p className="mb-4" style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.5 }}>
                Le cahier des charges pour ce challenge n'est pas encore disponible.<br />
                Veuillez revenir ultérieurement.
              </p>
              <button
                className="btn text-white border-0 px-4 py-2"
                onClick={handleCloseCahierModal}
                style={{ background: '#0F172A', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1e293b')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#0F172A')}
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

export default ChallengeCard_NaturalDisaster_General;