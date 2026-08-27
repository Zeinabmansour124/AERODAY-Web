import React, { useState } from 'react';

// ============================================
// Challenge Card — Programme Ambassadeur
// ============================================
const ChallengeCard_Ambassador: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  const benefits = [
    { icon: '🎓', title: 'Formation', desc: 'Bootcamp leadership & communication' },
    { icon: '🌐', title: 'Réseau', desc: 'Accès exclusif aux partenaires' },
    { icon: '🏆', title: 'Certification', desc: 'Attestation officielle AeroChallenge' },
    { icon: '🎁', title: 'Avantages', desc: 'Goodies, billets VIP & stages' },
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
        {/* Banner Ambassadeur — Réseau Global */}
        <div
          style={{
            height: '320px',
            background: 'linear-gradient(180deg, #0B1026 0%, #1e1b4b 35%, #312e81 65%, #4c1d95 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <style>{`
            @keyframes nodePulse {
              0%, 100% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.4); opacity: 1; }
            }
            @keyframes lineDraw {
              0% { stroke-dashoffset: 200; opacity: 0; }
              50% { opacity: 0.8; }
              100% { stroke-dashoffset: 0; opacity: 0.4; }
            }
            @keyframes planeFly {
              0% { transform: translateX(-50px) translateY(8px); }
              50% { transform: translateX(0) translateY(-6px); }
              100% { transform: translateX(50px) translateY(4px); }
            }
            @keyframes propSpin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes glowOrbit {
              0%, 100% { box-shadow: 0 0 15px rgba(139,92,246,0.3); }
              50% { box-shadow: 0 0 30px rgba(139,92,246,0.6); }
            }
            @keyframes floatNode {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
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

          {/* Réseau de nœuds — constellations */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            {/* Lignes de connexion */}
            <line x1="15%" y1="25%" x2="35%" y2="40%" stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 6s ease-in-out infinite' }} />
            <line x1="35%" y1="40%" x2="55%" y2="30%" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 7s ease-in-out infinite 1s' }} />
            <line x1="55%" y1="30%" x2="75%" y2="50%" stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 5s ease-in-out infinite 0.5s' }} />
            <line x1="75%" y1="50%" x2="85%" y2="35%" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 8s ease-in-out infinite 2s' }} />
            <line x1="25%" y1="60%" x2="45%" y2="45%" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 6s ease-in-out infinite 1.5s' }} />
            <line x1="45%" y1="45%" x2="65%" y2="55%" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 7s ease-in-out infinite 0.8s' }} />
            <line x1="65%" y1="55%" x2="80%" y2="65%" stroke="rgba(167,139,250,0.15)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'lineDraw 9s ease-in-out infinite 2.5s' }} />
          </svg>

          {/* Nœuds du réseau */}
          {[
            { top: '25%', left: '15%', delay: '0s' },
            { top: '40%', left: '35%', delay: '0.5s' },
            { top: '30%', left: '55%', delay: '1s' },
            { top: '50%', left: '75%', delay: '1.5s' },
            { top: '35%', left: '85%', delay: '2s' },
            { top: '60%', left: '25%', delay: '0.8s' },
            { top: '45%', left: '45%', delay: '1.2s' },
            { top: '55%', left: '65%', delay: '1.8s' },
            { top: '65%', left: '80%', delay: '2.2s' },
            { top: '20%', left: '70%', delay: '0.3s' },
          ].map((node, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: node.top,
                left: node.left,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#8b5cf6',
                animation: `nodePulse 3s ease-in-out infinite ${node.delay}`,
                boxShadow: '0 0 10px rgba(139,92,246,0.5)',
              }}
            />
          ))}

          {/* Avion ambassadeur — relie le monde */}
          <div style={{
            position: 'absolute',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '240px',
            height: '65px',
            animation: 'planeFly 6s ease-in-out infinite',
          }}>
            {/* Fuselage */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '15px',
              width: '210px',
              height: '15px',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #e2e8f0 100%)',
              borderRadius: '0 40px 40px 0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }} />
            {/* Nez */}
            <div style={{
              position: 'absolute',
              top: '26px',
              left: '220px',
              width: '0',
              height: '0',
              borderLeft: '16px solid #e2e8f0',
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
            }} />
            {/* Queue — Violet ambassadeur */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '18px',
              width: '26px',
              height: '20px',
              background: '#7C3AED',
              borderRadius: '2px 6px 0 0',
              transform: 'skewX(-8deg)',
              boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
            }} />
            {/* Ailes */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '85px',
              width: '80px',
              height: '6px',
              background: 'linear-gradient(180deg, #f1f5f9, #cbd5e1)',
              transform: 'rotate(-6deg)',
              borderRadius: '2px',
              transformOrigin: 'right center',
            }} />
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '85px',
              width: '80px',
              height: '6px',
              background: 'linear-gradient(180deg, #f1f5f9, #cbd5e1)',
              transform: 'rotate(6deg)',
              borderRadius: '2px',
              transformOrigin: 'right center',
            }} />
            {/* Moteurs */}
            <div style={{
              position: 'absolute',
              top: '35px',
              left: '100px',
              width: '14px',
              height: '10px',
              background: '#475569',
              borderRadius: '0 0 50% 50%',
            }}>
              <div style={{ position: 'absolute', top: '1px', left: '2px', width: '10px', height: '6px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', animation: 'propSpin 0.08s linear infinite' }} />
            </div>
            <div style={{
              position: 'absolute',
              top: '35px',
              left: '155px',
              width: '14px',
              height: '10px',
              background: '#475569',
              borderRadius: '0 0 50% 50%',
            }}>
              <div style={{ position: 'absolute', top: '1px', left: '2px', width: '10px', height: '6px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', animation: 'propSpin 0.08s linear infinite' }} />
            </div>
            {/* Feux */}
            <div style={{ position: 'absolute', top: '22px', left: '235px', width: '4px', height: '4px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 6px #ef4444', animation: 'pulse 1.2s infinite' }} />
            <div style={{ position: 'absolute', top: '22px', left: '16px', width: '4px', height: '4px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 6px #22c55e', animation: 'pulse 1.2s infinite 0.6s' }} />
          </div>

          {/* Globe stylisé */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            right: '10%',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #1e1b4b, #0f172a)',
            border: '2px solid rgba(139,92,246,0.3)',
            boxShadow: '0 0 20px rgba(139,92,246,0.2)',
            animation: 'glowOrbit 4s ease-in-out infinite',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '45px', height: '8px', background: 'rgba(34,197,94,0.3)', borderRadius: '4px', transform: 'rotate(-10deg)' }} />
            <div style={{ position: 'absolute', top: '45%', left: '30%', width: '30px', height: '6px', background: 'rgba(34,197,94,0.25)', borderRadius: '3px', transform: 'rotate(5deg)' }} />
            <div style={{ position: 'absolute', top: '65%', left: '15%', width: '35px', height: '7px', background: 'rgba(34,197,94,0.2)', borderRadius: '3px', transform: 'rotate(-5deg)' }} />
          </div>

          {/* Silhouettes ambassadeurs */}
          <div style={{ position: 'absolute', bottom: '35px', left: '8%', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
            <div style={{ width: '14px', height: '28px', background: 'rgba(139,92,246,0.3)', borderRadius: '7px 7px 0 0' }} />
            <div style={{ width: '16px', height: '36px', background: 'rgba(139,92,246,0.4)', borderRadius: '8px 8px 0 0' }} />
            <div style={{ width: '14px', height: '32px', background: 'rgba(139,92,246,0.3)', borderRadius: '7px 7px 0 0' }} />
          </div>

          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              zIndex: 10,
              background: '#7C3AED',
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
            Ambassadorship
          </h2>

          <p style={{
            color: '#475569',
            fontSize: '13.5px',
            lineHeight: 1.7,
            margin: '0 0 20px 0',
            textAlign: 'left',
          }}>
L'Ambassade est un axe clé de l'Aeroday, visant à donner une dimension nationale et internationale à l'événement. En attirant des conférenciers, participants, et médias, cet axe assure une organisation inclusive et diversifiée. Grâce à son réseau d'ambassadeurs, il connecte l'événement avec plusieurs universités et acteurs nationaux, tout en organisant des conférences qui encouragent le partage des connaissances en aéronautique.          </p>

          

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
                background: '#7C3AED',
                color: '#FFFFFF',
                border: 'none',
                padding: '11px 28px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = '#6D28D9';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = '#7C3AED';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Devenir Ambassadeur
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
              En savoir plus
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
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 text-center" style={{ borderTop: '4px solid #7C3AED' }}>
              <div className="mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', background: '#F5F3FF' }}>
                  <span style={{ fontSize: '30px' }}>📝</span>
                </div>
              </div>
              <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '18px' }}>
                Candidature non disponible
              </h4>
              <p className="mb-4" style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.5 }}>
                Les candidatures pour le programme ambassadeur ne sont pas encore ouvertes.<br />
                Veuillez revenir ultérieurement.
              </p>
              <button
                className="btn text-white border-0 px-4 py-2"
                onClick={handleCloseModal}
                style={{ background: '#7C3AED', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#6D28D9')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#7C3AED')}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}

      {/* ========== MODALE EN SAVOIR PLUS ========== */}
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
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', background: '#F1F5F9' }}>
                  <span style={{ fontSize: '30px' }}>📄</span>
                </div>
              </div>
              <h4 className="mb-2" style={{ color: '#0F172A', fontWeight: 700, fontSize: '18px' }}>
                Informations indisponibles
              </h4>
              <p className="mb-4" style={{ color: '#64748B', fontSize: '13px', lineHeight: 1.5 }}>
                Le dossier ambassadeur n'est pas encore disponible.<br />
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

export default ChallengeCard_Ambassador;