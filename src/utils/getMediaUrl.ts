// src/utils/getMediaUrl.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET = 'old edits'; // ⚠️ remplacez par le nom réel de votre bucket

/**
 * Récupère l'URL d'un média (image ou vidéo)
 * @param publicId — chemin complet dans le bucket, ex: "editions/2024/video.mp4"
 * @param expiresIn — durée de validité en secondes (pour les buckets privés)
 */
export const getMediaUrl = async (publicId: string, expiresIn = 3600) => {
  // Essayer d'abord en URL signée (bucket privé)
  const { data, error } = await supabase
    .storage
    .from(BUCKET)
    .createSignedUrl(publicId, expiresIn);

  if (error) {
    console.error('Erreur signed URL:', error);
    // Fallback : URL publique (bucket public)
    return supabase.storage.from(BUCKET).getPublicUrl(publicId).data.publicUrl;
  }

  return data.signedUrl;
};