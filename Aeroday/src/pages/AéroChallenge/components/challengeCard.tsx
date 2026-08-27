import React, { useState } from 'react';
import { Target, FileText, ClipboardCheck } from 'lucide-react';
import aeroIMg from '../../../assets/images/2.jpg';

const ChallengeCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCahierModal, setShowCahierModal] = useState(false);

  const handleInscriptionClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCahierClick = () => setShowCahierModal(true);
  const handleCloseCahierModal = () => setShowCahierModal(false);

  return (
    <>
      <div className="challenge-card ms-3">
        <div className="banner">
          <div className="wave-group wave-group-1">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <div className="wave-group wave-group-2">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>

          <div className="debris debris-1">
            <div
              className="debris-cube orange"
              style={{ width: '16px', height: '16px', transform: 'rotateX(45deg) rotateY(45deg)' }}
            ></div>
            <div
              className="debris-cube yellow"
              style={{ width: '10px', height: '10px', transform: 'translateZ(12px) rotateX(30deg)' }}
            ></div>
          </div>
          <div className="debris debris-2">
            <div
              className="debris-cube yellow"
              style={{ width: '14px', height: '14px', transform: 'rotateX(60deg) rotateY(30deg)' }}
            ></div>
            <div
              className="debris-cube orange"
              style={{ width: '8px', height: '8px', transform: 'translateZ(10px) rotateX(45deg)' }}
            ></div>
          </div>
          <div className="debris debris-3">
            <div
              className="debris-cube orange"
              style={{ width: '12px', height: '12px', transform: 'rotateX(30deg) rotateY(60deg)' }}
            ></div>
          </div>
          <div className="debris debris-4">
            <div
              className="debris-cube yellow"
              style={{ width: '18px', height: '10px', transform: 'rotateX(45deg) rotateY(15deg)' }}
            ></div>
          </div>

          <div className="banner-drone">
            <div className="d-face d-front"></div>
            <div className="d-face d-back"></div>
            <div className="d-face d-left"></div>
            <div className="d-face d-right"></div>
            <div className="d-face d-top"></div>
            <div className="d-face d-bottom"></div>
            <div className="arm-h"></div>
            <div className="arm-v"></div>
            <div
              className="prop"
              style={{ width: '40px', height: '4px', transform: 'translateZ(18px) translateX(-45px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '4px', height: '40px', transform: 'translateZ(18px) translateX(-45px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '40px', height: '4px', transform: 'translateZ(18px) translateX(55px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '4px', height: '40px', transform: 'translateZ(18px) translateX(55px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '40px', height: '4px', transform: 'translateZ(18px) translateY(-45px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '4px', height: '40px', transform: 'translateZ(18px) translateY(-45px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '40px', height: '4px', transform: 'translateZ(18px) translateY(55px)' }}
            ></div>
            <div
              className="prop"
              style={{ width: '4px', height: '40px', transform: 'translateZ(18px) translateY(55px)' }}
            ></div>
            <div className="camera"></div>
          </div>

          <svg className="cracks-svg" viewBox="0 0 800 220" preserveAspectRatio="none">
            <path
              className="crack-main"
              d="M 30 220 L 100 170 L 140 185 L 180 140 L 220 160 L 280 110 L 330 130 L 400 80 L 460 110 L 530 65 L 600 95 L 680 45 L 730 60"
            />
            <path className="crack-branch" stroke="#FFD23F" d="M 100 170 L 120 150" />
            <path className="crack-branch" stroke="#FFD23F" d="M 180 140 L 160 120" />
            <path className="crack-branch" stroke="#FFD23F" d="M 280 110 L 300 90" />
            <path className="crack-branch" stroke="#FFD23F" d="M 400 80 L 420 60" />
            <path className="crack-branch" stroke="#FFD23F" d="M 530 65 L 550 45" />
            <path
              className="crack-secondary"
              d="M 750 220 L 700 180 L 650 195 L 600 160 L 550 175"
            />
            <path className="crack-branch" stroke="#FF5A1F" d="M 700 180 L 715 160" />
          </svg>

          <div className="epicenter epicenter-1"></div>
          <div className="epicenter epicenter-2"></div>

          <div className="banner-badge">AéroChallenge</div>
        </div>

        <div className="challenge-content">
          <div className="objectives-box">
            <div className="row align-items-center g-4">
              {/* Texte à gauche */}
              <div className="col-lg-8 col-md-7">
                <ul style={{ color: '#4a5568', fontSize: '14px', lineHeight: 1.8, margin: 0, paddingLeft: '18px' }}>
                  L'AéroChallenge est une compétition ouverte aux étudiants et passionnés, qui met les participants au défi de piloter leurs drones sur un circuit prédéfini, naviguant avec précision à travers les obstacles de la piste de course, tout en respectant les exigences du cahier des charges. Ce challenge a pour objectif de réunir les passionnés de drones dans un affrontement captivant où leur talent, leurs compétences et leur enthousiasme seront mis en lumière.
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

          <div className="actions d-flex flex-column align-items-center justify-content-end mt-auto">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <button 
                className="btn-primary"
                onClick={handleInscriptionClick}
              >
                <ClipboardCheck size={16} className="icon-inline" />
                S'inscrire au challenge
              </button>
              <button 
                className="btn-secondary"
                onClick={handleCahierClick}
              >
                <FileText size={16} className="icon-inline" />
                cahier des charges
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODALE INSCRIPTION ========== */}
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
                  onClick={handleCloseModal}
                  style={{
                    background: "#FF5A1F",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#e04e17";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = "#FF5A1F";
                  }}
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
                  onClick={handleCloseCahierModal}
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

      {/* Styles pour l'animation de la modale */}
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

export default ChallengeCard;