import { useState } from 'react';
import type { Edition } from '../../assets/videos/edition';
import { getVideoUrl, getThumbnailUrl } from '../../utils/cloudinary';

function EditionCard({ publicId, year, thumbnailOffset }: Edition) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-card">
      {isPlaying ? (
        <video
          className="video-iframe"
          src={getVideoUrl(publicId)}
          controls
          autoPlay
        />
      ) : (
        <>
          <img
            src={getThumbnailUrl(publicId, thumbnailOffset)}
            alt={`Édition ${year}`}
            loading="lazy"
            className="video-thumb"
          />
          <div className="video-overlay"></div>
          <span className="video-badge">Édition {year}</span>
          <button
            className="video-play"
            onClick={() => setIsPlaying(true)}
            aria-label={`Voir la vidéo de l'édition ${year}`}
          >
            <i className="ti ti-player-play"></i>
          </button>
        </>
      )}
    </div>
  );
}

export default EditionCard;