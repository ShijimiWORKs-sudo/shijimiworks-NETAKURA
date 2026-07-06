"use client";

import Link from "next/link";
import { RotateCcw, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { GeneratedResult } from "@/components/GeneratedResult";
import { GENRE_LABELS, OUTPUT_TYPE_LABELS } from "@/lib/constants";
import { generateAll } from "@/lib/generator/generateAll";
import { incrementGeneratedCount, loadSavedIdea, saveIdea } from "@/lib/storage";
import type { GeneratedContent, Genre, OutputType, SavedIdea } from "@/lib/types";

const EXAMPLE =
  "毎日投稿したいけど、何を書けばいいか分からない。自分の経験に価値があるのかも分からない。";

export default function NewPage() {
  const [memo, setMemo] = useState("");
  const [genre, setGenre] = useState<Genre>("diary");
  const [outputType, setOutputType] = useState<OutputType>("all");
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function handleGenerate() {
    setSavedMessage("");
    if (!memo.trim()) {
      setError("メモを入力してください。");
      return;
    }

    if (memo.length > 3000) {
      setError("入力が長すぎます。MVP版では3000文字以内を目安にしてください。");
      return;
    }

    setError("");
    const result = generateAll(memo, genre, outputType);
    setGenerated(result);
    incrementGeneratedCount();
  }

  async function handleSave() {
    if (!generated) {
      return;
    }

    const now = new Date().toISOString();
    const item: SavedIdea = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      originalMemo: memo,
      genre,
      outputType,
      generated,
      isFavorite: false,
    };

    await saveIdea(item);
    const saved = await loadSavedIdea(item.id);
    setSavedMessage(
      saved
        ? "このネタを保存しました。保存済み一覧から開けます。"
        : "保存に失敗しました。ブラウザの保存設定を確認してください。",
    );
  }

  function clearInput() {
    setMemo("");
    setGenerated(null);
    setError("");
    setSavedMessage("");
  }

  return (
    <div className="stack">
      <div className="section-title-row">
        <div>
          <h1>新しいネタを作る</h1>
          <p className="muted">メモを入力して、発信テーマ・タイトル・note構成・SNS投稿案へ変換します。</p>
        </div>
        <Link className="btn btn-secondary" href="/">
          ダッシュボードへ戻る
        </Link>
      </div>

      <Card>
        <div className="form-grid">
          <label>
            メモ本文
            <textarea
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
              placeholder={`例：${EXAMPLE}`}
            />
          </label>
          <div className="two-column">
            <label>
              ジャンル
              <select value={genre} onChange={(event) => setGenre(event.target.value as Genre)}>
                {Object.entries(GENRE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              出力形式
              <select value={outputType} onChange={(event) => setOutputType(event.target.value as OutputType)}>
                {Object.entries(OUTPUT_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {error ? <div className="error-box">{error}</div> : null}
          <div className="action-row">
            <Button type="button" onClick={handleGenerate}>
              <Sparkles size={18} />
              ネタに変換する
            </Button>
            <Button type="button" variant="secondary" onClick={clearInput}>
              <RotateCcw size={18} />
              入力をクリア
            </Button>
          </div>
        </div>
      </Card>

      {generated ? (
        <Card>
          <div className="section-title-row">
            <div>
              <h2>生成結果</h2>
              <p className="muted">必要なセクションだけコピーできます。Markdown形式でもまとめてコピーできます。</p>
            </div>
            <div className="action-row">
              <Button type="button" onClick={handleSave}>
                <Save size={18} />
                このネタを保存する
              </Button>
              <Button type="button" variant="secondary" onClick={handleGenerate}>
                <Sparkles size={18} />
                再生成
              </Button>
            </div>
          </div>
          {savedMessage ? <p className="tag">{savedMessage}</p> : null}
          <div style={{ marginTop: 16 }}>
            <GeneratedResult generated={generated} />
          </div>
        </Card>
      ) : null}
    </div>
  );
}
