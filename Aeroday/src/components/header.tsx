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
                    <a className="dropdown-item" href="#">
                      AéroChallenge
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      AéroModelisme
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Airshow
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      AéroEntrepreneur
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Challenge CAO
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Vidéographie par Drone
                    </a>
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
                    <a className="dropdown-item" href="#">
                      Exposition Aéronautique
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Exposition Aérospatiale
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ateliers Novices
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ambassadorship
                    </a>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Schedule
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  University Map
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Sponsors
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default Header;
