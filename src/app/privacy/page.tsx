import { LegalPage } from "@/components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="プライバシーポリシー"
      description="情報の取り扱いについてまとめたページです。"
      sections={[
        {
          heading: "保存される情報",
          body: "入力内容と生成結果は、お使いのブラウザのlocalStorageに保存されます。",
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
