"use client";

import Link from "next/link";
import { Archive, Home, Plus, Settings } from "lucide-react";

export function AppHeader() {
  return (
    <header className="app-header">
      <Link className="brand" href="/" aria-label="ホーム">
        <span className="brand-mark">
          <img src="/images/logo001_02.png" alt="サービスロゴ" />
        </span>
      </Link>
      <nav className="header-nav" aria-label="メインメニュー">
        <Link href="/" title="ホーム">
          <Home size={18} />
          <span>ホーム</span>
        </Link>
        <Link href="/new" title="新規作成">
          <Plus size={18} />
          <span>作成</span>
        </Link>
        <Link href="/saved" title="保存済み">
          <Archive size={18} />
          <span>保存</span>
        </Link>
        <Link href="/settings" title="設定">
          <Settings size={18} />
          <span>設定</span>
        </Link>
      </nav>
    </header>
  );
}
