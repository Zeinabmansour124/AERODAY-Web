import EditionCard from "./EditionCard.tsx";
import { editions } from "../../../assets/videos/edition.ts";
import { useRef, useState } from "react";

function OldEdition() {
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

        <div className="broadcast-scroll" ref={scrollRef} onScroll={handleScroll}>
          {editions.map((e) => (
            <div className="broadcast-item" key={e.id}>
              <EditionCard
                id={e.id}
                publicId={e.publicId}
                filename={e.filename}
                year={e.year}
                thumbnailOffset={e.thumbnailOffset}
              />
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

export default OldEdition;