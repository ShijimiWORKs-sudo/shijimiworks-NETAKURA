import { LegalPage } from "@/components/LegalPage";

export default function OperatorPage() {
  return (
    <LegalPage
      title="運営者情報"
      description="運営者情報です。"
      sections={[
        {
          heading: "運営者",
          body: "NETAKURA運営",
        },
        {
          heading: "サービス内容",
          body: "メモ、日記、映画の感想、仕事の気づきなどを発信向けの投稿案に変換する支援ツールを提供します。",
        },
      ]}
    />
  );
}
