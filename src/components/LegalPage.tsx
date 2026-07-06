import Link from "next/link";
import { Card } from "./Card";

type LegalPageProps = {
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <div className="stack">
      <div className="section-title-row">
        <div>
          <h1>{title}</h1>
          <p className="muted">{description}</p>
        </div>
        <Link className="btn btn-secondary" href="/">
          ホームへ戻る
        </Link>
      </div>

      <Card>
        <div className="stack">
          {sections.map((section) => (
            <section key={section.heading} className="legal-section">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}
