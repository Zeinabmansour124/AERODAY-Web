import ChallengeCard from './components/challengeCard';
import SBChallenge from '../../components/sideBarChallenge';
import { team } from '../../content/team';
import PartnerChallenge from '../../components/partnerChallenge';


function CAO(){
    const respo = team.filter((m) => m.id === 6);
  
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
    </div>);
}

export default CAO;