import React from 'react';
import { User, Mail, Phone, BarChart3 } from 'lucide-react';
import type { TeamMember } from '../content/team';

interface SBChallengeProps {
  members: TeamMember[];
}

const SBChallenge: React.FC<SBChallengeProps> = ({ members }) => {
  if (!members || !Array.isArray(members) || members.length === 0) {
    return (
      <div className="sidebar">
        <div className="card card-center">
          <div
            className="avatar"
            style={{ marginBottom: '16px' }}
          >
            <User size={42} color="#fff" />
          </div>
          <h3>Aucun membre</h3>
          <p className="bio">Aucun responsable n&apos;est sélectionné pour le moment.</p>
        </div>
      </div>
    );
  }

  const displayMembers = members.slice(0, 2);

  return (
    <div className="sidebar">
      {/* ─── CARTE RESPONSABLES ─── */}
      <div className="card card-center" style={{ position: 'relative' }}>
        {/* Mini drone décoratif 3D */}
        <div className="mini-drone">
          <div className="md-face md-front"></div>
          <div className="md-face md-back"></div>
          <div className="md-face md-left"></div>
          <div className="md-face md-right"></div>
        </div>

        <style>{`
          @keyframes droneFloat {
            0%, 100% { transform: translateY(0) rotateX(10deg) rotateY(20deg); }
            50% { transform: translateY(-8px) rotateX(15deg) rotateY(25deg); }
          }
        `}</style>

        {/* Container des 2 responsables côte à côte */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          {displayMembers.map((member, index) => (
            <div
              key={member.id || index}
              style={{
                flex: '1 1 0',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: index === 0 ? '0 1.25rem 0 0' : '0 0 0 1.25rem',
                borderRight: index === 0 && displayMembers.length > 1
                  ? '1px solid rgba(15, 27, 60, 0.1)'
                  : 'none',
              }}
            >
              {/* Avatar */}
              <div className="avatar" style={{ width: '80px', height: '80px' }}>
                <User size={36} color="#fff" />
              </div>

              {/* Nom */}
              <h3 style={{ fontSize: '16px' }}>{member.name}</h3>

              {/* Rôle */}
              <p className="role">
                {index === 0 ? 'Responsable du challenge' : 'Co-responsable du challenge'}
              </p>

              {/* Bio / Description */}
              <p className="bio" style={{ fontSize: '12px', marginBottom: '16px' }}>
{/* Bio / Description */}
<p className="bio" style={{ fontSize: '12px', marginBottom: '16px' }}>
  {member.role }
</p>              </p>

              {/* Liens de contact */}
              <div className="contact-links" style={{ width: '100%' }}>
                {member.contact?.aerodayEmail && (
                  <a
                    href={`mailto:${member.contact.aerodayEmail}`}
                    className="contact-link"
                    title={member.contact.aerodayEmail}
                  >
                    <Mail size={15} />
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '140px',
                      }}
                    >
                      {member.contact.aerodayEmail}
                    </span>
                  </a>
                )}
                {member.contact?.phone && (
                  <a
                    href={`tel:${member.contact.phone}`}
                    className="contact-link"
                  >
                    <Phone size={15} />
                    <span>{member.contact.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default SBChallenge;