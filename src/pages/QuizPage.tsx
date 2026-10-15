import React, { useState } from 'react';
import { AUTHORS } from '../data/articles';
import { Article } from '../types';
import { sounds } from '../utils/audio';

interface QuizPageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
  onGiveTreat: (event: React.MouseEvent) => void;
}

interface Question {
  question: string;
  options: {
    text: string;
    dogKey: string;
    icon: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    question: 'What is your ideal Saturday morning activity?',
    options: [
      { text: 'A slow 45-minute scent walk sniffing every single shrub.', dogKey: 'barnaby', icon: '🐾' },
      { text: 'Lurking by the kitchen cutting board waiting for dropped cheese.', dogKey: 'winston', icon: '🧀' },
      { text: 'An intense 8-mile agility trail run or frisbee marathon.', dogKey: 'luna', icon: '⚡' },
      { text: 'Refusing to leave the duvet until at least 11:30 AM.', dogKey: 'pip', icon: '💤' },
    ],
  },
  {
    question: 'How do you react when the doorbell rings?',
    options: [
      { text: 'Deep, resonant baying to alert the entire postal district.', dogKey: 'barnaby', icon: '📢' },
      { text: 'Grabbing my favorite plush toy to show off politely at the door.', dogKey: 'winston', icon: '🧸' },
      { text: 'Executing a tactical perimeter scan and analyzing footstep frequency.', dogKey: 'sherlock', icon: '🔍' },
      { text: 'Curling tighter under the blanket; someone else can answer it.', dogKey: 'pip', icon: '🛋️' },
    ],
  },
  {
    question: 'What is your philosophy on bath time?',
    options: [
      { text: 'Only acceptable if followed by an oatmeal rinse and warm towels.', dogKey: 'cleo', icon: '🛁' },
      { text: 'I prefer perfume eau de mud puddle, but I tolerate warm tubs.', dogKey: 'winston', icon: '🧼' },
      { text: 'High velocity dryer makes me feel like a supersonic jet!', dogKey: 'luna', icon: '💨' },
      { text: 'A warm sponge massage for aging joints is supreme heaven.', dogKey: 'baxter', icon: '🧴' },
    ],
  },
  {
    question: 'What is your dream vacation destination?',
    options: [
      { text: 'A deep pine forest with 10,000 uncharted woodland scent trails.', dogKey: 'murphy', icon: '🌲' },
      { text: 'A grassy lake meadow where tennis balls bounce endlessly.', dogKey: 'milo_daisy', icon: '🏖️' },
      { text: 'A cozy fireplace cabin with orthopedic rugs everywhere.', dogKey: 'baxter', icon: '🪵' },
      { text: 'A gourmet farmer’s market with infinite carrot samples.', dogKey: 'winston', icon: '🥕' },
    ],
  },
];

export const QuizPage: React.FC<QuizPageProps> = ({
  articles,
  onNavigate,
  onGiveTreat,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultDogKey, setResultDogKey] = useState<string | null>(null);

  const handleSelectOption = (dogKey: string) => {
    sounds.playPawTap();
    const newAnswers = [...answers, dogKey];
    setAnswers(newAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate top match
      sounds.playTreatReward();
      const counts: Record<string, number> = {};
      newAnswers.forEach((k) => {
        counts[k] = (counts[k] || 0) + 1;
      });
      let highestKey = newAnswers[0];
      let maxCount = 0;
      Object.entries(counts).forEach(([k, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highestKey = k;
        }
      });
      setResultDogKey(highestKey);
    }
  };

  const handleRestart = () => {
    sounds.playPawTap();
    setCurrentStep(0);
    setAnswers([]);
    setResultDogKey(null);
  };

  const matchedAuthor = resultDogKey ? AUTHORS[resultDogKey] || AUTHORS.winston : null;
  const recommendedArticles = resultDogKey
    ? articles.filter((a) => a.author.id === resultDogKey || a.category === 'Wellness').slice(0, 3)
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          🐾 Canine Personality Diagnostic 🐾
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-stone-900 tracking-tight">
          Which Dog Blogger Are You?
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Answer four playful questions to discover your canine alter-ego and receive personalized article recommendations.
        </p>
      </div>

      {!resultDogKey ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-6">
          
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Current Question */}
          <div className="pt-2">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900">
              {QUIZ_QUESTIONS[currentStep].question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.dogKey)}
                className="group p-5 rounded-2xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-left flex items-start gap-3.5"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="text-sm font-medium text-stone-800 group-hover:text-amber-950">
                  {option.text}
                </span>
              </button>
            ))}
          </div>

        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-300 shadow-md space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <div className="inline-block p-4 rounded-3xl bg-amber-100 text-4xl mb-2">
              {matchedAuthor?.pawIcon}
            </div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Your Canine Match:
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-amber-950">
              You are {matchedAuthor?.name}!
            </h2>
            <div className="text-sm font-semibold text-stone-600">
              {matchedAuthor?.breed} · {matchedAuthor?.role}
            </div>
            <p className="text-sm text-stone-700 max-w-lg mx-auto leading-relaxed pt-2">
              {matchedAuthor?.bio}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex flex-wrap justify-around gap-4">
            <div><strong>Favorite Treat:</strong> {matchedAuthor?.favoriteTreat}</div>
            <div><strong>Favorite Spot:</strong> {matchedAuthor?.favoriteSpot}</div>
          </div>

          {/* Tailored Article Recommendations with Descriptive Anchor Text */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h3 className="font-display font-bold text-lg text-stone-900">
              Personalized Reading Recommendations For Your Pack:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedArticles.map((art) => (
                <a
                  key={art.id}
                  href={`/article/${art.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    sounds.playPawTap();
                    onNavigate(`/article/${art.slug}`);
                  }}
                  className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-400 transition-all block group"
                  title={`Read matched article: ${art.title}`}
                >
                  <span className="text-[11px] font-bold text-amber-800 uppercase">{art.category}</span>
                  <h4 className="font-display font-bold text-sm text-stone-900 group-hover:text-amber-900 line-clamp-1 mt-0.5">
                    {art.title}
                  </h4>
                  <div className="text-xs font-semibold text-amber-900 mt-2 flex items-center gap-1">
                    <span>Read Guide</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quiz Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl"
            >
              Retake Quiz
            </button>
            <button
              onClick={(e) => {
                sounds.playTreatReward();
                onGiveTreat(e);
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl"
            >
              🦴 Celebrate Match With Treats!
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
