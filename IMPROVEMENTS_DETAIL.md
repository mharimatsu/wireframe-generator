# 機能改善項目 詳細仕様書

> **このドキュメントについて**
> IMPROVEMENTS.md で管理している改善項目の詳細な技術仕様、実装計画、既存実装状況を記録します。

---

## IMP-005: より詳細なコンポーネントバリエーション

### 📋 基本情報
- **優先度**: Medium
- **ステータス**: 🟡 部分実装済み
- **カテゴリ**: コンポーネント

### 🎯 目的
コンポーネントの使用シーンを拡大し、デザインの柔軟性を向上させる。

### ✅ 既存実装状況

#### **サイズバリエーション（実装済み）**

| コンポーネント | バリエーション | ファイル位置 | フォントサイズ |
|--------------|-------------|------------|--------------|
| c-heading | --x2l | components.css:344 | 20px |
| c-heading | --x3l | components.css:349 | 24px |
| c-heading | --x4l | components.css:354 | 28px |
| c-heading | --x5l | components.css:359 | 32px |
| c-heading | --x6l | components.css:364 | 36px |
| c-text-btn | --small | components.css:1416 | - |
| c-mainvisual | --01 | components.css:142 | - |

**実装パターン**:
```css
/* BEM Modifier方式 */
.c-heading--x2l { font-size: 20px; }
.c-heading--x3l { font-size: 24px; }
.c-heading--x4l { font-size: 28px; }
```

### 🔴 未実装機能

#### 1. カラーバリエーション
現状、カラーバリエーションは**未実装**

**必要なバリエーション**:
```css
/* Primary（現在のデフォルト） */
.c-round-ghost-btn--primary {
  border-color: var(--ds-color-primary);
  color: var(--ds-color-primary);
}

/* Secondary */
.c-round-ghost-btn--secondary {
  border-color: var(--ds-color-text);
  color: var(--ds-color-text);
}

/* Accent */
.c-round-ghost-btn--accent {
  border-color: #E63946;
  color: #E63946;
}

/* Success */
.c-round-ghost-btn--success {
  border-color: #06D6A0;
  color: #06D6A0;
}

/* Danger */
.c-round-ghost-btn--danger {
  border-color: #EF476F;
  color: #EF476F;
}
```

#### 2. スタイルバリエーション

**ボタンのバリエーション**:
```css
/* Outlined（現在のゴーストボタン） */
.c-btn--outlined { }

/* Filled（塗りつぶし） */
.c-btn--filled {
  background: var(--ds-color-primary);
  color: var(--ds-color-white);
  border: none;
}

/* Text（テキストのみ） */
.c-btn--text {
  background: none;
  border: none;
  color: var(--ds-color-primary);
}
```

**カードのバリエーション**:
```css
/* Elevated（影付き） */
.c-card--elevated {
  box-shadow: var(--ds-shadow-md);
}

/* Outlined（枠線のみ） */
.c-card--outlined {
  border: 1px solid var(--ds-color-border);
  box-shadow: none;
}

/* Filled（塗りつぶし） */
.c-card--filled {
  background: var(--ds-color-background);
  border: none;
}
```

#### 3. サイズバリエーション拡張

**統一されたサイズシステムが必要**:
```css
/* Small */
.c-btn--small {
  padding: 8px 16px;
  font-size: 14px;
}

/* Medium（デフォルト） */
.c-btn--medium {
  padding: 12px 24px;
  font-size: 16px;
}

/* Large */
.c-btn--large {
  padding: 16px 32px;
  font-size: 18px;
}
```

### 📝 実装計画

#### Phase 1: カラーシステムの確立
1. **CSS Custom Propertiesの拡張**
   ```css
   :root {
     /* 既存 */
     --ds-color-primary: #808080;
     --ds-color-text: #333333;

     /* 新規追加 */
     --ds-color-secondary: #5A5A5A;
     --ds-color-accent: #E63946;
     --ds-color-success: #06D6A0;
     --ds-color-warning: #FFB703;
     --ds-color-danger: #EF476F;
     --ds-color-info: #118AB2;
   }
   ```

