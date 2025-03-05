// Importiere die Supabase-Instanz aus der supabase Konfigurationsdatei
import { supabase } from './supabase'

/**
 * Registriert einen neuen Benutzer mit E-Mail und Passwort.
 * @param {string} email - Die E-Mail-Adresse des Benutzers
 * @param {string} password - Das Passwort des Benutzers.
 * @returns {object|null} - Das Benutzerobjekt bei erfolgreicher Registrierung, sonst null.
 */
export const signUpUser = async (email, password) => {
	//Versuch, den Benutzer mit Supabase zu registrieren
	const { user, error } = await supabase.auth.signUp({
		email,
		password,
	});

	//Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
	if (error) console.error('Error signing up user:', error.message);

	// Gibt das Benutzerobjekt zurück oder null bei Fehler
	return user;
};

/**
 * Meldet einen Benutzer mit E-Mail und Passwort an.
 * @param {string} email - Die E-Mail-Adresse des Benutzers
 * @param {string} password - Das Passwort des Benutzers.
 * @returns {object|null} - Das Benutzerobjekt bei erfolgreicher Registrierung, sonst null.
 */
export const signInUser = async (email, password) => {
	// Versuch den Benutzer mit supabase anzumelden
	const { user, error } = await supabase.auth.signIn({
		email,
		password,
	});

	//Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
	if (error) console.error('Error signing in user:', error.message);

	// Gibt das Benutzerobjekt zurück oder null bei Fehler
	return user;
};

/**
 * Meldet den aktuell angemeldeten Benutzer ab.
 * @returns {void}
 */
export const signOutUser = async () => {
	//Versuch, den Benutzer mit Supabase abzumelden
	const { error } = await supabase.auth.signOut();
	
	// Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
	if (error) console.error('Error signing out user:', error.message);
};

/**
 * Aktualisiert das Benutzerprofil in der Datenbank.
 * @param {string} userId - Die eindeutige ID des Benutzers.
 * @param {string} newUsername - Der neue Benutzername.
 * @param {string} newAvatarUrl - Die neue Avatar-URL.
 * @returns {object|null} - Das aktualisierte Datenobjekt oder null bei Fehler.
 */
export const updateProfile = async (userId, newUsername, newAvatarUrl) => {
  // Versuch, die Benutzerdaten in der "users"-Tabelle zu aktualisieren
  const { data, error } = await supabase
    .from('users') // Wähle die 'users'-Tabelle
    .update({ username: newUsername, avatar_url: newAvatarUrl }) // Aktualisiere die Felder
    .eq('id', userId); // Finde den Benutzer mit der passenden ID

  // Falls ein Fehler auftritt, wird er in der Konsole ausgegeben
  if (error) console.error('Error updating profile:', error.message);

  // Gibt die aktualisierten Daten zurück oder null bei Fehler
  return data;
};