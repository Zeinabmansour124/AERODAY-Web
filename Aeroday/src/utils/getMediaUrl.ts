// src/utils/getMediaUrl.ts
import { supabase } from '../supabaseClient'

export function getMediaUrl(fileName: string): string {
  return supabase.storage.from('media').getPublicUrl(fileName).data.publicUrl
}