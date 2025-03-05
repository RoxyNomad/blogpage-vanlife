// Importiere die PostList-Komponente aus dem übergeordneten Komponentenverzeichnis
import PostList from '../components/PostList';

/**
 * Die `Blog`-Komponente ist eine einfache Wrapper-Komponente,
 * die die `PostList`-Komponente rendert.
 * Diese wird wahrscheinlich eine Liste von Blogposts anzeigen.
 * 
 * @returns {JSX.Element} - Die Blog-Seite mit einer Liste von Beträgen.
 */

export default function Blog() {
	return (
		<div>
			{/* Rendert die PostList-Komponente, die die Blogposts anzeigen wird */}
			<PostList />
		</div>
	);
}