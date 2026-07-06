# デプロイ計画

## 商品名

正式名称は `NETAKURA`。
ユーザー向け画面、README、docs、法務ページ、metadata はこの表記に統一する。
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
git commit -m "Standardize product name as NETAKURA and update logo layout"
git push -u origin main
```

## Vercel

GitHub push 後、Vercel 側で自動デプロイが開始される想定。

このローカル環境では Vercel CLI が未インストールのため、デプロイ確認はVercelダッシュボードで行う。

確認項目:

- Build が成功する
- 公開URLでトップページが表示される
- 表記が `NETAKURA` に統一されている
- ヘッダーとヒーローエリアのロゴが自然に表示される
- ロゴとテキストが重ならない
- 背景色が淡いミントグレー基調で読みやすい
- スマホ幅で横スクロールしない
- 生成、保存、一覧、詳細、コピー、削除が動く
