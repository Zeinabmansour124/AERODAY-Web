import React, { useState } from "react";
import CyberRocketAnimation from "./CyberRocketAnimation";
import wrIMG from "../../../assets/images/wr.png";

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
          background: "#FFFFFF",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(15, 27, 60, 0.08)",
          position: "relative",
        }}
      >
        {/* Bandeau Inondation / Flood */}
        <div
          style={{
            height: "220px",
            background:
              "linear-gradient(180deg, #0d2b1e 0%, #1a4d3a 40%, #0f5c4a 70%, #087E8B 100%)",
            position: "relative",
            overflow: "hidden",
            perspective: "1000px",
          }}
        >
          <style>{`
            @keyframes waveExpandFlood {
              0% { transform: scale(0.3) rotateX(70deg); opacity: 1; }
              100% { transform: scale(3) rotateX(70deg); opacity: 0; }
            }
            @keyframes rainDrop {
              0% { transform: translateY(0); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(200px); opacity: 0; }
            }
            @keyframes dropFall {
              0% { transform: translateY(-20px) scale(1); opacity: 0; }
              20% { opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(180px) scale(0.5); opacity: 0; }
            }
            @keyframes cloudFloat {
              0%, 100% { transform: translateX(0) translateY(0); }
              25% { transform: translateX(10px) translateY(-5px); }
              50% { transform: translateX(-5px) translateY(3px); }
              75% { transform: translateX(8px) translateY(-2px); }
            }
            @keyframes floodWave {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes debrisFloat {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-8px) rotate(5deg); }
            }
            @keyframes modalFadeIn {
              from { opacity: 0; transform: scale(0.8) translateY(-20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* Nuages d'orage sombres */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "8%",
              animation: "cloudFloat 9s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "32px",
                background: "rgba(20,40,30,0.6)",
                borderRadius: "35px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "38px",
                  background: "rgba(15,35,25,0.5)",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-16px",
                  left: "10px",
                }}
              />
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "rgba(18,38,28,0.45)",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-12px",
                  right: "6px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "15%",
              animation: "cloudFloat 11s ease-in-out infinite 2s",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "26px",
                background: "rgba(20,40,30,0.5)",
                borderRadius: "25px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "rgba(15,35,25,0.4)",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-14px",
                  left: "7px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: "55%",
              animation: "cloudFloat 8s ease-in-out infinite 1s",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "24px",
                background: "rgba(20,40,30,0.45)",
                borderRadius: "22px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  background: "rgba(15,35,25,0.35)",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-12px",
                  left: "6px",
                }}
              />
            </div>
          </div>

          {/* Pluie torrentielle */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "12%",
              animation: "rainDrop 1.2s linear infinite",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "18px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.9), rgba(8,126,139,0.7))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "28%",
              animation: "rainDrop 1.0s linear infinite 0.2s",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "16px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.8), rgba(8,126,139,0.6))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "45%",
              animation: "rainDrop 1.4s linear infinite 0.5s",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "20px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.9), rgba(8,126,139,0.7))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "62%",
              animation: "rainDrop 1.1s linear infinite 0.7s",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "15px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.8), rgba(8,126,139,0.6))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "25px",
              left: "78%",
              animation: "rainDrop 1.3s linear infinite 0.3s",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "17px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.8), rgba(8,126,139,0.6))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: "88%",
              animation: "rainDrop 1.0s linear infinite 0.9s",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "14px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.7), rgba(8,126,139,0.5))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "35px",
              left: "20%",
              animation: "rainDrop 1.5s linear infinite 0.1s",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "19px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.9), rgba(8,126,139,0.7))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "52%",
              animation: "rainDrop 1.2s linear infinite 0.6s",
            }}
          >
            <div
              style={{
                width: "2px",
                height: "16px",
                background:
                  "linear-gradient(180deg, rgba(200,220,210,0.8), rgba(8,126,139,0.6))",
                borderRadius: "2px 2px 50% 50%",
              }}
            />
          </div>

          {/* Vagues concentriques inondation */}
          <div
            style={{
              position: "absolute",
              top: "65%",
              left: "20%",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                border: "2px solid rgba(8,126,139,0.5)",
                borderRadius: "50%",
                transform: "rotateX(70deg)",
                animation: "waveExpandFlood 4s ease-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                border: "2px solid rgba(15,180,160,0.35)",
                borderRadius: "50%",
                transform: "rotateX(70deg)",
                animation: "waveExpandFlood 4s ease-out infinite 1.3s",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                border: "2px solid rgba(255,159,28,0.25)",
                borderRadius: "50%",
                transform: "rotateX(70deg)",
                animation: "waveExpandFlood 4s ease-out infinite 2.6s",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "72%",
              left: "70%",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "90px",
                height: "90px",
                border: "2px solid rgba(8,126,139,0.45)",
                borderRadius: "50%",
                transform: "rotateX(70deg)",
                animation: "waveExpandFlood 3.5s ease-out infinite 0.5s",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "90px",
                height: "90px",
                border: "2px solid rgba(15,180,160,0.3)",
                borderRadius: "50%",
                transform: "rotateX(70deg)",
                animation: "waveExpandFlood 3.5s ease-out infinite 1.8s",
              }}
            />
          </div>

          {/* Surface d'eau / vagues de fond */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200%",
              height: "60px",
              animation: "floodWave 8s linear infinite",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 60"
              preserveAspectRatio="none"
              style={{ position: "absolute", bottom: 0 }}
            >
              <path
                d="M0 30 Q 50 20, 100 30 T 200 30 T 300 28 T 400 30 T 500 32 T 600 30 T 700 28 T 800 30 V 60 H 0 Z"
                fill="rgba(8,126,139,0.2)"
              />
              <path
                d="M0 40 Q 60 30, 120 40 T 240 40 T 360 38 T 480 40 T 600 42 T 720 40 T 800 40 V 60 H 0 Z"
                fill="rgba(15,92,74,0.15)"
              />
            </svg>
          </div>

          {/* Courants d'eau */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 220"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, opacity: 0.6 }}
          >
            <path
              d="M 0 170 Q 100 160, 200 170 T 400 170 T 600 165 T 800 170"
              fill="none"
              stroke="rgba(200,230,220,0.12)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 0 185 Q 150 175, 300 185 T 600 180 T 800 185"
              fill="none"
              stroke="rgba(200,230,220,0.08)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 0 200 Q 200 190, 400 200 T 800 195"
              fill="none"
              stroke="rgba(255,159,28,0.1)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Gouttes qui tombent dans l'eau */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "25%",
              animation: "dropFall 3s ease-in infinite",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "12px",
                background:
                  "linear-gradient(180deg, rgba(200,230,220,0.9), #087E8B)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                transform: "rotateX(20deg)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "65%",
              animation: "dropFall 2.5s ease-in infinite 1s",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "10px",
                background:
                  "linear-gradient(180deg, rgba(200,230,220,0.8), #087E8B)",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                transform: "rotateX(20deg)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "48%",
              animation: "dropFall 3.5s ease-in infinite 2s",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "14px",
                background:
                  "linear-gradient(180deg, rgba(200,230,220,0.9), rgba(8,126,139,0.8))",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                transform: "rotateX(20deg)",
              }}
            />
          </div>

          {/* Débris flottants (thème inondation) */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "15%",
              animation: "debrisFloat 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "6px",
                background: "rgba(180,160,120,0.5)",
                borderRadius: "2px",
                transform: "rotate(-10deg)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "18px",
              left: "75%",
              animation: "debrisFloat 5s ease-in-out infinite 1s",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "4px",
                background: "rgba(160,140,100,0.4)",
                borderRadius: "2px",
                transform: "rotate(15deg)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "45%",
              animation: "debrisFloat 3.5s ease-in-out infinite 0.5s",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "rgba(200,180,140,0.3)",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Fusée cyber-hydro (overlay transparent) */}
          <CyberRocketAnimation />

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "32px",
              zIndex: 10,
              background: "#FF9F1C",
              color: "#FFFFFF",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Water Rocket
          </div>
        </div>

        {/* Contenu carte - MODIFICATION ICI : Texte à gauche, image à droite */}
        <div style={{ padding: "28px 32px 32px 32px" }}>
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
                  À la suite de pluies torrentielles exceptionnelles, une crue
                  éclair dévaste une région côtière. Les infrastructures routières
                  sont détruites, coupant l'accès aux embarcations de secours
                  traditionnelles. Les conditions météorologiques violentes
                  empêchent le survol à basse altitude par des hélicoptères.
                  Plusieurs victimes se retrouvent piégées sur des structures
                  isolées ou emportées par les courants violents. Le temps de
                  réaction est mesuré en minutes : le risque de hypothermie et de
                  noyade est critique. Dans ce contexte d'extrême urgence, les
                  équipes d'ingénieurs doivent déployer des systèmes fusées à eau
                  tactiques à réaction rapide. Ces vecteurs basse pression et
                  légers doivent remplir deux missions capitales : Reconnaissance
                  & Analyse d'Altitude : Effectuer des relevés
                  météo/hygrométriques en ascension verticale pour analyser la
                  masse d'air, évaluer les risques de sur-crue et émettre des
                  signaux radio. Secours Distanciel & Livraison de Survie :
                  Catapulter avec précision, à 45°, un équipement de sauvetage
                  (gilet autogonflable, corde de guidage, kit radio) directement
                  vers une victime en détresse piégée au milieu des flots.
                </ul>
              </div>
            </div>

            {/* Image à droite */}
            <div className="col-lg-4 col-md-5 text-center">
              <img
                src={wrIMG}
                alt="AéroChallenge"
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODALES ========== */}
      {showModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
              backdropFilter: "blur(4px)",
            }}
            onClick={handleCloseModal}
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
                    background: "#FFF3E0",
                  }}
                >
                  <span style={{ fontSize: "35px" }}>🚫</span>
                </div>
              </div>
              <h4
                className="text-center mb-3"
                style={{ color: "#0B3954", fontWeight: 700 }}
              >
                Inscription non disponible
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "#5C6B73", fontSize: "15px", lineHeight: 1.6 }}
              >
                Les inscriptions pour ce challenge ne sont pas encore ouvertes.
                <br />
                Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button
                  className="btn text-white border-0 py-3"
                  onClick={handleCloseModal}
                  style={{
                    background: "#FF9F1C",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
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
            onClick={handleCloseCahierModal}
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
                    background: "#E3F2FD",
                  }}
                >
                  <span style={{ fontSize: "35px" }}>📄</span>
                </div>
              </div>
              <h4
                className="text-center mb-3"
                style={{ color: "#0B3954", fontWeight: 700 }}
              >
                Cahier des charges indisponible
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "#5C6B73", fontSize: "15px", lineHeight: 1.6 }}
              >
                Le cahier des charges pour ce challenge n'est pas encore
                disponible.
                <br />
                Veuillez revenir ultérieurement.
              </p>
              <div className="d-grid">
                <button
                  className="btn text-white border-0 py-3"
                  onClick={handleCloseCahierModal}
                  style={{
                    background: "#087E8B",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
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