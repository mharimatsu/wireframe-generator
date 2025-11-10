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

## 🔗 関連ドキュメント
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - 改善項目リスト
- [README.md](./README.md) - プロジェクト概要
- [COMPONENT_MAPPING_RULES.md](./COMPONENT_MAPPING_RULES.md) - コンポーネントルール

**最終更新日**: 2025-11-10
