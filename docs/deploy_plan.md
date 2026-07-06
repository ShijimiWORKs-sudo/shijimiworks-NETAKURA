# デプロイ計画

## 商品名

正式名称は `NETAKURA`。
通常UIではロゴ画像のみでブランド表示し、ロゴ以外の `NETAKURA` テキストは表示しない。
README、docs、法務ページ本文、metadata、内部識別子では必要に応じて正式名称を使用する。
カタカナ表記、読み補足、旧名称は使用しない。

## GitHub

リポジトリ:

```text
https://github.com/ShijimiWORKs-sudo/shijimiworks-NETAKURA.git
```

反映手順:

```bash
git status
git branch
git remote -v
git branch -M main
npm run typecheck
npm run build
git add .
git commit -m "Remove NETAKURA text from UI and keep logo-only branding"
git push -u origin main
```

## Vercel

GitHub push 後、Vercel 側で自動デプロイが開始される想定。

このローカル環境では Vercel CLI が未インストールのため、デプロイ確認はVercelダッシュボードで行う。

確認項目:

- Build が成功する
- 公開URLでトップページが表示される
- 通常UIではロゴ以外に `NETAKURA` テキストが表示されない
- 旧名称やカタカナ表記が表示されない
- ヘッダーはロゴ画像のみでブランド表示される
- ヒーローエリアのロゴが自然に表示される
- ロゴとテキストが重ならない
- フッターが `© 2026 ShijimiWORKS` になっている
- 背景色が淡いミントグレー基調で読みやすい
- スマホ幅で横スクロールしない
- 生成、保存、一覧、詳細、コピー、削除が動く
