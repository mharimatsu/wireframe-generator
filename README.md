# Figmaデザインシステム → ワイヤーフレーム自動生成システム

Figma Dev Mode MCPから取得したデザインシステムコンポーネントを活用して、テキストベースの構成案からワイヤーフレームを自動生成するシステムです。

## 🎯 システム概要

このシステムは、生成AIに精通したフロントエンドエンジニアが構築した、Figmaのデザインシステムコンポーネントとテキストベースの構成案を組み合わせてワイヤーフレームを自動生成するツールです。

### 主な特徴

- **Figma連携**: Figma Dev Mode MCPを使用してデザイン情報を正確に取得
- **自動変換**: テキストベースの構成案を解析してHTMLワイヤーフレームに変換
- **条件分岐制御**: 各コンポーネントの要素表示/非表示を柔軟に制御
- **動的コンテンツ**: リスト・テーブルなどの動的要素生成に対応
- **デザインシステム準拠**: Figmaの正式な命名規則とデザイントークンに準拠
- **保守性重視**: BEM方式とCSS Custom Propertiesを使用した拡張可能な設計

## 📁 ファイル構成

```
design-system03/
├── components/
│   └── components.html               # Figmaコンポーネントライブラリ
├── styles/
│   └── components.css                # 統一されたCSSスタイル
├── js/
│   └── wireframe-generator.js        # ワイヤーフレーム自動生成エンジン
├── wireframe-demo.html               # デモ・使用例ページ
├── README.md                         # このファイル
├── IMPROVEMENTS.md                   # 機能改善項目リスト
├── IMPROVEMENTS_DETAIL.md            # 機能改善項目詳細仕様書
├── COMPONENT_MAPPING_RULES.md        # コンポーネントマッピングルール
└── AI_MAPPING_PROMPT.md              # AIマッピングプロンプト
```

## 🚀 使用方法

### 1. コンポーネントライブラリの確認

`components/components.html` でFigmaから取得した全コンポーネントを確認できます。

### 2. デモの実行

`wireframe-demo.html` をブラウザで開いて、実際にワイヤーフレーム生成を体験できます。

### 3. テキスト入力例

#### 基本的な使用例
```
ヘッダー: 企業サイト
  タイトル: 株式会社サンプル

メインビジュアル: 企業紹介
  タイトル: 革新的なソリューション
  英語: Innovative Solutions
  説明: 最新技術でビジネスを支援
  CTA: サービスを見る

メイン:
  アンダーライン見出し: 私たちのサービス

  カード: Webサイト制作
    説明: 企業サイトからECサイトまで幅広く対応
    リスト: 高品質, 迅速対応, アフターサポート
    ボタン: 詳細を見る

  カード: システム開発
    説明: 業務効率化のためのシステム開発
  ナビゲーション: メニュー
    項目: 会社概要, サービス, 実績, お問い合わせ

  テキストカード: 特徴紹介
    説明: サービスの特徴をご紹介します
    項目: 安心サポート, 迅速対応, 低価格, 高品質

  フルボーダーテーブル: 料金表
    ヘッダー: プラン, 価格, 特徴, サポート
    行: ベーシック, 1000円, 基本機能, メール
    行: プレミアム, 2000円, 全機能, 電話・メール

フッター:
  テーブル: 会社情報
```

#### 条件分岐機能の使用例
```
メインビジュアル: シンプルヒーロー
  タイトル: 企業名
  英語: COMPANY NAME
  説明なし
  CTAなし

カード: ミニマルカード
  タイトル: サービス名
  説明: 簡潔な説明文
  タグなし
  ボタンなし

テキストカード: タイトルのみ
  説明なし
  項目: 項目1, 項目2, 項目3
```

## 🎨 利用可能なコンポーネント

### Header Components
- **c-hgroup**: メインヘッダー（英語サブテキスト + 日本語タイトル）
- **c-heading**: サイズ別見出し（x2l〜x6l）
- **c-underline-duotone-head**: 装飾アンダーライン付き見出し（42px）
- **c-mark-head**: ダイヤモンドマーカー付き見出し（26px）

### Button Components
- **c-subtext-btn**: サブテキスト付きボタン（アイコン + メインテキスト + サブテキスト + 矢印）
- **c-round-ghost-btn**: ラウンドゴーストボタン（デフォルト、反転、アイコン小の3パターン）

### Card Components
- **c-card**: 標準カード（画像 + タグ + タイトル + 説明 + リスト + アクションボタン）✨条件分岐対応
- **c-info-card**: インフォメーションカード（アバター + タイトル + 説明 + リンクボタン）
- **c-summary-card**: サマリーカード（カテゴリー + 見出し + 説明 + ボタン付き）
- **c-text-card**: テキストカード（ヘッダー + 説明文 + ハイライトリスト）✨条件分岐対応

### Navigation Components
- **c-anchor-buttons**: アンカーボタンナビゲーション（2行×4列のボタングリッド）
- **c-localav**: ローカルナビゲーション（回遊リンクボタン3×2グリッド）

### Table Components
- **c-description-table**: 2カラム説明テーブル（見出し + 内容 + オプションアクション）
- **c-fullborder-table**: 動的カラム数対応フルボーダーテーブル ✨新機能

