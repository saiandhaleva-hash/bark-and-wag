export interface ContentSection {
  heading: string;
  isQA?: boolean; // Set true for Question and Answer format subheadings
  question?: string;
  answer?: string;
  body: string[];
  practicalTip?: string;
  canineQuote?: {
    text: string;
    dog: string;
  };
}

export interface DogAuthor {
  id: string;
  name: string;
  breed: string;
  role: string;
  avatarBg: string;
  pawIcon: string;
  bio: string;
  favoriteTreat: string;
  favoriteSpot: string;
}

export interface Article {
  id: string;
  slug: string; // Good URL rule: lowercase, hyphenated
  title: string; // Good title rule: 50-60 chars, 1 main keyword + 2 related keywords
  mainKeyword: string;
  relatedKeywords: [string, string];
  metaDescription: string; // Good meta description rule: 140-155 chars with primary keyword & CTA
  category: 'Training' | 'Nutrition' | 'Wellness' | 'Grooming' | 'Fitness' | 'Psychology' | 'Health' | 'Travel';
  readTime: string;
  publishDate: string;
  image: string; // Must be under 100kb
  imageAlt: string;
  imageCaption: string;
  imageSizeKb: number; // Verification metric
  author: DogAuthor;
  lead: string;
  sections: ContentSection[];
  keyTakeaways: string[];
  relatedSlugs: string[];
}

export type RoutePage = 
  | { type: 'home' }
  | { type: 'articles'; category?: string; search?: string }
  | { type: 'article'; slug: string }
  | { type: 'authors' }
  | { type: 'quiz' }
  | { type: 'bookmarks' };
