import Carousel from './components/home/carrousel';
import Header from './components/header';
import Description from './components/home/description';
import Footer from './components/footer';
import AfficheVideoYT from './components/home/BroadcastSection';
import OldEdition from './components/home/oldEdition.tsx';
import LocationMap from './components/home/locationCard.tsx';


function App() {
  return <div> 
    <Header/>
    <div className="mt-0.5">
        <Carousel />
    </div>
    <Description/>
    <OldEdition />
    <AfficheVideoYT />
    <LocationMap />
    <Footer /> 
  </div>
}

export default App