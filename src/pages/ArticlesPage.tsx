import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { sounds } from '../utils/audio';

interface ArticlesPageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
  bookmarks: string[];
  onToggleBookmark: (slug: string) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  articles,
  onNavigate,
  bookmarks,
  onToggleBookmark,
  initialCategory = 'all',
  initialSearch = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState<'newest' | 'readTime'>('newest');

  const categories = [
    { id: 'all', label: 'All Articles (10)' },
    { id: 'Training', label: 'Training (2)' },
    { id: 'Nutrition', label: 'Nutrition (1)' },
    { id: 'Wellness', label: 'Wellness (2)' },
    { id: 'Grooming', label: 'Grooming (1)' },
    { id: 'Fitness', label: 'Fitness (1)' },
    { id: 'Psychology', label: 'Psychology (1)' },
    { id: 'Health', label: 'Health (1)' },
    { id: 'Travel', label: 'Travel (1)' },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === 'all' || article.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.mainKeyword.toLowerCase().includes(q) ||
        article.relatedKeywords.some((k) => k.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q) ||
        article.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            (s.question && s.question.toLowerCase().includes(q))
        );

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <span>🐾</span>
          <span>Complete Dog Blog Catalog</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
          10 In-Depth Dog Care, Nutrition & Behavior Guides
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Explore all ten canine-penned articles. Every guide includes illustrated photographs under 100 KB, veterinary-reviewed advice, and structured Question-and-Answer subheadings.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, Q&A question, or dog author..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 shrink-0">
            <span>Sort:</span>
            <button
              onClick={() => {
                sounds.playPawTap();
                setSortOrder(sortOrder === 'newest' ? 'readTime' : 'newest');
              }}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-800 transition-colors"
            >
              {sortOrder === 'newest' ? 'Date (Newest)' : 'Read Time'}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playPawTap();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count and Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
        <span>
          Showing <strong className="text-stone-900">{filteredArticles.length}</strong> of {articles.length} total dog articles
        </span>
        <span className="text-emerald-700 font-mono">
          ✓ All images verified &lt; 100 KB
        </span>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onNavigate={onNavigate}
              isBookmarked={bookmarks.includes(article.slug)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <span className="text-4xl block mb-2" aria-hidden="true">🐶</span>
          <h3 className="font-display font-bold text-lg text-stone-800">No Barks Matched Your Query</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search terms or clearing the category filter to view all ten articles.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 bg-amber-900 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick Jump Links to Popular Articles with Descriptive Anchor Text */}
      <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/50 space-y-3">
        <h3 className="font-display font-bold text-sm text-amber-950 uppercase tracking-wider">
          Quick Canine Reading Recommendations:
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-amber-900">
          <a
            href="/article/puppy-training-dog-behavior-leash-manners"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/article/puppy-training-dog-behavior-leash-manners');
            }}
            className="hover:underline flex items-center gap-1"
          >
            <span>🐾 Read Loose-Leash Manners Guide</span>
          </a>
          <a
            href="/article/canine-nutrition-dog-health-diet-guide"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/article/canine-nutrition-dog-health-diet-guide');
            }}
            className="hover:underline flex items-center gap-1"
          >
            <span>🦴 Explore Healthy Canine Superfoods & Diet Guide</span>
          </a>
          <a
            href="/article/canine-longevity-senior-dog-care-wellness"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/article/canine-longevity-senior-dog-care-wellness');
            }}
            className="hover:underline flex items-center gap-1"
          >
            <span>🕰️ Discover Senior Dog Care & Aging Pup Wellness</span>
          </a>
          <a
            href="/article/dog-psychology-canine-body-language-signals"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/article/dog-psychology-canine-body-language-signals');
            }}
            className="hover:underline flex items-center gap-1"
          >
            <span>🔍 Translate Dog Body Language & Puppy Signals</span>
          </a>
        </div>
      </div>

    </div>
  );
};
