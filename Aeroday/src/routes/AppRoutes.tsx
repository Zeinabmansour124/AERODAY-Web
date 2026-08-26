// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import AboutUs from '../pages/aboutUs/aboutUs';
import Contact from '../pages/Contact/Contact';
import AeroChallenge from '../pages/AéroChallenge/AeroChallenge';
import AeroEntrepreneur from '../pages/AéroEntrepreneur/AeroEntrepreneur';
import AeroModelisme from '../pages/AéroModelisme/AeroModelisme';
import Airshow from '../pages/Airshow/Airshow';
import AmbassadorShip from '../pages/AmbassadorShip/AmbShip';
import ChallengeCAO from '../pages/CAO/CAO';
import Drone from '../pages/Drone/Drone';
import ExpSpace from '../pages/expSpace/ExpSpace';
import Map from '../pages/Map/Map';
import Novices from '../pages/novice/Novice'; 
import Schedule from '../pages/Schedule/Schedule';
import Sponsors from '../pages/Sponsors/Sponsors';
import Team from '../pages/Team/Team'
import ExpAero from '../pages/expAero/ExpAero';
import WR from '../pages/WaterRocketry/wr';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/AéroChallenge" element={<AeroChallenge />} />
      <Route path="/AéroEntrepreneur" element={<AeroEntrepreneur />} />
      <Route path="/AéroModelisme" element={<AeroModelisme />} />
      <Route path="/Airshow" element={<Airshow/>} />
      <Route path="/AmbassadorShip" element={<AmbassadorShip/>} />
      <Route path="/Challenge CAO" element={<ChallengeCAO/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Vidéographie par Drone" element={<Drone/>} />
      <Route path="/Exposition Aéronautique" element={<ExpAero/>} />
      <Route path="/Exposition Aérospatiale" element={<ExpSpace/>} />
      <Route path="/University Map" element={<Map/>} />
      <Route path="/Ateliers Novices" element={<Novices/>} />
      <Route path="/Schedule" element={<Schedule/>} />
      <Route path="/Sponsors" element={<Sponsors/>} />
      <Route path="/Team" element={<Team/>} />
      <Route path="/Water Rocketry" element={<WR/>}/>
      
      
    </Routes>
  );
}