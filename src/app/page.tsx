"use client";

import Link from "next/link";
import { Archive, PenLine, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { SavedIdeaCard } from "@/components/SavedIdeaCard";
import { deleteIdea, getUsageStats, loadSavedIdeas } from "@/lib/storage";
import type { SavedIdea, UsageStats } from "@/lib/types";

export default function DashboardPage() {
  const [ideas, setIdeas] = useState<SavedIdea[]>([]);
  const [stats, setStats] = useState<UsageStats>({ generatedCount: 0, savedCount: 0 });

  useEffect(() => {
    loadSavedIdeas().then(setIdeas);
    setStats(getUsageStats());
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("このネタを削除しますか？")) {
      return;
    }
    await deleteIdea(id);
    setIdeas(await loadSavedIdeas());
    setStats(getUsageStats());
  }

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-copy">
          <img className="hero-logo" src="/images/logo001_02.png" alt="NETAKURAロゴ" />
          <h1>NETAKURA</h1>
          <p className="hero-tagline">思いつきが、投稿の種に変わる。</p>
          <p className="lead">
            メモ・愚痴・日記・映画の感想・仕事の気づきを、note構成・X投稿・Threads投稿に変換する発信支援ツールです。
          </p>
          <div className="action-row" style={{ marginTop: 22 }}>
            <Link className="btn btn-primary" href="/new">
              <PenLine size={18} />
              新しいネタを作る
            </Link>
            <Link className="btn btn-secondary" href="/saved">
              <Archive size={18} />
              保存済みを見る
            </Link>
          </div>
        </div>
        <Card>
          <h2>開発中のWebデモ版</h2>
          <p className="muted">
            外部AI APIは未使用。APIキーなしで、入力内容と生成結果はこのブラウザ内に保存されます。
          </p>
          <div className="stats-grid">
            <div className="stat">
              <span>保存済みネタ</span>
              <strong>{ideas.length}</strong>
            </div>
            <div className="stat">
              <span>生成回数</span>
              <strong>{stats.generatedCount}</strong>
            </div>
          </div>
          <div className="action-row" style={{ marginTop: 16 }}>
            <Link className="btn btn-ghost" href="/settings">
              <Settings size={16} />
              設定を見る
            </Link>
          </div>
        </Card>
      </section>

      <Card>
        <div className="section-title-row">
          <h2>最近のネタ</h2>
          <Link className="btn btn-secondary" href="/saved">
            一覧へ
          </Link>
        </div>
        <div className="saved-list" style={{ marginTop: 16 }}>
          {ideas.length === 0 ? (
            <EmptyState message="まだ保存済みネタはありません。" />
          ) : (
            ideas.slice(0, 5).map((idea) => (
              <SavedIdeaCard key={idea.id} idea={idea} onDelete={handleDelete} />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
