export function normalizeMemo(memo: string): string {
  return memo
    .replace(/\u3000/g, " ")
    .replace(/絵映画|映映画|映画映画/g, "映画")
    .replace(/わからない|判らない/g, "分からない")
    .replace(/感想として見た/g, "見たあと、感想を書きたい")
    .replace(/([A-Za-z0-9][A-Za-z0-9\s:_-]{0,40})という映画/g, "映画『$1』")
    .replace(/\s+/g, " ")
    .trim();
}
