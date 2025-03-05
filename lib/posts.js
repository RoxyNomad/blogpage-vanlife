import { supabase } from './supabase'; // Importiert die Supabase-Instanz für die Datenbankinteraktion

/**
 * Ruft alle Blog-Posts aus der Datenbank ab.
 *
 * @returns {Array} - Gibt eine Liste aller Posts zurück oder ein leeres Array im Fehlerfall.
 */
export const getPosts = async () => {
  // Holt alle Einträge aus der 'posts'-Tabelle
  const { data, error } = await supabase.from('posts').select('*');

  // Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
  if (error) console.error('Error fetching posts:', error.message);

  // Gibt die Daten zurück oder ein leeres Array, falls ein Fehler aufgetreten ist
  return data || [];
};

/**
 * Erstellt einen neuen Blog-Post in der Datenbank.
 *
 * @param {string} title - Der Titel des Posts.
 * @param {string} content - Der Inhalt des Posts.
 * @param {string} userId - Die ID des Benutzers, der den Post erstellt.
 * @returns {Object|null} - Gibt die erstellten Post-Daten oder `null` bei Fehler zurück.
 */
export const createPost = async (title, content, userId) => {
  // Fügt einen neuen Eintrag in die 'posts'-Tabelle ein
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, user_id: userId }]);

  // Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
  if (error) console.error('Error creating post:', error.message);

  // Gibt die erstellten Daten zurück oder `null`, wenn ein Fehler aufgetreten ist
  return data;
};

/**
 * Aktualisiert einen bestehenden Blog-Post in der Datenbank.
 *
 * @param {string} postId - Die ID des Posts, der aktualisiert werden soll.
 * @param {string} newTitle - Der neue Titel des Posts.
 * @param {string} newContent - Der neue Inhalt des Posts.
 * @returns {Object|null} - Gibt die aktualisierten Post-Daten oder `null` bei Fehler zurück.
 */
export const updatePost = async (postId, newTitle, newContent) => {
  // Aktualisiert den Post mit der angegebenen ID
  const { data, error } = await supabase
    .from('posts')
    .update({ title: newTitle, content: newContent })
    .eq('id', postId); // Findet den Post mit der passenden ID

  // Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
  if (error) console.error('Error updating post:', error.message);

  // Gibt die aktualisierten Daten zurück oder `null`, wenn ein Fehler aufgetreten ist
  return data;
};

/**
 * Löscht einen Blog-Post aus der Datenbank.
 *
 * @param {string} postId - Die ID des zu löschenden Posts.
 * @returns {Object|null} - Gibt die gelöschten Post-Daten oder `null` bei Fehler zurück.
 */
export const deletePost = async (postId) => {
  // Löscht den Post mit der angegebenen ID aus der 'posts'-Tabelle
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId); // Findet den Post mit der passenden ID

  // Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
  if (error) console.error('Error deleting post:', error.message);

  // Gibt die gelöschten Daten zurück oder `null`, wenn ein Fehler aufgetreten ist
  return data;
};
