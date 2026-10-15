import React, { useState, useEffect, useCallback } from 'react';
import { ARTICLES } from './data/articles';
import { RoutePage } from './types';
import { PawNav } from './components/PawNav';
import { TreatShower } from './components/TreatShower';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { QuizPage } from './pages/QuizPage';
import { BookmarksPage } from './pages/BookmarksPage';

// Parse URL path following good URL rules
function parseRoute(pathname: string, hash: string): { route: RoutePage; cleanPath: string } {
  // Support both clean pathname and hash fallback for iframe safety
  let path = pathname;
  if (hash && hash.startsWith('#/')) {
    path = hash.slice(1);
  }

  // Remove trailing slashes (except root)
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (path.startsWith('/article/')) {
    const slug = path.replace('/article/', '');
    return { route: { type: 'article', slug }, cleanPath: path };
  }

  if (path === '/articles') {
    return { route: { type: 'articles' }, cleanPath: path };
  }

  if (path === '/authors') {
    return { route: { type: 'authors' }, cleanPath: path };
  }

  if (path === '/quiz') {
    return { route: { type: 'quiz' }, cleanPath: path };
  }

  if (path === '/bookmarks') {
    return { route: { type: 'bookmarks' }, cleanPath: path };
  }

  return { route: { type: 'home' }, cleanPath: '/' };
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [route, setRoute] = useState<RoutePage>({ type: 'home' });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('paw_bookmarks');
      return saved ? JSON.parse(saved) : ['puppy-training-dog-behavior-leash-manners'];
    } catch {
      return ['puppy-training-dog-behavior-leash-manners'];
    }
  });

  // Treat celebration particle trigger
  const [treatTrigger, setTreatTrigger] = useState(0);
  const [treatOrigin, setTreatOrigin] = useState<{ x: number; y: number } | undefined>();

  // Router listener
  const syncRouteFromUrl = useCallback(() => {
    const { route: parsedRoute, cleanPath } = parseRoute(
      window.location.pathname,
      window.location.hash
    );
    setRoute(parsedRoute);
    setCurrentPath(cleanPath);

    // Update global document title for non-article pages (article page updates internally)
    if (parsedRoute.type === 'home') {
      document.title = 'Dog Care: Canine Nutrition & Puppy Training | Bark & Wag';
    } else if (parsedRoute.type === 'articles') {
      document.title = 'Canine Nutrition & Puppy Training Articles | Dog Care Blog';
    } else if (parsedRoute.type === 'authors') {
      document.title = 'Canine Authors & Dog Behavior Experts | Bark & Wag';
    } else if (parsedRoute.type === 'quiz') {
      document.title = 'Dog Care & Puppy Personality Match Quiz | Bark & Wag';
    } else if (parsedRoute.type === 'bookmarks') {
      document.title = 'Saved Dog Care & Canine Nutrition Articles | Bark & Wag';
    }
  }, []);

  useEffect(() => {
    syncRouteFromUrl();
    window.addEventListener('popstate', syncRouteFromUrl);
    window.addEventListener('hashchange', syncRouteFromUrl);
    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
      window.removeEventListener('hashchange', syncRouteFromUrl);
    };
  }, [syncRouteFromUrl]);

  // Navigate handler following good URL rules
  const navigate = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      window.location.hash = path;
    }
    syncRouteFromUrl();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (slug: string) => {
    setBookmarks((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem('paw_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleClearBookmarks = () => {
    setBookmarks([]);
    try {
      localStorage.removeItem('paw_bookmarks');
    } catch {
      // ignore
    }
  };

  const handleGiveTreat = (e: React.MouseEvent) => {
    setTreatOrigin({ x: e.clientX, y: e.clientY });
    setTreatTrigger((prev) => prev + 1);
  };

  // Find active article if on article detail page
  const currentArticle =
    route.type === 'article'
      ? ARTICLES.find((a) => a.slug === route.slug) || ARTICLES[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800">
      
      {/* Particle celebration for treats & paw-fives */}
      <TreatShower triggerCount={treatTrigger} origin={treatOrigin} />

      {/* Top Paw Navigation with strict contract & mobile paw pad menu */}
      <PawNav
        currentPath={currentPath}
        onNavigate={navigate}
        bookmarksCount={bookmarks.length}
        onGiveTreat={handleGiveTreat}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        {route.type === 'home' && (
          <HomePage
            articles={ARTICLES}
            onNavigate={navigate}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onGiveTreat={handleGiveTreat}
          />
        )}

        {route.type === 'articles' && (
          <ArticlesPage
            articles={ARTICLES}
            onNavigate={navigate}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            initialCategory={route.category}
            initialSearch={route.search}
          />
        )}

        {route.type === 'article' && currentArticle && (
          <ArticleDetailPage
            article={currentArticle}
            allArticles={ARTICLES}
            onNavigate={navigate}
            isBookmarked={bookmarks.includes(currentArticle.slug)}
            onToggleBookmark={handleToggleBookmark}
            onGiveTreat={handleGiveTreat}
          />
        )}

        {route.type === 'authors' && (
          <AuthorsPage
            articles={ARTICLES}
            onNavigate={navigate}
            onGiveTreat={handleGiveTreat}
          />
        )}

        {route.type === 'quiz' && (
          <QuizPage
            articles={ARTICLES}
            onNavigate={navigate}
            onGiveTreat={handleGiveTreat}
          />
        )}

        {route.type === 'bookmarks' && (
          <BookmarksPage
            articles={ARTICLES}
            bookmarks={bookmarks}
            onNavigate={navigate}
            onToggleBookmark={handleToggleBookmark}
            onClearBookmarks={handleClearBookmarks}
          />
        )}
      </main>

      {/* Clean Footer with Site Map & Anchor Links */}
      <Footer onNavigate={navigate} />

    </div>
  );
}
