import ChallengeCard from "./components/ChallengeCard";
import PartnerChallenge from '../../components/partnerChallenge';
import SBChallenge from '../../components/sideBarChallenge';
import { team } from '../../content/team';
function AeroEntrepreneur(){
    const respo = team.filter((m) => m.id === 7);
   
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
}

export default AeroEntrepreneur;
