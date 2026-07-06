import type { GeneratedContent } from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { ResultSection } from "./ResultSection";

export function generatedToMarkdown(generated: GeneratedContent) {
  const sections = [
    ["発信テーマ", generated.ideaThemes],
    ["読者の悩み", generated.readerProblems],
    ["タイトル案", generated.titleIdeas],
    ["note構成", generated.noteOutline.map((item, index) => `${index + 1}. ${item}`)],
    ["X投稿案", generated.xPosts],
    ["Threads投稿案", generated.threadsPosts],
    ["タグ", generated.tags.map((tag) => `#${tag}`)],
  ];

  return sections
    .filter(([, items]) => (items as string[]).length > 0)
    .map(([title, items]) => `## ${title}\n\n${(items as string[]).map((item) => `- ${item}`).join("\n")}`)
    .join("\n\n");
}

export function GeneratedResult({ generated }: { generated: GeneratedContent }) {
  const markdown = generatedToMarkdown(generated);

  return (
    <div className="result-wrap">
      <div className="result-actions">
        <CopyButton text={markdown} label="Markdownでコピー" />
      </div>
      <ResultSection title="発信テーマ" items={generated.ideaThemes} />
      <ResultSection title="読者の悩み" items={generated.readerProblems} />
      <ResultSection title="タイトル案" items={generated.titleIdeas} />
      <ResultSection title="note構成" items={generated.noteOutline} ordered />
      <ResultSection title="X投稿案" items={generated.xPosts} />
      <ResultSection title="Threads投稿案" items={generated.threadsPosts} />
      {generated.tags.length > 0 ? (
        <section className="result-section">
          <h3>タグ</h3>
          <div className="tag-row">
            {generated.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
