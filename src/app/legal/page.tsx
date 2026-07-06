import { LegalPage } from "@/components/LegalPage";

export default function LegalPageRoute() {
  return (
    <LegalPage
      title="特商法表記"
      description="特定商取引法に基づく表記の準備ページです。"
      sections={[
        {
          heading: "販売事業者",
          body: "NETAKURA運営",
        },
        {
          heading: "価格と提供条件",
          body: "現在は開発中のWebデモ版であり、有料販売は行っていません。将来の有料プラン提供時に正式な表記を更新します。",
        },
        {
          heading: "追加費用",
          body: "現在のWebデモ版では外部有料AI APIや決済機能を使用していません。",
        },
      ]}
    />
  );
}
