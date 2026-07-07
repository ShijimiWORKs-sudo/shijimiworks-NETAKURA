import { LegalPage } from "@/components/LegalPage";

export default function ContactPage() {
  return (
    <LegalPage
      title="問い合わせ"
      description="問い合わせ先の案内です。"
      sections={[
        {
          heading: "問い合わせ方法",
          body: "現在は開発中のWebデモ版です。不具合報告・改善要望・利用相談は、運営者が指定する連絡先よりお問い合わせください。",
        },
        {
          heading: "問い合わせフォームについて",
          body: "正式な問い合わせフォームは今後実装予定です。問い合わせ導線の整備後、内容に応じて運営側で確認します。",
        },
      ]}
    />
  );
}
