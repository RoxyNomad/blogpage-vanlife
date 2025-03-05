// Exportiert eine Funktion zum Abrufen von Kommentaren für einen bestimmten Post
export const getComments = async (postId) => {
  // Führt eine Abfrage an die Supabase-Datenbank aus
  const { data, error } = await supabase
    .from('comments') // Wählt die 'comments'-Tabelle
    .select('*') // Ruft alle Spalten ab
    .eq('post_id', postId); // Filtert nach der übergebenen postId (nur Kommentare dieses Posts)

  // Falls ein Fehler auftritt, wird dieser in der Konsole ausgegeben
  if (error) console.error('Error fetching comments:', error.message);

  // Gibt die abgerufenen Kommentare zurück oder ein leeres Array, falls keine gefunden wurden
  return data || [];
};

// Exportiert eine Funktion zum Erstellen eines neuen Kommentars
export const createComment = async (postId, userId, content) => {
  // Führt eine Einfügeoperation in die 'comments'-Tabelle aus
  const { data, error } = await supabase
    .from('comments') // Wählt die 'comments'-Tabelle
    .insert([
      {
        post_id: postId, // Verknüpft den Kommentar mit dem entsprechenden Blogpost
        user_id: userId, // Speichert die ID des Benutzers, der den Kommentar erstellt
        content, // Speichert den eigentlichen Kommentartext
      },
    ]);

  // Falls ein Fehler auftritt, wird dieser in der Konsole ausgegeben
  if (error) console.error('Error creating comment:', error.message);

  // Gibt die eingefügten Daten zurück (normalerweise der neu erstellte Kommentar)
  return data;
};
