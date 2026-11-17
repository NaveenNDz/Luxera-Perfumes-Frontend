import supabase from '../service/supabase';

export default async function uploadMedia(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file selected!');
  }

  const timestamp = Date.now();
  const cleanFileName = file.name.replace(/\s+/g, '_');
  const fileName = `${timestamp}_${cleanFileName}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file, { cacheControl: '3600' });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
