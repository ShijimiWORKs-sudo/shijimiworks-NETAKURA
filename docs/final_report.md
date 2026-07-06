# NETAKURA MVP 最終報告

## 2026-07-06 表記統一・ロゴ修正

- 商品名を `NETAKURA` に統一
- ユーザー向け画面、metadata、README、docs、法務ページから旧名称と読み補足を削除
- カタカナ表記をユーザー向け表示から削除
- ヘッダーをロゴ + `NETAKURA` のみに変更
- ヒーローエリアに大きめのロゴを追加
- ロゴのaltを `NETAKURAロゴ` に変更
- 背景色を淡いミントグレー基調へ調整
- `/terms`、`/privacy`、`/disclaimer`、`/contact`、`/operator`、`/legal` を追加

## 2026-07-06 改善内容

- 映画ジャンル専用の生成ロジックを追加
- `OLDという絵映画` のような軽い誤字を `映画『OLD』` として扱う正規化を追加
- 映画ジャンルで、感想、考察、印象に残った場面、テーマ、登場人物、映像表現、note記事化、SNS投稿化を強化
- 不自然なキーワード差し込みを避けるため、映画ジャンルのnote構成は固定観点ベースへ変更
- 設定画面のポイント消費案を日本語表示に変更
- localStorageを主保存にしつつ、sessionStorageとCookieフォールバックを追加

## 1. 実装完了した内容

- ローカルで起動できる Next.js アプリを作成
- メモ入力、ジャンル選択、出力形式選択を実装
- 外部有料APIなしの疑似AI生成を実装
- 発信テーマ、読者の悩み、タイトル案、note構成、X投稿案、Threads投稿案、タグを生成
- 生成結果の保存、保存済み一覧、詳細表示、コピー、削除を実装
- 検索、ジャンルフィルター、Markdownコピーを追加
- 設定画面にローカルMVP状態、将来プラン案、ポイント消費案を表示
- README、朝の確認手順、設計ドキュメント、テスト報告を作成

## 2. 起動方法

```bash
cd C:\制作データ\10_App\netazouAI
npm install
npm run dev
```

通常は以下を開く。

```text
http://localhost:3000
```

`3000` が使用中の場合は、ターミナルに表示される `http://localhost:3001` などを開く。今回の確認環境では `3001` で起動した。

## 3. 使用技術

- Next.js 15.5.20
- React 19
- TypeScript
- lucide-react
- localStorage

## 4. 保存方式

ブラウザのlocalStorageを優先する。環境差でWeb Storageが不安定な場合に備え、sessionStorageとローカルNext.jsサーバー内のJSONファイルにも同期する。

- `netakura.savedIdeas`
- `netakura.usageStats`

## 5. 実装した画面一覧

- `/`: ダッシュボード
- `/new`: 新規作成
- `/saved`: 保存済み一覧
- `/saved/[id]`: 詳細
- `/settings`: 設定

## 6. 疑似AI生成ロジックの場所

- `src/lib/generator/extractKeywords.ts`
- `src/lib/generator/generateAll.ts`
- `src/lib/generator/normalizeMemo.ts`

## 7. テスト結果

- `npm install`: 成功
- `npm run typecheck`: 成功
- `npm run build`: 成功
- `npm run dev`: 成功
- ブラウザで映画ジャンルの生成、Markdownコピー、設定画面の日本語表示を確認
- ローカルAPI経由で保存、一覧取得、削除を確認
- 入力 `OLDという絵映画を感想として見たけど何を書けばいいかわからない` で期待文言を確認

## 8. 未実装機能

- ログイン
- 本物のAI API連携
- 課金
- Supabase
- Stripe
- Notion連携
- Buffer連携
- 本番公開

## 9. 既知の問題

- 生成品質はテンプレートベース
- 保存はlocalStorageが主で、sessionStorageとCookieはブラウザ環境差に備えた補助
- `npm audit` で Next.js 経由の PostCSS advisory が中程度として出る
- 作業環境では `3000` が別アプリで使用中だったため `3001` で確認
- ブラウザ自動操作が確認ダイアログ周辺でタイムアウトすることがあったため、削除の最終確認は同じローカルAPI経路でも検証

## 10. 次にやるべきこと

- 朝の確認手順に沿って実際に触り、生成結果の方向性を判断する
- 生成テンプレートを増やす
- 保存済みネタの編集、お気に入り、エクスポートを追加する
- 本物のAI API連携に進むか、先にUIを磨くか決める

## 11. 朝のユーザー確認手順

`docs/customer_test_plan.md` を見て、起動、生成、保存、詳細、コピー、削除、スマホ幅確認を行う。

## 12. 変更・作成した主なファイル一覧

- `README.md`
- `package.json`
- `src/app/page.tsx`
- `src/app/new/page.tsx`
- `src/app/saved/page.tsx`
- `src/app/saved/[id]/page.tsx`
- `src/app/settings/page.tsx`
- `src/app/globals.css`
- `src/components/*`
- `src/lib/types.ts`
- `src/lib/constants.ts`
- `src/lib/storage/index.ts`
- `src/lib/generator/*`
- `docs/*`

