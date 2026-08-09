import { useState, useRef } from 'react';
import VideoCard from './VideoCard';
import { broadcasts } from '../../assets/videos/video';

function BroadcastSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth = container.scrollWidth / broadcasts.length;
    const index = Math.round(container.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  return (
    <section className="broadcast-section mb-5 rounded-4">
       <p className="broadcast-title fw-bold">AERODAY Talk</p>
       <p className="broadcast-subtitle">la série d'interviews de l'événement Aeroday, dédiée aux passionnés d'aéronautique et d'aérospatiale</p>

      <div className="broadcast-scroll" ref={scrollRef} onScroll={handleScroll}>
        {broadcasts.map((b) => (
          <div className="broadcast-item" key={b.videoId}>
            <VideoCard videoId={b.videoId} name={b.name} role={b.role} />
          </div>
        ))}
      </div>

      {/* Indicateurs de progression */}
      <div className="broadcast-dots">
        {broadcasts.map((_, i) => (
          <span
            key={i}
            className={`broadcast-dot ${i === activeIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default BroadcastSection;