2. **主要コンポーネントへのカラーバリエーション適用**
   - ボタン系（c-round-ghost-btn, c-subtext-btn）
   - カード系（c-card, c-info-card）
   - ナビゲーション系（c-anchor-buttons）

#### Phase 2: サイズシステムの統一
```css
:root {
  /* Size Scale */
  --ds-size-xs: 0.75rem;  /* 12px */
  --ds-size-sm: 0.875rem; /* 14px */
  --ds-size-md: 1rem;     /* 16px */
  --ds-size-lg: 1.125rem; /* 18px */
  --ds-size-xl: 1.25rem;  /* 20px */
  --ds-size-2xl: 1.5rem;  /* 24px */
}
```

#### Phase 3: スタイルバリエーションの実装
- Outlined / Filled / Text の3パターン
- 主要コンポーネントへの適用

### 📊 影響範囲

#### **追加が必要なCSS**
- カラーバリエーション: 約200行
- サイズバリエーション: 約150行
- スタイルバリエーション: 約250行
- **合計**: 約600行

#### **対象コンポーネント（優先度順）**
1. **High**: c-round-ghost-btn, c-subtext-btn
2. **Medium**: c-card, c-info-card, c-summary-card
3. **Low**: c-anchor-btn, c-localav

### 🧪 テスト項目
- [ ] 各バリエーションの視覚的確認
- [ ] デザイントークンとの一貫性確認
- [ ] バリエーション組み合わせの動作確認
- [ ] アクセシビリティ（コントラスト比）の確認

### 📝 実装優先順位

#### **優先度1: ボタンのカラーバリエーション**
理由: 最も使用頻度が高く、影響範囲が大きい

#### **優先度2: カードのスタイルバリエーション**
理由: レイアウトの多様性を実現

#### **優先度3: サイズシステムの統一**
理由: 長期的な保守性向上

---

## 📊 総合実装計画

### タイムライン（推定）

| Phase | 期間 | 内容 | 工数 |
|-------|------|------|------|
| Phase 1 | Week 1-2 | カラーシステムの確立 | 20h |
| Phase 2 | Week 3-4 | サイズシステムの統一 | 16h |
| Phase 3 | Week 5-6 | スタイルバリエーション実装 | 16h |
| Phase 4 | Week 7 | 統合テスト・ドキュメント更新 | 8h |

**合計工数**: 約60時間（約2ヶ月）

### 技術的考慮事項
- **ブラウザ互換性**: Chrome 90+, Firefox 88+, Safari 14+
- **アクセシビリティ**: コントラスト比4.5:1以上を維持
- **保守性**: BEM命名規則に準拠

---

---

## IMP-007: JSON形式での構成データエクスポート

### 📋 基本情報
- **優先度**: Low
- **ステータス**: 🔴 未実装
- **カテゴリ**: データ連携

### 🎯 目的
テキストベースの構成案を構造化JSONデータとしてエクスポートし、API連携やデータ永続化を可能にする。

### ✅ 既存実装状況

#### **内部データ構造（parseTextInput の出力）**

現在、`parseTextInput()` メソッドが以下の構造化データを生成しています：

```javascript
// wireframe-generator.js:1089-1117
parseTextInput(textInput) {
  const structure = [];
  let currentSection = null;

  // セクションとコンポーネントを解析
  currentSection = {
    type: 'section',
    name: 'ヘッダー',
    components: [...]
  };
  structure.push(currentSection);

  return structure; // ← このデータ構造をJSONとしてエクスポート可能
}
```

**内部データ構造の例**:
```json
[
  {
    "type": "section",
    "name": "ヘッダー",
    "components": [
      {
        "type": "header",
        "component": "c-hgroup",
        "name": "ヘッダー",
        "data": {
          "title": "株式会社サンプル",
          "english": "Sample Company"
        }
      }
    ]
  },
  {
    "type": "section",
    "name": "メイン",
    "components": [
      {
        "type": "card",
        "component": "c-card",
        "name": "カード",
        "data": {
          "title": "サービス1",
          "description": "サービスの説明",
          "list": ["高品質", "迅速対応"],
          "noTags": false,
          "noButton": false
        }
      }
    ]
  }
]
```

