import React, { useState } from 'react';

const ForestFireChallengeCard: React.FC = () => {
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isCahierHovered, setIsCahierHovered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCahierClick = () => {
    setShowCahierModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const closeCahierModal = () => {
    setShowCahierModal(false);
  };

  return (
    <>
      <div className="forest-challenge-card">
        {/* Bannière */}
        <div className="forest-banner">
          <div className="blimp">
            <svg width="100" height="35" viewBox="0 0 100 35">
              <path d="M 22 7 L 30 17 L 22 27 L 12 22 L 12 12 Z" fill="#ffc107" />
              <rect x="24" y="6" width="62" height="22" rx="11" ry="11" fill="#ffffff" />
              <rect x="48" y="27" width="14" height="3" rx="1" fill="#ffc107" />
            </svg>
          </div>

          <svg className="forest-svg" viewBox="0 0 900 210" preserveAspectRatio="none">
            <polygon points="0,210 60,150 180,210" fill="#060c1c" />
            <polygon points="120,210 220,140 340,210" fill="#081024" />
            <g fill="#0e1e38">
              <polygon points="20,205 30,140 40,205" />
              <polygon points="35,205 48,125 60,205" />
              <polygon points="55,205 68,135 80,205" />
              <polygon points="75,205 88,130 100,205" />
              <polygon points="95,205 110,120 125,205" />
              <polygon points="120,205 132,140 145,205" />
              <polygon points="140,205 155,125 170,205" />
              <polygon points="165,205 178,135 190,205" />
              <polygon points="185,205 200,115 215,205" />
              <polygon points="210,205 225,130 240,205" />
              <polygon points="235,205 250,140 265,205" />
            </g>
            <g fill="#142848">
              <polygon points="25,205 15,175 20,175 10,150 17,150 5,125 25,125 23,205" />
              <polygon points="25,205 35,175 30,175 40,150 33,150 45,125 25,125 27,205" />
              <polygon points="90,205 78,170 84,170 72,140 80,140 68,110 90,110 88,205" />
              <polygon points="90,205 102,170 96,170 108,140 100,140 112,110 90,110 92,205" />
              <polygon points="180,205 168,165 174,165 162,135 170,135 158,105 180,105 178,205" />
              <polygon points="180,205 192,165 186,165 198,135 190,135 202,105 180,105 182,205" />
              <polygon points="240,205 230,175 234,175 225,150 230,150 220,125 240,125 238,205" />
              <polygon points="240,205 250,175 246,175 255,150 250,150 260,125 240,125 242,205" />
            </g>
            <g className="flame-group">
              <path d="M 40,205 C 32,185 38,165 50,150 C 58,162 68,168 62,180 C 74,162 86,178 80,205 Z" fill="#ff5d22" />
              <path d="M 48,205 C 42,192 46,178 52,165 C 57,175 63,178 60,185 C 67,175 74,185 70,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group-alt">
              <path d="M 110,205 C 104,188 108,170 118,158 C 124,168 132,172 128,182 C 138,168 148,182 142,205 Z" fill="#ff5d22" />
              <path d="M 116,205 C 112,194 115,182 120,172 C 124,180 129,182 126,188 C 132,180 137,188 134,205 Z" fill="#ffc107" />
            </g>
            <rect x="0" y="204" width="900" height="6" fill="#040814" />
          </svg>

          <div className="iot-station">
            <svg width="80" height="150" viewBox="0 0 90 160">
              <polygon points="41,160 49,160 46,55 44,55" fill="#8c381c" />
              <g transform="translate(45, 45)">
                <line x1="-22" y1="-22" x2="22" y2="22" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="-22" y1="22" x2="22" y2="-22" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="0" cy="0" r="5" fill="#ff5d22" />
                <circle cx="-22" cy="-22" r="8" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="-22" cy="-22" r="2.5" fill="#ffffff" />
                <circle cx="22" cy="-22" r="8" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="22" cy="-22" r="2.5" fill="#ffffff" />
                <circle cx="-22" cy="22" r="8" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="-22" cy="22" r="2.5" fill="#ffffff" />
                <circle cx="22" cy="22" r="8" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="22" cy="22" r="2.5" fill="#ffffff" />
              </g>
            </svg>
          </div>

          <div className="banner-badge">SURVEILLANCE FEU DE FORÊT</div>
        </div>

        {/* Corps */}
        <div className="forest-body">
          <div className="forest-content">
            <div className="forest-text">
              <p>
                Le challenge Surveillance Feu de Forêt met au défi les étudiants et passionnés de
                concevoir une station IoT terrestre associée à un vecteur aérien autonome. L'objectif
                est de détecter précocement les départs d'incendies et de transmettre les alertes en
                temps réel tout en respectant scrupuleusement les exigences du cahier des charges.
              </p>
            </div>
            <div className="forest-image">
              <img
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80"
                alt="Drone de surveillance"
              />
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="forest-actions">
          <button
            className="btn-register"
            onClick={handleRegisterClick}
            onMouseEnter={() => setIsRegisterHovered(true)}
            onMouseLeave={() => setIsRegisterHovered(false)}
            style={{
              backgroundColor: isRegisterHovered ? '#e04e17' : '#ff5d22',
              boxShadow: isRegisterHovered
                ? '0 6px 18px rgba(255, 93, 34, 0.4)'
                : '0 4px 12px rgba(255, 93, 34, 0.3)',
              transform: isRegisterHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <span>📋</span>
            S'inscrire au challenge
          </button>

          <button
            className="btn-cahier"
            onClick={handleCahierClick}
            onMouseEnter={() => setIsCahierHovered(true)}
            onMouseLeave={() => setIsCahierHovered(false)}
            style={{
              backgroundColor: isCahierHovered ? '#f1f5f9' : '#ffffff',
              transform: isCahierHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <span>📄</span>
            cahier des charges
          </button>
        </div>
      </div>

      {/* Modal Inscription */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={closeRegisterModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">📋</div>
            <h2 className="modal-title register">Inscription non disponible</h2>
            <p className="modal-text">
              Les inscriptions pour ce challenge ne sont pas encore ouvertes.
              <br />
              Veuillez revenir ultérieurement.
            </p>
            <button className="modal-btn" onClick={closeRegisterModal}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal Cahier des charges */}
      {showCahierModal && (
        <div className="modal-overlay" onClick={closeCahierModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">📄</div>
            <h2 className="modal-title cahier">Cahier des charges indisponible</h2>
            <p className="modal-text">
              Le cahier des charges pour ce challenge n'est pas encore disponible.
              <br />
              Veuillez revenir ultérieurement.
            </p>
            <button className="modal-btn" onClick={closeCahierModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForestFireChallengeCard;