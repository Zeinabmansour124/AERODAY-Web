import React from 'react';
import ChallengeCard from './components/challengeCard';
import SBChallenge from '../../components/sideBarChallenge';
import PartnerChallenge from '../../components/partnerChallenge';
import "./AeroChallenge.css";
import { team } from '../../content/team';

const AeroChallenge: React.FC = () => {
  const respo = team.filter((m) => m.id === 5);

  if (respo.length === 0) {
    return <div>Aucun responsable trouvé</div>;
  }

  return (
    <div className="main-grid mt-2 mb-5 px-2 px-md-3">
      <div className="main-content">
        <ChallengeCard />
      </div>

      <aside className="main-sidebar">
        <SBChallenge members={respo} />
      </aside>
      <PartnerChallenge/>
    </div>
  );
};

export default AeroChallenge;