### 🔴 未実装機能

#### 1. JSONエクスポート機能
```javascript
/**
 * 構造化データをJSON形式でエクスポート
 * @param {string} textInput - テキストベースの構成案
 * @returns {Object} - JSON形式の構造化データ
 */
exportToJSON(textInput) {
  const structure = this.parseTextInput(textInput);

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    metadata: {
      componentsCount: this.countComponents(structure),
      sectionsCount: structure.length
    },
    structure: structure
  };
}

/**
 * JSONをファイルとしてダウンロード
 * @param {Object} jsonData - JSONデータ
 * @param {string} filename - ファイル名
 */
downloadJSON(jsonData, filename = 'wireframe-structure.json') {
  const blob = new Blob(
    [JSON.stringify(jsonData, null, 2)],
    { type: 'application/json' }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
```

#### 2. JSONインポート機能
```javascript
/**
 * JSON形式の構造データからワイヤーフレームを生成
 * @param {Object} jsonData - JSON構造データ
 * @returns {string} - 生成されたHTML
 */
generateFromJSON(jsonData) {
  if (!this.validateJSON(jsonData)) {
    throw new Error('Invalid JSON structure');
  }

  const html = this.convertToHTML(jsonData.structure);
  return this.wrapInDocument(html);
}

/**
 * JSONデータのバリデーション
 * @param {Object} jsonData - 検証するJSONデータ
 * @returns {boolean} - 妥当性
 */
validateJSON(jsonData) {
  return jsonData.version &&
         jsonData.structure &&
         Array.isArray(jsonData.structure);
}
```

#### 3. JSONスキーマ定義
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Wireframe Structure",
  "type": "object",
  "required": ["version", "structure"],
  "properties": {
    "version": {
      "type": "string",
      "description": "スキーマバージョン"
    },
    "generatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "componentsCount": { "type": "number" },
        "sectionsCount": { "type": "number" }
      }
    },
    "structure": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string" },
          "name": { "type": "string" },
          "components": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "type": { "type": "string" },
                "component": { "type": "string" },
                "name": { "type": "string" },
                "data": { "type": "object" }
              }
            }
          }
        }
      }
    }
  }
}
```

### 📝 実装計画

#### Phase 1: エクスポート機能の実装
1. **exportToJSON()メソッドの追加**
   - 既存のparseTextInput()を活用
   - メタデータの付加
   - バージョン管理機能

2. **downloadJSON()メソッドの追加**
   - Blob APIを使用したダウンロード機能
   - ファイル名のカスタマイズ

3. **UI統合**
   - デモページにエクスポートボタンを追加
   - JSONプレビュー機能

#### Phase 2: インポート機能の実装
1. **generateFromJSON()メソッドの追加**
2. **validateJSON()メソッドの追加**
3. **JSONファイルアップロード機能**

#### Phase 3: API連携
1. **REST API エンドポイントの設計**
   ```
   POST /api/wireframe/export
   POST /api/wireframe/import
   GET  /api/wireframe/{id}
   ```

2. **データベース連携**（オプション）

### 📊 影響範囲

#### **追加が必要なコード**
- `js/wireframe-generator.js`: 約150行
- `wireframe-demo.html`: 約50行（UI追加）
- `schemas/wireframe-schema.json`: 新規ファイル

#### **対象メソッド**
1. `exportToJSON()` - エクスポート
2. `downloadJSON()` - ダウンロード
3. `generateFromJSON()` - インポート
4. `validateJSON()` - バリデーション

### 🧪 テスト項目
- [ ] テキスト → JSON変換の正確性
- [ ] JSON → HTML変換の正確性
- [ ] JSONスキーマバリデーション
- [ ] ファイルダウンロード機能
- [ ] 大規模データの処理性能

### 💡 ユースケース

#### **ケース1: データの永続化**
```javascript
// エクスポート
const jsonData = generator.exportToJSON(textInput);
localStorage.setItem('wireframe', JSON.stringify(jsonData));

