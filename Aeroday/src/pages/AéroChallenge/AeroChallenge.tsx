// AeroChallenge.tsx
import React from 'react';
import PartnerChallenge from '../../components/partnerChallenge';
import ChallengeCard from './components/challengeCard';
import SBChallenge from '../../components/sideBarChallenge';
import "./AeroChallenge.css"
import { team } from '../../content/team';

const AeroChallenge: React.FC = () => {
  const respo = team.find((m) => m.id === 5);

  if (!respo) {
    return <div>Responsable non trouvé</div>;
  }

  return (
    <div className='main-grid mt-2 me-3'>
      <ChallengeCard />
      <div className='mt-2'>
        <SBChallenge member={respo} />
      </div>
      <PartnerChallenge />
    </div>
  );
};

export default AeroChallenge;