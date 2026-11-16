import Carousel from './components/carrousel.tsx';
import Description from './components/description.tsx';
import AfficheVideoYT from './components/BroadcastSection.tsx';
import OldEdition from './components/oldEdition.tsx';
import LocationMap from './components/locationCard.tsx';
import Countdown from './components/CountDown.tsx';


function Home() {
  return <div> 
    <div className="mt-0.5">
        <Carousel />
    </div>
    
    <Countdown overlap={-48} lift={70} />
    <Description/>
    <OldEdition />
    <AfficheVideoYT />
    <LocationMap />
  </div>
}

export default Home