// インポート
const saved = JSON.parse(localStorage.getItem('wireframe'));
const html = generator.generateFromJSON(saved);
```

#### **ケース2: API連携**
```javascript
// サーバーに保存
const jsonData = generator.exportToJSON(textInput);
await fetch('/api/wireframe', {
  method: 'POST',
  body: JSON.stringify(jsonData),
  headers: { 'Content-Type': 'application/json' }
});
```

#### **ケース3: バージョン管理**
```javascript
// 複数バージョンの保存
const v1 = generator.exportToJSON(textInput_v1);
const v2 = generator.exportToJSON(textInput_v2);
// 差分比較が可能
```

---

## IMP-008: 他デザインツールとの連携（Sketch、Adobe XD）

### 📋 基本情報
- **優先度**: Low
- **ステータス**: 🔴 未実装
- **カテゴリ**: データ連携

### 🎯 目的
Figma以外のデザインツール（Sketch、Adobe XD）からもコンポーネント情報を取得し、デザイントークンを相互変換可能にする。

### ✅ 既存実装状況

#### **現在のFigma依存箇所**

現在は **Figma Dev Mode MCP** から取得したコンポーネント情報のみに対応：

```css
/* styles/components.css - Figmaデザイントークン */
:root {
  --ds-font-family-roboto: 'Roboto', sans-serif;
  --ds-font-family-noto-sans-jp: 'Noto Sans JP', sans-serif;
  --ds-color-primary: #808080;
  --ds-color-text: #333333;
  /* ... Figma固有の値 */
}
```

**依存度**:
- コンポーネント命名: Figma規則に準拠（c-hgroup, c-card等）
- デザイントークン: Figma変数から取得
- コンポーネント構造: FigmaのAuto Layoutに基づく

### 🔴 未実装機能

#### 1. デザイントークン変換システム

**Design Tokens Format仕様への準拠**
```json
{
  "color": {
    "primary": {
      "value": "#808080",
      "type": "color"
    }
  },
  "font": {
    "family": {
      "sans": {
        "value": "Noto Sans JP, sans-serif",
        "type": "fontFamily"
      }
    }
  },
  "spacing": {
    "small": {
      "value": "4px",
      "type": "dimension"
    }
  }
}
```

**変換マッピング**:
```javascript
const tokenConverters = {
  figma: {
    import: (figmaTokens) => standardTokens,
    export: (standardTokens) => figmaTokens
  },
  sketch: {
    import: (sketchTokens) => standardTokens,
    export: (standardTokens) => sketchTokens
  },
  adobeXd: {
    import: (xdTokens) => standardTokens,
    export: (standardTokens) => xdTokens
  }
};
```

#### 2. Sketch連携

**Sketch APIの活用**:
```javascript
// Sketchプラグインでの実装例
class SketchConnector {
  /**
   * Sketchドキュメントからコンポーネントを抽出
   */
  extractComponents(sketchDocument) {
    const symbols = sketchDocument.getSymbols();
    return symbols.map(symbol => ({
      name: symbol.name,
      layers: this.parseLayers(symbol.layers),
      styles: this.extractStyles(symbol)
    }));
  }

  /**
   * Sketchのテキストスタイルを取得
   */
  extractStyles(symbol) {
    return {
      colors: symbol.sharedStyles.colors,
      textStyles: symbol.sharedStyles.textStyles,
      layerStyles: symbol.sharedStyles.layerStyles
    };
  }
}
```

**Sketch → 共通フォーマット変換**:
```javascript
function convertSketchToStandard(sketchData) {
  return {
    components: sketchData.symbols.map(symbol => ({
      id: symbol.symbolID,
      name: normalizeComponentName(symbol.name),
      type: inferComponentType(symbol),
      properties: extractProperties(symbol)
    })),
    tokens: convertSketchTokens(sketchData.sharedStyles)
  };
}
```

#### 3. Adobe XD連携

**XD Plugin API**:
```javascript
class XDConnector {
  /**
   * XDドキュメントからコンポーネントを抽出
   */
  async extractComponents(selection, root) {
    const components = root.children.filter(
      node => node instanceof SymbolInstance
    );

    return components.map(component => ({
      name: component.symbolId,
      masterComponent: component.master,
      properties: this.getProperties(component)
    }));
  }

