import { useState } from 'react';
import type { Edition } from '../../../assets/videos/edition';
import { getVideoUrl, getThumbnailUrl } from '../../../utils/cloudinary';
import { FaPlay } from "react-icons/fa";
import { getMediaUrl } from '../../../utils/getMediaUrl';

function EditionCard({ publicId, filename, year, thumbnailOffset }: Edition) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Source vidéo : Cloudinary si publicId existe, sinon Supabase (cas de la vidéo trop lourde)
  const videoUrl = publicId
    ? getVideoUrl(publicId)
    : filename
    ? getMediaUrl(filename)
    : '';

  // La miniature générée automatiquement n'existe que côté Cloudinary
  const thumbnailUrl = publicId ? getThumbnailUrl(publicId, thumbnailOffset) : undefined;

  if (!videoUrl) return null;

  return (
    <div className="video-card">
      {isPlaying ? (
        <video
          className="video-iframe"
          src={videoUrl}
          controls
          autoPlay
        />
      ) : (
        <>
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Édition ${year}`}
              loading="lazy"
              className="video-thumb"
            />
          ) : (
            // Pas de thumbnail Cloudinary disponible (vidéo Supabase) :
            // on affiche la première frame de la vidéo comme aperçu
            <video
              className="video-thumb"
              src={videoUrl}
              preload="metadata"
              muted
            />
          )}
          <div className="video-overlay"></div>
          <span className="video-badge">Édition {year}</span>
          <button
            className="video-play"
            onClick={() => setIsPlaying(true)}
            aria-label={`Lire la vidéo de ${year}`}
          >
            <FaPlay size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default EditionCard;