import { useState } from 'react';

function LocationMap() {
  const [showFullMap, setShowFullMap] = useState(true);

  return (
    <div className="map-card mb-5 rounded-4">
      <p className="map-title">Where the event takes place</p>
      <p className="map-subtitle">National Institute of Science and Applied Technologies, Tunis</p>

      <div className="map-preview">
          <iframe
            src="https://www.google.com/maps/embed?pb=COLLE_TON_VRAI_LIEN_ICI"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
          <>
            <img
              src="/map-preview.jpg"
              alt="Event location preview"
              className="map-static-preview"
            />
            <span className="map-badge">Preview</span>
            <a href="https://maps.app.goo.gl/dBoSt4PNbVGudo4Q8" target="_blank" rel="noopener noreferrer" className="map-expand-btn">
              View on Maps
            </a>
          </>
        
      </div>

      <div className="map-info ms-3 mt-3">
        <div>
          <p className="map-info-label">Address</p>
          <p className="map-info-value">INSAT</p>
        </div>
        <div>
          <p className="map-info-label">Parking</p>
          <p className="map-info-value">Available on site</p>
        </div>
      </div>
    </div>
  );
}

export default LocationMap;