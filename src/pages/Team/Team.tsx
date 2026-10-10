import { team } from '../../content/team';
import type { TeamMember } from '../../content/team';
import { getMediaUrlImg } from '../../utils/getMediaUrlImg';
import './Team.css';

const avatarColors = ['#5C6B73', '#9A6D45', '#C1121F', '#E85D04'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const renderAvatar = (
  member: TeamMember,
  size: number,
  bgColor: string = '#C1121F'
) => {
  if (member.image && member.image !== '') {
    return (
      <img
        src={getMediaUrlImg(member.image)}
        loading="lazy"
        decoding="async"
        alt={member.name}
        className="member-avatar-img"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #EADBC8',
        }}
      />
    );
  }

  return (
    <div
      className="member-avatar-initials"
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        fontSize: size * 0.4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#EADBC8',
        fontWeight: 500,
        borderRadius: '50%',
      }}
    >
      {getInitials(member.name)}
    </div>
  );
};

// ───────── Bloc contact réutilisable ─────────
const ContactInfo = ({
  member,
  fontSize,
  marginTop = 4,
}: {
  member: TeamMember;
  fontSize: number;
  marginTop?: number;
}) => (
  <div
    className="member-contact"
    style={{ fontSize, color: '#333', marginTop }}
  >
    <div> {member.contact.phone}</div>
    <div> {member.contact.personalEmail}</div>
    <div> {member.contact.aerodayEmail}</div>
  </div>
);

// ───────── Carte membre réutilisable ─────────
const MemberCard = ({
  member,
  index,
  variant = 'medium',
}: {
  member: TeamMember;
  index: number;
  variant?: 'large' | 'medium';
}) => {
  const isLarge = variant === 'large';

  return (
    <div
      className={`member-card member-card--${variant}`}
      style={isLarge ? { border: '1px solid #C1121F' } : undefined}
    >
      {renderAvatar(
        member,
        isLarge ? 70 : 60,
        avatarColors[index % avatarColors.length]
      )}
      <h4 className="member-name">{member.name}</h4>
      <p className="member-position">{member.role}</p>
      <ContactInfo member={member} fontSize={isLarge ? 11 : 10} />
    </div>
  );
};

// ───────── Section par groupe ─────────
const TeamTier = ({
  label,
  members,
  variant = 'medium',
}: {
  label: string;
  members: TeamMember[];
  variant?: 'large' | 'medium';
}) => (
  <div className="team-tier">
    <p className="team-tier-label">{label}</p>
    <div className="team-tier-row">
      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          member={member}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  </div>
);

function Team() {
  const president = team.find((m) => m.id === 0);
  const vps = team.filter((m) => m.id >= 1 && m.id <= 4);
  const group1 = team.filter((m) => m.id >= 5 && m.id <= 12);
  const group2 = team.filter((m) => m.id >= 13 && m.id <= 17);
  const group3 = team.filter((m) => m.id >= 18 && m.id <= 21);
  const group4 = team.filter((m) => m.id >= 22 && m.id <= 27);

  return (
    <section className="team-section">
      <div
        className="team-decoration team-decoration--drone"
        style={{ fontSize: '600px' }}
      >
        🚁
      </div>
      <div
        className="team-decoration team-decoration--seismo"
        style={{ fontSize: '600px' }}
      >
        🌍
      </div>

      <div className="team-header">
        <span className="team-badge">ÉQUIPE</span>
        <h2 className="team-title">Notre Équipe</h2>
      </div>

      {/* Président */}
      {president && (
        <div className="team-tier team-tier--president">
          <div className="president-card">
            <div className="president-badge">Président</div>
            {renderAvatar(president, 80, '#C1121F')}
            <h3 className="member-name" style={{ fontSize: '18px' }}>
              {president.name}
            </h3>
            <p
              className="member-position"
              style={{ fontSize: '14px', color: '#C1121F' }}
            >
              {president.role}
            </p>
            <ContactInfo member={president} fontSize={12} marginTop={8} />
          </div>
        </div>
      )}

      {/* Vice-Présidents */}
      <TeamTier label="Vice-Présidents" members={vps} variant="large" />

      {/* Groupes */}
      <TeamTier label="Équipe Technique" members={group1} />
      <TeamTier label="Équipe Organisation" members={group2} />
      <TeamTier label="Équipe finance et ressource externe" members={group3} />
      <TeamTier label="Équipe branding" members={group4} />
    </section>
  );
}

export default Team;