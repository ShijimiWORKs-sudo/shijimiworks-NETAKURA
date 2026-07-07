import { LegalPage } from "@/components/LegalPage";

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="免責事項"
      description="生成結果と利用上の注意についてまとめたページです。"
      sections={[
        {
          heading: "生成結果について",
          body: "本サービスの出力は発信作成を補助するための案であり、正確性、完全性、特定目的への適合性を保証するものではありません。",
        },
        {
          heading: "公開前の確認",
          body: "生成結果を公開または商用利用する場合は、利用者自身の責任で内容、権利関係、事実関係を確認してください。",
        },
      ]}
    />
  );
}
