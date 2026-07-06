import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "NETAKURA",
  description:
    "思いつきが、投稿の種に変わる。メモ・愚痴・日記・映画の感想・仕事の気づきを、note構成・X投稿・Threads投稿に変換する発信支援ツールです。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <AppHeader />
        <main className="page-shell">{children}</main>
        <footer className="app-footer">
          <span>© 2026 ShijimiWORKS</span>
        </footer>
      </body>
    </html>
  );
}
