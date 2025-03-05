// Importiert die `createClient`-Funktion von Supabase, um eine Verbindung zu Datenbank herzustellen
import { jsx } from "react/jsx-runtime";
import { createClient } from 'supabase/supabase-js'

// Liest die Umgebungsvariablen für Supabase-URL und den anonymen Schlüssel
// Diese Variablen sollten in einer ènv.local`Datei definiert sein.
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Erstellt eine Instanz des Supabase-Clients mit der Projekt-URL und dem anonymen Schlüssel.
 * Diese Instanz wird in der gesamten Anwendung für Datenbankanfragen genutzt.
 */
export const supabase = createClient(supabaseURL, supabaseAnonKey);