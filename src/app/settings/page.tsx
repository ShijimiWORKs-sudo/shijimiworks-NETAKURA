import Link from "next/link";
import { Card } from "@/components/Card";
import { PLAN_DEFINITIONS, POINT_COST_LABELS, POINT_COSTS } from "@/lib/constants";

const relatedLinks = [
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/operator", label: "運営者情報" },
  { href: "/legal", label: "特商法表記" },
];

export default function SettingsPage() {
  return (
    <div className="stack">
      <div className="section-title-row">
        <div>
          <h1>設定</h1>
          <p className="muted">
            現在は開発中のWebデモ版です。外部有料APIやAPIキーは使っていません。
          </p>
        </div>
        <Link className="btn btn-primary" href="/new">
          新しく作る
        </Link>
      </div>

      <Card>
        <h2>現在の状態</h2>
        <dl className="settings-list" style={{ marginTop: 16 }}>
          <div>
            <dt>アプリ状態</dt>
            <dd>開発中のWebデモ版</dd>
          </div>
          <div>
            <dt>外部有料API</dt>
            <dd>未使用</dd>
          </div>
          <div>
            <dt>APIキー</dt>
            <dd>不要</dd>
          </div>
          <div>
            <dt>保存方式</dt>
            <dd>ブラウザのlocalStorage</dd>
          </div>
        </dl>
        <p className="muted" style={{ marginTop: 16 }}>
          入力内容と生成結果は、お使いのブラウザのlocalStorageを優先して保存されます。ブラウザのサイトデータを削除すると、保存内容も削除されます。
        </p>
      </Card>

      <Card>
        <h2>将来プラン案</h2>
        <div className="stats-grid" style={{ marginTop: 16 }}>
          {PLAN_DEFINITIONS.map((plan) => (
            <div key={plan.name} className="stat">
              <h3>{plan.name}</h3>
              <strong>{plan.price === 0 ? "無料" : `${plan.price.toLocaleString("ja-JP")}円`}</strong>
              <p>{plan.monthlyPoints}ポイント/月</p>
              <p className="muted">{plan.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2>ポイント消費案</h2>
        <dl className="settings-list" style={{ marginTop: 16 }}>
          {Object.entries(POINT_COSTS).map(([key, value]) => (
            <div key={key}>
              <dt>{POINT_COST_LABELS[key as keyof typeof POINT_COSTS]}</dt>
              <dd>{value} pt</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h2>将来の差し替え方針</h2>
        <p className="muted">
          生成ロジックは UI から分離し、src/lib/generator に集約しています。将来はこの層を OpenAI API
          などの本物のAI生成に差し替える想定です。
        </p>
      </Card>

      <Card>
        <h2>サポート・規約</h2>
        <div className="related-links" style={{ marginTop: 16 }}>
          {relatedLinks.map((link) => (
            <Link key={link.href} className="btn btn-secondary" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
