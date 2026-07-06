import { LegalPage } from "@/components/LegalPage";

export default function ContactPage() {
  return (
    <LegalPage
      title="問い合わせ"
      description="NETAKURAに関する問い合わせ先の案内です。"
      sections={[
        {
          heading: "問い合わせ方法",
          body: "現在は開発中のWebデモ版のため、正式な問い合わせフォームは未実装です。公開時に問い合わせ導線を整備します。",
        },
        {
          heading: "返信について",
          body: "問い合わせ導線の整備後、内容に応じてNETAKURA運営が確認します。",
        },
      ]}
    />
  );
}
