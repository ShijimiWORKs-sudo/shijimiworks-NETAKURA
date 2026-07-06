"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { GENRE_LABELS } from "@/lib/constants";
import type { SavedIdea } from "@/lib/types";
import { Button } from "./Button";

export function SavedIdeaCard({
  idea,
  onDelete,
}: {
  idea: SavedIdea;
  onDelete: (id: string) => void;
}) {
  const title = idea.generated.titleIdeas[0] ?? idea.generated.ideaThemes[0] ?? "無題のネタ";

  return (
    <article className="saved-card">
      <div>
        <div className="meta-row">
          <span>{GENRE_LABELS[idea.genre]}</span>
          <time>{new Date(idea.createdAt).toLocaleString("ja-JP")}</time>
        </div>
        <h3>{title}</h3>
        <p>{idea.originalMemo}</p>
      </div>
      <div className="card-actions">
        <Link className="btn btn-secondary" href={`/saved/${idea.id}`}>
          詳細
        </Link>
        <Button type="button" variant="danger" onClick={() => onDelete(idea.id)} title="削除">
          <Trash2 size={16} />
          削除
        </Button>
      </div>
    </article>
  );
}
