import Card from './component/card';
import SBChallenge from '../../components/sideBarAxes';
import { team } from '../../content/team';

function ExpSpace(){
    const respo = team.filter((m) => m.id === 13);
  
  // CORRECTION 2: Vérifier la longueur du tableau
  if (respo.length === 0) {
    return <div>Responsable non trouvé</div>;
  }

  return (
    <div className='main-grid mt-2 me-3 mb-5'>
      <Card/>
      {/* CORRECTION 3: member → members (pluriel) */}
      <SBChallenge members={respo} />
      
    </div>);
}

export default ExpSpace;




