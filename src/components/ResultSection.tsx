import { CopyButton } from "./CopyButton";

export function ResultSection({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  if (items.length === 0) {
    return null;
  }

  const body = items.map((item, index) => (ordered ? `${index + 1}. ${item}` : `- ${item}`)).join("\n");
  const ListTag = ordered ? "ol" : "ul";

  return (
    <section className="result-section">
      <div className="section-title-row">
        <h3>{title}</h3>
        <CopyButton text={body} />
      </div>
      <ListTag>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </section>
  );
}
