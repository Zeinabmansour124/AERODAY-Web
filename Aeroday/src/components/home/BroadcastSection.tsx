import VideoCard from './VideoCard';
import { broadcasts } from '../../assets/videos/video';

function BroadcastSection() {
  return (
    <section className="broadcast-section mb-5">
      <p className="broadcast-title fw-bold">AERODAY Talk</p>
      <p className="broadcast-subtitle">la série d'interviews de l'événement Aeroday, dédiée aux passionnés d'aéronautique et d'aérospatiale</p>

      <div className="broadcast-scroll">
        {broadcasts.map((b) => (
          <div className="broadcast-item" key={b.videoId}>
            <VideoCard videoId={b.videoId} name={b.name} role={b.role} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BroadcastSection;