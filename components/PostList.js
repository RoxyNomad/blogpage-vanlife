// Importiert React-Hooks useEffect und useState für das Handling von Seiteneffekten und Statusverwaltung
import { useEffect, useState } from 'react';
// Importiert die Supabase-Instanz für Datenbankinteraktionen
import { supabase } from '../lib/supabase';
// Importiert die Funktionen zum Abrufen und Aktualisieren von Posts
import { getPosts, updatePost } from '../lib/posts';

/**
 * Die `PostList`-Komponente verwaltet und zeigt eine Liste von Blogposts an.
 * Sie ruft Beiträge aus der Datenbank ab und aktualisiert sich in Echtzeit bei Änderungen.
 * 
 * @returns {JSX.Element} - Eine Liste von Blogposts mit Echtzeit-Updates.
 */
export default function PostList() {
  // State für die Liste der Blogposts
  const [posts, setPosts] = useState([]);

  /**
   * useEffect Hook zum Laden der Blogposts beim ersten Rendern der Komponente.
   * Führt eine asynchrone Funktion aus, um Daten aus der Datenbank abzurufen.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      // Holt die Blogposts aus der Datenbank
      const data = await getPosts();
      // Setzt die erhaltenen Daten in den State
      setPosts(data);
    };
    
    // Führt die Funktion aus
    fetchPosts();
  }, []); // Leerer Abhängigkeitsarray → wird nur beim ersten Rendern ausgeführt

  /**
   * useEffect Hook für Echtzeit-Updates.
   * Abonniert Änderungen in der 'posts'-Tabelle und aktualisiert den State entsprechend.
   */
  useEffect(() => {
    // Erstellt eine Live-Subscription für die 'posts'-Tabelle
    const subscription = supabase
      .from('posts')
      .on('INSERT', (payload) => {
        // Fügt den neuen Post zur bestehenden Liste hinzu
        setPosts((currentPosts) => [...currentPosts, payload.new]);
      })
      .on('UPDATE', (payload) => {
        // Aktualisiert den betroffenen Post in der Liste
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === payload.new.id ? { ...post, ...payload.new } : post
          )
        );
      })
      .subscribe(); // Aktiviert die Subscription

    // Cleanup-Funktion: Entfernt die Subscription, wenn die Komponente unmontiert wird
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []); // Wird nur einmal ausgeführt, um die Subscription zu initialisieren

  return (
    <div>
      <h1>Blog Posts</h1>
      {/* Iteriert über die Posts und zeigt sie an */}
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Button zum Aktualisieren eines Posts mit neuen Werten */}
          <button onClick={() => updatePost(post.id, 'Updated Title', 'Updated Content')}>
            Update Post
          </button>
        </div>
      ))}
    </div>
  );
}
