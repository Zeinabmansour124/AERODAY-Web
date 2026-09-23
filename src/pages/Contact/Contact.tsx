import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="hero-deco" aria-hidden="true">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#FFD23F" strokeWidth="2" />
            <circle cx="70" cy="70" r="40" fill="none" stroke="#FFD23F" strokeWidth="1.5" />
          </svg>
        </div>

        <span className="contact-badge">CONTACT</span>
        <h1>Discutons de votre projet</h1>
        <p>Une question, une suggestion de partenariat, ou envie de rejoindre l'aventure ? Contactez-nous</p>
      </section>

      {/* ===== CARTES COORDONNÉES — chevauchent le hero ===== */}
      <section className="contact-cards-wrapper">
        <div className="contact-cards-grid">
          <a href="mailto:contact@aeroday.tn" className="contact-card">
            <div className="contact-card-icon">
              <Mail size={22} />
            </div>
            <p className="contact-card-label">Email</p>
            <p className="contact-card-value">contact@aeroday.tn</p>
          </a>

          <a href="tel:+21620000000" className="contact-card">
            <div className="contact-card-icon">
              <Phone size={22} />
            </div>
            <p className="contact-card-label">Téléphone</p>
            <p className="contact-card-value">+216 20 000 000</p>
          </a>

          <div className="contact-card contact-card-static">
            <div className="contact-card-icon">
              <MapPin size={22} />
            </div>
            <p className="contact-card-label">Adresse</p>
            <p className="contact-card-value">INSAT, Tunis, Tunisie</p>
          </div>
        </div>
      </section>

      {/* ===== RÉSEAUX SOCIAUX + RÉPONSE RAPIDE ===== */}
      <section className="contact-bottom-grid">
        <div className="social-card">
          <p>Suivez-nous sur</p>
          <div className="social-icons">
            <a href="#" className="social-circle" aria-label="Instagram">IG</a>
            <a href="#" className="social-circle" aria-label="LinkedIn">LI</a>
            <a href="#" className="social-circle" aria-label="Facebook">FB</a>
          </div>
        </div>

        <div className="response-card">
          <div className="contact-card-icon">
            <Clock size={20} />
          </div>
          <div>
            <p className="response-title">Réponse rapide</p>
            <p className="response-text">Nous répondons généralement sous 24 à 48h ouvrées</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;