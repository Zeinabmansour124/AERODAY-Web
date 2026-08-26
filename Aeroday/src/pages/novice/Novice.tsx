import SBChallenge from '../../components/sideBarChallenge';
import ChallengeCard from './components/chCard'
import { team } from '../../content/team';
import PartnerChallenge from '../../components/partnerChallenge';

function Novice(){
    // Récupérer les responsables un par un
    const respo1 = team.find((m) => m.id === 11);
    const respo2 = team.find((m) => m.id === 12);
    
    // Construire un tableau uniquement avec les responsables trouvés
    const respo = [];
    if (respo1) respo.push(respo1);
    if (respo2) respo.push(respo2);
    
    if (respo.length === 0) {
        return <div>Aucun responsable trouvé</div>;
    }
    
    return(
        <div className='main-grid mt-2 me-3 mb-5'>
            <ChallengeCard/>
            <div className='mt-2'>
                <SBChallenge members={respo}/>
            </div>
            <PartnerChallenge/>
        </div>
    )
}
export default Novice;