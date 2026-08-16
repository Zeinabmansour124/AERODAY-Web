import React from 'react';
import { User, Mail, Phone, BarChart3 } from 'lucide-react';
import type { TeamMember } from '../content/team';

// Définir l'interface des props
interface SBChallengeProps {
  member: TeamMember;
}
const SBChallenge: React.FC<SBChallengeProps> = ({ member }) => {
  if (!member) {
    return (
      <div className="sidebar">
        <div className="card card-center">
          <p>Aucun membre sélectionné</p>
        </div>
      </div>
    );
  }
  return (
    <div className="sidebar">
      {/* Card du responsable */}
      <div className="card card-center">
        <div className="mini-drone mt-5">
          <div className="md-face md-front"></div>
          <div className="md-face md-back"></div>
          <div className="md-face md-left"></div>
          <div className="md-face md-right"></div>
        </div>

        <div className="avatar">
          <User size={28} />
        </div>
        <h3>{member.name}</h3>
        <p className="role">Responsable du challenge</p>
        
        <div className="contact-links">
          <a href={`mailto:${member.contact.aerodayEmail}`} className="contact-link">
            <Mail size={15} className="icon-inline" />
            {member.contact.aerodayEmail}
          </a>
          <a href={`tel:${member.contact.phone}`} className="contact-link">
            <Phone size={15} className="icon-inline" />
            {member.contact.phone}
          </a>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-card">
        {/* Mini débris décoratifs */}
        <div className="stats-debris stats-debris-1">
          <div
            className="sd-cube"
            style={{
              width: '8px',
              height: '8px',
              background: '#FF5A1F',
              transform: 'rotateX(45deg) rotateY(45deg)',
            }}
          ></div>
        </div>
        <div className="stats-debris stats-debris-2">
          <div
            className="sd-cube"
            style={{
              width: '6px',
              height: '6px',
              background: '#FFD23F',
              transform: 'rotateX(30deg) rotateY(60deg)',
            }}
          ></div>
        </div>

        <h4>
          <BarChart3 size={17} className="icon-inline " />
          Prize pool
        </h4>
        <p className='prizePool ctions d-flex flex-column align-items-center justify-content-end mt-auto'>
          soon ....
        </p>
      </div>
    </div>
  );
};

export default SBChallenge;