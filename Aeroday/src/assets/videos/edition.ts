export interface Edition {
  id: string;
  publicId  : string; // identifiant unique de la vidéo sur Cloudinary
  year: string;
  thumbnailOffset?: number;
}

export const editions: Edition[] = [
    {
    id: '1',
    publicId: 'AQNjbVeMZywN6i0vYMiMfD44wQIcHbNApiW8ugyl_LHKsz-9Ob1MOqqdsdZ1v4E2yhFFtv3hWDaCHrA7tXlsEDAslZeMeUoRqilCNLW-bjmeUg_ij157v_poster', 
    year: ' 2026',
    thumbnailOffset: 5
  },
  {
    id: '2',
    publicId: 'AQOZyAVIQOuC6PgRbwzL4u5Msx5TESrFypfkPLusHvhGnYfK0TH_hoGz9tGn5lg4kTFDdS7KjZ2NuIHeLEc84SdVJwju9bJNR7c_emvigr', 
    year: ' 2025'
  },
    {
    id: '3',
    publicId: 'aeroday_2016_à_l_INSAT_Tunis_zx5rpq',
    year: '2016'
  }
];
export function getThumbnailUrl(publicId: string, offset: number = 1): string {
  return `https://res.cloudinary.com/otjnsdoc/video/upload/so_${offset}/${publicId}.jpg`;
}