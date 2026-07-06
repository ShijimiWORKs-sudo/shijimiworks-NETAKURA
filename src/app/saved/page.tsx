"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { SavedIdeaCard } from "@/components/SavedIdeaCard";
import { GENRE_LABELS } from "@/lib/constants";
import { deleteIdea, loadSavedIdeas } from "@/lib/storage";
import type { Genre, SavedIdea } from "@/lib/types";

export default function SavedPage() {
  const [ideas, setIdeas] = useState<SavedIdea[]>([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | "all">("all");

  useEffect(() => {
    loadSavedIdeas().then(setIdeas);
  }, []);

  const filtered = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesGenre = genre === "all" || idea.genre === genre;
      const body = [
        idea.originalMemo,
        ...idea.generated.titleIdeas,
        ...idea.generated.ideaThemes,
        ...idea.generated.tags,
      ].join(" ");
      const matchesQuery = body.toLowerCase().includes(query.toLowerCase());
      return matchesGenre && matchesQuery;
    });
  }, [genre, ideas, query]);

  async function handleDelete(id: string) {
    if (!window.confirm("このネタを削除しますか？")) {
      return;
    }
    await deleteIdea(id);
    setIdeas(await loadSavedIdeas());
  }

  return (
    <div className="stack">
      <div className="section-title-row">
        <div>
          <h1>保存済みネタ</h1>
          <p className="muted">保存した生成結果を検索、詳細表示、削除できます。</p>
        </div>
        <Link className="btn btn-primary" href="/new">
          新しく作る
        </Link>
      </div>

      <Card>
        <div className="toolbar">
          <label style={{ flex: 1, minWidth: 240 }}>
            <span className="muted">検索</span>
            <span style={{ position: "relative", display: "block" }}>
              <Search size={18} style={{ left: 12, position: "absolute", top: 14 }} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="タイトル、メモ、タグで検索"
                style={{ paddingLeft: 40 }}
              />
            </span>
          </label>
          <label style={{ minWidth: 200 }}>
            <span className="muted">ジャンル</span>
            <select value={genre} onChange={(event) => setGenre(event.target.value as Genre | "all")}>
              <option value="all">すべて</option>
              {Object.entries(GENRE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      <div className="saved-list">
        {filtered.length === 0 ? (
          <EmptyState message={ideas.length === 0 ? "まだ保存済みネタはありません。" : "条件に合うネタがありません。"} />
        ) : (
          filtered.map((idea) => <SavedIdeaCard key={idea.id} idea={idea} onDelete={handleDelete} />)
        )}
      </div>
    </div>
  );
}
