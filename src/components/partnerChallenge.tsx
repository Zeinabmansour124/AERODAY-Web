import React, { useState } from 'react';

import type { Partenaire } from '../content/partenaire.ts';
import logo from '../assets/images/sponsos/logo-min.png'

const PartnerChallenge: React.FC = () => {
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  const partners: Partenaire[] = [
    {
      id: 1,
      name : 'الحماية المدنية',
      role: 'Sponsor principal',
      roleColor: '#FF5A1F',
      roleTextColor: '#FFFFFF',
      description: '',
      icon: (
  <img
    src={logo}
    alt="Logo AéroChallenge"
    width={32}
    height={32}
    style={{ objectFit: 'contain' }}
  />
),
      
    },
    
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