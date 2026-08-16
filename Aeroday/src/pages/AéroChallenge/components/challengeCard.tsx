import React from 'react';
import { Target, FileText, ClipboardCheck } from 'lucide-react';
import aeroIMg from '../../../assets/images/2.jpg'




const ChallengeCard: React.FC = () => {
  return (
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
      <div>
        L'AéroChallenge est une compétition ouverte aux étudiants et passionnés, qui met les participants au défi de piloter leurs drones sur un circuit prédéfini, naviguant avec précision à travers les obstacles de la piste de course, tout en respectant les exigences du cahier des charges. Ce challenge a pour objectif de réunir les passionnés de drones dans un affrontement captivant où leur talent, leurs compétences et leur enthousiasme seront mis en lumière.
      </div>
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
    <button className="btn-primary">
      <ClipboardCheck size={16} className="icon-inline" />
      S'inscrire au challenge
    </button>
    <button className="btn-secondary">
      <FileText size={16} className="icon-inline" />
      cahier des charges
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default ChallengeCard;