### Layout Components
- **c-mainvisual**: メインビジュアル（英語 + タイトル + 説明 + CTA）✨条件分岐対応
- **c-set-half**: テキストコンテンツ + 画像（50:50レイアウト）
- **c-set-vertical**: 縦配置のテキスト + 複数画像レイアウト
- **c-overlap-set**: 背景画像にテキストが重なるレイアウト

### List Components
- **c-disc-list**: 箇条書きリスト
- **c-decimal-list**: 番号付きリスト

### FAQ & Step Components
- **c-framed-faq**: フレーム付きFAQコンポーネント（アコーディオン型）
- **c-vertical-step**: 縦型ステップインジケータ（番号付きフロー）
- **c-info-step**: テキストコンテンツ + 画像の情報ステップレイアウト

## 🎨 デザイントークン

Figmaから取得したデザイン変数：

```css
:root {
  /* Font Families */
  --ds-font-family-roboto: 'Roboto', sans-serif;
  --ds-font-family-noto-sans-jp: 'Noto Sans JP', sans-serif;

  /* Font Sizes */
  --ds-font-size-x2s: 14px;
  --ds-font-size-sm: 16px;
  --ds-font-size-md: 18px;
  --ds-font-size-xl: 22px;
  --ds-font-size-x8l: 42px;

  /* Colors */
  --ds-color-primary: #808080;     /* メインカラー */
  --ds-color-text: #333333;        /* テキストカラー */
  --ds-color-white: #FFFFFF;       /* 白 */
  --ds-color-background: #EEEEEE;  /* 背景 */
  --ds-color-border: #DDDDDD;      /* ボーダー */

  /* Spacing */
  --ds-space-x5s: 4px;
  --ds-space-x4s: 10px;
  --ds-space-x3s: 20px;
  --ds-space-x2s: 30px;
  --ds-space-25: 25px;
}
```

## 🔧 技術仕様

### フロントエンド
- **HTML**: セマンティックマークアップ
- **CSS**: BEM方式 + CSS Custom Properties
- **JavaScript**: ES6+ モジュラー設計

### 命名規則
- **CSS**: BEM (Block Element Modifier)
- **コンポーネント**: Figma正式命名規則準拠
- **変数**: CSS Custom Properties (`--ds-*`)

### 設計原則
- **保守性**: モジュラー設計で拡張しやすい構造
- **一貫性**: Figmaデザインシステムと完全同期
- **アクセシビリティ**: セマンティックなHTML構造
- **レスポンシブ**: モバイルファーストアプローチ

## 🚀 ワイヤーフレーム生成機能

### WireframeGenerator クラス

テキストベースの構成案を解析してHTMLワイヤーフレームを生成する JavaScript クラス。

#### 主要メソッド

- `generateWireframe(textInput)`: メイン生成メソッド
- `parseTextInput(textInput)`: テキスト解析
- `convertToHTML(structure)`: HTML変換
- `wrapInDocument(bodyHTML)`: 完全なHTMLドキュメント生成

#### 対応パターン

- **セクション**: ヘッダー、メイン、サイドバー、フッター
- **コンポーネント**: 上記Figmaコンポーネント全種類
- **レイアウト**: 2カラム、3カラム、グリッド

## 📖 使用例

### 基本的な使用方法

```javascript
const generator = new WireframeGenerator();
const wireframe = generator.generateWireframe(`
ヘッダー: サイトタイトル
メイン:
  見出し: ページタイトル
  カード: コンテンツ説明
フッター: フッター情報
`);
```

### 詳細な構成指定

```javascript
const detailedWireframe = generator.generateWireframe(`
ヘッダー: 企業サイト
  タイトル: 株式会社サンプル

メイン:
  見出し: サービス紹介
  カード: Webサイト制作
    説明: 企業サイトからECサイトまで対応
    画像: service1.jpg
  ナビゲーション: メインメニュー
    項目: 会社概要, サービス, 実績, お問い合わせ

フッター:
  テーブル: 会社情報
`);
```

## 🎯 システムの利点

1. **効率性**: テキストから自動でワイヤーフレーム生成
2. **一貫性**: Figmaデザインシステムとの完全同期
3. **拡張性**: 新しいコンポーネントを簡単に追加可能
4. **保守性**: BEM + CSS Custom Propertiesで管理しやすい
5. **再利用性**: コンポーネントライブラリとして活用可能

## 📋 機能改善・拡張

システムを活用する中で発見された機能改善項目は [IMPROVEMENTS.md](./IMPROVEMENTS.md) で管理しています。

### 主な改善予定項目

- [ ] より複雑なレイアウトパターンの対応
- [ ] インタラクティブ要素の追加
- [ ] アニメーション/トランジションの実装
- [ ] より詳細なコンポーネントバリエーション
- [ ] JSON形式での構成データエクスポート
- [ ] 他のデザインツール（Sketch、Adobe XD）との連携

詳細は [IMPROVEMENTS.md](./IMPROVEMENTS.md) をご覧ください。

## 🔗 関連技術

- **Figma Dev Mode MCP**: デザイン情報取得
- **BEM**: CSS命名規則
- **CSS Custom Properties**: デザイントークン管理
- **ES6+ JavaScript**: モジュラー設計
- **Semantic HTML**: アクセシブルなマークアップ

---

このシステムにより、デザイナーとエンジニアの協業が効率化され、一貫性のあるワイヤーフレーム作成が可能になります。