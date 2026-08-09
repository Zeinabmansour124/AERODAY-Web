import VideoCard from "./VideoCard.tsx";
import EditionCard from "./EditionCard";
import { editions } from "../../assets/videos/edition";

function oldEdition() {
  return (
    <div>
      <section className="broadcast-section mb-5">
        <p className="broadcast-title fw-bold">Anciennes Éditions</p>

        <div className="broadcast-scroll">
          {editions.map((e) => (
            <div className="broadcast-item" key={e.id}>
              <EditionCard publicId={e.publicId} year={e.year} id={e.id} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default oldEdition;
