import React from 'react';
import { AUTHORS } from '../data/articles';
import { Article } from '../types';
import { sounds } from '../utils/audio';

interface AuthorsPageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
  onGiveTreat: (event: React.MouseEvent) => void;
}

export const AuthorsPage: React.FC<AuthorsPageProps> = ({
  articles,
  onNavigate,
  onGiveTreat,
}) => {
  const authorList = Object.values(AUTHORS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <span>🐾</span>
          <span>The Editorial Board</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
          Meet Our Canine Bloggers & Ethologists
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          From energetic Border Collie agility trainers to wise Basset Hound scent detectives, each contributor brings firsthand canine biology and psychology to their writing.
        </p>
      </div>

      {/* Grid of Authors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authorList.map((author) => {
          const authorArticles = articles.filter((a) => a.author.id === author.id);

          return (
            <div
              key={author.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${author.avatarBg} flex items-center justify-center text-3xl font-bold border border-black/5`}>
                      {author.pawIcon}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-2xl text-stone-900">
                        {author.name}
                      </h2>
                      <div className="text-xs font-semibold text-amber-800">
                        {author.breed}
                      </div>
                      <div className="text-xs text-stone-500">
                        {author.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      sounds.playTreatReward();
                      onGiveTreat(e);
                    }}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200/60 flex items-center gap-1 shrink-0"
                    title={`Send a treat to ${author.name}`}
                  >
                    <span>🦴</span>
                    <span>Toss Treat</span>
                  </button>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed">
                  {author.bio}
                </p>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/40 text-xs text-stone-600 space-y-1">
                  <div><strong>Favorite Treat:</strong> {author.favoriteTreat}</div>
                  <div><strong>Favorite Snooze Spot:</strong> {author.favoriteSpot}</div>
                </div>
              </div>

              {/* Author Articles with Descriptive Anchor Text */}
              <div className="pt-4 border-t border-stone-100">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Published Articles ({authorArticles.length}):
                </div>
                {authorArticles.length > 0 ? (
                  <ul className="space-y-2">
                    {authorArticles.map((art) => (
                      <li key={art.id}>
                        <a
                          href={`/article/${art.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            sounds.playPawTap();
                            onNavigate(`/article/${art.slug}`);
                          }}
                          className="text-xs font-semibold text-amber-900 hover:text-amber-700 hover:underline flex items-center gap-1.5"
                          title={`Read guide: ${art.title}`}
                        >
                          <span>🐾</span>
                          <span className="line-clamp-1">{art.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-stone-400 italic">
                    New field notes currently in review!
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
