import React, { useState } from 'react';

import type { Partenaire } from '../content/partenaire.ts';

const PartnerChallenge: React.FC = () => {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  const partners: Partenaire[] = [
    {
      id: 1,
      name: 'AeroTech Maroc',
      role: 'Sponsor principal',
      roleColor: '#FF5A1F',
      roleTextColor: '#FFFFFF',
      description: 'Fourniture des kits drones et composants aéronautiques',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="12" width="24" height="12" rx="2" fill="#FF5A1F"/>
          <rect x="8" y="8" width="16" height="6" rx="1" fill="#FFD23F"/>
          <circle cx="10" cy="18" r="2" fill="#FFFFFF"/>
          <circle cx="22" cy="18" r="2" fill="#FFFFFF"/>
        </svg>
      )
    },
    {
      id: 2,
      name: 'SismAlert',
      role: 'Partenaire technique',
      roleColor: '#FFD23F',
      roleTextColor: '#0F1B3C',
      description: 'Données sismiques et scénarios de simulation',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L28 28H4L16 4Z" fill="#FFD23F"/>
          <circle cx="16" cy="18" r="4" fill="#0F1B3C"/>
          <path d="M12 24H20" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 3,
      name: 'CartoDrone',
      role: 'Partenaire logiciel',
      roleColor: '#0F1B3C',
      roleTextColor: '#FFD23F',
      description: 'Logiciels de cartographie 3D et traitement d\'images',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="6" width="20" height="20" rx="4" fill="#FF5A1F"/>
          <rect x="10" y="10" width="12" height="12" rx="2" fill="#FFD23F"/>
          <circle cx="16" cy="16" r="3" fill="#0F1B3C"/>
        </svg>
      )
    },
    {
      id: 4,
      name: 'Secours Aériens',
      role: 'Partenaire terrain',
      roleColor: '#FF5A1F',
      roleTextColor: '#FFFFFF',
      description: 'Zone d\'essai et expertise opérationnelle secours',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4C16 4 8 12 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 12 16 4 16 4Z" fill="#FFD23F"/>
          <path d="M16 12V20M12 16H20" stroke="#0F1B3C" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  const getBorderColor = (partnerId: number) => {
    const partner = partners.find(p => p.id === partnerId);
    return hoveredPartner === partnerId ? partner?.roleColor || '#FF5A1F' : 'transparent';
  };

  return (
    <div>
      <div style={{ maxWidth: '1200px', margin: '32px auto 0' }}>
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '20px', 
          padding: '32px', 
          boxShadow: '0 4px 24px rgba(15,27,60,0.08)', 
          position: 'relative', 
          overflow: 'hidden' 
        }}>
          
          {/* Titre section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: '#FF5A1F', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '20px' 
            }}>
              🤝
            </div>
            <div>
              <h3 style={{ color: '#0F1B3C', fontSize: '20px', fontWeight: 700, margin: 0 }}>
                Partenaires du challenge
              </h3>
              <p style={{ color: '#4a5568', fontSize: '13px', margin: '4px 0 0 0' }}>
                Ils soutiennent et accompagnent ce challenge
              </p>
            </div>
          </div>
          
          {/* Grille partenaires */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {partners.map((partner) => (
              <div
                key={partner.id}
                style={{
                  background: '#F4F5F7',
                  borderRadius: '16px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: `2px solid ${getBorderColor(partner.id)}`,
                  transform: hoveredPartner === partner.id ? 'translateY(-4px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  background: 'linear-gradient(135deg, #0F1B3C, #1a2d5c)', 
                  borderRadius: '16px', 
                  margin: '0 auto 12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {partner.icon}
                </div>
                <h4 style={{ color: '#0F1B3C', fontSize: '14px', fontWeight: 700, margin: '0 0 4px 0' }}>
                  {partner.name}
                </h4>
                <span style={{ 
                  background: partner.roleColor, 
                  color: partner.roleTextColor, 
                  padding: '2px 10px', 
                  borderRadius: '12px', 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  textTransform: 'uppercase' 
                }}>
                  {partner.role}
                </span>
                <p style={{ color: '#4a5568', fontSize: '11px', margin: '8px 0 0 0', lineHeight: 1.5 }}>
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '24px', 
            height: '3px', 
            background: 'linear-gradient(90deg, #FF5A1F, #FFD23F, #FF5A1F)', 
            borderRadius: '2px', 
            opacity: 0.5 
          }} />
          
        </div>
      </div>
    </div>
  );
};

export default PartnerChallenge;