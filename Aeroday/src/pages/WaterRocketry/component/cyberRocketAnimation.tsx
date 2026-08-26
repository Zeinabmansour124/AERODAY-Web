import React from 'react';

const CyberRocketVerticalAnimation: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* ─── MOUVEMENT VERTICAL PARABOLIQUE ─── */
        @keyframes parabolicVerticalLaunch {
          0% {
            transform: translate(0, 0) scale(1, 1);
            opacity: 1;
          }
          /* Tremblement de pression au sol */
          2%, 6%, 10%, 14% { transform: translate(3px, 0); }
          4%, 8%, 12% { transform: translate(-3px, 0); }
          
          /* Compression/Squat avant explosion */
          16% {
            transform: translate(0, 6px) scale(1.15, 0.85);
            opacity: 1;
          }

          /* Décollage initial (accélération rapide) */
          20% {
            transform: translate(0, -45px) scale(0.85, 1.25);
            opacity: 1;
          }

          /* Montée (décélération progressive) */
          26% {
            transform: translate(0, -112px) scale(0.9, 1.2);
            opacity: 1;
          }
          34% {
            transform: translate(0, -187px) scale(0.95, 1.1);
            opacity: 1;
          }
          40% {
            transform: translate(0, -225px) scale(1, 1);
            opacity: 1;
          }

          /* SOMMET DE LA TRAJECTOIRE (Vitesse nulle instantanée) */
          46% {
            transform: translate(0, -250px) scale(1.05, 0.95);
            opacity: 1;
          }

          /* Descente (accélération progressive) */
          52% {
            transform: translate(0, -225px) scale(1, 1);
            opacity: 1;
          }
          58% {
            transform: translate(0, -187px) scale(0.95, 1.1);
            opacity: 0.9;
          }
          64% {
            transform: translate(0, -112px) scale(0.9, 1.2);
            opacity: 0.8;
          }

          /* IMPACT AU SOL (Point de départ) */
          70% {
            transform: translate(0, 10px) scale(0.6, 0.8);
            opacity: 0.3;
          }

          /* Disparition sous le sol */
          75%, 100% {
            transform: translate(0, 15px) scale(0.2, 0.4);
            opacity: 0;
          }
        }

        /* Traînée lumineuse vertical */
        @keyframes verticalTrail {
          0%, 16% { opacity: 0; transform: scaleY(0); }
          20% { opacity: 0.8; transform: translate(0, -20px) scaleY(1); }
          34% { opacity: 0.6; transform: translate(0, -140px) scaleY(1.3); }
          46% { opacity: 0.4; transform: translate(0, -220px) scaleY(1.5); }
          58% { opacity: 0.2; transform: translate(0, -180px) scaleY(1.8); }
          70%, 100% { opacity: 0; transform: translate(0, 0px) scaleY(2); }
        }

        /* Vague d'impact à l'atterrissage (centrée) */
        @keyframes splashImpactCentered {
          0%, 68% { transform: scale(0); opacity: 0; }
          70% { transform: scale(0.4); opacity: 1; }
          85% { transform: scale(3); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }

        /* Gouttes d'eau à l'impact */
        @keyframes dropletsBurst {
          0%, 68% { opacity: 0; transform: translateY(0) scale(0); }
          71% { opacity: 1; transform: translateY(-10px) scale(1); }
          85% { opacity: 0; transform: translateY(-40px) scale(1.5); }
          100% { opacity: 0; transform: translateY(0) scale(0); }
        }

        /* Shockwave au décollage */
        @keyframes shockwaveBlast {
          0%, 15% { transform: translateX(-50%) scale(0); opacity: 0; }
          17% { transform: translateX(-50%) scale(0.3); opacity: 1; }
          28% { transform: translateX(-50%) scale(3); opacity: 0; }
          100% { transform: translateX(-50%) scale(0); opacity: 0; }
        }

        @keyframes cyberGlowPulse {
          0%, 100% { filter: drop-shadow(0 0 6px #00F5FF) drop-shadow(0 0 15px rgba(0,245,255,0.4)); }
          50% { filter: drop-shadow(0 0 12px #00F5FF) drop-shadow(0 0 25px rgba(0,245,255,0.8)); }
        }

        @keyframes gridSpeedLines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
      `}</style>

      {/* Grille néon */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(0, 245, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 245, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          animation: 'gridSpeedLines 2s linear infinite',
        }}
      />

      {/* Halo lumineux au sol (départ) */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Onde de choc au décollage */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          width: '80px',
          height: '24px',
          border: '2px solid #00F5FF',
          borderRadius: '50%',
          animation: 'shockwaveBlast 4s ease-out infinite',
          boxShadow: '0 0 15px #00F5FF',
        }}
      />

      {/* CONTENEUR DE LA FUSÉE (Centré) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '50px',
          marginLeft: '-18px',
          width: '36px',
          height: '90px',
        }}
      >
        {/* Traînée derrière la fusée */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '0',
            width: '6px',
            height: '100px',
            marginLeft: '-3px',
            background: 'linear-gradient(180deg, rgba(0,245,255,0.7) 0%, rgba(0,245,255,0) 100%)',
            borderRadius: '3px',
            filter: 'blur(2px)',
            transformOrigin: 'top center',
            animation: 'verticalTrail 4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
          }}
        />

        {/* FUSÉE (Mouvement exclusivement vertical) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '36px',
            height: '90px',
            /* Pas de rotation ici car elle monte et descend tout droit */
            animation: 'parabolicVerticalLaunch 4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
            transformOrigin: '50% 50%',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              animation: 'cyberGlowPulse 2s infinite',
            }}
          >
            {/* Ogive */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '30px',
                background: 'linear-gradient(180deg, #00F5FF 0%, #0f172a 70%)',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              }}
            />

            {/* Corps */}
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '22px',
                height: '45px',
                background: '#0f172a',
                borderLeft: '2px solid #00F5FF',
                borderRight: '2px solid #00F5FF',
                boxShadow: 'inset 0 0 8px rgba(0,245,255,0.5)',
              }}
            >
              {/* Réservoir */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '28px',
                  background: 'rgba(0, 245, 255, 0.15)',
                  border: '1px solid #00F5FF',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '70%',
                    background: 'linear-gradient(180deg, #00F5FF 0%, #00b4d8 100%)',
                    boxShadow: '0 0 8px #00F5FF',
                  }}
                />
              </div>
            </div>

            {/* Ailerons */}
            <div
              style={{
                position: 'absolute',
                bottom: '15px',
                left: '-8px',
                width: '10px',
                height: '22px',
                background: '#FF5E00',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                boxShadow: '0 0 6px #FF5E00',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '-8px',
                width: '10px',
                height: '22px',
                background: '#FF5E00',
                clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
                boxShadow: '0 0 6px #FF5E00',
              }}
            />

            {/* Jet Plasma */}
            <div
              style={{
                position: 'absolute',
                bottom: '-45px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
                height: '50px',
                background:
                  'linear-gradient(180deg, #ffffff 0%, #00F5FF 40%, rgba(0, 245, 255, 0) 100%)',
                borderRadius: '50%',
                filter: 'blur(1px)',
                boxShadow: '0 0 12px #00F5FF',
              }}
            />
          </div>
        </div>

        {/* IMPACT ET SPLASH (Recentré au point de départ) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-5px',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '20px',
          }}
        >
          {/* Anneau d'onde */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              marginLeft: '-25px',
              width: '50px',
              height: '16px',
              border: '2px solid #00F5FF',
              borderRadius: '50%',
              animation: 'splashImpactCentered 4s ease-out infinite',
              boxShadow: '0 0 10px #00F5FF, 0 0 20px rgba(0,245,255,0.5)',
            }}
          />
          {/* Gouttelettes */}
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '20px',
              width: '4px',
              height: '4px',
              background: '#00F5FF',
              borderRadius: '50%',
              animation: 'dropletsBurst 4s ease-out infinite',
              boxShadow: '0 0 6px #00F5FF',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '35px',
              width: '3px',
              height: '3px',
              background: '#00F5FF',
              borderRadius: '50%',
              animation: 'dropletsBurst 4s ease-out infinite 0.05s',
              boxShadow: '0 0 4px #00F5FF',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '3px',
              left: '10px',
              width: '3px',
              height: '3px',
              background: '#00F5FF',
              borderRadius: '50%',
              animation: 'dropletsBurst 4s ease-out infinite 0.1s',
              boxShadow: '0 0 4px #00F5FF',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CyberRocketVerticalAnimation;