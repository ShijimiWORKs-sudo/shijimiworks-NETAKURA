const STOP_WORDS = new Set([
  "これ",
  "それ",
  "あれ",
  "ため",
  "こと",
  "もの",
  "よう",
  "さん",
  "する",
  "した",
  "して",
  "いる",
  "ある",
  "ない",
  "たい",
  "けど",
  "から",
  "まで",
  "です",
  "ます",
  "自分",
  "今日",
  "毎日",
  "何",
  "いい",
  "分からない",
  "わからない",
  "映画",
  "感想",
]);

export function extractKeywords(memo: string): string[] {
  const normalized = memo
    .replace(/[、。！？!?]/g, " ")
    .replace(/[\n\r\t]/g, " ")
    .replace(/[「」『』（）()【】[\].,]/g, " ");

  const chunks = normalized
    .split(/\s+|という|として|あと|ため|を|が|は|に|へ|で|と|も|の|な|だ|だが|けれど|そして|でも/)
    .map((word) => word.trim())
    .filter(Boolean);

  const keywords = chunks
    .map((word) => word.replace(/^[0-9０-９]+|[0-9０-９]+$/g, ""))
    .filter((word) => word.length >= 2)
    .filter((word) => !STOP_WORDS.has(word))
    .sort((a, b) => b.length - a.length);

  return Array.from(new Set(keywords)).slice(0, 8);
}
