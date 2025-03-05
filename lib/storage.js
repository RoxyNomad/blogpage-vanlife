/**
 * Lädt ein Profilbild in den Supabase-Speicher hoch.
 * 
 * @param {File} file - Die Bilddatei, die hochgeladen werden soll.
 * @returns {Object|null} - Gibt die Daten des hochgeladenen Bildes oder `null` bei Fehler zurück.
 */
export const uploadProfileImage = async (file) => {
  // Versucht, die Datei in den 'avatars'-Bucket im Supabase-Speicher hochzuladen
  const { data, error } = await supabase.storage
    .from('avatars') // Wählt den Speicher-Bucket 'avatars'
    .upload(`public/${file.name}`, file); // Speichert die Datei unter dem Pfad 'public/Dateiname'

  // Gibt eine Fehlermeldung in der Konsole aus, wenn der Upload fehlschlägt
  if (error) console.error('Error uploading image:', error.message);

  // Gibt die Upload-Daten zurück (z. B. Pfad und Metadaten) oder `null`, wenn ein Fehler aufgetreten ist
  return data;
};

/**
 * Holt die öffentliche URL einer hochgeladenen Datei.
 * 
 * @param {string} filePath - Der Pfad der Datei im Supabase-Speicher (z. B. 'public/image.jpg').
 * @returns {string|null} - Gibt die öffentliche URL der Datei oder `null` bei Fehler zurück.
 */
export const getPublicUrl = (filePath) => {
  // Ruft die öffentliche URL für die Datei anhand ihres Speicherpfads ab
  const { publicURL, error } = supabase.storage
    .from('avatars') // Wählt den Speicher-Bucket 'avatars'
    .getPublicUrl(filePath); // Holt die URL für den angegebenen Dateipfad

  // Gibt eine Fehlermeldung in der Konsole aus, wenn die URL nicht abgerufen werden kann
  if (error) console.error('Error fetching public URL:', error.message);

  // Gibt die öffentliche URL zurück oder `null`, wenn ein Fehler aufgetreten ist
  return publicURL;
};
