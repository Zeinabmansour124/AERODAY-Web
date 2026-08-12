
import AEROBOTIX from "../../../assets/images/AEROBOTIX.png";

function Aerobotix() {
  return (
    <section className="about-aero py-5 px-4">
      <div className="container-fluid">
        <div className="row align-items-center g-5 mb-5">
          {/* Colonne texte */}
          <div className="col-12 col-lg-6">
            <h2 className="about-title mb-3">AEROBOTIX-INSAT</h2>
            <p className="about-text mb-4">
              <p className="about-text mb-4">
                L'incubateur tunisien où la robotique rencontre le ciel
              </p>
            </p>
            <p className="about-text mb-2">
              L'Aerobotix INSAT est un club scientifique à but non lucratif, né
              de la fusion du club Mécatronique et du CCE de l'INSAT, qui opère
              à la croisée de la robotique, de l'automatisation et de
              l'aéronautique. Leader dans son domaine en Tunisie, il forme ses
              membres à travers des projets concrets, des compétitions
              nationales et internationales (comme Eurobot), et une expérience
              managériale terrain, tout en étant le fondateur et l'organisateur
              du Tunisian Aeroday.
            </p>
          </div>

          {/* Colonne image */}
          <div className="col-13 col-lg-6 ">
            <img src={AEROBOTIX} className="about-img w-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aerobotix;
