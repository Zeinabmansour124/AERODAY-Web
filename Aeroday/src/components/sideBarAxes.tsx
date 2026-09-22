import React, { useRef, useState } from 'react';
import { User, Mail, Phone, Camera, Loader2 } from 'lucide-react';
import type { TeamMember } from '../content/team';
import { getMediaUrlImg } from '../utils/getMediaUrlImg';

interface SBChallengeProps {
  members: TeamMember[];
  editable?: boolean;
  onImageUpdate?: (memberId: number, newUrl: string) => void;
}

// ─────────────────────────────────────────────
// Sous-composant : Avatar
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
  // ─── URL construite de manière SYNCHRONE (pas de useEffect) ───
  const [url, setUrl] = useState<string>(() => getMediaUrlImg(image));
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Upload d'une nouvelle image ───
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
      {/* Loader pendant l'upload */}
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

      {/* Overlay caméra au survol (si editable) */}
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

      {/* Input caché */}
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
          <p className="bio">
            Aucun responsable n&apos;est sélectionné pour le moment.
          </p>
        </div>
      </div>
    );
  }

  const displayMembers = members.slice(0, 2);

  return (
    <div className="sidebar">
      <div className="card card-center" style={{ position: 'relative' }}>
        <div className="mini-drone">
          <div className="md-face md-front"></div>
          <div className="md-face md-back"></div>
          <div className="md-face md-left"></div>
          <div className="md-face md-right"></div>
        </div>

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
              {/* Avatar */}
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
                {index === 0 ? "Responsable de l'axe" : "Co-responsable de l'axe"}
              </p>

              <p className="bio" style={{ fontSize: '12px', marginBottom: '16px' }}>
                {member.role}
              </p>

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
    </div>
  );
};

export default SBChallenge;