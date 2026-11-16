import supabase from "../service/supabase";

export default function uploadMedia(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/\s+/g, "_");
    const fileName = `${timestamp}_${cleanFileName}`;

    supabase.storage
      .from("images")
      .upload(fileName, file)
      .then(({ error }) => {
        if (error) {
          reject(error);
          return;
        }

        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        resolve(data.publicUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}