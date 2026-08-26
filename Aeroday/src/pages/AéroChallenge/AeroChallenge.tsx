import React from 'react';
import PartnerChallenge from '../../components/partnerChallenge';
import ChallengeCard from './components/challengeCard';
import SBChallenge from '../../components/sideBarChallenge';
import "./AeroChallenge.css"
import { team } from '../../content/team';

const AeroChallenge: React.FC = () => {
  
   const respo = team.filter((m) => m.id === 5);
   
  if (respo.length === 0) {
    return <div>Aucun responsable trouvé</div>;
  }

  return (
    <div className='main-grid mt-2 me-3 mb-5'>
      <ChallengeCard />
      <div className='mt-2'>
        {/* ATTENTION: utiliser 'members' (pluriel) pas 'member' */}
        <SBChallenge members={respo} />
      </div>
      <PartnerChallenge />
    </div>
  );
};

export default AeroChallenge;