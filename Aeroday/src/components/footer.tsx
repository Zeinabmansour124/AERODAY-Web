import { FaInstagram, FaLinkedin, FaFacebook , FaYoutube} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-aero py-5 px-4">
      <div className="container-fluid">
        <div className="row g-4">

          <div className="col-12 col-md-5">
            <p className="footer-title fw-medium fs-6 mb-2">Tunisian Aeroday</p>
            <p className="footer-text small mb-3" style={{ maxWidth: '280px' }}>
              Conférences, drones, ateliers et rencontres qui propulsent votre passion aéronautique
            </p>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com/tunisian_aeroday?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/tunisian-aeroday/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="https://www.facebook.com/TunAeroday" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="https://youtube.com/@aeroday2026?si=uxyJ0oHAW0wL4xU8" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="YouTube">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <p className="footer-heading small fw-medium mb-2">Événement</p>
            <a href="/about" className="footer-link d-block small mb-2">About us</a>
            <a href="/team" className="footer-link d-block small mb-2">Team</a>
          </div>

          <div className="col-6 col-md-2">
            <p className="footer-heading small fw-medium mb-2">Ressources</p>
            <a href="/sponsors" className="footer-link d-block small mb-2">Sponsors</a>
            <a href="/schedule" className="footer-link d-block small">Schedule</a>
          </div>

          <div className="col-6 col-md-3">
            <p className="footer-heading small fw-medium mb-2">Contact</p>
            <a href="mailto:contact@aeroday.tn" className="footer-link d-block small">contact@aeroday.tn</a>
          </div>

        </div>

        <div className="footer-bottom d-flex flex-wrap justify-content-between gap-2 mt-4 pt-3">
          <p className="small mb-0">© AEROBOTIX INSAT</p>
          <p className="small mb-0">Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;