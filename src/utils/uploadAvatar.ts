import { supabase } from '../supabaseClient';

export async function uploadAvatar(file: File, memberId: string | number): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${memberId}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}