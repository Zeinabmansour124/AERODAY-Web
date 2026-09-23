import Carousel from './components/carrousel.tsx';
import Description from './components/description.tsx';
import AfficheVideoYT from './components/BroadcastSection.tsx';
import OldEdition from './components/oldEdition.tsx';
import LocationMap from './components/locationCard.tsx';


function Home() {
  return <div> 
    <div className="mt-0.5">
        <Carousel />
    </div>
    <Description/>
    <OldEdition />
    <AfficheVideoYT />
    <LocationMap />
  </div>
}

export default Home