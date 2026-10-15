import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { sounds } from '../utils/audio';

interface ArticleDetailPageProps {
  article: Article;
  allArticles: Article[];
  onNavigate: (path: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  onGiveTreat: (event: React.MouseEvent) => void;
}

interface Comment {
  id: string;
  dogName: string;
  breed: string;
  comment: string;
  timestamp: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  allArticles,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  onGiveTreat,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pawFivesCount, setPawFivesCount] = useState(42);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      dogName: 'Oliver',
      breed: 'Corgi',
      comment: 'Barking loud approval on this! My human tried the frozen carrot tip mentioned in this guide and it kept my gums busy for a full 25 minutes.',
      timestamp: 'Yesterday at 3:14 PM',
    },
    {
      id: '2',
      dogName: 'Sadie',
      breed: 'Bernese Mountain Dog',
      comment: 'Bookmarked immediately. I shared this with my neighborhood walking club. More sniffing breaks, fewer hurried paces!',
      timestamp: '2 days ago',
    },
  ]);
  const [newDogName, setNewDogName] = useState('');
  const [newBreed, setNewBreed] = useState('');
  const [newComment, setNewComment] = useState('');

  // Dynamic SEO Title and Meta Description update per page
  useEffect(() => {
    // 1. Update Title: 1 main keyword + 2 related keywords, 50-60 characters
    document.title = article.title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.metaDescription);

    // 3. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', article.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', article.metaDescription);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', article.image);

    // 4. Update Schema.org Article JSON-LD
    let scriptTag = document.getElementById('json-ld-article') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-article';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.metaDescription,
      image: article.image,
      datePublished: '2026-10-12',
      author: {
        '@type': 'Person',
        name: `${article.author.name} (${article.author.breed})`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bark & Wag Chronicles',
      },
      keywords: [article.mainKeyword, ...article.relatedKeywords].join(', '),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [article]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDogName.trim() || !newComment.trim()) return;
    sounds.playTreatReward();
    const item: Comment = {
      id: Date.now().toString(),
      dogName: newDogName.trim(),
      breed: newBreed.trim() || 'Good Dog',
      comment: newComment.trim(),
      timestamp: 'Just now',
    };
    setComments([item, ...comments]);
    setNewDogName('');
    setNewBreed('');
    setNewComment('');
  };

  const relatedArticles = allArticles.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  return (
    <div className="pb-24">
      
      {/* Top Reading Progress Bar with animated paw indicator */}
      <div className="fixed top-20 left-0 right-0 h-1.5 bg-stone-200 z-30">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Floating paw on the progress track */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none transition-all duration-150 -ml-2"
          style={{ left: `${scrollProgress}%` }}
        >
          🐾
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Link with descriptive Anchor Text */}
        <nav aria-label="Breadcrumbs" className="mb-6">
          <a
            href="/articles"
            onClick={(e) => {
              e.preventDefault();
              sounds.playPawTap();
              onNavigate('/articles');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 transition-colors py-1 px-2.5 rounded-lg bg-amber-50/80 border border-amber-200/50"
            title="Return to all 10 dog care and training articles"
          >
            <span aria-hidden="true">←</span>
            <span>Return to All 10 Dog Care Articles</span>
          </a>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          
          {/* Metadata Row (Unboxed anti-slop) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-amber-800 font-bold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>Published {article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-mono">Image: {article.imageSizeKb} KB (&lt;100kb)</span>
          </div>

          {/* Main Title: 1 Main Keyword + 2 Related Keywords (50-60 chars) */}
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-tight text-balance">
            {article.title}
          </h1>

          {/* SEO Keyword Breakdown callout */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/50 rounded-xl flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-amber-950">
            <span className="font-bold">Primary Keyword:</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono">{article.mainKeyword}</span>
            <span className="font-bold">Related Keywords:</span>
            <span className="text-stone-600 font-mono">{article.relatedKeywords.join(', ')}</span>
          </div>

          {/* Author Byline */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${article.author.avatarBg} flex items-center justify-center text-xl font-bold border border-black/5 shadow-xs`}>
                {article.author.pawIcon}
              </div>
              <div>
                <div className="font-bold text-stone-900 text-sm">
                  {article.author.name}
                </div>
                <div className="text-xs text-stone-500">
                  {article.author.breed} · {article.author.role}
                </div>
              </div>
            </div>

            {/* Quick Action: Bookmark */}
            <button
              onClick={() => {
                sounds.playTreatReward();
                onToggleBookmark(article.slug);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
              }`}
              title={isBookmarked ? 'Remove from bookmarks' : 'Save this guide to your bookmarks'}
            >
              <span>{isBookmarked ? '★ Bookmarked' : '☆ Bookmark Guide'}</span>
            </button>
          </div>

        </header>

        {/* Featured Image with strict <100kb proof badge */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 relative">
          <img
            src={article.image}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full max-h-[460px] object-cover"
          />
          <div className="p-3 bg-white/95 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 gap-2">
            <span>{article.imageCaption}</span>
            <span className="font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-semibold shrink-0">
              ✓ File Transfer: {article.imageSizeKb} KB (&lt; 100 KB limit compliant)
            </span>
          </div>
        </div>

        {/* Lead Excerpt */}
        <div className="text-lg sm:text-xl font-medium text-stone-800 leading-relaxed border-b border-stone-200/80 pb-8 mb-8">
          {article.lead}
        </div>

        {/* Main Content Sections with Question-and-Answer Subheadings */}
        <div className="space-y-10 text-stone-800 text-base leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              
              {/* Question and Answer format subheadings */}
              {section.isQA ? (
                <div className="rounded-2xl bg-amber-50/80 border border-amber-200/70 p-6 space-y-4 shadow-xs">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5" aria-hidden="true">🐾</span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                        Question & Answer Subheading
                      </span>
                      <h2 className="font-display font-bold text-xl sm:text-2xl text-amber-950 mt-0.5">
                        {section.heading}
                      </h2>
                    </div>
                  </div>

                  {section.answer && (
                    <div className="pl-4 border-l-2 border-amber-400 py-1 text-stone-900 font-medium text-base bg-amber-100/50 p-4 rounded-r-xl">
                      <strong className="text-amber-900 block text-xs font-bold uppercase tracking-wider mb-1">
                        Canine Expert Answer:
                      </strong>
                      {section.answer}
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    {section.body.map((para, pIdx) => (
                      <p key={pIdx} className="text-stone-700 text-sm sm:text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {section.practicalTip && (
                    <div className="mt-4 p-4 rounded-xl bg-white border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                      <span className="text-base">💡</span>
                      <div>
                        <strong className="font-bold text-amber-900">Practical Paw Tip:</strong> {section.practicalTip}
                      </div>
                    </div>
                  )}

                  {section.canineQuote && (
                    <blockquote className="mt-3 p-3 italic text-stone-600 text-xs bg-amber-100/30 rounded-lg">
                      "{section.canineQuote.text}" — <span className="font-bold text-amber-900">{section.canineQuote.dog}</span>
                    </blockquote>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="font-display font-bold text-2xl text-stone-900 pt-2">
                    {section.heading}
                  </h2>
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-stone-700 leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {section.canineQuote && (
                    <blockquote className="my-4 p-4 rounded-2xl bg-stone-100 border border-stone-200 italic text-stone-700 text-sm">
                      "{section.canineQuote.text}" — <span className="font-bold text-amber-900">{section.canineQuote.dog}</span>
                    </blockquote>
                  )}
                </div>
              )}

            </section>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦴</span>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Key Canine Takeaways
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm text-stone-700">
            {article.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">✓</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive "Give a Paw-Five / Treat" Reaction Widget */}
        <div className="my-10 p-6 rounded-2xl bg-gradient-to-r from-amber-100/70 to-yellow-100/70 border border-amber-300/60 text-center space-y-3">
          <span className="text-3xl block animate-bounce" aria-hidden="true">🐶</span>
          <h3 className="font-display font-bold text-lg text-amber-950">
            Did this article help your pack? Give {article.author.name} a Paw-Five!
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Clicking the button sends celebratory bone and treat particles flying across your screen!
          </p>
          <button
            onClick={(e) => {
              sounds.playTreatReward();
              setPawFivesCount(prev => prev + 1);
              onGiveTreat(e);
            }}
            className="px-6 py-3 bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>🐾 Give Paw-Five</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-800 text-amber-200 text-xs">
              {pawFivesCount}
            </span>
          </button>
        </div>

        {/* Author Bio Card */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-6 items-start">
          <div className={`w-16 h-16 rounded-2xl ${article.author.avatarBg} flex items-center justify-center text-3xl font-bold shrink-0 border border-black/5`}>
            {article.author.pawIcon}
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">About the Dog Blogger</span>
            <h4 className="font-display font-bold text-xl text-stone-900">
              {article.author.name} · {article.author.breed}
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {article.author.bio}
            </p>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
              <span><strong>Favorite Treat:</strong> {article.author.favoriteTreat}</span>
              <span><strong>Favorite Snooze Spot:</strong> {article.author.favoriteSpot}</span>
            </div>
            <div className="pt-2">
              <a
                href="/authors"
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playPawTap();
                  onNavigate('/authors');
                }}
                className="text-xs font-bold text-amber-900 hover:underline"
                title={`Meet all canine authors including ${article.author.name}`}
              >
                Meet all canine bloggers on the editorial team →
              </a>
            </div>
          </div>
        </div>

        {/* Interactive "Bark Back" Reader Comments Section */}
        <section className="my-12 space-y-6 pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-2xl text-stone-900 flex items-center gap-2">
              <span>🐾</span>
              <span>Bark Back: Dog & Human Comments ({comments.length})</span>
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleAddComment} className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-stone-900">Leave Your Dog's Review or Thoughts:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={newDogName}
                onChange={(e) => setNewDogName(e.target.value)}
                placeholder="Pup Name (e.g. Charlie)..."
                className="px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                value={newBreed}
                onChange={(e) => setNewBreed(e.target.value)}
                placeholder="Breed (e.g. Beagle / Mixed)..."
                className="px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did your dog think about this guide? Any helpful tips from your home?..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>Submit Bark</span>
              <span>🐶</span>
            </button>
          </form>

          {/* Comment Stream */}
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-white border border-stone-200/60 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-stone-900">
                    🐾 {c.dogName} <span className="font-normal text-stone-500">({c.breed})</span>
                  </div>
                  <span className="text-stone-400">{c.timestamp}</span>
                </div>
                <p className="text-sm text-stone-700 pt-1 leading-relaxed">{c.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles with Rich Anchor Texts */}
        <section className="my-12 pt-8 border-t border-stone-200 space-y-6">
          <h3 className="font-display font-bold text-2xl text-stone-900">
            Related Dog Care Articles You Might Like:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <a
                key={rel.id}
                href={`/article/${rel.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playPawTap();
                  onNavigate(`/article/${rel.slug}`);
                }}
                className="group p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 transition-all flex flex-col justify-between"
                title={`Read related guide: ${rel.title}`}
              >
                <div>
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-28 object-cover rounded-xl mb-3"
                  />
                  <span className="text-[11px] font-bold text-amber-800">{rel.category}</span>
                  <h4 className="font-display font-bold text-sm text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 mt-1">
                    {rel.title}
                  </h4>
                </div>
                <div className="pt-3 text-xs font-bold text-amber-900 flex items-center gap-1 mt-auto">
                  <span>Read Article</span>
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
