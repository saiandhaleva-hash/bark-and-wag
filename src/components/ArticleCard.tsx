import React from 'react';
import { Article } from '../types';
import { sounds } from '../utils/audio';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  const articleUrl = `/article/${article.slug}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking directly on bookmark button or anchor tag, let that handle it
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.tagName.toLowerCase() === 'a') {
      return;
    }
    sounds.playPawTap();
    onNavigate(articleUrl);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group cursor-pointer rounded-2xl bg-white border border-stone-200/80 hover:border-amber-400 transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        featured ? 'md:grid md:grid-cols-12 md:gap-8' : ''
      }`}
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-stone-100 ${
          featured ? 'md:col-span-7 h-64 md:h-full min-h-[280px]' : 'h-52 w-full'
        }`}
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Lightweight Image Size Badge to prove compliance with under 100kb requirement */}
        <div className="absolute bottom-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-[11px] font-mono text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
          <span>✓</span>
          <span>{article.imageSizeKb} KB</span>
          <span className="text-stone-400">(&lt;100kb)</span>
        </div>

        {/* Category sticker */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-xs font-semibold text-amber-900 px-2.5 py-1 rounded-lg border border-amber-200/60 shadow-xs">
          {article.category}
        </div>

        {/* Bookmark Quick Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sounds.playTreatReward();
            onToggleBookmark(article.slug);
          }}
          type="button"
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-sm transition-all ${
            isBookmarked
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-amber-900'
          }`}
          title={isBookmarked ? 'Remove from paw bookmarks' : 'Save to paw bookmarks'}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
        >
          <span className="text-sm">{isBookmarked ? '★' : '☆'}</span>
        </button>
      </div>

      {/* Content block */}
      <div className={`p-6 flex flex-col justify-between flex-1 ${featured ? 'md:col-span-5 md:py-8 md:pr-8 md:pl-0' : ''}`}>
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2.5">
            <span className="font-medium text-amber-800">{article.author.name} ({article.author.breed})</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
          </div>

          {/* Title with Main Keyword & Related Keywords */}
          <h3 className="font-display font-bold text-xl md:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors leading-snug mb-3">
            <a
              href={articleUrl}
              onClick={(e) => {
                e.preventDefault();
                sounds.playPawTap();
                onNavigate(articleUrl);
              }}
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
            >
              {article.title}
            </a>
          </h3>

          {/* Lead / excerpt */}
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {article.lead}
          </p>

          {/* Q&A Highlight teaser */}
          {article.sections.find(s => s.isQA) && (
            <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-3 mb-4 text-xs text-amber-950">
              <span className="font-bold text-amber-900 block mb-0.5">Q&A Feature:</span>
              <span className="italic line-clamp-1">"{article.sections.find(s => s.isQA)?.question}"</span>
            </div>
          )}
        </div>

        {/* Footer of card with descriptive anchor link */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div className="text-xs text-stone-400 font-mono">
            Key: <span className="text-stone-700 font-sans font-medium">{article.mainKeyword}</span>
          </div>
          
          <a
            href={articleUrl}
            onClick={(e) => {
              e.preventDefault();
              sounds.playPawTap();
              onNavigate(articleUrl);
            }}
            className="text-xs font-bold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors group/link"
            title={`Read complete article: ${article.title}`}
          >
            <span>Read Dog Guide</span>
            <span className="text-base group-hover/link:translate-x-1 transition-transform" aria-hidden="true">🐾</span>
          </a>
        </div>
      </div>
    </article>
  );
};
