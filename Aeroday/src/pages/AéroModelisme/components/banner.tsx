import React, { useState } from 'react';
import IMg from '../../../assets/images/description.jpg'

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
            {/* Collines */}
            <polygon points="0,210 60,150 180,210" fill="#060c1c" />
            <polygon points="120,210 220,140 340,210" fill="#081024" />
            <polygon points="500,210 620,130 740,210" fill="#060c1c" />
            <polygon points="650,210 770,150 900,210" fill="#081024" />

            {/* Arbres d'arrière-plan */}
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
              <polygon points="380,205 390,140 400,205" />
              <polygon points="395,205 408,125 420,205" />
              <polygon points="415,205 428,135 440,205" />
              <polygon points="435,205 448,130 460,205" />
              <polygon points="455,205 470,120 485,205" />
              <polygon points="480,205 492,140 505,205" />
              <polygon points="500,205 515,125 530,205" />
              <polygon points="525,205 538,135 550,205" />
              <polygon points="545,205 560,115 575,205" />
              <polygon points="570,205 585,130 600,205" />
              <polygon points="595,205 610,140 625,205" />
              <polygon points="700,205 712,140 725,205" />
              <polygon points="720,205 735,130 750,205" />
              <polygon points="745,205 758,135 770,205" />
              <polygon points="765,205 780,120 795,205" />
              <polygon points="790,205 802,140 815,205" />
              <polygon points="810,205 825,125 840,205" />
            </g>

            {/* Arbres de premier plan */}
            <g fill="#142848">
              <polygon points="25,205 15,175 20,175 10,150 17,150 5,125 25,125 23,205" />
              <polygon points="25,205 35,175 30,175 40,150 33,150 45,125 25,125 27,205" />
              <polygon points="90,205 78,170 84,170 72,140 80,140 68,110 90,110 88,205" />
              <polygon points="90,205 102,170 96,170 108,140 100,140 112,110 90,110 92,205" />
              <polygon points="180,205 168,165 174,165 162,135 170,135 158,105 180,105 178,205" />
              <polygon points="180,205 192,165 186,165 198,135 190,135 202,105 180,105 182,205" />
              <polygon points="240,205 230,175 234,175 225,150 230,150 220,125 240,125 238,205" />
              <polygon points="240,205 250,175 246,175 255,150 250,150 260,125 240,125 242,205" />
              <polygon points="385,205 375,175 380,175 370,150 377,150 365,125 385,125 383,205" />
              <polygon points="385,205 395,175 390,175 400,150 393,150 405,125 385,125 387,205" />
              <polygon points="450,205 438,170 444,170 432,140 440,140 428,110 450,110 448,205" />
              <polygon points="450,205 462,170 456,170 468,140 460,140 472,110 450,110 452,205" />
              <polygon points="540,205 528,165 534,165 522,135 530,135 518,105 540,105 538,205" />
              <polygon points="540,205 552,165 546,165 558,135 550,135 562,105 540,105 542,205" />
              <polygon points="600,205 590,175 594,175 585,150 590,150 580,125 600,125 598,205" />
              <polygon points="600,205 610,175 606,175 615,150 610,150 620,125 600,125 602,205" />
              <polygon points="690,205 678,170 684,170 672,140 680,140 668,110 690,110 688,205" />
              <polygon points="690,205 702,170 696,170 708,140 700,140 712,110 690,110 692,205" />
              <polygon points="780,205 768,165 774,165 762,135 770,135 758,105 780,105 778,205" />
              <polygon points="780,205 792,165 786,165 798,135 790,135 802,105 780,105 782,205" />
            </g>

            {/* Feux */}
            <g className="flame-group">
              <path d="M 40,205 C 32,185 38,165 50,150 C 58,162 68,168 62,180 C 74,162 86,178 80,205 Z" fill="#ff5d22" />
              <path d="M 48,205 C 42,192 46,178 52,165 C 57,175 63,178 60,185 C 67,175 74,185 70,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group-alt">
              <path d="M 110,205 C 104,188 108,170 118,158 C 124,168 132,172 128,182 C 138,168 148,182 142,205 Z" fill="#ff5d22" />
              <path d="M 116,205 C 112,194 115,182 120,172 C 124,180 129,182 126,188 C 132,180 137,188 134,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group" style={{ transformOrigin: '220px 190px' }}>
              <path d="M 200,205 C 192,185 198,165 210,150 C 218,162 228,168 222,180 C 234,162 246,178 240,205 Z" fill="#ff5d22" />
              <path d="M 208,205 C 202,192 206,178 212,165 C 217,175 223,178 220,185 C 227,175 234,185 230,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group-alt" style={{ transformOrigin: '270px 190px' }}>
              <path d="M 250,205 C 244,188 248,170 258,158 C 264,168 272,172 268,182 C 278,168 288,182 282,205 Z" fill="#ff5d22" />
              <path d="M 256,205 C 252,194 255,182 260,172 C 264,180 269,182 266,188 C 272,180 277,188 274,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group" style={{ transformOrigin: '420px 190px' }}>
              <path d="M 400,205 C 392,185 398,165 410,150 C 418,162 428,168 422,180 C 434,162 446,178 440,205 Z" fill="#ff5d22" />
              <path d="M 408,205 C 402,192 406,178 412,165 C 417,175 423,178 420,185 C 427,175 434,185 430,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group-alt" style={{ transformOrigin: '470px 190px' }}>
              <path d="M 450,205 C 444,188 448,170 458,158 C 464,168 472,172 468,182 C 478,168 488,182 482,205 Z" fill="#ff5d22" />
              <path d="M 456,205 C 452,194 455,182 460,172 C 464,180 469,182 466,188 C 472,180 477,188 474,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group" style={{ transformOrigin: '600px 190px' }}>
              <path d="M 580,205 C 572,185 578,165 590,150 C 598,162 608,168 602,180 C 614,162 626,178 620,205 Z" fill="#ff5d22" />
              <path d="M 588,205 C 582,192 586,178 592,165 C 597,175 603,178 600,185 C 607,175 614,185 610,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group-alt" style={{ transformOrigin: '650px 190px' }}>
              <path d="M 630,205 C 624,188 628,170 638,158 C 644,168 652,172 648,182 C 658,168 668,182 662,205 Z" fill="#ff5d22" />
              <path d="M 636,205 C 632,194 635,182 640,172 C 644,180 649,182 646,188 C 652,180 657,188 654,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group" style={{ transformOrigin: '780px 190px' }}>
              <path d="M 760,205 C 752,185 758,165 770,150 C 778,162 788,168 782,180 C 794,162 806,178 800,205 Z" fill="#ff5d22" />
              <path d="M 768,205 C 762,192 766,178 772,165 C 777,175 783,178 780,185 C 787,175 794,185 790,205 Z" fill="#ffc107" />
            </g>
            <g className="flame-group-alt" style={{ transformOrigin: '830px 190px' }}>
              <path d="M 810,205 C 804,188 808,170 818,158 C 824,168 832,172 828,182 C 838,168 848,182 842,205 Z" fill="#ff5d22" />
              <path d="M 816,205 C 812,194 815,182 820,172 C 824,180 829,182 826,188 C 832,180 837,188 834,205 Z" fill="#ffc107" />
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

          {/* Badge en bas à gauche */}
          <div className="banner-badge">Aéromodélisme</div>
        </div>

        {/* Corps - Texte à gauche, image à droite */}
        <div className="forest-body">
          <div className="forest-content">
            <div className="row align-items-center g-4">
              <div className="col-lg-8 col-md-7">
                <div className="forest-text">
                  <p>
                   L'AéroModélisme est un challenge où les participants doivent concevoir et construire leurs propres modèles réduits de planeurs en suivant un cahier des charges précis. Chaque équipe fait ensuite voler son planeur, démontrant son talent technique et créatif devant un public de passionnés et un jury de professionnels. Ce challenge est une occasion unique de partager sa passion pour l'aéromodélisme dans une ambiance conviviale et inspirante.
                  </p>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-5">
                <div className="forest-image">
                  <img
                    src={IMg}
                    alt="Aéromodélisme"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Boutons centrés */}
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

      {/* Modales */}
      {showRegisterModal && (
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
                    background: "#fce4ec",
                  }}
                >
                  <span style={{ fontSize: "35px" }}>🚫</span>
                </div>
              </div>
              <h4
                className="text-center mb-3"
                style={{ color: "#1a1a2e", fontWeight: 700 }}
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
                    background: "#e94560",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#d63a54";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#e94560";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}

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
                  <span style={{ fontSize: "35px" }}>📄</span>
                </div>
              </div>
              <h4
                className="text-center mb-3"
                style={{ color: "#1a1a2e", fontWeight: 700 }}
              >
                Cahier des charges indisponible
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "#4a5568", fontSize: "15px", lineHeight: 1.6 }}
              >
                Le cahier des charges pour ce challenge n'est pas encore disponible.
                <br />
                Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button
                  className="btn text-white border-0 py-3"
                  onClick={closeCahierModal}
                  style={{
                    background: "#0f3460",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#0a284a";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#0f3460";
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}

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

        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.06) translateY(-2px); }
        }

        @keyframes flameFlickerAlt {
          0%, 100% { transform: scale(1.05) translateY(-1px); }
          50% { transform: scale(0.95) translateY(1px); }
        }

        .flame-group {
          animation: flameFlicker 0.8s infinite ease-in-out;
          transform-origin: center bottom;
        }

        .flame-group-alt {
          animation: flameFlickerAlt 0.9s infinite ease-in-out;
          transform-origin: center bottom;
        }

        /* Badge en bas à gauche - style original */
        .banner-badge {
          position: absolute;
          bottom: 16px;
          left: 32px;
          z-index: 10;
          background: #ff5d22;
          color: #ffffff;
          padding: 6px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(255, 93, 34, 0.4);
        }

        @media (max-width: 768px) {
          .banner-badge {
            font-size: 10px;
            padding: 4px 14px;
            bottom: 12px;
            left: 16px;
          }
        }

        @media (max-width: 480px) {
          .banner-badge {
            font-size: 8px;
            padding: 3px 10px;
            bottom: 10px;
            left: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default ForestFireChallengeCard;