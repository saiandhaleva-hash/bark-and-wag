import React, { useState } from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { sounds } from '../utils/audio';

interface HomePageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
  bookmarks: string[];
  onToggleBookmark: (slug: string) => void;
  onGiveTreat: (event: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onNavigate,
  bookmarks,
  onToggleBookmark,
  onGiveTreat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'all', label: 'All Barks' },
    { id: 'Training', label: 'Puppy Training' },
    { id: 'Nutrition', label: 'Canine Nutrition' },
    { id: 'Wellness', label: 'Dog Wellness' },
    { id: 'Psychology', label: 'Dog Psychology' },
    { id: 'Health', label: 'Canine Health' },
    { id: 'Travel', label: 'Dog Travel' },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const featuredArticle = articles[1]; // Winston's nutrition guide
  const secondaryArticles = filteredArticles.filter(a => a.id !== featuredArticle.id).slice(0, 6);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    sounds.playTreatReward();
    setSubscribed(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Proposition */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-100/70 border border-amber-300/40 px-3 py-1.5 rounded-full">
                <span>🐾</span>
                <span>Written by Dogs, Grounded in Canine Science</span>
              </div>

              {/* Title with 1 Main Keyword + 2 Related Keywords */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-amber-950 tracking-tight leading-[1.1] text-balance">
                Dog Care, Canine Nutrition & Puppy Training
              </h1>

              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">
                Welcome to the world's premier canine-authored publication. 
                Ten long-form guides investigating loose-leash harmony, antioxidant superfoods, 
                sleep cycles, and canine psychology—straight from the dogs who live it.
              </p>

              {/* Action Buttons with clear anchor text */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/articles"
                  onClick={(e) => {
                    e.preventDefault();
                    sounds.playPawTap();
                    onNavigate('/articles');
                  }}
                  className="px-6 py-3.5 bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Explore All 10 Long Articles</span>
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </a>

                <a
                  href="/quiz"
                  onClick={(e) => {
                    e.preventDefault();
                    sounds.playPawTap();
                    onNavigate('/quiz');
                  }}
                  className="px-5 py-3.5 bg-white hover:bg-amber-50 text-amber-950 font-bold text-sm rounded-xl border border-amber-300/80 shadow-xs transition-all flex items-center gap-2"
                >
                  <span>🎾 Take Pup Personality Quiz</span>
                </a>
              </div>

              {/* Social trust proof */}
              <div className="flex items-center gap-3 pt-2 text-xs text-stone-500">
                <span className="font-bold text-stone-700">100% Fast Performance:</span>
                <span>All editorial images optimized strictly under 100 KB</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset (hero_dogs_reading.jpg - 53.7 KB) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 shadow-xl bg-amber-50">
                <img
                  src="/images/hero_dogs_reading.jpg"
                  alt="Editorial photo of a Golden Retriever and Corgi reading canine journal and tablet"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[440px] object-cover"
                />
                
                {/* Proof badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md rounded-2xl p-4 text-white flex items-center justify-between border border-stone-700/50">
                  <div>
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Featured Morning Read
                    </div>
                    <div className="text-sm font-bold truncate">
                      Bella & Bentley’s Canine Journal: Field Notes on Scent Tracking
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-stone-800 px-2 py-1 rounded-md shrink-0 ml-3">
                    53.7 KB (&lt;100kb)
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Four-Point Key Metrics Strip (Adjacency to Proof) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-stone-200/70 shadow-xs">
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <div className="font-display font-black text-2xl md:text-3xl text-amber-950">10 Guides</div>
            <div className="text-xs text-stone-500 mt-1">In-depth long articles with Q&A sections</div>
          </div>
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <div className="font-display font-black text-2xl md:text-3xl text-amber-950">&lt; 100 KB</div>
            <div className="text-xs text-stone-500 mt-1">Every single image compressed for speed</div>
          </div>
          <div className="border-r border-stone-100 last:border-0 pr-4">
            <div className="font-display font-black text-2xl md:text-3xl text-amber-950">10 Authors</div>
            <div className="text-xs text-stone-500 mt-1">Specialized canine bloggers & investigators</div>
          </div>
          <div>
            <div className="font-display font-black text-2xl md:text-3xl text-amber-950">100% Free</div>
            <div className="text-xs text-stone-500 mt-1">No paywalls, purely loving canine care</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Marquee Article Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Spotlight Article</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mt-0.5">
              Top Canine Nutrition & Diet Feature
            </h2>
          </div>
          <a
            href={`/article/${featuredArticle.slug}`}
            onClick={(e) => {
              e.preventDefault();
              sounds.playPawTap();
              onNavigate(`/article/${featuredArticle.slug}`);
            }}
            className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1"
          >
            <span>Read full diet guide</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <ArticleCard
          article={featuredArticle}
          onNavigate={onNavigate}
          isBookmarked={bookmarks.includes(featuredArticle.slug)}
          onToggleBookmark={onToggleBookmark}
          featured={true}
        />
      </section>

      {/* 4. Category Filter Tabs & Latest Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Explore The Park</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mt-0.5">
              Latest Barks & Canine Field Research
            </h2>
          </div>

          {/* Interactive Category Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playPawTap();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onNavigate={onNavigate}
              isBookmarked={bookmarks.includes(article.slug)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>

        {/* View All CTA with Anchor Text */}
        <div className="text-center pt-8">
          <a
            href="/articles"
            onClick={(e) => {
              e.preventDefault();
              sounds.playPawTap();
              onNavigate('/articles');
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 font-bold text-sm rounded-xl border border-amber-300/50 shadow-xs transition-all"
            title="Browse our full library of 10 long-form canine guides"
          >
            <span>Browse Complete 10-Article Catalog</span>
            <span>🐾</span>
          </a>
        </div>
      </section>

      {/* 5. The Dog Editorial Manifesto: Why Dogs Need Blogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-950 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-900/60 px-3 py-1 rounded-full">
              Canine Editorial Constitution
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-amber-100 tracking-tight leading-tight">
              Why Dogs Deserve Blogs: Bridging the Inter-Species Translation Gap
            </h2>

            <p className="text-amber-200/90 text-base sm:text-lg leading-relaxed">
              For thousands of years, humans wrote books <em>about</em> us. They guessed why we spin in circles before lying down, why we despise certain vacuums, and why cold carrots taste like paradise. Bark & Wag Chronicles gives dogs the microphone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-amber-900/40 border border-amber-800/60">
                <h4 className="font-bold text-amber-300 text-sm mb-1">🐾 Scent-First Perspective</h4>
                <p className="text-xs text-amber-200/80">Every article respects our 300-million olfactory receptor biology rather than human visual assumptions.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-900/40 border border-amber-800/60">
                <h4 className="font-bold text-amber-300 text-sm mb-1">🦴 Fear-Free Science</h4>
                <p className="text-xs text-amber-200/80">Zero outdated dominance myths. Only positive reinforcement, biomechanical protection, and nutritional accuracy.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={(e) => {
                  sounds.playTreatReward();
                  onGiveTreat(e);
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <span>🍖 Give All Dog Authors a Treat</span>
              </button>

              <a
                href="/authors"
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playPawTap();
                  onNavigate('/authors');
                }}
                className="px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs rounded-xl border border-amber-700 transition-all flex items-center gap-2"
              >
                <span>Meet All 10 Canine Authors</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription: The Weekly Scent Mail */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-amber-200/70 shadow-sm text-center space-y-4">
          <span className="text-3xl" aria-hidden="true">📬</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-amber-950">
            Subscribe To The Weekly Scent Mail
          </h2>
          <p className="text-stone-600 text-sm max-w-lg mx-auto">
            Get one high-value canine article delivered to your inbox every Sunday morning. 
            No spam, only wholesome dog advice and homemade treat recipes.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold animate-fadeIn">
              🎉 Pawsome! You are subscribed to The Weekly Scent Mail. Tail wags incoming!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-900 hover:bg-amber-800 text-white font-bold text-sm rounded-xl transition-all shadow-xs"
              >
                Subscribe Now
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
