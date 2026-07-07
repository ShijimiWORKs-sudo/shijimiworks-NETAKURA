import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "NETAKURA",
  description:
    "思いつきが、投稿の種に変わる。メモ・愚痴・日記・映画の感想・仕事の気づきを、note構成・X投稿・Threads投稿に変換する発信支援ツールです。",
};

const footerLinks = [
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/operator", label: "運営者情報" },
  { href: "/legal", label: "特商法表記" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <AppHeader />
        <main className="page-shell">{children}</main>
        <footer className="app-footer">
          <span>© 2026 ShijimiWORKS</span>
          <nav className="footer-links" aria-label="フッターリンク">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </body>
    </html>
  );
}
