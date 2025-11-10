# 機能改善項目 詳細仕様書

> **このドキュメントについて**
> IMPROVEMENTS.md で管理している改善項目の詳細な技術仕様、実装計画、既存実装状況を記録します。

---

## IMP-003: インタラクティブ要素の追加

### 📋 基本情報
- **優先度**: Medium
- **ステータス**: 🟡 部分実装済み
- **カテゴリ**: インタラクション

### 🎯 目的
ユーザー操作に対するフィードバックを強化し、より直感的で使いやすいUIを実現する。

### ✅ 既存実装状況

#### **実装済み（ホバーエフェクト）**

| コンポーネント | ファイル位置 | 実装内容 | transition時間 |
|--------------|------------|---------|----------------|
| c-subtext-btn | components.css:391 | 背景色・文字色変化 | 0.3s ease |
| c-round-ghost-btn | components.css:442 | 背景色・文字色変化 | 0.3s ease |
| c-text-btn | components.css:493 | 透明度変化 | 0.3s ease |
| c-anchor-btn | components.css:783 | 背景色・文字色変化 | 0.3s ease |
| c-text-link | components.css:864 | テキスト装飾変化 | - |
| c-localav__item | components.css:1988 | 背景色・スケール変化 | 0.2s ease |
| ds-navigation a | components.css:2818 | 背景色変化 | 0.2s |

**実装例**:
```css
.c-subtext-btn {
  transition: all 0.3s ease;
}

.c-subtext-btn:hover {
  background: var(--ds-color-text);
  color: var(--ds-color-white);
}
```

### 🔴 未実装機能

#### 1. クリックイベント
- **アコーディオン**: FAQ要素の開閉動作
  - 現状: HTML構造のみ存在（c-framed-faq）
  - 必要: JavaScript実装、aria-expanded属性の制御

- **タブ切り替え**: コンテンツ切り替え機能
  - 現状: 未実装
  - 必要: 新規コンポーネント作成

#### 2. スクロールアニメーション
- **フェードイン**: 画面に入った要素をフェードイン
- **スライドイン**: 画面に入った要素をスライド表示
- **技術**: Intersection Observer API

#### 3. フォーカス状態
- **キーボードナビゲーション対応**
- **フォーカス可視化**（:focus-visible）

### 📝 実装計画

#### Phase 1: クリックイベント（優先度: High）
```javascript
// FAQ アコーディオンの実装例
class FAQAccordion {
  constructor(element) {
    this.faq = element;
    this.question = this.faq.querySelector('.c-framed-faq__question');
    this.answer = this.faq.querySelector('.c-framed-faq__answer');
    this.init();
  }

  init() {
    this.question.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const isExpanded = this.faq.getAttribute('aria-expanded') === 'true';
    this.faq.setAttribute('aria-expanded', !isExpanded);
    this.answer.style.maxHeight = isExpanded ? '0' : `${this.answer.scrollHeight}px`;
  }
}
```

#### Phase 2: スクロールアニメーション（優先度: Medium）
```javascript
// Intersection Observer の実装例
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);
```

#### Phase 3: フォーカス状態（優先度: Low）
```css
.c-round-ghost-btn:focus-visible {
  outline: 2px solid var(--ds-color-primary);
  outline-offset: 2px;
}
```

### 📊 影響範囲
- **対象ファイル**:
  - `js/wireframe-generator.js` - イベントハンドラ追加
  - `styles/components.css` - アニメーションスタイル追加
  - `components/components.html` - ARIA属性追加

### 🧪 テスト項目
- [ ] ホバー時のスタイル変化
- [ ] クリックイベントの発火
- [ ] キーボード操作でのフォーカス移動
- [ ] スクロールアニメーションの発火タイミング

---

## IMP-004: アニメーション/トランジションの実装

### 📋 基本情報
- **優先度**: Medium
- **ステータス**: 🟡 部分実装済み
- **カテゴリ**: インタラクション

