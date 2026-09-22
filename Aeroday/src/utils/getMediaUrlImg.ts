// ============================================
// getMediaUrlImg — Construit l'URL publique d'une image Supabase
// Version SYNCHRONE (pas d'await) — idéale pour <img src={...} />
// ============================================

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://VOTRE_PROJECT.supabase.co';

const DEFAULT_BUCKET =
  import.meta.env.VITE_SUPABASE_BUCKET || 'team-avatars';

/**
 * Retourne l'URL publique d'une image stockée sur Supabase Storage.
 *
 * Formats acceptés pour `identifier` :
 *  - ""                       → retourne ""
 *  - URL complète             → retournée telle quelle
 *  - "ahmed.jpg"              → bucket par défaut + ahmed.jpg
 *  - "2025/ahmed.jpg"         → bucket par défaut + sous-dossier
 *  - "team-avatars:ahmed.jpg" → bucket explicite
 */
export function getMediaUrlImg(identifier: string | undefined | null): string {
  if (!identifier) return '';

  // 1. URL complète : on la renvoie directement
  if (identifier.startsWith('http://') || identifier.startsWith('https://')) {
    return identifier;
  }

  // 2. Nettoyer le préfixe "supabase:" s'il existe
  const clean = identifier.replace(/^supabase:/, '');

  // 3. Déterminer bucket + path
  let bucket = DEFAULT_BUCKET;
  let path = clean;

  // Format explicite "bucket:chemin/fichier.jpg"
  if (clean.includes(':')) {
    const [b, ...rest] = clean.split(':');
    bucket = b;
    path = rest.join(':');
  }

  // 4. Encoder les segments (gère les espaces)
  const encodedBucket = encodeURIComponent(bucket);
  const encodedPath = path
    .split('/')
    .map((s) => encodeURIComponent(s))
    .join('/');
console.log('[getMediaUrlImg]', JSON.stringify({
  input: identifier,
  bucket: bucket,
  path: path,
  url: `${SUPABASE_URL}/storage/v1/object/public/${encodedBucket}/${encodedPath}`,
}));
  return `${SUPABASE_URL}/storage/v1/object/public/${encodedBucket}/${encodedPath}`;
}

export default getMediaUrlImg;