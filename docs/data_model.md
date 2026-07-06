# データ設計

## Genre

```ts
export type Genre =
  | "ai"
  | "side_business"
  | "movie"
  | "diary"
  | "work"
  | "life"
  | "creative"
  | "other";
```

## OutputType

```ts
export type OutputType =
  | "all"
  | "idea"
  | "titles"
  | "note_outline"
  | "x_posts"
  | "threads_posts";
```

## GeneratedContent

```ts
export type GeneratedContent = {
  ideaThemes: string[];
  readerProblems: string[];
  titleIdeas: string[];
  noteOutline: string[];
  xPosts: string[];
  threadsPosts: string[];
  tags: string[];
};
```

## SavedIdea

```ts
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
```

## 保存方式

localStorageを使用する。

- `netakura.savedIdeas`
- `netakura.usageStats`

ブラウザ単位のローカル保存であり、別ブラウザや別PCには同期されない。

