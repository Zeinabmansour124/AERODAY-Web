import describeImg from '../../assets/images/description.jpg';

function Description() {
  return (
    <section className="about-aero py-5 px-4">
      <div className="container-fluid">
        <div className="row align-items-center g-5 mb-5">
          {/* Colonne texte */}
          <div className="col-12 col-lg-6">
            <h2 className="about-title mb-3">
              L'instant précis où l'ambition aéronautique tunisienne a trouvé son moteur.
            </h2>
            <p className="about-text mb-2">
              Le Tunisian Aeroday est le rendez-vous aéronautique national de référence, où passionnés,élèves,étudiants, professionnels et grand public se retrouvent pour une journée d'immersion totale dans l'univers du vol. Cette année, l'édition 2026 élargit son horizon avec l'introduction du rocketry : concevez, assemblez et lancez vos propres fusées aux côtés d'experts, en parallèle de nos ateliers novices pour enfants, compétitions de drones, conférences de haut niveau et sessions de networking avec les acteurs majeurs de l'aéronautique. Que vous rêviez de piloter, de construire ou d'innover, le Aeroday est votre rampe de lancement.
            </p>
            <p className="about-text mb-4">
              Des défis en aéronautique, en rocketry, et une exposition ouverte
              au public.
            </p>

            {/* Chiffres clés */}
            <div className="d-flex gap-4 mb-4">
              <div>
                <p className="stat-number mb-0">1ère</p>
                <p className="stat-label small mb-0">Édition nationale</p>
              </div>
              <div>
                <p className="stat-number mb-0">+20</p>
                <p className="stat-label small mb-0">Universités</p>
              </div>
            </div>

           
          </div>

          {/* Colonne image */}
          <div className="col-13 col-lg-6 ">
            <img
              src={describeImg}
              className="about-img w-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Description;
