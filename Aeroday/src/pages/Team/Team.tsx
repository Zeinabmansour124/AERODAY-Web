import { team } from '../../content/team';
import type { TeamMember } from '../../content/team';
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

const renderAvatar = (member: TeamMember, size: number, bgColor: string = "#C1121F") => {
  if (member.image && member.image !== "") {
    return (
      <img
        src={member.image}
        alt={member.name}
        className="member-avatar-img"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #EADBC8",
        }}
      />
    );
  } else {
    return (
      <div
        className="member-avatar-initials"
        style={{
          backgroundColor: bgColor,
          width: size,
          height: size,
          fontSize: size * 0.4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#EADBC8",
          fontWeight: 500,
          borderRadius: "50%",
        }}
      >
        {getInitials(member.name)}
      </div>
    );
  }
};

function Team() {
  const president = team.find((m) => m.id === 0);
  const vps = team.filter((m) => m.id >= 1 && m.id <= 4);
  const group1 = team.filter((m) => m.id >= 5 && m.id <= 12);
  const group2 = team.filter((m) => m.id >= 13 && m.id <= 17);
  const group3 = team.filter((m) => m.id >= 18 && m.id <= 21);
  const group4 = team.filter((m) => m.id >= 22 && m.id <= 27);

  return (
    <section className="team-section">
      <div className="team-decoration team-decoration--drone">🚁</div>
      <div className="team-decoration team-decoration--seismo">🌍</div>

      <div className="team-header">
        <span className="team-badge">ÉQUIPE</span>
        <h2 className="team-title">Notre Équipe</h2>
      </div>

      {/* Président */}
      {president && (
        <div className="team-tier team-tier--president">
          <div className="president-card">
            <div className="president-badge">Président</div>
            {renderAvatar(president, 80, "#C1121F")}
            <h3 className="member-name" style={{ fontSize: "18px" }}>
              {president.name}
            </h3>
            <p className="member-position" style={{ fontSize: "14px", color: "#C1121F" }}>
              {president.role}
            </p>
            <div style={{ fontSize: "12px", marginTop: 8, color: "#333" }}>
              <div>📞 {president.contact.phone}</div>
              <div>✉️ {president.contact.personalEmail}</div>
              <div>📧 {president.contact.aerodayEmail}</div>
            </div>
          </div>
        </div>
      )}

      {/* Vice-Présidents */}
      <div className="team-tier">
        <p className="team-tier-label">Vice-Présidents</p>
        <div className="team-tier-row">
          {vps.map((member, index) => (
            <div
              key={member.id}
              className="member-card member-card--large"
              style={{
                background: "#fff",
                padding: 20,
                border: "1px solid #C1121F",
                borderRadius: 12,
                width: 200,
              }}
            >
              {renderAvatar(member, 70, avatarColors[index % avatarColors.length])}
              <h4 className="member-name">{member.name}</h4>
              <p className="member-position">{member.role}</p>
              <div style={{ fontSize: "11px", color: "#333" }}>
                <div>📞 {member.contact.phone}</div>
                <div>✉️ {member.contact.personalEmail}</div>
                <div>📧 {member.contact.aerodayEmail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Groupe 1: IDs 5-12 */}
      <div className="team-tier">
        <p className="team-tier-label">Équipe Technique</p>
        <div className="team-tier-row">
          {group1.map((member, index) => (
            <div key={member.id} className="member-card member-card--medium" style={{ width: 180 }}>
              {renderAvatar(member, 60, avatarColors[index % avatarColors.length])}
              <h4 className="member-name">{member.name}</h4>
              <p className="member-position">{member.role}</p>
              <div style={{ fontSize: "10px", color: "#333", marginTop: 4 }}>
                <div>📞 {member.contact.phone}</div>
                <div>✉️ {member.contact.personalEmail}</div>
                <div>📧 {member.contact.aerodayEmail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Groupe 2: IDs 13-17 */}
      <div className="team-tier">
        <p className="team-tier-label">Équipe Organisation</p>
        <div className="team-tier-row">
          {group2.map((member, index) => (
            <div key={member.id} className="member-card member-card--medium" style={{ width: 180 }}>
              {renderAvatar(member, 60, avatarColors[index % avatarColors.length])}
              <h4 className="member-name">{member.name}</h4>
              <p className="member-position">{member.role}</p>
              <div style={{ fontSize: "10px", color: "#333", marginTop: 4 }}>
                <div>📞 {member.contact.phone}</div>
                <div>✉️ {member.contact.personalEmail}</div>
                <div>📧 {member.contact.aerodayEmail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Groupe 3: IDs 18-21 */}
      <div className="team-tier">
        <p className="team-tier-label">Équipe finance et ressource externe</p>
        <div className="team-tier-row">
          {group3.map((member, index) => (
            <div key={member.id} className="member-card member-card--medium" style={{ width: 180 }}>
              {renderAvatar(member, 60, avatarColors[index % avatarColors.length])}
              <h4 className="member-name">{member.name}</h4>
              <p className="member-position">{member.role}</p>
              <div style={{ fontSize: "10px", color: "#333", marginTop: 4 }}>
                <div>📞 {member.contact.phone}</div>
                <div>✉️ {member.contact.personalEmail}</div>
                <div>📧 {member.contact.aerodayEmail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Groupe 4: IDs 22-27 */}
      <div className="team-tier">
        <p className="team-tier-label">Équipe branding</p>
        <div className="team-tier-row">
          {group4.map((member, index) => (
            <div key={member.id} className="member-card member-card--medium" style={{ width: 180 }}>
              {renderAvatar(member, 60, avatarColors[index % avatarColors.length])}
              <h4 className="member-name">{member.name}</h4>
              <p className="member-position">{member.role}</p>
              <div style={{ fontSize: "10px", color: "#333", marginTop: 4 }}>
                <div>📞 {member.contact.phone}</div>
                <div>✉️ {member.contact.personalEmail}</div>
                <div>📧 {member.contact.aerodayEmail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;