export type Genre =
  | "ai"
  | "side_business"
  | "movie"
  | "diary"
  | "work"
  | "life"
  | "creative"
  | "other";

export type OutputType =
  | "all"
  | "idea"
  | "titles"
  | "note_outline"
  | "x_posts"
  | "threads_posts";

export type GeneratedContent = {
  ideaThemes: string[];
  readerProblems: string[];
  titleIdeas: string[];
  noteOutline: string[];
  xPosts: string[];
  threadsPosts: string[];
  tags: string[];
};

export type SavedIdea = {
  id: string;
  createdAt: string;
  updatedAt: string;
  originalMemo: string;
  genre: Genre;
  outputType: OutputType;
  generated: GeneratedContent;
  isFavorite: boolean;
};

export type UsageStats = {
  generatedCount: number;
  savedCount: number;
  lastGeneratedAt?: string;
};
