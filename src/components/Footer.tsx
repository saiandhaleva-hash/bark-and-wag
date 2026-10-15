import React from 'react';
import { sounds } from '../utils/audio';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    sounds.playPawTap();
    onNavigate(path);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          
          {/* Col 1: Wordmark & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl select-none" aria-hidden="true">🐾</span>
              <span className="font-display font-black text-xl text-white tracking-tight">
                Bark & Wag Chronicles
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              The premier canine-authored publication dedicated to veterinary-backed dog care, whole food canine nutrition, and gentle puppy training methods.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-stone-800/80 p-2.5 rounded-lg border border-stone-700/60 inline-block">
              ✓ 100% Lightweight: All photos &lt; 100 KB
            </div>
          </div>

          {/* Col 2: Navigation Links with Clear Anchor Texts */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Site Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Return to Dog Park Home
                </a>
              </li>
              <li>
                <a
                  href="/articles"
                  onClick={(e) => handleLink(e, '/articles')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Browse All 10 Long Articles
                </a>
              </li>
              <li>
                <a
                  href="/authors"
                  onClick={(e) => handleLink(e, '/authors')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Meet Canine Authors & Ethologists
                </a>
              </li>
              <li>
                <a
                  href="/quiz"
                  onClick={(e) => handleLink(e, '/quiz')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Take Canine Personality Match Quiz
                </a>
              </li>
              <li>
                <a
                  href="/bookmarks"
                  onClick={(e) => handleLink(e, '/bookmarks')}
                  className="hover:text-amber-400 transition-colors"
                >
                  View Saved Paw Bookmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Featured Long Articles with Keyword Anchor Texts */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Popular Dog Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/article/puppy-training-dog-behavior-leash-manners"
                  onClick={(e) => handleLink(e, '/article/puppy-training-dog-behavior-leash-manners')}
                  className="hover:text-amber-400 transition-colors line-clamp-1"
                >
                  Puppy Training: Leash Manners & Behavior
                </a>
              </li>
              <li>
                <a
                  href="/article/canine-nutrition-dog-health-diet-guide"
                  onClick={(e) => handleLink(e, '/article/canine-nutrition-dog-health-diet-guide')}
                  className="hover:text-amber-400 transition-colors line-clamp-1"
                >
                  Canine Nutrition: Healthy Diet Guide
                </a>
              </li>
              <li>
                <a
                  href="/article/canine-longevity-senior-dog-care-wellness"
                  onClick={(e) => handleLink(e, '/article/canine-longevity-senior-dog-care-wellness')}
                  className="hover:text-amber-400 transition-colors line-clamp-1"
                >
                  Canine Longevity: Senior Dog Care
                </a>
              </li>
              <li>
                <a
                  href="/article/dog-psychology-canine-body-language-signals"
                  onClick={(e) => handleLink(e, '/article/dog-psychology-canine-body-language-signals')}
                  className="hover:text-amber-400 transition-colors line-clamp-1"
                >
                  Dog Psychology: Body Language Signals
                </a>
              </li>
              <li>
                <a
                  href="/article/dog-travel-canine-safety-road-trip-gear"
                  onClick={(e) => handleLink(e, '/article/dog-travel-canine-safety-road-trip-gear')}
                  className="hover:text-amber-400 transition-colors line-clamp-1"
                >
                  Dog Travel: Safety Gear & Road Trips
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Veterinary Advisory Notice */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Veterinary Note
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              While our articles are authored by experienced dogs and cross-checked against peer-reviewed veterinary consensus, they are intended for educational enjoyment and should never replace direct diagnosis by your licensed family veterinarian.
            </p>
            <div className="pt-2 text-xs text-amber-300 flex items-center gap-1 font-semibold">
              <span>Made with love for dogs everywhere</span>
              <span>❤️🐾</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Bark & Wag Chronicles. All tail rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Clean URLs &amp; Strict SEO Optimized</span>
            <span>Mobile, Tablet &amp; Desktop Accessible</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