  /**
   * XDのカラーアセットを取得
   */
  getColorAssets() {
    const { assets } = require("assets");
    return assets.colors.get();
  }
}
```

#### 4. 統一インターフェース

```javascript
class DesignToolAdapter {
  constructor(toolType) {
    this.connector = this.createConnector(toolType);
  }

  createConnector(toolType) {
    switch(toolType) {
      case 'figma': return new FigmaConnector();
      case 'sketch': return new SketchConnector();
      case 'adobeXd': return new XDConnector();
      default: throw new Error('Unsupported tool');
    }
  }

  async getComponents() {
    const rawData = await this.connector.extractComponents();
    return this.normalizeComponents(rawData);
  }

  normalizeComponents(rawData) {
    // 各ツール固有のデータを共通フォーマットに変換
    return rawData.map(component => ({
      id: component.id,
      name: this.normalizeNaming(component.name),
      type: component.type,
      properties: component.properties
    }));
  }
}
```

### 📝 実装計画

#### Phase 1: 共通デザイントークン仕様の確立
1. **Design Tokens Format準拠のスキーマ作成**
2. **Figmaトークンの変換実装**
3. **CSS Custom Propertiesへの変換**

#### Phase 2: Sketch連携（優先度: Medium）
1. **Sketchプラグイン開発**
   - Symbol抽出機能
   - Shared Styles抽出機能
2. **変換ロジック実装**
3. **テスト・検証**

#### Phase 3: Adobe XD連携（優先度: Low）
1. **XDプラグイン開発**
2. **変換ロジック実装**
3. **テスト・検証**

#### Phase 4: 統一インターフェースの実装
1. **アダプターパターンの実装**
2. **ツール自動検出機能**
3. **UI統合**

### 📊 影響範囲

#### **新規ファイル**
```
design-tokens/
├── figma.tokens.json
├── sketch.tokens.json
├── adobexd.tokens.json
└── standard.tokens.json

plugins/
├── sketch/
│   └── wireframe-exporter.sketchplugin
└── adobexd/
    └── wireframe-exporter.xdx

