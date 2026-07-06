"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { GeneratedResult } from "@/components/GeneratedResult";
import { GENRE_LABELS, OUTPUT_TYPE_LABELS } from "@/lib/constants";
import { deleteIdea, loadSavedIdea } from "@/lib/storage";
import type { SavedIdea } from "@/lib/types";

export default function SavedDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [idea, setIdea] = useState<SavedIdea | null | undefined>(undefined);

  useEffect(() => {
    loadSavedIdea(params.id).then(setIdea);
  }, [params.id]);

  async function handleDelete() {
    if (!idea || !window.confirm("このネタを削除しますか？")) {
      return;
    }
    await deleteIdea(idea.id);
    router.push("/saved");
  }

  if (idea === undefined) {
    return <p>読み込み中...</p>;
  }

  if (!idea) {
    return (
      <Card>
        <h1>ネタが見つかりません</h1>
        <p className="muted">保存データが削除されたか、URLが正しくない可能性があります。</p>
        <Link className="btn btn-primary" href="/saved">
          一覧へ戻る
        </Link>
      </Card>
    );
  }

  return (
    <div className="stack">
      <div className="section-title-row">
        <div>
          <h1>{idea.generated.titleIdeas[0] ?? idea.generated.ideaThemes[0] ?? "保存済みネタ"}</h1>
          <p className="muted">
            {GENRE_LABELS[idea.genre]} / {OUTPUT_TYPE_LABELS[idea.outputType]} /{" "}
            {new Date(idea.createdAt).toLocaleString("ja-JP")}
          </p>
        </div>
        <div className="action-row">
          <Link className="btn btn-secondary" href="/saved">
            一覧へ戻る
          </Link>
          <Button type="button" variant="danger" onClick={handleDelete}>
            <Trash2 size={16} />
            削除
          </Button>
        </div>
      </div>

      <Card>
        <h2>元メモ</h2>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{idea.originalMemo}</p>
      </Card>

      <Card>
        <GeneratedResult generated={idea.generated} />
      </Card>
    </div>
  );
}
