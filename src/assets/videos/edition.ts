export interface Edition {
  id: string;
  publicId?: string; // identifiant unique de la vidéo sur Cloudinary
  year: number | string; // année de l'édition
  source: String; 
  // Champs Supabase
  supabasePath?: string;           // ← optionnel (utilisé si source === 'supabase')
  bucket?: string;                 // ← optionnel
  
  // Optionnel UI
  thumbnailOffset?: number;
}

export const editions: Edition[] = [
    {
    id: '1',
    supabasePath: 'ed13.mp4',
    bucket: 'old edits',
    year: 2026,
    source: 'supabase',
  },
  {
    id: '2',
    publicId: 'AQOZyAVIQOuC6PgRbwzL4u5Msx5TESrFypfkPLusHvhGnYfK0TH_hoGz9tGn5lg4kTFDdS7KjZ2NuIHeLEc84SdVJwju9bJNR7c_emvigr', 
    year: 2025,
    source: 'cloudinary',
  },
    {
    id: '3',
    publicId: 'aeroday_2016_à_l_INSAT_Tunis_zx5rpq',
    year: 2016,
    source: 'cloudinary',
  }
];
