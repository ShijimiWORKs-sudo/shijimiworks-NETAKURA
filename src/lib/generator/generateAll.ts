import type { GeneratedContent, Genre, OutputType } from "../types";
import { extractKeywords } from "./extractKeywords";
import { normalizeMemo } from "./normalizeMemo";

type Tone = {
  axis: string[];
  reader: string;
  benefit: string;
  phrase: string;
};

const TONES: Record<Genre, Tone> = {
  ai: {
    axis: ["仕組み化", "効率化", "自動化", "初心者向け", "活用法"],
    reader: "AI活用に興味はあるが、何から試せばいいか迷っている人",
    benefit: "小さな作業からAIに任せる視点",
    phrase: "AI活用を日常の作業に落とし込む",
  },
  side_business: {
    axis: ["収益化", "小さく始める", "継続", "失敗回避", "実践"],
    reader: "副業を始めたいが、時間やお金を無駄にしたくない人",
    benefit: "無理なく試せる最初の一歩",
    phrase: "小さく始めて続けられる副業の型にする",
  },
  movie: {
    axis: ["感想", "考察", "視点", "作品から得た気づき", "話したくなる切り口"],
    reader: "映画の感想をもっと言葉にしたい人",
    benefit: "見終わったあとに残った違和感や発見の言語化",
    phrase: "映画体験を感想と考察に変える",
  },
  diary: {
    axis: ["個人の気づき", "感情の整理", "共感", "生活の中の発見", "体験談"],
    reader: "日々の出来事を発信に変えたい人",
    benefit: "何気ない感情を読み手の共感に変える視点",
    phrase: "日記の断片を共感される発信にする",
  },
  work: {
    axis: ["働き方", "悩み", "改善", "チーム", "キャリア"],
    reader: "仕事の悩みや改善のヒントを探している人",
    benefit: "現場のモヤモヤを改善案に変える考え方",
    phrase: "仕事の違和感を改善ネタに変える",
  },
  life: {
    axis: ["暮らし", "習慣", "お金", "時間", "小さな改善"],
    reader: "暮らしを少しラクにしたい人",
    benefit: "生活の小さなストレスを整えるヒント",
    phrase: "暮らしの困りごとを改善アイデアに変える",
  },
  creative: {
    axis: ["物語", "キャラクター", "世界観", "アイデア", "プロット"],
    reader: "創作アイデアを形にしたい人",
    benefit: "断片的な発想を物語の芯にする方法",
    phrase: "創作の種をプロットに育てる",
  },
  other: {
    axis: ["気づき", "問題提起", "体験談", "整理", "次の行動"],
    reader: "同じ悩みや違和感を持つ人",
    benefit: "自分の体験を他者にも役立つ視点へ変えること",
    phrase: "メモの中の気づきを発信の形にする",
  },
};

function pickKeyword(keywords: string[], fallback: string, offset = 0) {
  return keywords[offset % Math.max(keywords.length, 1)] ?? fallback;
}

function sentenceFromMemo(memo: string) {
  return (
    memo
      .split(/[。！？!?\n]/)
      .map((line) => line.trim())
      .find((line) => line.length > 0)
      ?.slice(0, 72) ?? "まだ言葉になっていない悩み"
  );
}

function extractMovieTitle(memo: string) {
  const quoted = memo.match(/映画[『「]([^』」]{1,40})[』」]/);
  if (quoted?.[1]) {
    return quoted[1].trim();
  }

  const beforeMovie = memo.match(/([A-Za-z0-9][A-Za-z0-9\s:_-]{0,40})という映画/i);
  if (beforeMovie?.[1]) {
    return beforeMovie[1].trim();
  }

  return "";
}

function generateMovieContent(memo: string): GeneratedContent {
  const normalizedMemo = normalizeMemo(memo);
  const title = extractMovieTitle(normalizedMemo);
  const subject = title ? `映画『${title}』` : "映画";

  return {
    ideaThemes: [
      `${subject}を見たあと、感想を書くための切り口`,
      "ただ面白かったで終わらせない映画感想の作り方",
      "映画の感想をnote記事に変えるための3つの視点",
      `${subject}のテーマや登場人物から考察を広げる方法`,
    ],
    readerProblems: [
      "映画を見た直後は感情が残っているのに、文章にすると「面白かった」だけで止まってしまう",
      "印象に残った場面、登場人物、映像表現のどこから書き始めればいいか分からない",
      "自分の体験や価値観と作品のテーマをどうつなげればいいか迷っている",
      "note記事やSNS投稿にするときの切り口が見つからない",
    ],
    titleIdeas: [
      `${subject}を見たあとに考えた、感想を書くための切り口`,
      `ただ面白かったで終わらせない。${subject}の感想を言葉にする方法`,
      `${subject}の印象に残った場面から考える、テーマと登場人物の見方`,
      `映画感想をnote記事にするための3つの視点`,
      `${subject}をSNSで語るなら、どの場面から書き始めるか`,
    ],
    noteOutline: [
      `はじめに：${subject}を見た直後に残った感情を整理する`,
      "印象に残った場面：どのシーンが心に残ったのかを具体的に書く",
      `考察：登場人物の選択と作品のテーマを結びつける`,
      `映像表現：画面、音、テンポが感情にどう影響したかを見る`,
      `自分の体験との接続：なぜその場面が気になったのかを書く`,
      `まとめ：note記事やSNS投稿として読者に渡せる気づきにする`,
    ],
    xPosts: [
      `${subject}の感想を書くなら、まず「どの場面が残ったか」から始めると書きやすい。面白かった理由を、場面・人物・テーマに分けるだけで言葉になる。`,
      `映画感想は、結論よりも引っかかった場面が大事。${subject}で心に残った違和感を拾うと、考察の入口が見えてくる。`,
      `「面白かった」で止まるときは、映像表現、登場人物、自分の体験との接点を1つずつ書き出す。そこからnoteにもSNSにも展開できる。`,
    ],
    threadsPosts: [
      `${subject}の感想を書くとき、いきなりきれいな結論を出そうとすると止まりやすい。まずは印象に残った場面、登場人物の選択、映像表現のどれが一番心に残ったかを選ぶと、文章の入口が作れます。`,
      `映画を見たあとに「面白かった」しか出てこないときは、感想が浅いわけではなく、まだ分解できていないだけかもしれません。場面、テーマ、自分の体験との接続に分けると、note記事にできる材料が見えてきます。`,
      `${subject}をSNS投稿にするなら、全部を語ろうとしなくて大丈夫です。1つの場面、1人の登場人物、1つの違和感に絞ると、短い投稿でも読み手に届きやすくなります。`,
    ],
    tags: Array.from(
      new Set([
        ...(title ? [title] : []),
        "映画感想",
        "映画考察",
        "note記事化",
        "SNS投稿化",
        "印象に残った場面",
        "テーマ",
        "登場人物",
        "映像表現",
      ]),
    ).slice(0, 8),
  };
}

