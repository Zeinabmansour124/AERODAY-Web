// src/components/Gallery.tsx
import { supabase } from '../supabaseClient'
import { images, videos } from '../data/mediaData'

function Gallery() {
  return (
    <div>
      <h2>Images</h2>
      {images.map((img) => {
        const url = supabase.storage.from('media').getPublicUrl(img.fileName).data.publicUrl
        return (
          <div key={img.id}>
            <img src={url} alt={img.title} style={{ maxWidth: '100%' }} />
            <h3>{img.title}</h3>
            <p>{img.description}</p>
          </div>
        )
      })}

      <h2>Vidéos</h2>
      {videos.map((vid) => {
        const url = supabase.storage.from('media').getPublicUrl(vid.fileName).data.publicUrl
        return (
          <div key={vid.id}>
            <video controls src={url} style={{ maxWidth: '100%' }} />
            <h3>{vid.title}</h3>
            <p>{vid.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Gallery