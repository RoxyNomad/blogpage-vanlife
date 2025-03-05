// Importiert die Supabase-Instanz, um mit der Datenbank zu kommunizieren
import { supabase } from './supabase';

/**
 * Lauscht auf neue Nachrichten in der `messages`-Tabelle in Echtzeit.
 * @param {Function} setMessages - Eine Funktion zum Aktualisieren des Nachrichten-States.
 * @returns {Object} - Gibt die Supabase-Abonnement-Instanz zurück.
 */
export const listenForMessages = (setMessages) => {
  // Erstellt ein Echtzeit-Abonnement für die 'messages'-Tabelle
  const subscription = supabase
    .from('messages') // Lauscht auf Änderungen in der 'messages'-Tabelle
    .on('INSERT', (payload) => {
      // Wenn eine neue Nachricht eingefügt wird, aktualisiere den Nachrichten-Status
      setMessages((currentMessages) => [...currentMessages, payload.new]);
    })
    .subscribe(); // Abonniert die Ereignisse der Tabelle

  // Gibt die Abonnement-Instanz zurück, um sie später abmelden zu können
  return subscription;
};

/**
 * Sendet eine neue Nachricht und speichert sie in der `messages`-Tabelle.
 * @param {string} senderId - Die ID des Benutzers, der die Nachricht sendet.
 * @param {string} receiverId - Die ID des Empfängers der Nachricht.
 * @param {string} content - Der Inhalt der Nachricht.
 * @returns {Object|null} - Gibt die gespeicherte Nachricht oder `null` bei einem Fehler zurück.
 */
export const sendMessage = async (senderId, receiverId, content) => {
  // Führt eine Einfügeoperation in die 'messages'-Tabelle aus
  const { data, error } = await supabase
    .from('messages') // Wählt die 'messages'-Tabelle
    .insert([
      {
        sender_id: senderId, // Speichert die ID des Senders
        receiver_id: receiverId, // Speichert die ID des Empfängers
        content, // Speichert den Nachrichtentext
      },
    ]);

  // Falls ein Fehler auftritt, wird dieser in der Konsole ausgegeben
  if (error) console.error('Error sending message:', error.message);

  // Gibt die gespeicherte Nachricht zurück oder null, falls ein Fehler aufgetreten ist
  return data;
};
