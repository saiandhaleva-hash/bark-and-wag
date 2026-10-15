import React from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { sounds } from '../utils/audio';

interface BookmarksPageProps {
  articles: Article[];
  bookmarks: string[];
  onNavigate: (path: string) => void;
  onToggleBookmark: (slug: string) => void;
  onClearBookmarks: () => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  articles,
  bookmarks,
  onNavigate,
  onToggleBookmark,
  onClearBookmarks,
}) => {
  const bookmarkedArticles = articles.filter((a) => bookmarks.includes(a.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <span>🐾</span>
            <span>Your Reading Vault</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Paw Bookmarks & Saved Dog Articles
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Articles saved for offline reference during park walks and vet visits.
          </p>
        </div>

        {bookmarkedArticles.length > 0 && (
          <button
            onClick={() => {
              sounds.playPawTap();
              onClearBookmarks();
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 text-xs font-bold rounded-xl transition-colors self-start sm:self-auto"
          >
            Clear All Bookmarks
          </button>
        )}
      </div>

      {bookmarkedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onNavigate={onNavigate}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-4">
          <span className="text-5xl block animate-bounce" aria-hidden="true">🐶</span>
          <h2 className="font-display font-bold text-xl text-stone-800">
            No Paw Bookmarks Saved Yet!
          </h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Browse our ten long-form canine guides and click the star icon on any card to save it to your personal reading collection.
          </p>
          <div className="pt-2">
            <a
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                sounds.playPawTap();
                onNavigate('/articles');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all"
            >
              <span>Explore All 10 Dog Articles</span>
              <span>🐾</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
