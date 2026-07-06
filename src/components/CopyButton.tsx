"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

export function CopyButton({ text, label = "コピー" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button type="button" variant="secondary" onClick={copy} disabled={!text}>
      <Copy size={16} />
      {copied ? "コピーしました" : label}
    </Button>
  );
}