export function generateAll(
  memo: string,
  genre: Genre,
  outputType: OutputType = "all",
): GeneratedContent {
  const normalizedMemo = normalizeMemo(memo);

  if (genre === "movie") {
    const movieGenerated = generateMovieContent(normalizedMemo);

    if (outputType === "all") {
      return movieGenerated;
    }

    return {
      ideaThemes: outputType === "idea" ? movieGenerated.ideaThemes : [],
      readerProblems: outputType === "idea" ? movieGenerated.readerProblems : [],
      titleIdeas: outputType === "titles" ? movieGenerated.titleIdeas : [],
      noteOutline: outputType === "note_outline" ? movieGenerated.noteOutline : [],
      xPosts: outputType === "x_posts" ? movieGenerated.xPosts : [],
      threadsPosts: outputType === "threads_posts" ? movieGenerated.threadsPosts : [],
      tags: movieGenerated.tags,
    };
  }

  const keywords = extractKeywords(normalizedMemo);
  const tone = TONES[genre];
  const seed = sentenceFromMemo(normalizedMemo);
  const main = pickKeyword(keywords, tone.axis[0]);
  const sub = pickKeyword(keywords, tone.axis[1], 1);
  const third = pickKeyword(keywords, tone.axis[2], 2);

  const ideaThemes = [
    `${main}で悩む人が最初に見直すべきこと`,
    `${sub}を発信ネタに変えるための3つの視点`,
    `${tone.phrase}ためのメモ整理術`,
    `${third}を「ただの悩み」で終わらせない考え方`,
  ];

  const readerProblems = [
    `${seed}と感じているが、次の行動に落とし込めない`,
    `${main}について話したいのに、切り口が見つからない`,
    `自分の体験が人に役立つ内容なのか判断できない`,
    `${tone.reader}が、具体例を探している`,
  ];

  const titleIdeas = [
    `${main}で止まる人へ。足りないのは才能ではなく「型」かもしれない`,
    `${sub}を続けたいなら、まずメモの残し方を変えてみる`,
    `${seed}から始める、発信ネタの作り方`,
    `${tone.benefit}。今日のメモを記事に変える手順`,
    `${third}に悩んだ日に読みたい、ネタ化の考え方`,
  ];

  const noteOutline = [
    `はじめに：${seed}という悩みが起きる理由`,
    `読者が共感しやすいポイントを${main}から見つける`,
    `${sub}を発信テーマに変える分解法`,
    `${tone.axis.slice(0, 3).join("・")}の視点で具体例を作る`,
    `まとめ：${tone.benefit}を次の投稿に活かす`,
  ];

  const xPosts = [
    `${main}で詰まるとき、必要なのは気合いより「切り口」です。悩み、体験、気づきに分けるだけで投稿の形が見えてきます。`,
    `${seed}。この一文だけでも、同じ悩みを持つ人に届く発信ネタになります。`,
    `${sub}を続けるコツは、完成文をいきなり書かないこと。まずはメモを読者の悩みに翻訳する。`,
  ];

  const threadsPosts = [
    `${seed}。こういうメモは、そのままだと個人的な悩みに見えるけれど、少し分解すると発信ネタになります。大事なのは、誰が同じことで困っているかを先に決めること。`,
    `${main}の話を書くなら、最初から完璧な記事にしなくて大丈夫です。悩み、失敗、気づき、次に試したことの順に並べるだけで、読み手が追いやすい流れになります。`,
    `${tone.phrase}には、日々のメモがかなり役立ちます。何気ない違和感を残しておくと、あとでタイトル、note構成、SNS投稿に分けて再利用できます。`,
  ];

  const tags = Array.from(new Set([...keywords.slice(0, 5), ...tone.axis.slice(0, 3)])).slice(0, 8);

  const generated: GeneratedContent = {
    ideaThemes,
    readerProblems,
    titleIdeas,
    noteOutline,
    xPosts,
    threadsPosts,
    tags,
  };

  if (outputType === "all") {
    return generated;
  }

  return {
    ideaThemes: outputType === "idea" ? generated.ideaThemes : [],
    readerProblems: outputType === "idea" ? generated.readerProblems : [],
    titleIdeas: outputType === "titles" ? generated.titleIdeas : [],
    noteOutline: outputType === "note_outline" ? generated.noteOutline : [],
    xPosts: outputType === "x_posts" ? generated.xPosts : [],
    threadsPosts: outputType === "threads_posts" ? generated.threadsPosts : [],
    tags: generated.tags,
  };
}
