import type { Genre, OutputType } from "./types";

export const GENRE_LABELS: Record<Genre, string> = {
  ai: "AI",
  side_business: "副業",
  movie: "映画",
  diary: "日記",
  work: "仕事",
  life: "生活",
  creative: "創作",
  other: "その他",
};

export const OUTPUT_TYPE_LABELS: Record<OutputType, string> = {
  all: "まとめて生成",
  idea: "発信ネタ",
  titles: "タイトル案",
  note_outline: "note構成",
  x_posts: "X投稿",
  threads_posts: "Threads投稿",
};

export const PLAN_DEFINITIONS = [
  {
    name: "Free",
    price: 0,
    monthlyPoints: 5,
    description: "体験用。月5回まで。",
  },
  {
    name: "Starter",
    price: 980,
    monthlyPoints: 100,
    description: "個人発信者向け。",
  },
  {
    name: "Pro",
    price: 1980,
    monthlyPoints: 300,
    description: "本格運用向け。",
  },
];

export const POINT_COSTS = {
  idea: 1,
  titles: 1,
  social: 2,
  noteOutline: 3,
  noteDraft: 8,
  longArticle: 15,
  script: 15,
};

export const POINT_COST_LABELS: Record<keyof typeof POINT_COSTS, string> = {
  idea: "発信ネタ",
  titles: "タイトル案",
  social: "SNS投稿",
  noteOutline: "note構成",
  noteDraft: "note本文下書き",
  longArticle: "長文記事",
  script: "台本生成",
};

export const STORAGE_KEYS = {
  savedIdeas: "netakura.savedIdeas",
  usageStats: "netakura.usageStats",
};
