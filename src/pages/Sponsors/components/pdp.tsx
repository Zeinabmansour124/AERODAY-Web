import { Radar, GraduationCap, Award, Link2 , Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';


const reasons = [
  {
    icon: Radar,
    title: 'Visibilité ciblée',
    description: "Exposition auprès d'étudiants, ingénieurs et passionnés d'aéronautique",
  },
  {
    icon: GraduationCap,
    title: 'Talents de demain',
    description: 'Accès direct aux futurs ingénieurs et innovateurs du secteur',
  },
  {
    icon: Award,
    title: 'Image de marque',
    description: 'Association à un événement innovant, technique et engagé',
  },
  {
    icon: Link2,
    title: 'Réseau durable',
    description: "Relation continue avec l'association sur plusieurs éditions",
  },
  {
    icon: Ticket ,
    title:'Une audience nombreuse' ,
    description:"Plus de 500 participants réunis autour de l'aéronautique lors de la dernière édition",
  },
];
 
function Pdp(){
    return(<div> <section className="sponsors-why">
        <h2>Pourquoi devenir partenaire ?</h2>
        <p className="sponsors-why-sub">
          Un partenariat avec Aeroday, c'est une visibilité auprès d'un public ciblé et engagé
        </p>

        <div className="sponsors-reasons-grid">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="reason-card">
                <div className="reason-icon">
                  <Icon size={22} />
                </div>
                <p className="reason-title">{reason.title}</p>
                <p className="reason-desc">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </section>
       <section className="sponsors-cta-wrapper">
        <div className="sponsors-cta">
          <h2>Un projet de partenariat en tête ?</h2>
          <p>Parlez-nous de votre entreprise et de la manière dont vous imaginez collaborer avec Aeroday</p>
          <Link to="/contact" className="cta-button">
            Suggérer un partenariat
          </Link>
        </div>
      </section>

      </div>);

}
export default Pdp;