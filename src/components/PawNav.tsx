import React, { useState } from 'react';
import { sounds } from '../utils/audio';

interface PawNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  bookmarksCount: number;
  onGiveTreat: (event: React.MouseEvent) => void;
}

export const PawNav: React.FC<PawNavProps> = ({
  currentPath,
  onNavigate,
  bookmarksCount,
  onGiveTreat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    sounds.playPawTap();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playFriendlyBark();
    }
  };

  const navItems = [
    { label: 'The Dog Park', path: '/', anchorText: 'Go to Dog Park Homepage' },
    { label: '10 Daily Barks', path: '/articles', anchorText: 'Browse all 10 long-form dog articles' },
    { label: 'Canine Authors', path: '/authors', anchorText: 'Meet our canine dog bloggers and authors' },
    { label: 'Pup Quiz', path: '/quiz', anchorText: 'Take the Canine Personality Match Quiz' },
    { label: `Paw Bookmarks (${bookmarksCount})`, path: '/bookmarks', anchorText: 'View your saved paw bookmarks' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element with playful wagging tail) */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2 group text-amber-950 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
            title="Bark & Wag Chronicles - Dog Care, Nutrition and Puppy Training"
          >
            <span className="text-2xl select-none inline-block animate-wag" aria-hidden="true">
              🐾
            </span>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors">
                Bark & Wag
              </span>
              <span className="text-[11px] font-semibold text-amber-700/80 -mt-1 tracking-wider uppercase">
                Chronicles
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Clean single-line text navigation links with subtle paw hover */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`group relative py-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-amber-900 font-bold' : 'hover:text-amber-900 text-stone-700'
                  }`}
                  aria-label={item.anchorText}
                >
                  <span
                    className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 ${
                      isActive ? 'opacity-100 text-amber-600' : ''
                    }`}
                    aria-hidden="true"
                  >
                    🐾
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Sound Toggle & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="p-2 text-stone-500 hover:text-amber-900 bg-amber-50/70 hover:bg-amber-100/70 rounded-full border border-amber-200/50 transition-colors flex items-center justify-center text-sm"
              title={isMuted ? 'Unmute friendly canine audio cues' : 'Mute audio cues'}
              aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>

            {/* Primary Action Button: Give Treat / Paw-Five */}
            <button
              onClick={(e) => {
                sounds.playTreatReward();
                onGiveTreat(e);
              }}
              type="button"
              className="px-4 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 active:scale-95 shadow-sm rounded-xl border border-amber-500/30 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
              title="Give a virtual treat and trigger celebration particles"
            >
              <span className="text-base" aria-hidden="true">🦴</span>
              <span>Give Treat</span>
            </button>

            {/* Mobile / Tablet Paw Menu Trigger */}
            <button
              onClick={() => {
                sounds.playPawTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="lg:hidden p-2 text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 rounded-xl border border-amber-300/40 transition-colors flex items-center gap-1.5 text-sm font-semibold"
              aria-label="Toggle Paw Themed Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-lg">🐾</span>
              <span className="text-xs font-bold sm:inline hidden">Paw Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Interactive Paw Pad Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#FAF7F2] border-b border-amber-900/15 shadow-2xl p-6 transition-all animate-fadeIn">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                🐾 Paw-Themed Quick Nav 🐾
              </span>
              <p className="text-xs text-stone-500 mt-1">Tap a paw pad to jump directly to any canine section</p>
            </div>

            {/* Creative Paw Pad Grid Layout: 4 Toe Pads on top, 1 Center Main Pad */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={(e) => handleLinkClick(e, '/')}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center group ${
                  currentPath === '/' ? 'bg-amber-100 border-amber-400 shadow-sm' : 'bg-white border-amber-200/70 hover:bg-amber-50'
                }`}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform" aria-hidden="true">🐾</span>
                <span className="font-display font-bold text-sm text-amber-950 mt-1">The Dog Park</span>
                <span className="text-[11px] text-stone-500">Home & Featured</span>
              </button>

              <button
                onClick={(e) => handleLinkClick(e, '/articles')}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center group ${
                  currentPath.startsWith('/articles') ? 'bg-amber-100 border-amber-400 shadow-sm' : 'bg-white border-amber-200/70 hover:bg-amber-50'
                }`}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform" aria-hidden="true">🦴</span>
                <span className="font-display font-bold text-sm text-amber-950 mt-1">10 Daily Barks</span>
                <span className="text-[11px] text-stone-500">All Long Articles</span>
              </button>

              <button
                onClick={(e) => handleLinkClick(e, '/authors')}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center group ${
                  currentPath === '/authors' ? 'bg-amber-100 border-amber-400 shadow-sm' : 'bg-white border-amber-200/70 hover:bg-amber-50'
                }`}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform" aria-hidden="true">🐶</span>
                <span className="font-display font-bold text-sm text-amber-950 mt-1">Canine Authors</span>
                <span className="text-[11px] text-stone-500">Meet Dog Bloggers</span>
              </button>

              <button
                onClick={(e) => handleLinkClick(e, '/quiz')}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-center text-center group ${
                  currentPath === '/quiz' ? 'bg-amber-100 border-amber-400 shadow-sm' : 'bg-white border-amber-200/70 hover:bg-amber-50'
                }`}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform" aria-hidden="true">🎾</span>
                <span className="font-display font-bold text-sm text-amber-950 mt-1">Pup Quiz</span>
                <span className="text-[11px] text-stone-500">Personality Match</span>
              </button>
            </div>

            {/* Central Big Paw Pad: Bookmarks */}
            <button
              onClick={(e) => handleLinkClick(e, '/bookmarks')}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between px-5 ${
                currentPath === '/bookmarks' ? 'bg-amber-200/80 border-amber-400' : 'bg-amber-50 border-amber-200/80 hover:bg-amber-100/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">🔖</span>
                <div className="text-left">
                  <div className="font-display font-bold text-sm text-amber-950">Paw Bookmarks</div>
                  <div className="text-xs text-stone-600">Saved articles for later reading</div>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-amber-500 text-amber-950 rounded-full">
                {bookmarksCount} saved
              </span>
            </button>

            {/* Close Button */}
            <div className="mt-4 pt-4 border-t border-amber-200/60 flex justify-center">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-stone-600 hover:text-amber-950 py-1.5 px-4 rounded-lg bg-stone-100"
              >
                Close Paw Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
