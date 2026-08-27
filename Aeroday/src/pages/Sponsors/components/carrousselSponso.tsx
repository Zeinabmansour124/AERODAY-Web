import React, { useState, useEffect, useRef } from 'react';

// ============================================
// Carrousel Sponsors — Édition Précédente
// ============================================

// Importe tes logos ici (ajuste les chemins selon ton projet)
import agilLogo from '../../../assets/images/sponsos/sponso1.webp';
import digisysLogo from '../../../assets/images/sponsos/sponso2.png';
import atrLogo from '../../../assets/images/sponsos/sponso3.png';
import dassaultLogo from '../../../assets/images/sponsos/sponso4.svg';
import tunisairLogo from '../../../assets/images/sponsos/sponso5.webp';

const SponsorsCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Sponsors avec leurs logos
  const sponsors = [
    { name: 'Agil', logo: agilLogo },
    { name: 'DIGISYS', logo: digisysLogo },
    { name: 'ATR', logo: atrLogo },
    { name: 'FAB43', logo: dassaultLogo },
    { name: 'AESS', logo: tunisairLogo },
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, sponsors.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  // Fallback si image cassée
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) fallback.style.display = 'flex';
  };

  return (
    <>
      {/* Conteneur parent pour centrer et ajouter de l'espace */}
      <div className="d-flex justify-content-center" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div
          className="ms-3"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(15, 27, 60, 0.08)',
            position: 'relative',
            maxWidth: '920px',
            width: '100%',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          {/* Banner sponsors */}
          <div
            style={{
              height: '120px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <style>{`
              @keyframes shimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }
              @keyframes floatParticle {
                0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-10px) rotate(180deg); opacity: 0.6; }
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.3; transform: scale(0.8); }
              }
            `}</style>

            {/* Particules décoratives */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${15 + (i * 12) % 70}%`,
                  left: `${10 + (i * 13) % 80}%`,
                  width: '4px',
                  height: '4px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  animation: `floatParticle ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
                }}
              />
            ))}

            <div style={{ textAlign: 'center', zIndex: 2 }}>
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  marginBottom: '8px',
                  opacity: 0.7,
                }}
              >
                Aeroday 13.0
              </div>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: '26px',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '1px',
                  background: 'linear-gradient(90deg, #fff, #94a3b8, #fff)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 4s linear infinite',
                }}
              >
                Ils nous ont fait confiance
              </h2>
            </div>

            {/* Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '24px',
                background: '#334155',
                color: '#FFFFFF',
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              {sponsors.length} Sponsors
            </div>
          </div>

          {/* Zone carrousel */}
          <div
            style={{ padding: '32px 0', position: 'relative' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Flèche gauche */}
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Flèche droite */}
            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Track */}
            <div style={{ overflow: 'hidden', margin: '0 56px' }}>
              <div
                ref={trackRef}
                style={{
                  display: 'flex',
                  gap: '16px',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(-${currentIndex * (220 + 16)}px)`,
                }}
              >
                {sponsors.map((sponsor, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: '0 0 220px',
                      height: '140px',
                      background: '#f8fafc',
                      borderRadius: '14px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'all 0.3s',
                      cursor: 'default',
                      padding: '16px',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(15,23,42,0.1)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#cbd5e1';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                    }}
                  >
                    {/* Logo image */}
                    <div style={{
                      width: '100%',
                      height: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        onError={handleImageError}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                      {/* Fallback si image manquante */}
                      <div
                        style={{
                          display: 'none',
                          width: '50px',
                          height: '50px',
                          borderRadius: '12px',
                          background: '#e2e8f0',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748B',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        {sponsor.name.slice(0, 2).toUpperCase()}
                      </div>
                    </div>

                    {/* Nom du sponsor */}
                    <div style={{
                      color: '#0F172A',
                      fontSize: '12px',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}>
                      {sponsor.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots indicateurs */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '24px',
            }}>
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: idx === currentIndex ? '#0F172A' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorsCarousel;