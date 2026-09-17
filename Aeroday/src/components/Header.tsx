import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <title>Home</title>
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand brand-white" to="">
            AERODAY
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Challenges
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/AéroChallenge">
                      AéroChallenge
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/AéroModelisme">
                      AéroModelisme
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Airshow">
                      Airshow
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/AéroEntrepreneur">
                      AéroEntrepreneur
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Challenge CAO">
                      Challenge CAO
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Vidéographie par Drone">
                      Vidéographie par Drone
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Water Rocketry">
                      Water Rocketry
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Axes
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/Exposition Aéronautique">
                      Exposition Aéronautique
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="Exposition Aérospatiale">
                      Exposition Aérospatiale
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Ateliers Novices">
                      Ateliers Novices
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="AmbassadorShip">
                      Ambassadorship
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <Link  className="nav-link " to="/Schedule">
                  Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link "  to="/Team">
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link "  to="/University Map">
                  University Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/Sponsors">
                  Sponsors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Contact"
                  className="btn ms-5"
                  style={{
                    "--bs-btn-bg": "#FF5A1F",
                    "--bs-btn-border-color": "#FF5A1F",
                    "--bs-btn-hover-bg": "#e04d15",
                    "--bs-btn-hover-border-color": "#e04d15",
                    color: "#fff",
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default Header;