converters/
├── token-converter.js
└── component-normalizer.js
```

#### **追加コード量**
- デザイントークン変換: 約300行
- Sketchプラグイン: 約500行
- Adobe XDプラグイン: 約500行
- 統一インターフェース: 約200行
- **合計**: 約1,500行

### 🧪 テスト項目
- [ ] Figma → 共通フォーマット変換
- [ ] Sketch → 共通フォーマット変換
- [ ] XD → 共通フォーマット変換
- [ ] デザイントークンの相互変換
- [ ] コンポーネント命名の正規化

### 🚧 技術的課題

#### **各ツールのAPI制限**
- **Sketch**: ローカルアプリケーション、プラグインAPI限定
- **Adobe XD**: クラウドAPI、プラグインAPI
- **Figma**: REST API、Dev Mode MCP（現在使用中）

#### **データ構造の違い**
- コンポーネント定義方法の差異
- レイヤー構造の違い
- 命名規則の相違

### 💡 代替案

**低優先度のため、以下の簡易実装も検討**:
1. **手動エクスポート方式**: 各ツールから手動でJSON出力
2. **Design Tokens Studioの活用**: サードパーティツール利用
3. **Figmaのみ対応**: 現状維持

---

## IMP-011: CI/CDパイプラインの構築

### 📋 基本情報
- **優先度**: Low
- **ステータス**: 🔴 未実装
- **カテゴリ**: 開発環境

### 🎯 目的
自動テスト、コード品質チェック、デプロイを自動化し、開発効率と品質を向上させる。

### ✅ 既存実装状況

#### **現在の開発環境**

- ❌ **package.json**: 存在しない
- ❌ **テストファイル**: 存在しない
- ❌ **.github/workflows**: 存在しない
- ❌ **Linter設定**: 存在しない
- ❌ **ビルドプロセス**: 存在しない

**現状**: 完全にマニュアル運用

### 🔴 未実装機能

#### 1. package.json の作成

```json
{
  "name": "wireframe-generator",
  "version": "1.0.0",
  "description": "Figmaデザインシステムからワイヤーフレームを自動生成",
  "main": "js/wireframe-generator.js",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint js/**/*.js",
    "lint:fix": "eslint js/**/*.js --fix",
    "format": "prettier --write \"**/*.{js,css,html,md}\"",
    "build": "npm run lint && npm run test",
    "deploy": "gh-pages -d ."
  },
  "devDependencies": {
    "@testing-library/dom": "^9.3.0",
    "eslint": "^8.50.0",
    "eslint-config-prettier": "^9.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "prettier": "^3.0.3",
    "gh-pages": "^6.0.0"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

#### 2. ユニットテストの実装

**テストファイル構成**:
```
tests/
├── wireframe-generator.test.js
├── parseTextInput.test.js
├── convertToHTML.test.js
└── components/
    ├── header.test.js
    ├── card.test.js
    └── navigation.test.js
```

**テスト例**:
```javascript
// tests/wireframe-generator.test.js
import WireframeGenerator from '../js/wireframe-generator.js';

describe('WireframeGenerator', () => {
  let generator;

  beforeEach(() => {
    generator = new WireframeGenerator();
  });

  describe('parseTextInput', () => {
    test('基本的なヘッダーを正しくパース', () => {
      const input = `ヘッダー: サイトタイトル
  タイトル: 株式会社サンプル`;

      const result = generator.parseTextInput(input);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('section');
      expect(result[0].name).toBe('ヘッダー');
      expect(result[0].components[0].data.title).toBe('株式会社サンプル');
    });

    test('複数セクションを正しくパース', () => {
      const input = `ヘッダー: タイトル
メイン:
  カード: サービス1`;

      const result = generator.parseTextInput(input);

      expect(result).toHaveLength(2);
    });

    test('条件分岐（説明なし）を正しく処理', () => {
      const input = `メインビジュアル: タイトル
  説明なし`;

      const result = generator.parseTextInput(input);

      expect(result[0].components[0].data.noDescription).toBe(true);
    });
  });

  describe('convertToHTML', () => {
    test('構造化データをHTMLに変換', () => {
      const structure = [{
        type: 'section',
        name: 'ヘッダー',
        components: []
      }];

      const html = generator.convertToHTML(structure);

      expect(html).toContain('<header');
      expect(html).toContain('</header>');
    });
  });

  describe('componentLibrary', () => {
    test('28種類のコンポーネントが定義されている', () => {
      const componentCount = Object.keys(generator.componentLibrary).length;
      expect(componentCount).toBe(28);
    });
  });
});
```

#### 3. ESLint設定

**.eslintrc.json**:
```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

#### 4. Prettier設定

**.prettierrc**:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

#### 5. GitHub Actions ワークフロー

**.github/workflows/ci.yml**:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint

    - name: Run tests
      run: npm run test:coverage

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: test

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20.x'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build
```

**.github/workflows/deploy.yml**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20.x'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Deploy to GitHub Pages
      run: npm run deploy
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 📝 実装計画

#### Phase 1: プロジェクト基盤整備（Week 1）
1. **package.json作成**
2. **npm依存関係のインストール**
3. **フォルダ構造の整理**

#### Phase 2: テスト環境構築（Week 2-3）
1. **Jestセットアップ**
2. **基本的なユニットテスト作成**
   - parseTextInput()
   - convertToHTML()
   - コンポーネントテンプレート
3. **カバレッジ目標: 80%**

#### Phase 3: Linter・Formatter導入（Week 4）
1. **ESLint設定**
2. **Prettier設定**
3. **既存コードのフォーマット修正**

#### Phase 4: CI/CD構築（Week 5-6）
1. **GitHub Actions ワークフロー作成**
2. **自動テスト実行**
3. **自動デプロイ設定**

### 📊 影響範囲

#### **新規ファイル**
```
wireframe-generator/
├── package.json
├── package-lock.json
├── .eslintrc.json
├── .prettierrc
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── tests/
│   ├── wireframe-generator.test.js
│   ├── parseTextInput.test.js
│   ├── convertToHTML.test.js
│   └── components/
│       ├── header.test.js
│       ├── card.test.js
│       └── navigation.test.js
└── coverage/  (自動生成)
```

#### **追加コード量**
- テストコード: 約800行
- 設定ファイル: 約200行
- ワークフロー: 約100行
- **合計**: 約1,100行

### 🧪 テストカバレッジ目標

| カテゴリ | 目標カバレッジ | 優先度 |
|---------|---------------|--------|
| parseTextInput | 90% | High |
| convertToHTML | 85% | High |
| extractComponentData | 80% | Medium |
| コンポーネントテンプレート | 75% | Medium |
| ユーティリティ関数 | 70% | Low |

### 💡 期待される効果

#### **開発効率向上**
- 自動テストにより、バグを早期発見
- リファクタリングが安全に実行可能
- コードレビューの負担軽減

#### **品質向上**
- 一貫したコードスタイル
- テストカバレッジの可視化
- 継続的な品質監視

#### **デプロイ自動化**
- mainブランチへのプッシュで自動デプロイ
- ロールバックが容易
- デプロイミスの削減

### 🚧 技術的課題

#### **ブラウザ環境のテスト**
- DOMに依存する部分のテスト
- jsdomの制限事項

**解決策**: Testing Libraryの活用

#### **既存コードのリファクタリング**
- テスタビリティの向上が必要
- 依存性の注入パターン導入

---

## 📊 IMP-007, IMP-008, IMP-011 総合実装計画

### タイムライン（推定）

| Phase | 期間 | 項目 | 内容 | 工数 |
|-------|------|------|------|------|
| Phase 1 | Week 1-2 | IMP-011 | プロジェクト基盤整備 | 16h |
| Phase 2 | Week 3-5 | IMP-011 | テスト環境構築 | 24h |
| Phase 3 | Week 6 | IMP-011 | Linter・Formatter導入 | 8h |
| Phase 4 | Week 7-8 | IMP-011 | CI/CD構築 | 16h |
| Phase 5 | Week 9-10 | IMP-007 | JSONエクスポート実装 | 20h |
| Phase 6 | Week 11-12 | IMP-007 | JSONインポート実装 | 16h |
| Phase 7 | Week 13-16 | IMP-008 | デザイントークン変換 | 32h |
| Phase 8 | Week 17-20 | IMP-008 | Sketch連携実装 | 40h |

**合計工数**: 約172時間（約5ヶ月）

### 優先順位付け

| 優先度 | 項目 | 理由 |
|--------|------|------|
| 1 | **IMP-011** (CI/CD) | 品質基盤として最優先 |
| 2 | **IMP-007** (JSON) | データ永続化に必要 |
| 3 | **IMP-008** (他ツール) | 使用頻度が低い |

### 依存関係
```
IMP-011 (CI/CD構築)
    ↓
IMP-007 (JSONエクスポート) ← テスト基盤が必要
    ↓
IMP-008 (他ツール連携) ← JSONフォーマットが必要
```

## 🔗 関連ドキュメント
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - 改善項目リスト
- [README.md](./README.md) - プロジェクト概要
- [COMPONENT_MAPPING_RULES.md](./COMPONENT_MAPPING_RULES.md) - コンポーネントルール

**最終更新日**: 2025-11-10
