export interface Edition {
  id: string;
  publicId?: string; // identifiant unique de la vidéo sur Cloudinary
  filename?: string; // nom du fichier vidéo (optionnel)
  year: string;
  
}

export const editions: Edition[] = [
    {
    id: '1',
    publicId: 'AQNjbVeMZywN6i0vYMiMfD44wQIcHbNApiW8ugyl_LHKsz-9Ob1MOqqdsdZ1v4E2yhFFtv3hWDaCHrA7tXlsEDAslZeMeUoRqilCNLW-bjmeUg_ij157v_poster', 
    year: ' 2026',
  },
  {
    id: '2',
    publicId: 'AQOZyAVIQOuC6PgRbwzL4u5Msx5TESrFypfkPLusHvhGnYfK0TH_hoGz9tGn5lg4kTFDdS7KjZ2NuIHeLEc84SdVJwju9bJNR7c_emvigr', 
    year: ' 2025'
  },
    {
    id: '3',
    filename: 'ed13',
    year: '2016'
  }
];
