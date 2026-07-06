import { LegalPage } from "@/components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="プライバシーポリシー"
      description="NETAKURAにおける情報の取り扱いについてまとめたページです。"
      sections={[
        {
          heading: "保存される情報",
          body: "入力内容と生成結果は、ブラウザのlocalStorageを優先して保存されます。開発中のWebデモ版では、同じローカル環境内の保存補助も使用します。",
        },
        {
          heading: "外部AI API",
          body: "現在のNETAKURAは外部有料AI APIを使用していません。APIキーの入力も不要です。",
        },
        {
          heading: "データ削除",
          body: "ブラウザのサイトデータを削除すると、ブラウザ内に保存された内容も削除されます。",
        },
      ]}
    />
  );
}
