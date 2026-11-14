import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient(url, key);

export default function uploadMedia(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected!");
      return;
    }

    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name}`;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(fileName).data.publicUrl;

        resolve(publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}