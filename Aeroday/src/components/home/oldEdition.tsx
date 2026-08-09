import VideoCard from "./VideoCard.tsx";
import EditionCard from "./EditionCard";
import { editions } from "../../assets/videos/edition";
import { useRef, useState } from "react";

function oldEdition() {
    const [activeIndex, setActiveIndex] = useState(0);
      const scrollRef = useRef<HTMLDivElement>(null);
    
      const handleScroll = () => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const itemWidth = container.scrollWidth / editions.length;
        const index = Math.round(container.scrollLeft / itemWidth);
        setActiveIndex(index);
      };
  return (
    <div>
      <section className="broadcast-section mb-5 rounded-4">
        <p className="broadcast-title fw-bold">Anciennes Éditions</p>

        <div className="broadcast-scroll">
          {editions.map((e) => (
            <div className="broadcast-item" key={e.id}>
              <EditionCard publicId={e.publicId} year={e.year} id={e.id} />
            </div>
          ))}
        </div>
        <div className="broadcast-dots">
                {editions.map((_, i) => (
                  <span
                    key={i}
                    className={`broadcast-dot ${i === activeIndex ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
      </section>
    </div>
  );
}

export default oldEdition;
