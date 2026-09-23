import React, { useRef, useState } from 'react';
import { User, Mail, Phone, BarChart3, Camera, Loader2 } from 'lucide-react';
import type { TeamMember } from '../content/team';
import { getMediaUrlImg } from '../utils/getMediaUrlImg';
import { uploadAvatar } from '../utils/uploadAvatar';
interface SBChallengeProps {
  members: TeamMember[];
  editable?: boolean;
  onImageUpdate?: (memberId: number, newUrl: string) => void;
}

// ─────────────────────────────────────────────
// Sous-composant : Avatar avec image + upload
// ─────────────────────────────────────────────
interface MemberAvatarProps {
  image?: string;
  name: string;
  memberId: number;
  editable?: boolean;
  onUploaded?: (newUrl: string) => void;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({
  image,
  name,
  memberId,
  editable = false,
  onUploaded,
}) => {
  // URL construite de manière SYNCHRONE
  const [url, setUrl] = useState<string>(() => getMediaUrlImg(image));
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await uploadAvatar(file, memberId);
      setUrl(publicUrl);
      onUploaded?.(publicUrl);
    } catch (err) {
      console.error('Erreur upload:', err);
      alert("Échec de l'upload de l'image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (editable && !uploading) fileInputRef.current?.click();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        cursor: editable ? 'pointer' : 'default',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {uploading ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader2 size={28} color="#64748b" className="spin" />
        </div>
      ) : url ? (
        <img
          src={url}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            // Si l'image casse, on bascule sur l'icône User
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent && !parent.querySelector('.avatar-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'avatar-fallback';
              fallback.style.cssText =
                'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1e293b;';
              fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
              parent.appendChild(fallback);
            }
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User size={36} color="#fff" />
        </div>
      )}

      {/* Overlay caméra au survol */}
      {editable && hover && !uploading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Camera size={24} color="#fff" />
        </div>
      )}

      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      )}

      <style>{`
        @keyframes spinAnim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spinAnim 1s linear infinite; }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────
const SBChallenge: React.FC<SBChallengeProps> = ({
  members,
  editable = false,
  onImageUpdate,
}) => {
  if (!members || !Array.isArray(members) || members.length === 0) {
    return (
      <div className="sidebar">
        <div className="card card-center">
          <div className="avatar" style={{ marginBottom: '16px' }}>
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
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ─── CARTE RESPONSABLES ─── */}
      <div
        className="card card-center"
        style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}
      >
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
                borderRight:
                  index === 0 && displayMembers.length > 1
                    ? '1px solid rgba(15, 27, 60, 0.1)'
                    : 'none',
              }}
            >
              {/* Avatar avec image + upload */}
              <div className="avatar" style={{ width: '80px', height: '80px' }}>
                <MemberAvatar
                  image={member.image}
                  name={member.name}
                  memberId={member.id}
                  editable={editable}
                  onUploaded={(newUrl) => onImageUpdate?.(member.id, newUrl)}
                />
              </div>

              <h3 style={{ fontSize: '16px' }}>{member.name}</h3>

              <p className="role">
                {index === 0 ? 'Responsable du challenge' : 'Co-responsable du challenge'}
              </p>

              <p className="bio" style={{ fontSize: '12px', marginBottom: '16px' }}>
                {member.role}
              </p>

              <div className="contact-links" style={{ width: '100%' }}>
                <a
                  href={member.contact?.aerodayEmail ? `mailto:${member.contact.aerodayEmail}` : undefined}
                  className="contact-link"
                  title={member.contact?.aerodayEmail || 'Email non disponible'}
                  style={!member.contact?.aerodayEmail ? { opacity: 0.5, cursor: 'default' } : undefined}
                  onClick={!member.contact?.aerodayEmail ? (e) => e.preventDefault() : undefined}
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
                    {member.contact?.aerodayEmail || 'Non renseigné'}
                  </span>
                </a>

                {member.contact?.phone && (
                  <a href={`tel:${member.contact.phone}`} className="contact-link">
                    <Phone size={15} />
                    <span>{member.contact.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CARTE PRIZE POOL (inchangée) ─── */}
      <div className="stats-card" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', top: '16px', right: '20px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#FF5A1F',
              borderRadius: '1px',
              opacity: 0.5,
              transform: 'rotate(15deg)',
            }}
          />
        </div>
        <div style={{ position: 'absolute', top: '32px', right: '32px' }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              background: '#FFD23F',
              borderRadius: '1px',
              opacity: 0.4,
              transform: 'rotate(45deg)',
            }}
          />
        </div>

        <h4>
          <BarChart3 size={17} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Prize pool
        </h4>

        <div className="stat-divider" style={{ margin: '20px 0' }} />

        <div className="stat-row">
          <span className="stat-label">Récompense totale</span>
          <span className="stat-value prize">—</span>
        </div>

        <div className="stat-divider" />

        <p
          style={{
            color: '#FFD23F',
            fontSize: '14px',
            fontWeight: 700,
            textAlign: 'center',
            margin: '24px 0 0 0',
            letterSpacing: '1px',
            opacity: 0.9,
          }}
        >
          Bientôt disponible …
        </p>
      </div>
    </div>
  );
};

export default SBChallenge;