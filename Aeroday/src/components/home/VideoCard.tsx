import { useState } from 'react';
import type { Broadcast } from '../../assets/videos/video';
import { FaPlay } from 'react-icons/fa';gi

function VideoCard({ videoId, name, role }: Broadcast) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="video-card">
      {isPlaying ? (
        <iframe
          className="video-iframe"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={name}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img src={thumbnail} alt={name} loading="lazy" className="video-thumb" />
          <div className="video-overlay"></div>
          <FaPlay size={18} />
          <button
            className="video-play"
            onClick={() => setIsPlaying(true)}
            aria-label={`Lire la vidéo de ${name}`}
          >
            <i className="ti ti-player-play"></i>
          </button>
          <div className="video-caption">
            <p className="video-name">{name}</p>
            <p className="video-role">{role}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoCard;