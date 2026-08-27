import React, { useState } from 'react';
import IMg from "../../../assets/images/irshow.webp"

// ============================================
// Challenge Card — Mission Mystérieuse : Catastrophes Naturelles
// Format identique aux autres pages
// ============================================

interface MysteriousChallengeProps {
  registrationUrl?: string;
  cahierPdfUrl?: string;
}

const MysteriousChallengeCard: React.FC<MysteriousChallengeProps> = ({
  registrationUrl = 'https://forms.google.com',
  cahierPdfUrl = '/documents/dossier-confidentiel.pdf',
}) => {
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isCahierHovered, setIsCahierHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleRegisterClick = () => setShowModal(true);
  const handleCahierClick = () => setShowCahierModal(true);
  const closeRegisterModal = () => setShowModal(false);
  const closeCahierModal = () => setShowCahierModal(false);

  return (
    <>
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
        {/* ========== BANDEAU RADAR & CATACLYSME ========== */}
        <div
          style={{
            height: '220px',
            background: 'radial-gradient(circle at 50% 30%, #1E1B4B 0%, #0F172A 60%, #020617 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <style>{`
            @keyframes radarSweep {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulseGlow {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.08); }
            }
            @keyframes anomalySignal {
              0%, 100% { opacity: 0.2; }
              10% { opacity: 1; }
              15% { opacity: 0.3; }
              20% { opacity: 0.9; }
              25% { opacity: 0.1; }
            }
            @keyframes scanline {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
          `}</style>

          {/* Grille Tactique de Fond */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Radar / Sonar Mystérieux */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px',
              height: '280px',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              borderRadius: '50%',
            }}
          >
            <div style={{ position: 'absolute', inset: '30px', border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: '70px', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '50%' }} />
            
            {/* Balayage Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 240, 255, 0.25) 360deg)',
                animation: 'radarSweep 6s linear infinite',
              }}
            />
          </div>

          {/* Anomalies / Epicentres Clignotants */}
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '38%',
              width: '10px',
              height: '10px',
              backgroundColor: '#EF4444',
              borderRadius: '50%',
              boxShadow: '0 0 12px #EF4444',
              animation: 'pulseGlow 1.5s infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '30%',
              right: '32%',
              width: '8px',
              height: '8px',
              backgroundColor: '#F59E0B',
              borderRadius: '50%',
              boxShadow: '0 0 10px #F59E0B',
              animation: 'pulseGlow 2s infinite ease-in-out',
            }}
          />

          {/* Effet d'Onde de Balayage (Scanline CRT) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.08), transparent)',
              animation: 'scanline 4s linear infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Badge de Secret / Urgence - EN HAUT A GAUCHE */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              color: '#FCA5A5',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              animation: 'anomalySignal 3s infinite',
            }}
          >
            ⚠️ OPÉRATION NOIRE // ACCÈS RESTREINT
          </div>

          {/* ===== NOM DU CHALLENGE EN BAS A GAUCHE ===== */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '32px',
              zIndex: 10,
              background: '#00F0FF',
              color: '#020617',
              padding: '6px 20px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(0, 240, 255, 0.4)',
            }}
          >
            🛸 Airshow
          </div>

          {/* Code en bas à droite */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '20px',
              color: 'rgba(0, 240, 255, 0.6)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '1px',
            }}
          >
            ANOMALIE_GEO_#8099 [DETECTEE]
          </div>
        </div>

        {/* ========== CORPS DU CHALLENGE ========== */}
        <div style={{ padding: '28px 32px 32px 32px' }}>
          <div
            style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              borderLeft: '4px solid #00F0FF',
            }}
          >
            <div className="row align-items-center g-4">
              {/* Texte à gauche */}
              <div className="col-lg-8 col-md-7">
                <div className="forest-text">
                  <p style={{ color: '#4a5568', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                    L'AirShow est un challenge dédié aux avions radio-commandés, où les participants doivent concevoir et réaliser leur propre PolyClub en suivant un cahier des charges rigoureux. Au cours de ce show aérien compétitif, chaque équipe présente un spectacle innovant, mettant en avant leurs compétences en pilotage devant un jury de professionnels et un public enthousiaste.
                  </p>
                </div>
              </div>
              
              {/* Image à droite */}
              <div className="col-lg-4 col-md-5 text-center">
                <img
                  src={IMg}
                  alt="Airshow"
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Boutons centrés */}
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
              onClick={handleRegisterClick}
              onMouseEnter={() => setIsRegisterHovered(true)}
              onMouseLeave={() => setIsRegisterHovered(false)}
              style={{
                background: isRegisterHovered ? '#00c8d4' : '#00F0FF',
                color: '#020617',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                boxShadow: isRegisterHovered
                  ? '0 6px 18px rgba(0, 240, 255, 0.4)'
                  : '0 4px 12px rgba(0, 240, 255, 0.3)',
                transform: isRegisterHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <span>📋</span>
              S'inscrire au challenge
            </button>

            <button
              onClick={handleCahierClick}
              onMouseEnter={() => setIsCahierHovered(true)}
              onMouseLeave={() => setIsCahierHovered(false)}
              style={{
                background: isCahierHovered ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                color: '#0F172A',
                border: '2px solid #0F172A',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                transform: isCahierHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <span>📄</span>
              Cahier des charges
            </button>
          </div>
        </div>
      </div>

      {/* ========== MODALE INSCRIPTION - PALETTE CYAN ========== */}
      {showModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
              backdropFilter: "blur(4px)",
            }}
            onClick={closeRegisterModal}
          />
          <div
            className="position-fixed top-50 start-50 translate-middle"
            style={{
              zIndex: 1050,
              width: "100%",
              maxWidth: "450px",
              animation: "modalFadeIn 0.3s ease-out",
            }}
          >
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#e0f7fa",
                  }}
                >
                  <span style={{ fontSize: "35px" }}>🔓</span>
                </div>
              </div>
              <h4
                className="text-center mb-3"
                style={{ color: "#0F172A", fontWeight: 700 }}
              >
                Inscription non disponible
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "#4a5568", fontSize: "15px", lineHeight: 1.6 }}
              >
                Les inscriptions pour ce challenge ne sont pas encore ouvertes.
                <br />
                Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button
                  className="btn text-white border-0 py-3"
                  onClick={closeRegisterModal}
                  style={{
                    background: "#00F0FF",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#020617",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#00c8d4";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#00F0FF";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========== MODALE CAHIER DES CHARGES - PALETTE BLEU FONCÉ ========== */}
      {showCahierModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
              backdropFilter: "blur(4px)",
            }}
            onClick={closeCahierModal}
          />
          <div
            className="position-fixed top-50 start-50 translate-middle"
            style={{
              zIndex: 1050,
              width: "100%",
              maxWidth: "450px",
              animation: "modalFadeIn 0.3s ease-out",
            }}
          >
            <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    background: "#e3f2fd",
                  }}
                >
                  <span style={{ fontSize: "35px" }}>📂</span>
                </div>
              </div>
              <h4
                className="text-center mb-3"
                style={{ color: "#0F172A", fontWeight: 700 }}
              >
                Dossier indisponible
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "#4a5568", fontSize: "15px", lineHeight: 1.6 }}
              >
                Le dossier confidentiel pour ce challenge n'est pas encore disponible.
                <br />
                Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button
                  className="btn text-white border-0 py-3"
                  onClick={closeCahierModal}
                  style={{
                    background: "#0F172A",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#1a1a2e";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#0F172A";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Animation */}
      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default MysteriousChallengeCard;