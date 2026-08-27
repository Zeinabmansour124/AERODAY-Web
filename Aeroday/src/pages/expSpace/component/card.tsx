import React, { useState } from 'react';

// ============================================
// Challenge Card — Aerospace World Problems
// ============================================
const ChallengeCard_AerospaceMissions: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  const missions = [
    {
      num: '01',
      title: 'SAVE OUR PLANET',
      desc: 'Surveiller le changement climatique par satellites.',
      icon: '🌍',
    },
    {
      num: '02',
      title: 'FIND THE WATER',
      desc: 'Technologies aérospatiales contre le stress hydrique.',
      icon: '💧',
    },
    {
      num: '03',
      title: 'DETECT THE INVISIBLE',
      desc: 'Détecter les incendies et prévenir les catastrophes.',
      icon: '🔥',
    },
    {
      num: '04',
      title: 'FLY WITHOUT DESTROYING',
      desc: 'Rendre l\'aviation plus durable.',
      icon: '✈️',
    },
    {
      num: '05',
      title: 'THE NEXT FRONTIER',
      desc: 'Résoudre les défis pour aller au-delà de la Terre.',
      icon: '🚀',
    },
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
        {/* Banner Spatial */}
        <div
          style={{
            height: '320px',
            background: 'linear-gradient(180deg, #0B0F19 0%, #0f172a 40%, #1e3a5f 70%, #0f172a 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            @keyframes orbit {
              0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
            }
            @keyframes orbitSlow {
              0% { transform: rotate(180deg) translateX(110px) rotate(-180deg); }
              100% { transform: rotate(540deg) translateX(110px) rotate(-540deg); }
            }
            @keyframes meteor {
              0% { transform: translateX(0) translateY(0); opacity: 1; }
              100% { transform: translateX(-250px) translateY(180px); opacity: 0; }
            }
            @keyframes floatEarth {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-8px) rotate(2deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.3; transform: scale(0.8); }
            }
            @keyframes modalFadeIn {
              from { opacity: 0; transform: scale(0.8) translateY(-20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* Étoiles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${Math.random() * 85}%`,
                left: `${Math.random() * 95}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: '#fff',
                borderRadius: '50%',
                opacity: 0.4 + (i % 5) * 0.15,
                animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite ${i * 0.3}s`,
                boxShadow: i % 3 === 0 ? '0 0 4px rgba(255,255,255,0.6)' : 'none',
              }}
            />
          ))}

          {/* Planète Terre stylisée */}
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            right: '10%',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #3b82f6, #1d4ed8, #0f172a)',
            boxShadow: '0 0 40px rgba(59,130,246,0.3), inset -10px -10px 30px rgba(0,0,0,0.5)',
            animation: 'floatEarth 6s ease-in-out infinite',
            overflow: 'hidden',
          }}>
            {/* Continents stylisés */}
            <div style={{ position: 'absolute', top: '25%', left: '15%', width: '35px', height: '20px', background: 'rgba(34,197,94,0.6)', borderRadius: '40% 60% 50% 40%' }} />
            <div style={{ position: 'absolute', top: '50%', left: '55%', width: '28px', height: '18px', background: 'rgba(34,197,94,0.5)', borderRadius: '30% 70% 60% 40%' }} />
            <div style={{ position: 'absolute', top: '65%', left: '25%', width: '22px', height: '14px', background: 'rgba(34,197,94,0.4)', borderRadius: '50%' }} />
          </div>

          {/* Satellite 1 — Orbite */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0',
            height: '0',
            animation: 'orbit 20s linear infinite',
          }}>
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '-12px',
              width: '24px',
              height: '10px',
              background: '#94a3b8',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(148,163,184,0.5)',
            }}>
              <div style={{ position: 'absolute', left: '-6px', top: '2px', width: '6px', height: '6px', background: '#60a5fa', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', right: '-6px', top: '2px', width: '6px', height: '6px', background: '#60a5fa', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', top: '-3px', left: '8px', width: '3px', height: '3px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
            </div>
          </div>

          {/* Satellite 2 — Orbite lente */}
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '30%',
            width: '0',
            height: '0',
            animation: 'orbitSlow 28s linear infinite',
          }}>
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '-10px',
              width: '20px',
              height: '8px',
              background: '#cbd5e1',
              borderRadius: '2px',
              boxShadow: '0 0 6px rgba(203,213,225,0.4)',
            }}>
              <div style={{ position: 'absolute', left: '-5px', top: '1px', width: '5px', height: '6px', background: '#f59e0b', borderRadius: '1px' }} />
              <div style={{ position: 'absolute', right: '-5px', top: '1px', width: '5px', height: '6px', background: '#f59e0b', borderRadius: '1px' }} />
            </div>
          </div>

          {/* Traînées de météores */}
          <div style={{ position: 'absolute', top: '20px', right: '80px', animation: 'meteor 4s linear infinite' }}>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8))', borderRadius: '2px' }} />
          </div>
          <div style={{ position: 'absolute', top: '60px', right: '150px', animation: 'meteor 5s linear infinite 2s' }}>
            <div style={{ width: '40px', height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.8))', borderRadius: '2px' }} />
          </div>
          <div style={{ position: 'absolute', top: '100px', right: '40px', animation: 'meteor 6s linear infinite 1s' }}>
            <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6))', borderRadius: '2px' }} />
          </div>

          {/* ISS stylisée */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '15%',
            width: '36px',
            height: '12px',
            animation: 'floatEarth 8s ease-in-out infinite 1s',
          }}>
            <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-8px', top: '-2px', width: '8px', height: '10px', background: '#60a5fa', borderRadius: '1px', opacity: 0.7 }} />
              <div style={{ position: 'absolute', right: '-8px', top: '-2px', width: '8px', height: '10px', background: '#60a5fa', borderRadius: '1px', opacity: 0.7 }} />
              <div style={{ position: 'absolute', left: '12px', top: '-3px', width: '4px', height: '4px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            </div>
          </div>

          {/* Nébuleuse / Halo */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '60%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              zIndex: 10,
              background: '#F59E0B',
              color: '#0F172A',
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
              backgroundColor: '#0F172A',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            EXPOSITION AEROSPATIALE
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
            The World Has a Problem. Can Aerospace Solve It?
          </h2>

          <p style={{
            color: '#475569',
            fontSize: '13.5px',
            lineHeight: 1.7,
            margin: '0 0 20px 0',
            textAlign: 'left',
          }}>
Cet axe vous invite à explorer un domaine captivant qui repousse les frontières terrestres et ouvre les portes de l'innovation et de l'avenir. Le secteur aérospatial suscite un intérêt grandissant pour les mystères de l'univers. Cette exposition offrira aux visiteurs l'occasion de plonger dans une diversité de projets fascinants, révélant les promesses de l'espace et éveillant la curiosité des passionnés pour l'astronomie et l'exploration spatiale.          </p>

          {/* Grille des 5 missions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}>
            {missions.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '16px 14px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s',
                  cursor: 'default',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 16px rgba(15,23,42,0.08)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#F59E0B';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{m.icon}</div>
                <div style={{
                  color: '#F59E0B',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                }}>
                  Mission {m.num}
                </div>
                <div style={{
                  color: '#0F172A',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '4px',
                  lineHeight: 1.3,
                }}>
                  {m.title}
                </div>
                <div style={{
                  color: '#64748B',
                  fontSize: '11px',
                  lineHeight: 1.5,
                }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>

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
                background: '#F59E0B',
                color: '#0F172A',
                border: 'none',
                padding: '11px 28px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#D97706';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = '#F59E0B';
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
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #F59E0B' }}>
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', background: '#FFFBEB' }}>
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
                style={{ background: '#F59E0B', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#D97706')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#F59E0B')}
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

export default ChallengeCard_AerospaceMissions;