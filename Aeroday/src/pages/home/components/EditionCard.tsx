import { useEffect, useState } from 'react';
import { FaPlay } from "react-icons/fa";

// ⚠️ Remplacez ces deux valeurs par les vôtres
const CLOUDINARY_CLOUD = 'otjnsdoc';                 // ← à remplacer
const SUPABASE_URL = 'https://belywafxvfqalhyhvofy.supabase.co';    // ← à remplacer

interface EditionCardProps {
  id: string;
  year: number;
  source: 'cloudinary' | 'supabase';
  publicId?: string;
  supabasePath?: string;
  bucket?: string;
  thumbnailOffset?: number;
}

function EditionCard({
  year,
  source,
  publicId,
  supabasePath,
  bucket,
  thumbnailOffset = 0,
}: EditionCardProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      let url = '';

      if (source === 'cloudinary' && publicId) {
        url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/${publicId}.mp4`;
        setThumbnailUrl(
          `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload/so_${thumbnailOffset}/${publicId}.jpg`
        );
      } else if (source === 'supabase' && supabasePath && bucket) {
        const encodedBucket = encodeURIComponent(bucket);
        const encodedPath = supabasePath
          .split('/')
          .map((s) => encodeURIComponent(s))
          .join('/');
        url = `${SUPABASE_URL}/storage/v1/object/public/${encodedBucket}/${encodedPath}`;
        setThumbnailUrl('');
      }

      if (!url) {
        setError('Aucune URL générée');
        return;
      }

      setVideoUrl(url);
    } catch (err) {
      console.error('Erreur chargement média:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  }, [source, publicId, supabasePath, bucket, thumbnailOffset]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  return (
    <div className="video-card">
      {error && (
        <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>
          Erreur : {error}
        </div>
      )}

      {videoUrl && !isPlaying && (
        <>
          {/* Vignette + overlay + bouton play */}
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={`Édition ${year}`} className="video-thumb" />
          ) : (
            <video
              src={videoUrl}
              className="video-thumb"
              preload="metadata"
              muted
              playsInline
            />
          )}

          <div className="video-overlay" />

          <span className="video-badge">Édition {year}</span>

          <FaPlay size={18} />
                    <button
                      className="video-play"
                      onClick={() => setIsPlaying(true)}
                      aria-label={`Lire la vidéo de ${name}`}
                    >
                      <FaPlay size={18} />
                    </button>
          <div className="video-caption">
            <p className="video-name">Aeroday {year}</p>
            <p className="video-role">Édition officielle</p>
          </div>
        </>
      )}

      {videoUrl && isPlaying && (
        <video
          src={videoUrl}
          className="video-iframe"
          controls
          autoPlay
          playsInline
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {!videoUrl && !error && (
        <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>
          Chargement...
        </div>
      )}
    </div>
  );
}

export default EditionCard;