### 🎯 目的
状態変化をスムーズにし、視覚的なフィードバックを向上させる。

### ✅ 既存実装状況

#### **実装済み（CSS Transition）**

| 箇所 | プロパティ | 時間 | イージング | 用途 |
|-----|----------|-----|-----------|-----|
| ボタン全般 | all | 0.3s | ease | ホバー時の色変化 |
| ナビゲーション | all/background | 0.2s | ease | ホバー時の背景変化 |

**統計**:
- transition使用箇所: 12箇所
- 0.3s ease: 6箇所
- 0.2s ease: 6箇所

### 🔴 未実装機能

#### 1. CSS Animation (@keyframes)
現状、`@keyframes`を使用したアニメーションは**0件**

**必要なアニメーション**:
- **ローディングスピナー**
  ```css
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  ```

- **フェードイン**
  ```css
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  ```

- **スライドイン**
  ```css
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ```

- **パルス（注目喚起）**
  ```css
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  ```

#### 2. 複雑なトランジション
- **マルチプロパティトランジション**
  ```css
  .c-card {
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s ease;
  }
  ```

- **遅延トランジション**（要素が順番に表示）
  ```css
  .c-card:nth-child(1) { animation-delay: 0s; }
  .c-card:nth-child(2) { animation-delay: 0.1s; }
  .c-card:nth-child(3) { animation-delay: 0.2s; }
  ```

#### 3. ページ遷移アニメーション
- **View Transitions API**の活用（Chrome 111+）
- **フェード/スライドページ遷移**

### 📝 実装計画

#### Phase 1: 基本的な@keyframesアニメーション追加
**対象**: ローディング、フェードイン、スライドイン

**実装箇所**: `styles/components.css` の末尾に追加
```css
/* ==========================================================================
   Animations
   ========================================================================== */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ユーティリティクラス */
.u-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.u-slide-in {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Phase 2: コンポーネント固有アニメーション
- カードホバー時の浮き上がり効果
- ボタンクリック時のリップルエフェクト
- モーダルの開閉アニメーション

#### Phase 3: パフォーマンス最適化
- `will-change`プロパティの適切な使用
- GPU加速の活用（transform, opacity）
- Reduced Motionへの対応
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

### 📊 影響範囲
- **対象ファイル**:
  - `styles/components.css` - アニメーション定義追加（約100行）
  - `js/wireframe-generator.js` - アニメーションクラス付与ロジック

### 🧪 テスト項目
- [ ] 各アニメーションの動作確認
- [ ] パフォーマンス計測（60fps維持）
- [ ] Reduced Motion設定での動作確認
- [ ] 複数ブラウザでの互換性確認

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
| Phase 1 | Week 1-2 | IMP-003 クリックイベント実装 | 16h |
| Phase 2 | Week 2-3 | IMP-004 基本アニメーション実装 | 12h |
| Phase 3 | Week 3-4 | IMP-005 カラーバリエーション実装 | 20h |
| Phase 4 | Week 5 | IMP-003 スクロールアニメーション | 12h |
| Phase 5 | Week 6 | IMP-005 サイズ・スタイルバリエーション | 16h |
| Phase 6 | Week 7 | 統合テスト・ドキュメント更新 | 8h |

**合計工数**: 約84時間（約2ヶ月）

### 依存関係
```
IMP-005 (カラーシステム)
    ↓
IMP-003 (インタラクティブ要素)
    ↓
IMP-004 (アニメーション)
```

### 技術的考慮事項
- **ブラウザ互換性**: Chrome 90+, Firefox 88+, Safari 14+
- **パフォーマンス**: 60fps維持、アニメーションはtransform/opacityを優先
- **アクセシビリティ**: prefers-reduced-motion対応必須

---

## 🔗 関連ドキュメント
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - 改善項目リスト
- [README.md](./README.md) - プロジェクト概要
- [COMPONENT_MAPPING_RULES.md](./COMPONENT_MAPPING_RULES.md) - コンポーネントルール

**最終更新日**: 2025-11-10
