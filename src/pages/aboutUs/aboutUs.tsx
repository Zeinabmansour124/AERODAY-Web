import Historique from './components/Historique';
import Aerobotix from './components/Aeroobotix';
import './aboutUs.css'
import KeyNumbers from './components/KeyNumbers';
import AerospaceHeroSection from './components/HeroSection';

function aboutUs() {
    return(

        <div>
            <Historique/>
            <Aerobotix/>
            <KeyNumbers/>
            <AerospaceHeroSection/>
        </div>
    );

}

export default aboutUs;