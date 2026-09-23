import historiqueImg from '../../../assets/images/historique-aero.jpg';


function Historique() {
  return (
    <section className="about-aero py-5 px-4">
      <div className="container-fluid">
        <div className="row align-items-center g-5 mb-5">
          {/* Colonne texte */}
          <div className="col-12 col-lg-6">
            <h2 className="about-title mb-3">
                Né en 2012, propulsé par une conviction — l'aéronautique entre toutes les mains            </h2>
            <p className="about-text mb-2">
                Né de la vision du club Aerobotix de l'INSAT et porté en collaboration avec l'Association des Techniques de Robotique (ATR), le Tunisian Aeroday existe depuis 2012 pour une conviction simple : l'aéronautique ne doit pas rester un spectacle lointain, mais une passion accessible à tous.   Après plus d'une décennie d'existence et douze éditions qui ont fait de lui le rendez-vous national incontournable du secteur, l'événement poursuit la même mission : sensibiliser le grand public au génie aéronautique, révéler les talents des jeunes tunisiens et créer le pont entre les étudiants d'aujourd'hui et les professionnels de demain.    Car au-delà des conférences et des compétitions, Aeroday est un mouvement : celui qui pousse chaque génération à ne plus se contenter d'observer le ciel, mais à s'y élancer.            </p>
            <p className="about-text mb-4">
              Des défis en aéronautique, en rocketry, et une exposition ouverte
              au public.
            </p>
          </div>

          {/* Colonne image */}
          <div className="col-13 col-lg-6 ">
            <img
              src={historiqueImg}
              className="about-img w-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Historique;
