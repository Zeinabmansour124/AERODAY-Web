import React from 'react';
import ChallengeCard from './component/challengeCard';
import '../AéroChallenge/AeroChallenge.css'
import SBChallenge from '../../components/sideBarChallenge';
import { team } from '../../content/team';
import PartnerChallenge from '../../components/partnerChallenge';

const WR: React.FC = () => {
  // CORRECTION 1: Utiliser filter pour avoir un tableau
  const respo = team.filter((m) => m.id === 9);
  
  // CORRECTION 2: Vérifier la longueur du tableau
  if (respo.length === 0) {
    return <div>Responsable non trouvé</div>;
  }

  return (
    <div className='main-grid mt-2 me-3 mb-5'>
      <ChallengeCard/>
      {/* CORRECTION 3: member → members (pluriel) */}
      <SBChallenge members={respo} />
      <PartnerChallenge/>
    </div>
  );
};

export default WR;