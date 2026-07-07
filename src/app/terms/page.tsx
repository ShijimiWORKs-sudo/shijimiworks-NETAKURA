import { LegalPage } from "@/components/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="利用規約"
      description="利用条件をまとめたページです。"
      sections={[
        {
          heading: "サービスについて",
          body: "本サービスは、メモや感想を発信向けの構成や投稿案に変換する開発中のWebデモ版です。",
        },
        {
          heading: "禁止事項",
          body: "第三者の権利を侵害する行為、不正アクセス、過度な負荷をかける行為、法令に反する利用を禁止します。",
        },
        {
          heading: "内容の確認",
          body: "生成結果はテンプレートを用いた補助出力です。公開前に、利用者自身で事実関係や表現を確認してください。",
        },
      ]}
    />
  );
}
