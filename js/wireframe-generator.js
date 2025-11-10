/**
 * Wireframe Generator
 * Figmaデザインシステムコンポーネントを活用した
 * テキストベース構成案からワイヤーフレーム自動生成システム
 */

class WireframeGenerator {
    constructor() {
        this.componentLibrary = this.initializeComponentLibrary();
        this.layoutPatterns = this.initializeLayoutPatterns();
    }

    /**
     * コンポーネントライブラリの初期化
     * Figmaから取得したコンポーネント情報をベースに構築
     */
    initializeComponentLibrary() {
        return {
            // Header Components
            'ヘッダー': {
                type: 'header',
                component: 'c-hgroup',
                template: (data) => `
                    <div class="c-hgroup">
                        <div class="c-hgroup__english">${data.english || 'English'}</div>
                        <div class="c-hgroup__main">
                            <h1 class="c-hgroup__title">${data.title || 'ページタイトル'}</h1>
                        </div>
                    </div>
                `
            },
            '見出し': {
                type: 'heading',
                component: 'c-heading',
                template: (data) => `
                    <h${data.level || 2} class="c-heading c-heading--${data.size || 'x3l'}">
                        ${data.text || '見出しテキスト'}
                    </h${data.level || 2}>
                `
            },
            'アンダーライン見出し': {
                type: 'heading',
                component: 'c-underline-duotone-head',
                template: (data) => `
                    <div class="c-underline-duotone-head">
                        <h${data.level || 2} class="c-underline-duotone-head__text">${data.text || '見出しテキストが入ります'}</h${data.level || 2}>
                        <div class="c-underline-duotone-head__underline"></div>
                    </div>
                `
            },
            'デュオトーン見出し': {
                type: 'heading',
                component: 'c-underline-duotone-head',
                template: (data) => `
                    <div class="c-underline-duotone-head">
                        <h${data.level || 2} class="c-underline-duotone-head__text">${data.text || '見出しテキストが入ります'}</h${data.level || 2}>
                        <div class="c-underline-duotone-head__underline"></div>
                    </div>
                `
            },
            'マーク見出し': {
                type: 'heading',
                component: 'c-mark-head',
                template: (data) => `
                    <div class="c-mark-head">
                        <div class="c-mark-head__marker"></div>
                        <h${data.level || 3} class="c-mark-head__text">${data.text || '見出しテキストが入ります'}</h${data.level || 3}>
                    </div>
                `
            },
            'マーカー見出し': {
                type: 'heading',
                component: 'c-mark-head',
                template: (data) => `
                    <div class="c-mark-head">
                        <div class="c-mark-head__marker"></div>
                        <h${data.level || 3} class="c-mark-head__text">${data.text || '見出しテキストが入ります'}</h${data.level || 3}>
                    </div>
                `
            },

            // Main Visual Components
            'メインビジュアル': {
                type: 'mainvisual',
                component: 'c-mainvisual',
                template: (data) => `
                    <div class="c-mainvisual c-mainvisual--01">
                        <div class="c-mainvisual__content">
                            <div class="c-hgroup">
                                <div class="c-hgroup__english">${data.english || data.text || 'English'}</div>
                                <div class="c-hgroup__main">
                                    <h1 class="c-hgroup__title">${data.title || 'メインビジュアルタイトル'}</h1>
                                </div>
                            </div>
                            ${data.showDescription !== false && data.noDescription !== true && data.description ? `<p class="c-mainvisual__description">${data.description}</p>` : ''}
                            ${data.showCTA !== false && data.noCTA !== true && data.cta ? `
                                <div class="c-mainvisual__cta">
                                    <button class="c-round-ghost-btn">
                                        <span class="c-round-ghost-btn__text">${data.cta}</span>
                                        <div class="c-round-ghost-btn__arrow">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `
            },

            // Button Components
            'ボタン': {
                type: 'button',
                component: 'c-round-ghost-btn',
                template: (data) => `
                    <button class="c-round-ghost-btn c-round-ghost-btn--${data.variant || 'default'}">
                        ${data.icon ? `<div class="c-round-ghost-btn__icon">${data.icon}</div>` : ''}
                        <span class="c-round-ghost-btn__text">${data.text || 'ボタン'}</span>
                        <div class="c-round-ghost-btn__arrow">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                `
            },
            'サブテキストボタン': {
                type: 'button',
                component: 'c-subtext-btn',
                template: (data) => `
                    <button class="c-subtext-btn c-subtext-btn--round-border">
                        <div class="c-subtext-btn__icon">${data.icon || ''}</div>
                        <div class="c-subtext-btn__content">
                            <div class="c-subtext-btn__text">${data.text || 'メインテキスト'}</div>
                            <div class="c-subtext-btn__subtext">${data.subtext || 'サブテキスト'}</div>
                        </div>
                        <div class="c-subtext-btn__arrow">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </button>
                `
            },

            // Paragraph Component
            '段落': {
                type: 'paragraph',
                component: 'c-paragraph',
                template: (data) => `
                    <p class="c-paragraph">${data.text || 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。'}</p>
                `
            },

            'テキスト': {
                type: 'paragraph',
                component: 'c-paragraph',
                template: (data) => `
                    <p class="c-paragraph">${data.text || 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。'}</p>
                `
            },

            '文章': {
                type: 'paragraph',
                component: 'c-paragraph',
                template: (data) => `
                    <p class="c-paragraph">${data.text || 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。'}</p>
                `
            },

            // Card Components
            'カード': {
                type: 'card',
                component: 'c-card',
                template: (data) => `
                    <div class="c-card">
                        <div class="c-card__image">
                            <div class="c-card__img"></div>
                        </div>
                        <div class="c-card__content">
                            <div class="c-card__main">
                                ${data.showTags !== false && (data.tags || data.noTags !== true) ? `
                                    <div class="c-card__tags">
                                        ${data.tags ? data.tags.map(tag => `<span class="c-tag">${tag}</span>`).join('') : `
                                            <span class="c-tag">テキスト</span>
                                            <span class="c-tag">テキスト</span>
                                        `}
                                    </div>
                                ` : ''}
                                <h3 class="c-card__title">${data.title || data.text || 'ダミーダミー'}</h3>
                                <p class="c-card__description">${data.description || 'ダミーテキストが入ります。ダミーテキストが入ります。ダミーテキストが入ります。ダミーテキストが入ります。'}</p>
                                ${data.showList !== false && data.noList !== true && data.list ? `
                                    <ul class="c-disc-list c-card__list">
                                        ${data.list.map(item => `<li class="c-disc-list__item">${item}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                            ${data.showButton !== false && data.noButton !== true ? `
                                <div class="c-card__action">
                                    <button class="c-text-btn">
                                        <span class="c-text-btn__text">${data.buttonText || data.action || 'ボタン'}</span>
                                        <div class="c-text-btn__icon">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M6 4L10 8L6 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `
            },
            'インフォカード': {
                type: 'card',
                component: 'c-info-card',
                template: (data) => `
                    <div class="c-info-card">
                        <div class="c-info-card__header">
                            <div class="c-info-card__avatar">
                                <img src="${data.avatar || 'https://via.placeholder.com/70x70/d9d9d9'}" alt="" class="c-info-card__img">
                            </div>
                            <h3 class="c-info-card__title">${data.title || 'インフォカードタイトル'}</h3>
                        </div>
                        <p class="c-info-card__description">${data.description || 'インフォカードの説明テキストが入ります。'}</p>
                        <button class="c-round-ghost-btn c-round-ghost-btn--link">
                            <span class="c-round-ghost-btn__text">${data.linkText || '詳細を見る'}</span>
                            <div class="c-round-ghost-btn__icon">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M9 3L3 9M9 3H5M9 3V7" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                `
            },

            // Navigation Components
            'ナビゲーション': {
                type: 'navigation',
                component: 'c-anchor-buttons',
                template: (data) => `
                    <nav class="c-anchor-buttons">
                        ${data.items ? data.items.map((row, rowIndex) => `
                            <div class="c-anchor-buttons__row">
                                ${row.map(item => `
                                    <button class="c-anchor-btn">
                                        <span class="c-anchor-btn__text">${item}</span>
                                        <div class="c-anchor-btn__arrow">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" transform="rotate(90)">
                                                <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                    </button>
                                `).join('')}
                            </div>
                        `).join('') : ''}
                    </nav>
                `
            },

            // Set Components
            'セットハーフ': {
                type: 'set-half',
                component: 'c-set-half',
                template: (data) => `
                    <div class="c-set-half">
                        <div class="c-set-half__content">
                            <div class="c-set-half__title">
                                <h3 class="c-heading c-heading--x4l">${data.title || data.text || '見出しテキストが入ります'}</h3>
                            </div>
                            <div class="c-set-half__text">
                                <p>${data.description || 'テキストが入ります。テキストが入ります。テキストが入ります。'}</p>
                            </div>
                            <div class="c-set-half__button">
                                <button class="c-text-btn">
                                    <span class="c-text-btn__text">${data.button || data.cta || 'ボタン'}</span>
                                    <span class="c-text-btn__icon"></span>
                                </button>
                            </div>
                        </div>
                        <div class="c-set-half__image">
                            <div class="c-set-half__image-placeholder"></div>
                        </div>
                    </div>
                `
            },

            'オーバーラップセット': {
                type: 'overlap-set',
                component: 'c-overlap-set',
                template: (data) => `
                    <div class="c-overlap-set">
                        <div class="c-overlap-set__background">
                            <div class="c-overlap-set__image-placeholder"></div>
                        </div>
                        <div class="c-overlap-set__content">
                            <div class="c-overlap-set__title">
                                <h2 class="c-heading c-heading--x5l">${data.title || data.text || '見出しテキストが入ります'}</h2>
                            </div>
                            <div class="c-overlap-set__text">
                                <p>${data.description || 'ダミーテキストが入ります。ダミーテキストが入ります。ダミーテキストが入ります。ダミーテキストが入ります。'}</p>
                            </div>
                        </div>
                    </div>
                `
            },

            'セットバーティカル': {
                type: 'set-vertical',
                component: 'c-set-vertical',
                template: (data) => `
                    <div class="c-set-vertical">
                        <div class="c-set-vertical__content">
                            <div class="c-set-vertical__text-content">
                                <div class="c-set-vertical__title">
                                    <h2 class="c-heading c-heading--x5l">${data.title || data.text || '見出しテキストが入ります'}</h2>
                                </div>
                                <div class="c-set-vertical__text">
                                    <p>${data.description || 'ダミーテキストが入ります。ダミーテキストが入ります。ダミーテキストが入ります。'}</p>
                                </div>
                            </div>
                            <div class="c-set-vertical__images">
                                <div class="c-set-vertical__image">
                                    <div class="c-set-vertical__image-placeholder"></div>
                                </div>
                                <div class="c-set-vertical__image">
                                    <div class="c-set-vertical__image-placeholder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },

            'サマリーカード': {
                type: 'summary-card',
                component: 'c-summary-card',
                template: (data) => `
                    <div class="c-summary-card">
                        <div class="c-summary-card__header">
                            <div class="c-hgroup">
                                <div class="c-hgroup__english">${data.english || 'English'}</div>
                                <div class="c-hgroup__main">
                                    <h1 class="c-hgroup__title c-hgroup__title--xl">${data.category || data.text || 'カテゴリー'}</h1>
                                </div>
                            </div>
                        </div>
                        <div class="c-summary-card__content">
                            <div class="c-summary-card__text-content">
                                <div class="c-summary-card__title">
                                    <h3 class="c-heading c-heading--x2l">${data.title || '見出しテキストが入ります'}</h3>
                                </div>
                                <div class="c-summary-card__text">
                                    <p>${data.description || 'ダミーテキストが入ります。ダミーテキストが入ります。ダミーテキストが入ります。'}</p>
                                </div>
                                ${data.button || data.cta ? `
                                    <div class="c-summary-card__button">
                                        <button class="c-text-btn c-text-btn--small">
                                            <span class="c-text-btn__text">${data.button || data.cta || 'ボタン'}</span>
                                            <span class="c-text-btn__icon c-text-btn__icon--small"></span>
                                        </button>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `
            },

            // Table Components
            '2カラム説明テーブル': {
                type: 'table',
                component: 'c-fullborder-table',
                template: (data) => `
                    <table class="c-fullborder-table c-fullborder-table--two-column">
                        <tbody class="c-fullborder-table__body">
                            ${data.rows ? data.rows.map(row => `
                                <tr class="c-fullborder-table__row">
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">${row.header || row.item || ''}</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">${row.content || row.data || ''}</p>
                                    </td>
                                </tr>
                            `).join('') : ''}
                        </tbody>
                    </table>
                `
            },
            'テーブル': {
                type: 'table',
                component: 'c-description-table',
                template: (data) => `
                    <table class="c-description-table">
                        <tbody class="c-description-table__body">
                            ${data.rows ? data.rows.map(row => `
                                <tr class="c-description-table__row">
                                    <th class="c-description-table__header">${row.header}</th>
                                    <td class="c-description-table__data">
                                        <p class="c-description-table__text">${row.content}</p>
                                        ${row.action ? `
                                            <button class="c-text-btn">
                                                <span class="c-text-btn__text">${row.action}</span>
                                                <div class="c-text-btn__icon">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M9 3L3 9M9 3H5M9 3V7" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </div>
                                            </button>
                                        ` : ''}
                                    </td>
                                </tr>
                            `).join('') : ''}
                        </tbody>
                    </table>
                `
            },

            // List Components
            'リスト': {
                type: 'list',
                component: 'c-disc-list',
                template: (data) => `
                    <ul class="c-disc-list">
                        ${data.items ? data.items.map(item => `
                            <li class="c-disc-list__item">${item}</li>
                        `).join('') : ''}
                    </ul>
                `
            },
            '番号付きリスト': {
                type: 'list',
                component: 'c-decimal-list',
                template: (data) => `
                    <ol class="c-decimal-list">
                        ${data.items ? data.items.map(item => `
                            <li class="c-decimal-list__item">${item}</li>
                        `).join('') : ''}
                    </ol>
                `
            },

            // FAQ Components
            'FAQ': {
                type: 'faq',
                component: 'c-framed-faq',
                template: (data) => `
                    <div class="c-framed-faq">
                        <div class="c-framed-faq__item">
                            <div class="c-framed-faq__question">
                                <div class="c-framed-faq__q-header">
                                    <div class="c-framed-faq__icon c-framed-faq__icon--question">
                                        <span class="c-framed-faq__icon-text">Q</span>
                                    </div>
                                    <div class="c-framed-faq__question-text">
                                        <p>${data.question || data.text || '見出しテキストが入ります見出しテキストが入ります見出しテキストが入ります'}</p>
                                    </div>
                                    <div class="c-framed-faq__toggle">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="c-framed-faq__answer">
                                <div class="c-framed-faq__a-content">
                                    <div class="c-framed-faq__icon c-framed-faq__icon--answer">
                                        <span class="c-framed-faq__icon-text">A</span>
                                    </div>
                                    <div class="c-framed-faq__answer-content">
                                        <p class="c-framed-faq__answer-text">
                                            ${data.answer || data.description || '私たちは常に「お客様の立場に立って」物事を考え、真のニーズをくみ取ることを大切にしています。サーバー導入の目的や業務上の課題、将来的な展望などを細やかにヒアリングし、最先端の技術や製品を積極的に取り入れながら、お客様の理想を形にするソリューションを追求してまいります。'}
                                        </p>
                                        ${data.linkText ? `
                                            <div class="c-framed-faq__link">
                                                <button class="c-round-ghost-btn">
                                                    <span class="c-round-ghost-btn__text">${data.linkText}</span>
                                                    <div class="c-round-ghost-btn__arrow">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'よくある質問': {
                type: 'faq',
                component: 'c-framed-faq',
                template: (data) => `
                    <div class="c-framed-faq">
                        <div class="c-framed-faq__item">
                            <div class="c-framed-faq__question">
                                <div class="c-framed-faq__q-header">
                                    <div class="c-framed-faq__icon c-framed-faq__icon--question">
                                        <span class="c-framed-faq__icon-text">Q</span>
                                    </div>
                                    <div class="c-framed-faq__question-text">
                                        <p>${data.question || data.text || 'よくある質問のタイトルが入ります'}</p>
                                    </div>
                                    <div class="c-framed-faq__toggle">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="c-framed-faq__answer">
                                <div class="c-framed-faq__a-content">
                                    <div class="c-framed-faq__icon c-framed-faq__icon--answer">
                                        <span class="c-framed-faq__icon-text">A</span>
                                    </div>
                                    <div class="c-framed-faq__answer-content">
                                        <p class="c-framed-faq__answer-text">
                                            ${data.answer || data.description || 'FAQ の回答テキストがここに表示されます。詳細な説明や解決策を記載してください。'}
                                        </p>
                                        ${data.linkText ? `
                                            <div class="c-framed-faq__link">
                                                <button class="c-round-ghost-btn">
                                                    <span class="c-round-ghost-btn__text">${data.linkText}</span>
                                                    <div class="c-round-ghost-btn__arrow">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },

            // Text Card Components
            'テキストカード': {
                type: 'text-card',
                component: 'c-text-card',
                template: (data) => `
                    <div class="c-text-card">
                        <div class="c-text-card__content">
                            <div class="c-text-card__header">
                                <h3 class="c-text-card__title">${data.title || data.text || '見出しテキスト'}</h3>
                            </div>
                            ${data.showDescription !== false && data.noDescription !== true ? `
                                <div class="c-text-card__description">
                                    <p>${data.description || 'ダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストです'}</p>
                                </div>
                            ` : ''}
                        </div>
                        <div class="c-text-card__highlight">
                            <ul class="c-text-card__list">
                                ${data.items ? data.items.map(item => `
                                    <li class="c-text-card__list-item">${item}</li>
                                `).join('') : `
                                    <li class="c-text-card__list-item">16px_テキストが入ります</li>
                                    <li class="c-text-card__list-item">16px_テキストが入ります</li>
                                    <li class="c-text-card__list-item">16px_テキストが入ります</li>
                                    <li class="c-text-card__list-item">16px_テキストが入ります</li>
                                    <li class="c-text-card__list-item">16px_テキストが入ります</li>
                                    <li class="c-text-card__list-item">16px_テキストが入ります</li>
                                `}
                            </ul>
                        </div>
                    </div>
                `
            },

            // Info Step Components
            '情報ステップ': {
                type: 'info-step',
                component: 'c-info-step',
                template: (data) => `
                    <div class="c-info-step">
                        ${data.mainTitle ? `
                            <div class="c-info-step__header">
                                <h2 class="c-heading c-heading--large">${data.mainTitle}</h2>
                            </div>
                        ` : ''}
                        <div class="c-info-step__content">
                            <div class="c-info-step__text">
                                <div class="c-info-step__title">
                                    <h3 class="c-heading c-heading--medium">${data.title || data.text || 'キャッチコピー＆キャラクター決定'}</h3>
                                </div>
                                <div class="c-info-step__description">
                                    <p class="c-paragraph">${data.description || 'ダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストです。'}</p>
                                    ${data.note ? `
                                        <div class="c-info-step__note">
                                            <span class="c-info-step__note-mark">※</span>
                                            <span class="c-info-step__note-text">${data.note}</span>
                                        </div>
                                    ` : `
                                        <div class="c-info-step__note">
                                            <span class="c-info-step__note-mark">※</span>
                                            <span class="c-info-step__note-text">職種ごとにエントリーをお願いいたします。</span>
                                        </div>
                                    `}
                                </div>
                            </div>
                            <div class="c-info-step__image">
                                <div class="c-info-step__img"></div>
                                <div class="c-info-step__dummy">ダミー</div>
                            </div>
                        </div>
                    </div>
                `
            },

            // Step Components
            'ステップ': {
                type: 'step',
                component: 'c-vertical-step',
                template: (data) => `
                    <div class="c-vertical-step">
                        <div class="c-vertical-step__item">
                            <div class="c-vertical-step__content">
                                <div class="c-vertical-step__icon">
                                    <div class="c-vertical-step__icon-placeholder"></div>
                                </div>
                                <div class="c-vertical-step__text-content">
                                    <div class="c-vertical-step__header">
                                        <div class="c-vertical-step__number">${data.number || '01. '}</div>
                                        <div class="c-vertical-step__title">
                                            <h3>${data.title || data.text || 'テキストテキストテキスト'}</h3>
                                        </div>
                                    </div>
                                    <div class="c-vertical-step__description">
                                        <p>${data.description || '掲載希望の商品をお伺いしたのち、ご提案・見積をお送りします。'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-vertical-step__arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                `
            },
            '手順': {
                type: 'step',
                component: 'c-vertical-step',
                template: (data) => `
                    <div class="c-vertical-step">
                        <div class="c-vertical-step__item">
                            <div class="c-vertical-step__content">
                                <div class="c-vertical-step__icon">
                                    <div class="c-vertical-step__icon-placeholder"></div>
                                </div>
                                <div class="c-vertical-step__text-content">
                                    <div class="c-vertical-step__header">
                                        <div class="c-vertical-step__number">${data.number || '01. '}</div>
                                        <div class="c-vertical-step__title">
                                            <h3>${data.title || data.text || '手順のタイトル'}</h3>
                                        </div>
                                    </div>
                                    <div class="c-vertical-step__description">
                                        <p>${data.description || '手順の説明テキストがここに表示されます。'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-vertical-step__arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                `
            },

            '画像テキストプロフィール': {
                type: 'image-text-profile',
                component: 'c-image-text-profile',
                template: (data) => `
                    <div class="c-image-text-profile">
                        <div class="c-image-text-profile__header">
                            <div class="c-hgroup">
                                <div class="c-hgroup__english">${data['英語'] || 'English'}</div>
                                <div class="c-hgroup__main">
                                    <h2 class="c-hgroup__title">${data['タイトル'] || '日本語見出し'}</h2>
                                </div>
                            </div>
                        </div>
                        <div class="c-image-text-profile__content">
                            <div class="c-image-text-profile__image">
                                <div class="c-image-text-profile__img">${data['画像'] ? `<img src="${data['画像']}" alt="${data.imageAlt || ''}" />` : ''}</div>
                            </div>
                            <div class="c-image-text-profile__text">
                                <div class="c-image-text-profile__heading">
                                    <h3>${data['見出し'] || '見出しテキストが入ります'}</h3>
                                </div>
                                <div class="c-image-text-profile__description">
                                    ${(data['説明'] || 'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。').split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                                </div>
                                ${(data['署名なし'] !== true && data.signature !== false) ? `
                                    <div class="c-image-text-profile__signature">
                                        <div class="c-image-text-profile__signature-text">
                                            <p>${data['会社名'] || '〇〇株式会社'}</p>
                                            <p>${data['役職'] || '代表取締役社長'}</p>
                                        </div>
                                        <div class="c-image-text-profile__signature-img">${data['署名画像'] ? `<img src="${data['署名画像']}" alt="署名" />` : ''}</div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `
            },
            '流れ': {
                type: 'step',
                component: 'c-vertical-step',
                template: (data) => `
                    <div class="c-vertical-step">
                        <div class="c-vertical-step__item">
                            <div class="c-vertical-step__content">
                                <div class="c-vertical-step__icon">
                                    <div class="c-vertical-step__icon-placeholder"></div>
                                </div>
                                <div class="c-vertical-step__text-content">
                                    <div class="c-vertical-step__header">
                                        <div class="c-vertical-step__number">${data.number || '01. '}</div>
                                        <div class="c-vertical-step__title">
                                            <h3>${data.title || data.text || '流れのタイトル'}</h3>
                                        </div>
                                    </div>
                                    <div class="c-vertical-step__description">
                                        <p>${data.description || 'フローの説明テキストがここに表示されます。'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-vertical-step__arrow">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                `
            },

            // Local Navigation Components
            'ローカルナビ': {
                type: 'local-nav',
                component: 'c-localav',
                template: (data) => `
                    <div class="c-localav">
                        <div class="c-localav__heading">
                            <h2 class="c-heading c-heading--x4l">${data.title || data.text || '見出しテキストが入ります'}</h2>
                        </div>
                        <div class="c-localav__links">
                            ${data.items ? this.generateLocalNavItems(data.items) : this.generateDefaultLocalNavItems()}
                        </div>
                    </div>
                `
            },
            '回遊リンク': {
                type: 'local-nav',
                component: 'c-localav',
                template: (data) => `
                    <div class="c-localav">
                        <div class="c-localav__heading">
                            <h2 class="c-heading c-heading--x4l">${data.title || data.text || '関連コンテンツ'}</h2>
                        </div>
                        <div class="c-localav__links">
                            ${data.items ? this.generateLocalNavItems(data.items) : this.generateDefaultLocalNavItems()}
                        </div>
                    </div>
                `
            },
            '関連リンク': {
                type: 'local-nav',
                component: 'c-localav',
                template: (data) => `
                    <div class="c-localav">
                        <div class="c-localav__heading">
                            <h2 class="c-heading c-heading--x4l">${data.title || data.text || '関連リンク'}</h2>
                        </div>
                        <div class="c-localav__links">
                            ${data.items ? this.generateLocalNavItems(data.items) : this.generateDefaultLocalNavItems()}
                        </div>
                    </div>
                `
            },

            // Table Components
            'フルボーダーテーブル': {
                type: 'table',
                component: 'c-fullborder-table',
                template: (data) => `
                    <table class="c-fullborder-table${data.headers && data.headers.length === 2 ? ' c-fullborder-table--two-column' : ''}">
                        ${data.headers ? `
                            <thead class="c-fullborder-table__head">
                                <tr class="c-fullborder-table__row">
                                    ${data.headers.map(header => `<th class="c-fullborder-table__header">${header}</th>`).join('')}
                                </tr>
                            </thead>
                        ` : ''}
                        <tbody class="c-fullborder-table__body">
                            ${data.rows ? data.rows.map(row => `
                                <tr class="c-fullborder-table__row">
                                    ${Array.isArray(row) ? row.map(cell => `
                                        <td class="c-fullborder-table__data">
                                            <p class="c-fullborder-table__text">${cell}</p>
                                        </td>
                                    `).join('') : `
                                        <td class="c-fullborder-table__data">
                                            <p class="c-fullborder-table__text">${row.header || row}</p>
                                        </td>
                                        <td class="c-fullborder-table__data">
                                            <p class="c-fullborder-table__text">${row.content || 'テキストが入ります'}</p>
                                        </td>
                                    `}
                                </tr>
                            `).join('') : `
                                <tr class="c-fullborder-table__row">
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">項目1</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">内容1</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">備考1</p>
                                    </td>
                                </tr>
                                <tr class="c-fullborder-table__row">
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">項目2</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">内容2</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">備考2</p>
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                `
            },
            'テーブル': {
                type: 'table',
                component: 'c-fullborder-table',
                template: (data) => `
                    <table class="c-fullborder-table${data.headers && data.headers.length === 2 ? ' c-fullborder-table--two-column' : ''}">
                        ${data.headers ? `
                            <thead class="c-fullborder-table__head">
                                <tr class="c-fullborder-table__row">
                                    ${data.headers.map(header => `<th class="c-fullborder-table__header">${header}</th>`).join('')}
                                </tr>
                            </thead>
                        ` : ''}
                        <tbody class="c-fullborder-table__body">
                            ${data.rows ? data.rows.map(row => `
                                <tr class="c-fullborder-table__row">
                                    ${Array.isArray(row) ? row.map(cell => `
                                        <td class="c-fullborder-table__data">
                                            <p class="c-fullborder-table__text">${cell}</p>
                                        </td>
                                    `).join('') : `
                                        <td class="c-fullborder-table__data">
                                            <p class="c-fullborder-table__text">${row.header || row}</p>
                                        </td>
                                        <td class="c-fullborder-table__data">
                                            <p class="c-fullborder-table__text">${row.content || 'テキストが入ります'}</p>
                                        </td>
                                    `}
                                </tr>
                            `).join('') : `
                                <tr class="c-fullborder-table__row">
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">項目1</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">内容1</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">備考1</p>
                                    </td>
                                </tr>
                                <tr class="c-fullborder-table__row">
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">項目2</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">内容2</p>
                                    </td>
                                    <td class="c-fullborder-table__data">
                                        <p class="c-fullborder-table__text">備考2</p>
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                `
            },

            // Track History Component
            'トラック履歴': {
                type: 'track-history',
                component: 'timeline',
                template: (data) => {
                    const hasDate = data.hasDate !== false; // デフォルトはtrue
                    
                    // 配列の場合と単一アイテムの場合を処理
                    const items = Array.isArray(data.items) ? data.items : [data];
                    
                    return `
                        <section class="timeline">
                            ${items.map((item, index) => `
                                <div class="timeline__item">
                                    ${hasDate ? `<time class="timeline__date">${item.year || ''}<span class="timeline__date-sub">${item.monthDay || ''}</span></time>` : ''}
                                    <div class="timeline__indicator"></div>
                                    ${index < items.length - 1 ? '<div class="timeline__line"></div>' : ''}
                                    <p class="timeline__text">${item.text || item.content || ''}</p>
                                </div>
                            `).join('')}
                        </section>`;
                }
            },

            '履歴': {
                type: 'track-history',
                component: 'timeline',
                template: (data) => {
                    const hasDate = data.hasDate !== false;
                    
                    // 配列の場合と単一アイテムの場合を処理
                    const items = Array.isArray(data.items) ? data.items : [data];
                    
                    return `
                        <section class="timeline">
                            ${items.map((item, index) => `
                                <div class="timeline__item">
                                    ${hasDate ? `<time class="timeline__date">${item.year || ''}<span class="timeline__date-sub">${item.monthDay || ''}</span></time>` : ''}
                                    <div class="timeline__indicator"></div>
                                    ${index < items.length - 1 ? '<div class="timeline__line"></div>' : ''}
                                    <p class="timeline__text">${item.text || item.content || ''}</p>
                                </div>
                            `).join('')}
                        </section>`;
                }
            },

            // Point Card Component
            'ポイントカード': {
                type: 'point-card',
                component: 'c-point-card',
                template: (data) => `
                    <div class="c-point-card">
                        <div class="c-point-card__label">
                            <p>${data.label || data.title || 'POINT'}</p>
                        </div>
                        <div class="c-point-card__content">
                            <div class="c-point-card__divider"></div>
                            <div class="c-point-card__list">
                                ${data.items ? data.items.map(item => `
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>${item}</p>
                                        </div>
                                    </div>
                                `).join('') : `
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>16px_テキストが入ります。テキストが入ります。テキストが入ります。</p>
                                        </div>
                                    </div>
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>16px_テキストが入ります。テキストが入ります。テキストが入ります。</p>
                                        </div>
                                    </div>
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>16px_テキストが入ります。テキストが入ります。テキストが入ります。</p>
                                        </div>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `
            },

            'ポイント': {
                type: 'point-card',
                component: 'c-point-card',
                template: (data) => `
                    <div class="c-point-card">
                        <div class="c-point-card__label">
                            <p>${data.label || data.title || 'POINT'}</p>
                        </div>
                        <div class="c-point-card__content">
                            <div class="c-point-card__divider"></div>
                            <div class="c-point-card__list">
                                ${data.items ? data.items.map(item => `
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>${item}</p>
                                        </div>
                                    </div>
                                `).join('') : `
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>16px_テキストが入ります。テキストが入ります。テキストが入ります。</p>
                                        </div>
                                    </div>
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>16px_テキストが入ります。テキストが入ります。テキストが入ります。</p>
                                        </div>
                                    </div>
                                    <div class="c-point-card__item">
                                        <div class="c-point-card__check"></div>
                                        <div class="c-point-card__text">
                                            <p>16px_テキストが入ります。テキストが入ります。テキストが入ります。</p>
                                        </div>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                `
            }
        };
    }

    /**
     * レイアウトパターンの初期化
     */
    initializeLayoutPatterns() {
        return {
            'ヘッダー': { section: 'header', wrapper: 'header' },
            'メインビジュアル': { section: 'section', wrapper: 'section', class: 'wf-mainvisual' },
            'メイン': { section: 'main', wrapper: 'main' },
            'サイドバー': { section: 'aside', wrapper: 'aside' },
            'フッター': { section: 'footer', wrapper: 'footer' },
            'セクション': { section: 'section', wrapper: 'section' },
            '2カラム': { layout: 'two-column', wrapper: 'div', class: 'layout-two-column' },
            '3カラム': { layout: 'three-column', wrapper: 'div', class: 'layout-three-column' },
            'グリッド': { layout: 'grid', wrapper: 'div', class: 'layout-grid' }
        };
    }

    /**
     * テキストベース構成案を解析してワイヤーフレームを生成
     * @param {string} textInput - テキストベースの構成案
     * @returns {string} - 生成されたHTMLワイヤーフレーム
     */
    generateWireframe(textInput) {
        try {
            const parsedStructure = this.parseTextInput(textInput);
            const html = this.convertToHTML(parsedStructure);
            return this.wrapInDocument(html);
        } catch (error) {
            console.error('ワイヤーフレーム生成エラー:', error);
            return this.generateErrorHTML(error.message);
        }
    }

    /**
     * テキスト入力を構造化データに解析
     * @param {string} textInput - テキスト入力
     * @returns {Array} - 解析された構造データ
     */
    parseTextInput(textInput) {
        const lines = textInput.split('\n').filter(line => line.trim());
        const structure = [];
        let currentSection = null;
        let pendingData = {}; // 複数行データを蓄積

        // 全体デバッグ
        if (typeof console !== 'undefined' && console.log) {
            console.log(`=== Parse Input Debug ===`);
            console.log(`Total lines: ${lines.length}`);
            console.log(`Lines:`, lines);
        }

        for (let i = 0; i < lines.length; i++) {
            const trimmedLine = lines[i].trim();

            // 行レベルデバッグ
            if (typeof console !== 'undefined' && console.log) {
                console.log(`Processing line ${i}: "${trimmedLine}"`);
            }

            // セクション判定
            if (this.isSection(trimmedLine)) {
                currentSection = {
                    type: 'section',
                    name: this.extractSectionName(trimmedLine),
                    components: []
                };
                structure.push(currentSection);
                pendingData = {}; // セクション変更時にクリア
                continue;
            }

            // インデントレベルを確認
            const indentLevel = lines[i].search(/\S/);

            // コンポーネント判定
            const componentInfo = this.parseComponent(trimmedLine, lines, i);
            if (typeof console !== 'undefined' && console.log) {
                console.log(`Component check result:`, componentInfo);
            }
            if (componentInfo) {
                if (currentSection) {
                    currentSection.components.push(componentInfo);
                } else {
                    // セクションが定義されていない場合の処理
                    // メインビジュアルの場合は専用セクションを作成
                    if (componentInfo.name === 'メインビジュアル') {
                        const mainVisualSection = {
                            type: 'section',
                            name: 'メインビジュアル',
                            components: [componentInfo]
                        };
                        structure.push(mainVisualSection);
                        if (typeof console !== 'undefined' && console.log) {
                            console.log(`Created mainvisual section:`, mainVisualSection);
                        }
                    } else {
                        // その他のコンポーネントの場合はデフォルトセクションを作成
                        if (!structure.length || structure[structure.length - 1].type !== 'section') {
                            structure.push({
                                type: 'section',
                                name: 'メイン',
                                components: []
                            });
                        }
                        structure[structure.length - 1].components.push(componentInfo);
                    }
                }
                pendingData = {}; // コンポーネント追加後にクリア
            }
        }

        return structure;
    }

    /**
     * セクション判定
     * @param {string} line - 行テキスト
     * @returns {boolean} - セクションかどうか
     */
    isSection(line) {
        // コンポーネント名をまず除外
        const componentKeywords = Object.keys(this.componentLibrary);
        for (const component of componentKeywords) {
            if (line.includes(component)) {
                return false; // コンポーネント行の場合はセクションではない
            }
        }

        const sectionKeywords = ['ヘッダー', 'メイン', 'サイドバー', 'フッター', 'セクション'];
        return sectionKeywords.some(keyword =>
            line.includes(keyword) && (line.includes('：') || line.includes(':') || line.startsWith('#'))
        );
    }

    /**
     * コンポーネント行かどうかを判定
     * @param {string} line - 行テキスト
     * @returns {boolean} - コンポーネント行かどうか
     */
    isComponentLine(line) {
        const componentKeywords = Object.keys(this.componentLibrary)
            .sort((a, b) => b.length - a.length); // 長い順にソート
        return componentKeywords.some(keyword => line.includes(keyword));
    }

    /**
     * セクション名を抽出
     * @param {string} line - 行テキスト
     * @returns {string} - セクション名
     */
    extractSectionName(line) {
        const match = line.match(/(?:#+\s*)?([^：:]+)(?:[：:]|$)/);
        return match ? match[1].trim() : 'セクション';
    }

    /**
     * コンポーネント情報を解析
     * @param {string} line - 行テキスト
     * @param {Array} lines - 全ての行（コンテキスト用）
     * @param {number} index - 現在の行インデックス
     * @returns {Object|null} - コンポーネント情報
     */
    parseComponent(line, lines = [], index = 0) {
        const currentIndent = lines[index] ? lines[index].search(/\S/) : 0;

        // 長いキーワードから順にチェックして、より具体的なマッチを優先
        const sortedComponents = Object.entries(this.componentLibrary)
            .sort(([a], [b]) => b.length - a.length); // 長い順にソート

        for (const [componentName, componentData] of sortedComponents) {
            if (line.includes(componentName)) {
                // インデントされた「ボタン」「リスト」「ヘッダー」「行」は親コンポーネントの一部として扱う
                if ((componentName === 'ボタン' || componentName === 'リスト' || componentName === 'ヘッダー' || componentName === '行') && currentIndent > 0) {
                    // 前の行で親コンポーネント（セットハーフなど）が見つかった場合はスキップ
                    for (let i = index - 1; i >= 0; i--) {
                        const prevLine = lines[i];
                        if (!prevLine.trim()) continue;

                        const prevIndent = prevLine.search(/\S/);
                        if (prevIndent < currentIndent) {
                            // 親レベルのコンポーネントを確認
                            if (prevLine.includes('セットハーフ') || prevLine.includes('メインビジュアル') ||
                                prevLine.includes('インフォカード') || prevLine.includes('カード') ||
                                prevLine.includes('テキストカード') || prevLine.includes('フルボーダーテーブル') ||
                                prevLine.includes('テーブル')) {
                                return null; // 独立コンポーネントとしては認識しない
                            }
                            break;
                        }
                    }
                }

                return {
                    type: componentData.type,
                    component: componentData.component,
                    name: componentName,
                    data: this.extractComponentData(line, componentName, lines, index),
                    template: componentData.template
                };
            }
        }
        return null;
    }

    /**
     * コンポーネントデータを抽出
     * @param {string} line - 行テキスト
     * @param {string} componentName - コンポーネント名
     * @param {Array} lines - 全ての行
     * @param {number} index - 現在の行インデックス
     * @returns {Object} - 抽出されたデータ
     */
    extractComponentData(line, componentName, lines = [], index = 0) {
        const data = {};

        // 変数宣言を先頭に移動して重複を防ぐ
        let titleMatch, englishMatch, descriptionMatch, ctaMatch, buttonMatch, categoryMatch, imageMatch, itemsMatch, listMatch;
        let questionMatch, answerMatch, linkMatch, stepNumberMatch, stepTitleMatch, stepDescMatch;
        let localNavTitleMatch, localNavItemsMatch, textCardTitleMatch, textCardDescMatch, textCardItemsMatch;
        let mainTextMatch, subTextMatch, textMatch, mvTitleMatch, mvDescMatch, headerMatch, rowMatches;

        // デバッグ情報
        if (typeof console !== 'undefined' && console.log) {
            console.log(`=== Extract Component Data Debug ===`);
            console.log(`Component: ${componentName}`);
            console.log(`Line: "${line}"`);
            console.log(`Index: ${index}`);
        }

        // 基本的なテキスト抽出（コロン後のテキスト）
        // 画像テキストプロフィールは専用処理があるため基本抽出をスキップ
        if (componentName !== '画像テキストプロフィール') {
            const afterComponent = line.split(componentName)[1];
            if (afterComponent) {
                textMatch = afterComponent.match(/[：:]\s*(.+?)(?:\s*$)/);
                if (textMatch) {
                    data.text = textMatch[1].trim();
                    if (typeof console !== 'undefined' && console.log) {
                        console.log(`Found basic text: "${data.text}"`);
                    }
                }
            }
        }

        // 次の行以降からインデントされた詳細情報を取得
        const currentIndent = lines[index] ? lines[index].search(/\S/) : 0;
        let detailsText = '';

        for (let i = index + 1; i < lines.length; i++) {
            const nextLine = lines[i];
            if (!nextLine.trim()) continue; // 空行をスキップ

            const nextIndent = nextLine.search(/\S/);

            // インデントが深い場合、または同じレベルでコンポーネント以外の場合は詳細情報として扱う
            if (nextIndent > currentIndent ||
                (nextIndent === currentIndent && !this.isComponentLine(nextLine.trim()))) {
                detailsText += nextLine.trim() + '\n';
            } else {
                break;
            }
        }

        // メインビジュアルの特別な処理
        if (componentName === 'メインビジュアル') {
            // タイトル、英語、説明、CTAを抽出
            titleMatch = detailsText.match(/タイトル[：:]\s*(.+?)(?:\n|$)/m);
            englishMatch = detailsText.match(/英語[：:]\s*(.+?)(?:\n|$)/m);
            descriptionMatch = detailsText.match(/説明[：:]\s*(.+?)(?:\n|$)/m);
            ctaMatch = detailsText.match(/CTA[：:]\s*(.+?)(?:\n|$)/m);

            if (titleMatch) data.title = titleMatch[1].trim();
            if (englishMatch) data.english = englishMatch[1].trim();
            if (descriptionMatch) data.description = descriptionMatch[1].trim();
            if (ctaMatch) data.cta = ctaMatch[1].trim();

            if (typeof console !== 'undefined' && console.log) {
                console.log(`Mainvisual extracted data:`, data);
            }
        }

        // セットハーフの特別な処理
        if (componentName === 'セットハーフ') {
            // タイトル、説明、ボタンを抽出
            titleMatch = detailsText.match(/タイトル[：:]\s*(.+?)(?:\n|$)/m);
            descriptionMatch = detailsText.match(/説明[：:]\s*(.+?)(?:\n|$)/m);
            buttonMatch = detailsText.match(/ボタン[：:]\s*(.+?)(?:\n|$)/m);

            if (titleMatch) data.title = titleMatch[1].trim();
            if (descriptionMatch) data.description = descriptionMatch[1].trim();
            if (buttonMatch) data.button = buttonMatch[1].trim();

            if (typeof console !== 'undefined' && console.log) {
                console.log(`Set-half extracted data:`, data);
                console.log(`Set-half details text:`, detailsText);
            }
        }

        // オーバーラップセットの特別な処理
        if (componentName === 'オーバーラップセット') {
            // タイトル、説明を抽出
            titleMatch = detailsText.match(/タイトル[：:]\s*(.+?)(?:\n|$)/m);
            descriptionMatch = detailsText.match(/説明[：:]\s*(.+?)(?:\n|$)/m);

            if (titleMatch) data.title = titleMatch[1].trim();
            if (descriptionMatch) data.description = descriptionMatch[1].trim();

            if (typeof console !== 'undefined' && console.log) {
                console.log(`Overlap-set extracted data:`, data);
            }
        }

        // 画像テキストプロフィールの特別な処理
        if (componentName === '画像テキストプロフィール') {
            // 英語、タイトル、見出し、説明、会社名、役職、画像、署名画像を抽出
            englishMatch = detailsText.match(/英語[：:]\s*(.+?)(?:\n|$)/m);
            titleMatch = detailsText.match(/タイトル[：:]\s*(.+?)(?:\n|$)/m);
            const headingMatch = detailsText.match(/見出し[：:]\s*(.+?)(?:\n|$)/m);
            descriptionMatch = detailsText.match(/説明[：:]\s*(.+?)(?:\n|$)/m);
            const companyMatch = detailsText.match(/会社名[：:]\s*(.+?)(?:\n|$)/m);
            const positionMatch = detailsText.match(/役職[：:]\s*(.+?)(?:\n|$)/m);
            imageMatch = detailsText.match(/画像[：:]\s*(.+?)(?:\n|$)/m);
            const signatureMatch = detailsText.match(/署名画像[：:]\s*(.+?)(?:\n|$)/m);
            const noSignatureMatch = detailsText.match(/署名なし/m);

            if (englishMatch) data['英語'] = englishMatch[1].trim();
            if (titleMatch) data['タイトル'] = titleMatch[1].trim();
            if (headingMatch) data['見出し'] = headingMatch[1].trim();
            if (descriptionMatch) data['説明'] = descriptionMatch[1].trim();
            if (companyMatch) data['会社名'] = companyMatch[1].trim();
            if (positionMatch) data['役職'] = positionMatch[1].trim();
            if (imageMatch) data['画像'] = imageMatch[1].trim();
            if (signatureMatch) data['署名画像'] = signatureMatch[1].trim();
            if (noSignatureMatch) data['署名なし'] = true;

            if (typeof console !== 'undefined' && console.log) {
                console.log(`Image-text-profile extracted data:`, data);
            }
        }

        // セットバーティカルの特別な処理
        if (componentName === 'セットバーティカル') {
            // タイトル、説明を抽出
            titleMatch = detailsText.match(/タイトル[：:]\s*(.+?)(?:\n|$)/m);
            descriptionMatch = detailsText.match(/説明[：:]\s*(.+?)(?:\n|$)/m);

            if (titleMatch) data.title = titleMatch[1].trim();
            if (descriptionMatch) data.description = descriptionMatch[1].trim();

            if (typeof console !== 'undefined' && console.log) {
                console.log(`Set-vertical extracted data:`, data);
            }
        }

        // サマリーカードの特別な処理
        if (componentName === 'サマリーカード') {
            // カテゴリー、英語、タイトル、説明、ボタンを抽出
            categoryMatch = detailsText.match(/カテゴリー[：:]\s*(.+?)(?:\n|$)/m);
            englishMatch = detailsText.match(/英語[：:]\s*(.+?)(?:\n|$)/m);
            titleMatch = detailsText.match(/タイトル[：:]\s*(.+?)(?:\n|$)/m);
            descriptionMatch = detailsText.match(/説明[：:]\s*(.+?)(?:\n|$)/m);
            buttonMatch = detailsText.match(/ボタン[：:]\s*(.+?)(?:\n|$)/m);

            if (categoryMatch) data.category = categoryMatch[1].trim();
            if (englishMatch) data.english = englishMatch[1].trim();
            if (titleMatch) data.title = titleMatch[1].trim();
            if (descriptionMatch) data.description = descriptionMatch[1].trim();
            if (buttonMatch) data.button = buttonMatch[1].trim();

            if (typeof console !== 'undefined' && console.log) {
                console.log(`Summary-card extracted data:`, data);
            }
        }

        // トラック履歴、履歴の特別処理
        if (componentName === 'トラック履歴' || componentName === '履歴') {
            const hasDateMatch = detailsText.match(/日付あり[\s\uff1a:]*([^\n]+)/i);
            const hasDate = hasDateMatch ? hasDateMatch[1].trim() !== 'false' : true;
            
            // 複数のアイテムを解析
            const itemPattern = /-\s*year[\uff1a:]?\s*(\d+)[,\uff0c]\s*monthDay[\uff1a:]?\s*([\d\.]+)[,\uff0c]\s*text[\uff1a:]?\s*(.+?)(?=\n\s*-|$)/gmi;
            const items = [];
            let match;
            
            while ((match = itemPattern.exec(detailsText)) !== null) {
                items.push({
                    year: match[1].trim(),
                    monthDay: match[2].trim(),
                    text: match[3].trim()
                });
            }
            
            // アイテムが見つかった場合
            if (items.length > 0) {
                return {
                    hasDate: hasDate,
                    items: items
                };
            }
            
            // 従来のフォーマット(単一アイテム)のフォールバック
            const yearMatch = detailsText.match(/year[\s\uff1a:]+([^\n,]+)/i);
            const monthDayMatch = detailsText.match(/monthDay[\s\uff1a:]+([^\n,]+)/i);
            const textMatch = detailsText.match(/text[\s\uff1a:]+([^\n]+)/i);
            
            return {
                hasDate: hasDate,
                year: yearMatch ? yearMatch[1].trim() : '',
                monthDay: monthDayMatch ? monthDayMatch[1].trim() : '',
                text: textMatch ? textMatch[1].trim() : detailsText.replace(/.*?\n/, '').trim()
            };
        }


        // デバッグ情報（開発時のみ）
        if (typeof console !== 'undefined' && console.log) {
            console.log(`=== Component Analysis ===`);
            console.log(`Component: ${componentName}`);
            console.log(`Line: ${line}`);
            console.log(`Text: ${data.text}`);
            console.log(`Details: ${JSON.stringify(detailsText)}`);
            console.log(`Current Indent: ${currentIndent}`);
            console.log(`=== End Analysis ===`);
        }

        // 特定パターンの抽出
        switch (componentName) {
            case 'ヘッダー':
                // タイトル情報を次の行から取得
                titleMatch = detailsText.match(/タイトル[：:]?\s*(.+)/);
                if (titleMatch) {
                    data.title = titleMatch[1].trim();
                } else if (data.text) {
                    data.title = data.text;
                }
                break;

            case '見出し':
                if (data.text) {
                    data.text = data.text;
                    data.level = 2; // デフォルトレベル
                    data.size = 'x3l'; // デフォルトサイズ
                }
                break;

            case 'メインビジュアル':
                // タイトル情報を詳細テキストから取得
                mvTitleMatch = detailsText.match(/タイトル[：:]?\s*(.+)/m);
                if (mvTitleMatch) {
                    data.title = mvTitleMatch[1].trim();
                } else if (data.text) {
                    data.title = data.text;
                }

                // 英語テキスト情報
                englishMatch = detailsText.match(/英語[：:]?\s*(.+)/m);
                if (englishMatch) {
                    data.english = englishMatch[1].trim();
                }

                // 説明情報
                mvDescMatch = detailsText.match(/説明[：:]?\s*(.+)/m);
                if (mvDescMatch) {
                    data.description = mvDescMatch[1].trim();
                }

                // CTA情報
                ctaMatch = detailsText.match(/(?:CTA|ボタン|アクション)[：:]?\s*(.+)/m);
                if (ctaMatch) {
                    data.cta = ctaMatch[1].trim();
                }

                // 説明文の表示制御
                if (detailsText.match(/説明なし|no description/i)) {
                    data.noDescription = true;
                }
                if (detailsText.match(/説明非表示|hide description/i)) {
                    data.showDescription = false;
                }

                // CTAの表示制御
                if (detailsText.match(/CTAなし|ボタンなし|no (?:cta|button)/i)) {
                    data.noCTA = true;
                }
                if (detailsText.match(/CTA非表示|ボタン非表示|hide (?:cta|button)/i)) {
                    data.showCTA = false;
                }

                // デフォルト値の設定
                if (!data.title && data.text) {
                    data.title = data.text;
                }
                break;

            case 'カード':
            case 'インフォカード':
                // タイトル情報（詳細テキストから取得）
                titleMatch = detailsText.match(/タイトル[：:]?\s*(.+)/m);
                if (titleMatch) {
                    data.title = titleMatch[1].trim();
                } else if (data.text) {
                    // コロン後のテキストをタイトルとして使用
                    data.title = data.text;
                }

                // 画像情報
                imageMatch = detailsText.match(/画像[：:]?\s*(.+)/m);
                if (imageMatch) data.image = imageMatch[1].trim();

                // 説明情報
                descriptionMatch = detailsText.match(/説明[：:]?\s*(.+)/m);
                if (descriptionMatch) {
                    data.description = descriptionMatch[1].trim();
                }

                // タグの表示制御
                if (detailsText.match(/タグなし|no tags?/i)) {
                    data.noTags = true;
                }
                if (detailsText.match(/タグ非表示|hide tags?/i)) {
                    data.showTags = false;
                }

                // ボタンの表示制御
                if (detailsText.match(/ボタンなし|no button/i)) {
                    data.noButton = true;
                }
                if (detailsText.match(/ボタン非表示|hide button/i)) {
                    data.showButton = false;
                }

                // ボタンテキストの指定
                buttonMatch = detailsText.match(/ボタン[：:]?\s*(.+)/m);
                if (buttonMatch) {
                    data.buttonText = buttonMatch[1].trim();
                }

                // リスト情報の処理
                listMatch = detailsText.match(/リスト[：:]?\s*(.+)/m);
                if (listMatch) {
                    const listItems = listMatch[1].split(/[,，、]/).map(item => item.trim()).filter(item => item);
                    data.list = listItems;
                }

                // リストの表示制御
                if (detailsText.match(/リストなし|no list/i)) {
                    data.noList = true;
                }
                if (detailsText.match(/リスト非表示|hide list/i)) {
                    data.showList = false;
                }

                // デフォルト値の設定
                if (!data.title && data.text) {
                    data.title = data.text;
                }
                if (!data.description) {
                    data.description = 'カードの説明テキストが入ります。';
                }
                break;

            case 'ナビゲーション':
                itemsMatch = detailsText.match(/項目[：:]?\s*(.+)/);
                if (itemsMatch) {
                    const items = itemsMatch[1].split(/[,，、]/).map(item => item.trim());
                    data.items = [items]; // 1行として扱う
                }
                break;

            case '2カラム説明テーブル':
                // 項目と内容をカンマ区切りで抽出
                const itemsMatch = detailsText.match(/項目[:：]\s*(.+?)(?:\n|$)/m);
                const contentsMatch = detailsText.match(/内容[:：]\s*(.+?)(?:\n|$)/m);
                
                if (itemsMatch && contentsMatch) {
                    const items = itemsMatch[1].split(/[,，]/).map(item => item.trim());
                    const contents = contentsMatch[1].split(/[,，]/).map(content => content.trim());
                    
                    // 項目と内容をペアにする
                    data.rows = items.map((item, index) => ({
                        header: item,
                        content: contents[index] || ''
                    }));
                }
                
                if (typeof console !== 'undefined' && console.log) {
                    console.log('2カラム説明テーブル extracted data:', data);
                }
                break;

            case 'テーブル':
                // テーブルの行データを動的に生成
                if (data.text) {
                    data.rows = [
                        { header: '項目1', content: 'データ1' },
                        { header: '項目2', content: 'データ2' },
                        { header: data.text, content: '詳細情報が入ります' }
                    ];
                }
                break;

            case 'フルボーダーテーブル':
                // ヘッダー情報を抽出
                headerMatch = detailsText.match(/(?:ヘッダー|header)[：:]?\s*(.+?)(?:\n|$)/mi);
                if (headerMatch) {
                    data.headers = headerMatch[1].split(/[,，、]/).map(h => h.trim());
                }

                // 行データを抽出
                rowMatches = detailsText.match(/(?:行|row)[：:]?\s*(.+?)(?:\n|$)/gmi);
                if (rowMatches) {
                    data.rows = rowMatches.map(rowMatch => {
                        const rowData = rowMatch.replace(/^(?:行|row)[：:]?\s*/i, '');
                        return rowData.split(/[,，、]/).map(cell => cell.trim());
                    });
                }

                // デフォルトデータの設定
                if (!data.headers) {
                    data.headers = ['項目', '内容', '備考'];
                }
                if (!data.rows || data.rows.length === 0) {
                    data.rows = [
                        ['見出し', 'テキストが入ります', '-'],
                        ['見出し見出し見出し見出し見出し', 'テキストが入ります', '重要'],
                        ['見出し', 'ダミーテキストダミーテキストダミーテキスト', '-']
                    ];
                }
                break;

            case 'リスト':
            case '番号付きリスト':
                itemsMatch = detailsText.match(/項目[：:]?\s*(.+)/);
                if (itemsMatch) {
                    data.items = itemsMatch[1].split(/[,，、]/).map(item => item.trim());
                } else if (data.text) {
                    data.items = [data.text];
                }
                break;

            case 'ボタン':
            case 'サブテキストボタン':
                if (data.text) {
                    data.text = data.text;
                }

                if (componentName === 'サブテキストボタン') {
                    // デバッグ：サブテキストボタン専用
                    if (typeof console !== 'undefined' && console.log) {
                        console.log('=== サブテキストボタン詳細デバッグ ===');
                        console.log('detailsText:', JSON.stringify(detailsText));
                        console.log('data.text (初期値):', data.text);
                    }

                    // メインテキスト情報（より幅広いパターンに対応）
                    mainTextMatch = detailsText.match(/(?:メインテキスト|テキスト|main|text)[：:\s]*(.+)/mi);
                    if (mainTextMatch) {
                        data.text = mainTextMatch[1].trim();
                        if (typeof console !== 'undefined' && console.log) {
                            console.log('メインテキスト発見:', data.text);
                        }
                    }

                    // サブテキスト情報（より幅広いパターンに対応）
                    subTextMatch = detailsText.match(/(?:サブテキスト|sub|subtext)[：:\s]*(.+)/mi);
                    if (subTextMatch) {
                        data.subtext = subTextMatch[1].trim();
                        if (typeof console !== 'undefined' && console.log) {
                            console.log('サブテキスト発見:', data.subtext);
                        }
                    } else {
                        data.subtext = 'サブテキスト';
                    }

                    // 最終データ確認
                    if (typeof console !== 'undefined' && console.log) {
                        console.log('最終データ:', { text: data.text, subtext: data.subtext });
                        console.log('=== デバッグ終了 ===');
                    }
                }
                break;

            case 'FAQ':
            case 'よくある質問':
                // 質問と回答を抽出
                questionMatch = detailsText.match(/(?:質問|Q)[：:]?\s*(.+?)(?:\n|$)/m);
                answerMatch = detailsText.match(/(?:回答|答え|A)[：:]?\s*(.+?)(?:\n|$)/m);
                linkMatch = detailsText.match(/(?:リンク|ボタン)[：:]?\s*(.+?)(?:\n|$)/m);

                if (questionMatch) {
                    data.question = questionMatch[1].trim();
                } else if (data.text) {
                    data.question = data.text;
                }

                if (answerMatch) {
                    data.answer = answerMatch[1].trim();
                }

                if (linkMatch) {
                    data.linkText = linkMatch[1].trim();
                }

                // デフォルト値の設定
                if (!data.question && data.text) {
                    data.question = data.text;
                }
                break;

            case 'ステップ':
            case '手順':
            case '流れ':
                // 番号、タイトル、説明を抽出
                stepNumberMatch = detailsText.match(/(?:番号|No|number)[：:]?\s*(.+?)(?:\n|$)/mi);
                stepTitleMatch = detailsText.match(/(?:タイトル|title)[：:]?\s*(.+?)(?:\n|$)/mi);
                stepDescMatch = detailsText.match(/(?:説明|description|内容)[：:]?\s*(.+?)(?:\n|$)/mi);

                if (stepNumberMatch) {
                    // 番号の末尾に「. 」を追加（存在しない場合）
                    const num = stepNumberMatch[1].trim();
                    data.number = num.endsWith('.') ? num + ' ' : num + '. ';
                }

                if (stepTitleMatch) {
                    data.title = stepTitleMatch[1].trim();
                } else if (data.text) {
                    data.title = data.text;
                }

                if (stepDescMatch) {
                    data.description = stepDescMatch[1].trim();
                }

                // デフォルト値の設定
                if (!data.title && data.text) {
                    data.title = data.text;
                }
                if (!data.number) {
                    data.number = '01. ';
                }
                break;

            case 'ローカルナビ':
            case '回遊リンク':
            case '関連リンク':
                // タイトルと項目を抽出
                localNavTitleMatch = detailsText.match(/(?:タイトル|見出し|title)[：:]?\s*(.+?)(?:\n|$)/mi);
                localNavItemsMatch = detailsText.match(/(?:項目|リンク|items)[：:]?\s*(.+?)(?:\n|$)/mi);

                if (localNavTitleMatch) {
                    data.title = localNavTitleMatch[1].trim();
                } else if (data.text) {
                    data.title = data.text;
                }

                if (localNavItemsMatch) {
                    data.items = localNavItemsMatch[1].split(/[,，、]/).map(item => item.trim());
                }

                // デフォルト値の設定
                if (!data.title && data.text) {
                    data.title = data.text;
                }
                if (!data.items) {
                    data.items = ['関連ページ1', '関連ページ2', '関連ページ3'];
                }
                break;

            case 'テキストカード':
                // タイトル、説明、項目を抽出
                textCardTitleMatch = detailsText.match(/(?:タイトル|見出し|title)[：:]?\s*(.+?)(?:\n|$)/mi);
                textCardDescMatch = detailsText.match(/(?:説明|description|内容)[：:]?\s*(.+?)(?:\n|$)/mi);
                textCardItemsMatch = detailsText.match(/(?:項目|リスト|items)[：:]?\s*(.+?)(?:\n|$)/mi);

                if (textCardTitleMatch) {
                    data.title = textCardTitleMatch[1].trim();
                } else if (data.text) {
                    data.title = data.text;
                }

                if (textCardDescMatch) {
                    data.description = textCardDescMatch[1].trim();
                }

                if (textCardItemsMatch) {
                    data.items = textCardItemsMatch[1].split(/[,，、]/).map(item => item.trim());
                }

                // 説明文の表示制御
                if (detailsText.match(/説明なし|no description/i)) {
                    data.noDescription = true;
                }
                if (detailsText.match(/説明非表示|hide description/i)) {
                    data.showDescription = false;
                }

                // デフォルト値の設定
                if (!data.title && data.text) {
                    data.title = data.text;
                }
                if (!data.description && !data.noDescription) {
                    data.description = 'ダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストです';
                }
                if (!data.items) {
                    data.items = ['16px_テキストが入ります', '16px_テキストが入ります', '16px_テキストが入ります', '16px_テキストが入ります', '16px_テキストが入ります', '16px_テキストが入ります'];
                }
                break;

            case '画像テキストプロフィール':
                // 画像テキストプロフィールは専用処理で既に完了しているため、
                // 追加処理は行わない
                break;
        }

        return data;
    }

    /**
     * 構造データをHTMLに変換
     * @param {Array} structure - 構造データ
     * @returns {string} - 生成されたHTML
     */
    convertToHTML(structure) {
        return structure.map(section => {
            const sectionTag = this.getSectionTag(section.name);
            const sectionClass = this.getSectionClass(section.name);

            const componentsHTML = this.groupCardComponents(section.components);

            return `
    <${sectionTag} class="${sectionClass}">
        <div class="section-inner">
        ${componentsHTML}
        </div>
    </${sectionTag}>`;
        }).join('\n');
    }

    /**
     * カードコンポーネントをグループ化してグリッドレイアウトにする
     * @param {Array} components - コンポーネント配列
     * @returns {string} - グループ化されたHTML
     */
    groupCardComponents(components) {
        let html = '';
        let cardGroup = [];

        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            // カード系コンポーネントの場合
            if (component.type === 'card' || component.type === 'text-card') {
                cardGroup.push(component);
            } else {
                // カード以外のコンポーネントが来た場合、それまでのカードをグループ化
                if (cardGroup.length > 0) {
                    html += this.renderCardGroup(cardGroup);
                    cardGroup = [];
                }
                html += component.template(component.data) + '\n        ';
            }
        }

        // 最後にカードグループが残っている場合
        if (cardGroup.length > 0) {
            html += this.renderCardGroup(cardGroup);
        }

        return html;
    }

    /**
     * カードグループをグリッドレイアウトでレンダリング
     * @param {Array} cardGroup - カードコンポーネント配列
     * @returns {string} - グリッドレイアウトHTML
     */
    renderCardGroup(cardGroup) {
        if (cardGroup.length === 1) {
            return cardGroup[0].template(cardGroup[0].data) + '\n        ';
        }

        const cardHTML = cardGroup.map(card =>
            card.template(card.data)
        ).join('\n            ');

        const gridClass = cardGroup.length === 2 ? 'c-card-grid--2-column' :
                         cardGroup.length === 3 ? 'c-card-grid--3-column' :
                         'c-card-grid';

        return `<div class="c-card-grid ${gridClass}">
            ${cardHTML}
        </div>
        `;
    }

    /**
     * セクションに適切なHTMLタグを取得
     * @param {string} sectionName - セクション名
     * @returns {string} - HTMLタグ
     */
    getSectionTag(sectionName) {
        const tagMap = {
            'ヘッダー': 'header',
            'メイン': 'main',
            'サイドバー': 'aside',
            'フッター': 'footer'
        };
        return tagMap[sectionName] || 'section';
    }

    /**
     * セクションのCSSクラスを取得
     * @param {string} sectionName - セクション名
     * @returns {string} - CSSクラス
     */
    getSectionClass(sectionName) {
        const classMap = {
            'ヘッダー': 'wf-header',
            'メイン': 'wf-main',
            'サイドバー': 'wf-sidebar',
            'フッター': 'wf-footer'
        };
        return classMap[sectionName] || 'wf-section';
    }

    /**
     * HTMLを完全なドキュメントでラップ
     * @param {string} bodyHTML - body内のHTML
     * @returns {string} - 完全なHTMLドキュメント
     */
    wrapInDocument(bodyHTML) {
        return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生成されたワイヤーフレーム</title>
    <link rel="stylesheet" href="../styles/components.css">
    <style>
        .wireframe-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .section-inner {
            padding: 20px 0;
        }
        .wf-header, .wf-main, .wf-sidebar, .wf-footer, .wf-section {
            margin-bottom: 30px;
        }
        .layout-two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        .layout-three-column {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
        }
        .layout-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        :root{--ds-font-family-roboto:'Roboto',sans-serif;--ds-font-family-noto-sans-jp:'Noto Sans JP',sans-serif;--ds-font-size-x2s:14px;--ds-font-size-sm:16px;--ds-font-size-md:18px;--ds-font-size-xl:22px;--ds-font-size-x2l:24px;--ds-font-size-x5l:32px;--ds-font-size-x8l:42px;--ds-font-weight-regular:400;--ds-font-weight-medium:500;--ds-line-height-compact:1.2;--ds-line-height-base:1.5;--ds-line-height-wide:1.9;--ds-color-primary:gray;--ds-color-text:#333;--ds-color-white:#FFF;--ds-color-background:#EEE;--ds-color-border:#DDD;--ds-color-border-dark:gray;--ds-color-placeholder:#C4C4C4;--ds-color-avatar-bg:#D9D9D9;--ds-space-x5s:4px;--ds-space-x4s:10px;--ds-space-x3s:20px;--ds-space-x2s:30px;--ds-space-xl:60px;--ds-space-25:25px;--ds-space-15:15px;--ds-radius-sm:4px;--ds-radius-md:8px;--ds-radius-xl:70px;--ds-radius-full:90px;--ds-content-width:1100px;--ds-shadow-sm:0 1px 3px rgba(0,0,0,.1);--ds-shadow-md:0 4px 6px rgba(0,0,0,.1)}*{box-sizing:border-box}body{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);line-height:var(--ds-line-height-base);color:var(--ds-color-text);margin:0;padding:0}.ds-container{max-width:1200px;margin:0 auto;padding:40px 20px}.ds-title{font-size:32px;font-weight:var(--ds-font-weight-medium);margin-bottom:40px;text-align:center;color:var(--ds-color-text)}.ds-section{margin-bottom:60px}.ds-section__title{font-size:24px;font-weight:var(--ds-font-weight-medium);margin-bottom:30px;padding-bottom:10px;border-bottom:2px solid var(--ds-color-border)}.ds-component{margin-bottom:40px}.ds-component__name{font-size:18px;font-weight:var(--ds-font-weight-medium);margin-bottom:15px;color:var(--ds-color-primary);font-family:'Monaco','Menlo','Ubuntu Mono',monospace}.ds-component__preview{padding:30px;background:#f8f9fa;border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-md)}.c-mainvisual{display:flex;align-items:center;width:100%;min-height:400px;box-sizing:border-box}.c-mainvisual--01{background-color:var(--ds-color-border);padding:85px 240px;gap:var(--ds-space-x4s)}.c-mainvisual__content{display:flex;flex-direction:column;gap:var(--ds-space-x5s);width:100%;max-width:var(--ds-content-width);margin:0 auto}.c-mainvisual .c-hgroup{width:100%}.c-mainvisual .c-hgroup__title{max-width:var(--ds-content-width);width:100%}@media (max-width:1024px){.c-mainvisual--01{padding:60px 40px}}@media (max-width:768px){.c-mainvisual--01{padding:40px 20px;min-height:300px}.c-mainvisual .c-hgroup__title{font-size:28px}}.c-hgroup{display:flex;flex-direction:column;gap:var(--ds-space-x5s);width:100%}.c-hgroup__english{font-family:var(--ds-font-family-roboto);font-size:var(--ds-font-size-x2s);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-primary);letter-spacing:.42px}.c-hgroup__main{width:100%}.c-hgroup__title{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-x8l);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:.84px;line-height:var(--ds-line-height-base);margin:0}.c-underline-duotone-head{position:relative;display:flex;align-items:center;gap:10px;padding-bottom:20px;padding-top:0;padding-left:0;padding-right:0;box-sizing:border-box;width:100%}.c-underline-duotone-head::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:1px;background:#ddd}.c-underline-duotone-head__text{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-x8l);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);letter-spacing:.42px;line-height:1.5;margin:0;flex-grow:1;min-width:0}.c-underline-duotone-head__underline{position:absolute;bottom:0;left:calc(50% - 500px);width:100px;height:1px;background:grey;transform:translateX(-50%)}@media (max-width:768px){.c-underline-duotone-head{padding-bottom:15px}.c-underline-duotone-head__text{font-size:32px;letter-spacing:.32px}.c-underline-duotone-head__underline{width:80px;left:calc(50% - 400px)}}.c-mark-head{display:flex;align-items:center;gap:10px;width:100%}.c-mark-head__marker{flex-shrink:0;width:10px;height:10px;background:grey;border-radius:50px;transform:rotate(45deg)}.c-mark-head__text{font-family:var(--ds-font-family-noto-sans-jp);font-size:26px;font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:.52px;line-height:1.5;margin:0;flex-grow:1;width:100%}@media (max-width:768px){.c-mark-head{gap:8px}.c-mark-head__marker{width:8px;height:8px}.c-mark-head__text{font-size:22px;letter-spacing:.44px}}.c-heading{font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);line-height:var(--ds-line-height-base);margin:0 0 15px 0}.c-heading--x2l{font-size:20px;letter-spacing:1.2px}.c-heading--x3l{font-size:24px;letter-spacing:1.44px}.c-heading--x4l{font-size:28px;letter-spacing:1.68px}.c-heading--x5l{font-size:32px;letter-spacing:1.92px}.c-heading--x6l{font-size:36px;letter-spacing:2.16px}.c-subtext-btn{display:flex;align-items:center;gap:var(--ds-space-x4s);padding:var(--ds-space-x3s) var(--ds-space-x3s) var(--ds-space-x3s) var(--ds-space-25);background:var(--ds-color-white);border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-full);font-family:var(--ds-font-family-noto-sans-jp);color:var(--ds-color-text);cursor:pointer;text-decoration:none;transition:all 0.3s ease;min-width:268px;min-height:60px}.c-subtext-btn:hover{background:var(--ds-color-text);color:var(--ds-color-white)}.c-subtext-btn__content{display:flex;flex-direction:column;flex-grow:1;gap:2px}.c-subtext-btn__text{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-medium);letter-spacing:.96px;line-height:var(--ds-line-height-base)}.c-subtext-btn__subtext{font-size:12px;font-weight:var(--ds-font-weight-medium);letter-spacing:.72px;line-height:var(--ds-line-height-base)}.c-subtext-btn__arrow{flex-shrink:0;width:16px;height:16px}.c-round-ghost-btn{display:flex;align-items:center;gap:var(--ds-space-x4s);padding:var(--ds-space-x3s) var(--ds-space-x3s) var(--ds-space-x3s) var(--ds-space-25);background:var(--ds-color-white);border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-full);font-family:var(--ds-font-family-noto-sans-jp);color:var(--ds-color-text);cursor:pointer;text-decoration:none;transition:all 0.3s ease;min-width:268px;min-height:60px}.c-round-ghost-btn:hover{background:var(--ds-color-text);color:var(--ds-color-white)}.c-round-ghost-btn__text{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-medium);letter-spacing:.96px;line-height:var(--ds-line-height-base);flex-grow:1}.c-round-ghost-btn__arrow{flex-shrink:0;width:16px;height:16px}.c-round-ghost-btn__arrow--left{order:-1}.c-round-ghost-btn__icon{flex-shrink:0;width:20px;height:20px}.c-round-ghost-btn--reverse{flex-direction:row-reverse}.c-round-ghost-btn--icon-small .c-round-ghost-btn__text{flex-grow:1}.c-text-btn{display:flex;align-items:center;gap:var(--ds-space-x4s);background:none;border:none;font-family:var(--ds-font-family-noto-sans-jp);color:var(--ds-color-text);cursor:pointer;text-decoration:none;transition:opacity 0.3s ease}.c-text-btn:hover{opacity:.7}.c-text-btn__text{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-medium);letter-spacing:.96px;line-height:var(--ds-line-height-base)}.c-text-btn__icon{width:12px;height:12px;background:var(--ds-color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center}.c-card{display:flex;flex-direction:column;background:var(--ds-color-white);border-radius:var(--ds-radius-md);overflow:hidden;box-shadow:var(--ds-shadow-sm);max-width:354px}.c-card__image{width:100%;aspect-ratio:354/199}.c-card__img{width:100%;height:100%;background:#C4C4C4;display:block}.c-card__content{padding:30px;display:flex;flex-direction:column;justify-content:space-between;gap:15px;border:1px solid var(--ds-color-border);border-top:none;position:relative}.c-card__tags{display:flex;gap:var(--ds-space-x5s);flex-wrap:wrap}.c-tag{display:inline-flex;align-items:center;justify-content:center;padding:var(--ds-space-x5s) var(--ds-space-x4s);background:var(--ds-color-white);border:1px solid var(--ds-color-border);font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-x2s);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:.84px;line-height:var(--ds-line-height-base);opacity:.7}.c-card__title{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-xl);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:1.32px;line-height:var(--ds-line-height-base);margin:0}.c-card__description{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);letter-spacing:.96px;line-height:1.9;margin:0}.c-card__main{display:flex;flex-direction:column;gap:10px}.c-card__action{display:flex;justify-content:flex-end;align-self:flex-end}.c-card__action .c-text-btn{padding:0;background:none;border:none;display:flex;align-items:center;gap:10px;cursor:pointer}.c-card__action .c-text-btn__text{font-family:var(--ds-font-family-noto-sans-jp);font-size:16px;font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:.96px;line-height:1.5}.c-card__action .c-text-btn__icon{width:31.25px;height:31.25px;background:gray;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}.c-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(354px,1fr));gap:30px;width:100%}.c-card-grid--2-column{grid-template-columns:repeat(2,1fr)}.c-card-grid--3-column{grid-template-columns:repeat(3,1fr)}@media (max-width:768px){.c-card-grid{grid-template-columns:1fr;gap:20px}.c-card-grid--2-column,.c-card-grid--3-column{grid-template-columns:1fr}}.c-info-card{display:flex;flex-direction:column;gap:var(--ds-space-x3s);padding:var(--ds-space-x2s);background:var(--ds-color-background);border-radius:var(--ds-radius-md);max-width:353px}.c-info-card__header{display:flex;gap:var(--ds-space-x3s);align-items:center;padding-bottom:var(--ds-space-x3s);border-bottom:1px solid var(--ds-color-border)}.c-info-card__avatar{flex-shrink:0;width:var(--ds-radius-xl);height:var(--ds-radius-xl);border-radius:50%;overflow:hidden;background:var(--ds-color-avatar-bg)}.c-info-card__img{width:100%;height:100%;object-fit:cover;display:block}.c-info-card__title{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-md);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:1.08px;line-height:var(--ds-line-height-base);margin:0;flex-grow:1}.c-info-card__description{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);letter-spacing:.96px;line-height:var(--ds-line-height-wide);margin:0}.c-summary-card{padding:var(--ds-space-x2s);background:var(--ds-color-white);border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-md);width:100%;max-width:var(--ds-content-width)}.c-summary-card__title{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-xl);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);margin:0 0 15px 0}.c-summary-card__description{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);line-height:var(--ds-line-height-wide);margin:0}.c-anchor-buttons{display:flex;flex-direction:column;gap:var(--ds-space-x4s);width:100%;max-width:var(--ds-content-width)}.c-anchor-buttons__row{display:flex;gap:var(--ds-space-x4s)}.c-anchor-btn{display:flex;align-items:center;justify-content:space-between;flex:1;padding:var(--ds-space-x3s) var(--ds-space-x3s) var(--ds-space-x3s) var(--ds-space-25);background:var(--ds-color-white);border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-full);font-family:var(--ds-font-family-noto-sans-jp);color:var(--ds-color-text);cursor:pointer;text-decoration:none;transition:all 0.3s ease;min-height:60px;min-width:268px}.c-anchor-btn:hover{background:var(--ds-color-text);color:var(--ds-color-white)}.c-anchor-btn__text{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-medium);letter-spacing:.96px;line-height:var(--ds-line-height-base);flex-grow:1;text-align:left}.c-anchor-btn__arrow{flex-shrink:0;width:16px;height:16px}.c-description-table{width:100%;max-width:var(--ds-content-width);border-collapse:collapse;font-family:var(--ds-font-family-noto-sans-jp)}.c-description-table__row{display:flex;align-items:stretch}.c-description-table__header{display:flex;align-items:center;width:230px;padding:var(--ds-space-x2s) var(--ds-space-x3s);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:.96px;line-height:var(--ds-line-height-base);border-bottom:1px solid var(--ds-color-border-dark);background:none;text-align:left}.c-description-table__data{display:flex;flex-direction:column;justify-content:center;gap:var(--ds-space-x4s);flex:1;padding:var(--ds-space-x2s) var(--ds-space-x3s);border-bottom:1px solid var(--ds-color-border)}.c-description-table__text{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);letter-spacing:.96px;line-height:var(--ds-line-height-base);margin:0}.c-text-link{color:var(--ds-color-primary);text-decoration:underline;cursor:pointer}.c-text-link:hover{opacity:.7}.c-disc-list{margin:0;padding-left:20px;font-family:var(--ds-font-family-noto-sans-jp);width:100%;max-width:var(--ds-content-width)}.c-disc-list__item{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);line-height:var(--ds-line-height-base);margin-bottom:8px}.c-disc-list__item:last-child{margin-bottom:0}.c-card__list{margin-top:16px;margin-bottom:0;font-size:var(--ds-font-size-sm)}.c-card__list .c-disc-list__item{margin-bottom:6px}.c-card__list .c-disc-list__item:last-child{margin-bottom:0}.c-decimal-list{margin:0;padding-left:20px;font-family:var(--ds-font-family-noto-sans-jp);width:100%;max-width:var(--ds-content-width)}.c-decimal-list__item{font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);line-height:var(--ds-line-height-base);margin-bottom:8px}.c-decimal-list__item:last-child{margin-bottom:0}@media (max-width:768px){.c-anchor-buttons__row{flex-direction:column}.c-anchor-btn{min-width:auto}.c-description-table__row{flex-direction:column}.c-description-table__header{width:100%;border-bottom:none;border-right:none}.c-description-table__data{border-left:none}.c-card,.c-info-card{max-width:100%}}.u-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}.u-margin-bottom-none{margin-bottom:0!important}.u-text-center{text-align:center!important}.c-set-half{display:flex;gap:80px;align-items:flex-start;width:100%}.c-set-half+.c-set-half{margin-top:60px}.c-set-half__content{flex:1;display:flex;flex-direction:column;gap:30px;min-width:0}.c-set-half__title{width:100%}.c-set-half__title .c-heading{margin:0;font-size:29px;font-weight:500;line-height:1.5;letter-spacing:1.74px;color:#333}.c-set-half__text{width:100%}.c-set-half__text p{margin:0;font-size:16px;font-weight:400;line-height:1.9;letter-spacing:1.28px;color:#333}.c-set-half__button{display:flex;align-items:center}.c-set-half__image{flex-shrink:0}.c-set-half__image-placeholder{width:510px;height:287px;background-color:var(--ds-color-border);border-radius:0}.c-text-btn{display:flex;align-items:center;gap:15px;background:none;border:none;padding:0;cursor:pointer;font-family:'Noto Sans JP',sans-serif}.c-text-btn__text{font-size:16px;font-weight:500;line-height:1.5;letter-spacing:.96px;color:#333;white-space:nowrap}.c-text-btn__icon{display:inline-block;width:50px;height:50px;background-color:grey;border-radius:50%;position:relative;flex-shrink:0}.c-text-btn__icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.07999' stroke='white' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-size:contain;background-repeat:no-repeat;background-position:center}@media (max-width:768px){.c-set-half{flex-direction:column;gap:var(--ds-space-xl)}.c-set-half__image-placeholder{width:100%;height:auto;aspect-ratio:16/9}}.c-overlap-set{position:relative;width:100%;height:480px;margin-bottom:180px}.c-overlap-set__background{position:absolute;top:0;left:0;width:100%;height:100%}.c-overlap-set__image-placeholder{width:100%;height:480px;background-color:#DDD}.c-overlap-set__content{position:absolute;left:50%;top:calc(50% + 245px);transform:translate(-50%,-50%);background-color:#FFF;padding:60px;display:flex;flex-direction:column;gap:30px;width:1100px;max-width:calc(100vw - 40px);box-shadow:0 4px 16px rgba(0,0,0,.1)}.c-overlap-set__title{width:100%}.c-overlap-set__title .c-heading{margin:0;font-size:32px;font-weight:500;line-height:1.5;letter-spacing:1.92px;color:#333;font-family:'Noto Sans JP',sans-serif}.c-overlap-set__text{width:100%}.c-overlap-set__text p{margin:0;font-size:16px;font-weight:400;line-height:1.9;letter-spacing:1.28px;color:#333;font-family:'Noto Sans JP',sans-serif}.c-overlap-set+.c-overlap-set{margin-top:60px}@media (max-width:1200px){.c-overlap-set__content{width:calc(100% - 80px);padding:40px}}@media (max-width:768px){.c-overlap-set{height:auto;min-height:400px;margin-bottom:30px}.c-overlap-set__image-placeholder{height:300px}.c-overlap-set__content{position:static;transform:none;margin-top:-60px;width:calc(100% - 40px);margin-left:20px;margin-right:20px;padding:30px;gap:20px}.c-overlap-set__title .c-heading{font-size:24px;letter-spacing:1.2px}}.c-set-vertical{display:flex;flex-direction:column;gap:10px;width:100%}.c-set-vertical__content{display:flex;flex-direction:column;gap:40px;align-items:center;width:100%}.c-set-vertical__text-content{display:flex;flex-direction:column;gap:20px;width:100%}.c-set-vertical__title{width:100%;max-width:1100px}.c-set-vertical__title .c-heading{margin:0;font-size:32px;font-weight:500;line-height:1.5;letter-spacing:1.92px;color:#333;font-family:'Noto Sans JP',sans-serif}.c-set-vertical__text{width:100%;max-width:1100px}.c-set-vertical__text p{margin:0;font-size:16px;font-weight:400;line-height:1.9;letter-spacing:1.28px;color:#333;font-family:'Noto Sans JP',sans-serif}.c-set-vertical__images{display:flex;gap:60px;align-items:center;justify-content:center;width:100%}.c-set-vertical__image{flex-shrink:0}.c-set-vertical__image-placeholder{width:520px;height:322px;background-color:#DDD;border-radius:0}.c-set-vertical+.c-set-vertical{margin-top:60px}@media (max-width:1200px){.c-set-vertical__images{gap:40px}.c-set-vertical__image-placeholder{width:calc((100vw - 120px) / 2);height:auto;aspect-ratio:520/322}}@media (max-width:768px){.c-set-vertical__images{flex-direction:column;gap:30px}.c-set-vertical__image-placeholder{width:100%;max-width:520px}.c-set-vertical__title .c-heading{font-size:24px;letter-spacing:1.2px}.c-set-vertical__content{gap:30px}}.c-summary-card{display:flex;gap:80px;align-items:flex-start;width:100%;padding:60px;background-color:#EEE;box-sizing:border-box}.c-summary-card__header{width:220px;flex-shrink:0}.c-summary-card__header .c-hgroup__english{font-family:'Roboto',sans-serif;font-size:14px;font-weight:500;line-height:1.2;letter-spacing:.42px;color:grey;margin-bottom:4px}.c-summary-card__header .c-hgroup__title--xl{font-size:42px;font-weight:500;line-height:1.5;letter-spacing:.84px;color:#333;font-family:'Noto Sans JP',sans-serif;margin:0}.c-summary-card__content{flex:1;min-width:0}.c-summary-card__text-content{display:flex;flex-direction:column;gap:20px;width:100%}.c-summary-card__title{width:100%}.c-summary-card__title .c-heading{margin:0;font-size:24px;font-weight:500;line-height:1.5;letter-spacing:1.44px;color:#333;font-family:'Noto Sans JP',sans-serif}.c-summary-card__text{width:100%}.c-summary-card__text p{margin:0;font-size:16px;font-weight:400;line-height:1.9;letter-spacing:.96px;color:#333;font-family:'Noto Sans JP',sans-serif}.c-summary-card__button{display:flex;align-items:center}.c-text-btn--small{gap:10px}.c-text-btn--small .c-text-btn__icon--small{width:31.25px;height:31.25px;background-color:grey}.c-summary-card+.c-summary-card{margin-top:60px}@media (max-width:1024px){.c-summary-card{flex-direction:column;gap:40px;padding:40px}.c-summary-card__header{width:100%}.c-summary-card__header .c-hgroup__title--xl{font-size:32px;letter-spacing:.64px}}@media (max-width:768px){.c-summary-card{padding:30px;gap:30px}.c-summary-card__header .c-hgroup__title--xl{font-size:28px;letter-spacing:.56px}.c-summary-card__title .c-heading{font-size:20px;letter-spacing:1.2px}.c-summary-card__text-content{gap:15px}}.c-fullborder-table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid #ddd;border-bottom:none;border-right:none;background:var(--ds-color-white)}.c-fullborder-table__head{display:table-header-group}.c-fullborder-table__body{display:table-row-group}.c-fullborder-table__row{display:table-row}.c-fullborder-table__header{background:#eee;padding:20px 30px;min-height:64px;vertical-align:middle;text-align:left;font-family:var(--ds-font-family-noto-sans-jp);font-size:15px;font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);letter-spacing:.9px;line-height:1.5;border-right:1px solid #ddd;border-bottom:1px solid #ddd;box-sizing:border-box}.c-fullborder-table__data{background:var(--ds-color-white);padding:20px 30px;min-height:64px;vertical-align:middle;text-align:left;border-right:1px solid #ddd;border-bottom:1px solid #ddd;box-sizing:border-box}.c-fullborder-table--two-column .c-fullborder-table__header:first-child,.c-fullborder-table--two-column .c-fullborder-table__data:first-child{width:260px}.c-fullborder-table__text{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);color:var(--ds-color-text);letter-spacing:.96px;line-height:1.5;margin:0}@media (max-width:768px){.c-fullborder-table__header{width:200px;padding:15px 20px;font-size:14px;letter-spacing:.84px}.c-fullborder-table__data{padding:15px 20px}.c-fullborder-table__text{font-size:14px;letter-spacing:.84px}}.section-inner>*+*{margin-top:80px}.section-inner .c-mainvisual+*{margin-top:120px}.section-inner *+.c-summary-card{margin-top:100px}@media (max-width:768px){.section-inner>*+*{margin-top:60px}.section-inner .c-mainvisual+*{margin-top:80px}.section-inner *+.c-summary-card{margin-top:70px}}.c-framed-faq{width:100%;max-width:100%}.c-framed-faq__item{border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-md);overflow:hidden;background:var(--ds-color-white)}.c-framed-faq__question{background:var(--ds-color-background);border-bottom:1px solid var(--ds-color-border)}.c-framed-faq__q-header{display:flex;align-items:center;gap:var(--ds-space-x3s);padding:var(--ds-space-x3s) var(--ds-space-x2s)}.c-framed-faq__icon{display:flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;flex-shrink:0}.c-framed-faq__icon--question{background:var(--ds-color-primary)}.c-framed-faq__icon--answer{background:var(--ds-color-background)}.c-framed-faq__icon-text{font-family:var(--ds-font-family-roboto);font-size:26px;font-weight:var(--ds-font-weight-regular);line-height:1.2;color:var(--ds-color-white);letter-spacing:.78px}.c-framed-faq__icon--answer .c-framed-faq__icon-text{color:var(--ds-color-text)}.c-framed-faq__question-text{flex:1;min-width:0}.c-framed-faq__question-text p{font-family:var(--ds-font-family-noto-sans-jp);font-size:20px;font-weight:var(--ds-font-weight-medium);line-height:1.5;color:var(--ds-color-text);letter-spacing:1.2px;margin:0}.c-framed-faq__toggle{width:24px;height:24px;flex-shrink:0;display:flex;align-items:center;justify-content:center}.c-framed-faq__toggle svg{width:24px;height:24px;color:var(--ds-color-primary)}.c-framed-faq__answer{background:var(--ds-color-white);border-top:1px solid var(--ds-color-border)}.c-framed-faq__a-content{display:flex;align-items:flex-start;gap:var(--ds-space-15);padding:var(--ds-space-x2s) var(--ds-space-x3s)}.c-framed-faq__answer-content{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--ds-space-x2s)}.c-framed-faq__answer-text{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);letter-spacing:.96px;margin:0}.c-framed-faq__link{margin-top:var(--ds-space-x2s)}.c-framed-faq+.c-framed-faq{margin-top:var(--ds-space-x4s)}.c-framed-faq__item[data-state="closed"] .c-framed-faq__answer{display:none}.c-framed-faq__item[data-state="closed"] .c-framed-faq__toggle svg{transform:rotate(-90deg)}.c-framed-faq__item[data-state="open"] .c-framed-faq__toggle svg{transform:rotate(0deg)}@media (max-width:768px){.c-framed-faq__q-header{padding:var(--ds-space-15) var(--ds-space-x3s);gap:var(--ds-space-15)}.c-framed-faq__a-content{padding:var(--ds-space-x3s);gap:var(--ds-space-x4s)}.c-framed-faq__icon{width:40px;height:40px}.c-framed-faq__icon-text{font-size:20px}.c-framed-faq__question-text p{font-size:18px}.c-framed-faq__answer-text{font-size:14px}}.c-vertical-step{width:100%;max-width:100%}.c-vertical-step__item{display:flex;flex-direction:column;align-items:center;gap:var(--ds-space-x4s)}.c-vertical-step__content{background:var(--ds-color-background);padding:var(--ds-space-x3s) var(--ds-space-x2s);border-radius:var(--ds-radius-md);width:100%;display:flex;align-items:center;gap:40px}.c-vertical-step__icon{display:flex;align-items:center;justify-content:center;width:108px;height:108px;background:var(--ds-color-white);border-radius:54px;flex-shrink:0;padding:29px;box-sizing:border-box}.c-vertical-step__icon-placeholder{width:50px;height:50px;background:var(--ds-color-avatar-bg);border-radius:var(--ds-radius-sm)}.c-vertical-step__text-content{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--ds-space-x4s)}.c-vertical-step__header{display:flex;align-items:flex-start;gap:var(--ds-space-x4s);width:100%}.c-vertical-step__number{font-family:var(--ds-font-family-roboto);font-size:20px;font-weight:var(--ds-font-weight-regular);line-height:1.2;color:var(--ds-color-text);letter-spacing:.6px;flex-shrink:0;width:38px;padding-top:3px}.c-vertical-step__title{flex:1;min-width:0}.c-vertical-step__title h3{font-family:var(--ds-font-family-noto-sans-jp);font-size:20px;font-weight:var(--ds-font-weight-medium);line-height:1.5;color:var(--ds-color-text);letter-spacing:1.2px;margin:0}.c-vertical-step__description{width:100%}.c-vertical-step__description p{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-md);font-weight:var(--ds-font-weight-regular);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);letter-spacing:1.08px;margin:0}.c-vertical-step__arrow{width:18px;height:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.c-vertical-step__arrow svg{width:18px;height:18px;color:var(--ds-color-text)}.c-vertical-step+.c-vertical-step{margin-top:var(--ds-space-x4s)}.c-step-group{display:flex;flex-direction:column;gap:var(--ds-space-x4s)}.c-step-group .c-vertical-step:last-child .c-vertical-step__arrow{display:none}@media (max-width:768px){.c-vertical-step__content{padding:var(--ds-space-x3s);gap:var(--ds-space-x3s);flex-direction:column;text-align:center}.c-vertical-step__icon{width:80px;height:80px;border-radius:40px;padding:20px}.c-vertical-step__icon-placeholder{width:40px;height:40px}.c-vertical-step__header{flex-direction:column;gap:var(--ds-space-x4s);align-items:center;text-align:center}.c-vertical-step__number{width:auto;text-align:center;padding-top:0}.c-vertical-step__title h3{font-size:18px;text-align:center}.c-vertical-step__description p{font-size:var(--ds-font-size-sm);text-align:center}}.c-localav{width:100%;max-width:100%;display:flex;flex-direction:column;gap:var(--ds-space-x2s)}.c-localav__heading{margin-bottom:var(--ds-space-x2s)}.c-localav__heading .c-heading{font-size:29px;font-weight:var(--ds-font-weight-medium);letter-spacing:1.74px}.c-localav__links{display:flex;flex-direction:column;gap:var(--ds-space-x3s)}.c-localav__row{display:flex;gap:var(--ds-space-x3s);width:100%}.c-localav__item{flex:1;background:var(--ds-color-white);border:1px solid var(--ds-color-border);padding:var(--ds-space-x2s) 40px;display:flex;align-items:center;gap:var(--ds-space-15);cursor:pointer;transition:all 0.2s ease;min-height:80px}.c-localav__item:hover{border-color:var(--ds-color-primary);background-color:#f9f9f9}.c-localav__english{font-family:var(--ds-font-family-roboto);font-size:12px;font-weight:600;line-height:1.2;color:grey;letter-spacing:.36px;text-transform:uppercase;flex-shrink:0}.c-localav__text{flex:1;font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-medium);line-height:1.5;color:var(--ds-color-text);letter-spacing:.96px}.c-localav__arrow{width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.c-localav__arrow svg{width:16px;height:16px;color:var(--ds-color-text)}@media (max-width:768px){.c-localav__row{flex-direction:column;gap:var(--ds-space-x4s)}.c-localav__item{padding:var(--ds-space-x3s) var(--ds-space-x2s);min-height:70px}.c-localav__heading .c-heading{font-size:24px}.c-localav__english{font-size:10px}.c-localav__text{font-size:14px}}@media (max-width:480px){.c-localav__item{flex-direction:column;text-align:center;gap:var(--ds-space-x4s);min-height:auto;padding:var(--ds-space-x3s)}.c-localav__english{width:100%}.c-localav__text{width:100%}.c-localav__arrow{transform:rotate(90deg)}}.c-paragraph{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);margin:0}.c-text-card{background:var(--ds-color-white);border:1px solid #ddd;display:flex;flex-direction:column;gap:25px;padding:50px;max-width:354px;box-sizing:border-box}.c-text-card__content{display:flex;flex-direction:column;gap:30px}.c-text-card__header{padding-bottom:30px;border-bottom:1px solid grey}.c-text-card__title{font-family:var(--ds-font-family-noto-sans-jp);font-size:24px;font-weight:var(--ds-font-weight-medium);line-height:1.5;color:var(--ds-color-text);letter-spacing:1.44px;margin:0}.c-text-card__description{width:100%}.c-text-card__description p{font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-regular);line-height:1.9;color:var(--ds-color-text);letter-spacing:.96px;margin:0}.c-text-card__highlight{background:#eee;padding:20px 30px;box-sizing:border-box;flex-grow:1}.c-text-card__list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:5px}.c-text-card__list-item{display:flex;align-items:flex-start;gap:8px;font-family:var(--ds-font-family-noto-sans-jp);font-size:15px;font-weight:var(--ds-font-weight-regular);line-height:1.5;color:var(--ds-color-text);letter-spacing:.75px}.c-text-card__list-item::before{content:'';width:6px;height:6px;background:var(--ds-color-primary);border-radius:50%;flex-shrink:0;margin-top:4px}@media (max-width:768px){.c-text-card{padding:30px 20px;gap:20px}.c-text-card__content{gap:20px}.c-text-card__header{padding-bottom:20px;gap:12px}.c-text-card__icon{width:32px;height:32px}.c-text-card__icon svg{width:20px;height:20px}.c-text-card__title{font-size:20px;letter-spacing:1.2px}.c-text-card__description p{font-size:14px;letter-spacing:.84px}.c-text-card__highlight{padding:15px 20px}.c-text-card__list-item{font-size:14px;letter-spacing:.7px}}.c-info-step{display:flex;flex-direction:column;gap:50px}.c-info-step__header{margin-bottom:0}.c-info-step__content{display:flex;gap:30px;padding:50px 0;border-top:1px solid var(--ds-color-border);border-bottom:1px solid var(--ds-color-border)}.c-info-step__text{flex:1;display:flex;flex-direction:column;gap:20px}.c-info-step__title{margin-bottom:4px}.c-info-step__title h3{font-family:var(--ds-font-family-noto-sans-jp);font-size:20px;font-weight:var(--ds-font-weight-medium);line-height:var(--ds-line-height-base);color:var(--ds-color-text);letter-spacing:1.2px;margin:0}.c-info-step__description{display:flex;flex-direction:column;gap:4px}.c-info-step__note{display:flex;gap:2px;align-items:flex-start;font-family:var(--ds-font-family-noto-sans-jp);font-size:var(--ds-font-size-x2s);font-weight:var(--ds-font-weight-regular);line-height:var(--ds-line-height-wide);color:grey;letter-spacing:.84px;margin-top:4px}.c-info-step__note-mark{flex-shrink:0}.c-info-step__note-text{flex-shrink:0;white-space:nowrap}.c-info-step__image{position:relative;width:400px;height:225px;flex-shrink:0}.c-info-step__img{width:100%;height:100%;background-color:var(--ds-color-avatar-bg)}.c-info-step__dummy{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:rgba(0,0,0,.5);color:#fff;font-family:var(--ds-font-family-noto-sans-jp);font-size:10px;font-weight:var(--ds-font-weight-medium);line-height:var(--ds-line-height-base);letter-spacing:.5px;padding:1px 7px 3px;border-radius:var(--ds-radius-sm)}@media (max-width:768px){.c-info-step__content{flex-direction:column;gap:20px;padding:30px 0}.c-info-step__image{width:100%;height:auto;aspect-ratio:16/9;max-width:400px;margin:0 auto}.c-info-step__title h3{font-size:18px}}.c-track-history{display:flex;gap:var(--ds-space-x2s);align-items:center;width:100%;position:relative}.c-track-history__date{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;flex-shrink:0;width:95px;min-width:67px}.c-track-history__year{font-family:var(--ds-font-family-roboto);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-x5l);line-height:var(--ds-line-height-compact);color:var(--ds-color-text);letter-spacing:.96px;margin:0}.c-track-history__month-day{display:flex;align-items:center;justify-content:flex-start;gap:var(--ds-space-x4s);padding-left:var(--ds-space-x5s);font-family:var(--ds-font-family-roboto);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-md);line-height:var(--ds-line-height-compact);color:var(--ds-color-text);letter-spacing:.54px;white-space:nowrap;margin:0}.c-track-history__content{display:flex;flex:1;gap:var(--ds-space-x3s);align-items:center;min-height:1px;min-width:1px;padding-bottom:var(--ds-space-x2s);padding-top:var(--ds-space-x5s);position:relative}.c-track-history__indicator{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:30px;height:30px}.c-track-history__dot{width:9px;height:9px;background-color:var(--ds-color-text);flex-shrink:0}.c-track-history__line{width:90px;height:1px;min-width:25px;background-color:var(--ds-color-text);flex-shrink:0}.c-track-history__text{flex:1;min-width:204px;font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-sm);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);letter-spacing:.96px;margin:0;padding:0}.c-track-history__vertical-line{position:absolute;left:var(--ds-space-x5s);top:0;bottom:0;width:0;display:flex;align-items:center;justify-content:center}.c-track-history__vertical-line::after{content:'';width:1px;height:64px;background-color:var(--ds-color-text);transform:rotate(90deg)}@media (max-width:768px){.c-track-history{gap:var(--ds-space-x3s)}.c-track-history__date{width:70px;min-width:50px}.c-track-history__year{font-size:24px}.c-track-history__month-day{font-size:var(--ds-font-size-sm)}.c-track-history__line{width:60px}.c-track-history__text{min-width:auto}}.c-image-text-profile{display:flex;flex-direction:column;gap:var(--ds-space-xl);align-items:center;width:100%;max-width:var(--ds-contents-width,1100px);margin:0 auto;padding:var(--ds-space-x3s);box-sizing:border-box}.c-image-text-profile__header{display:flex;flex-direction:column;gap:var(--ds-space-x2s);align-items:flex-start;width:100%}.c-image-text-profile__content{display:flex;gap:var(--ds-space-md,80px);align-items:flex-start;width:100%}.c-image-text-profile__image{flex-shrink:0;width:360px;height:450px}.c-image-text-profile__img{width:100%;height:100%;background-color:var(--ds-color-background);border-radius:var(--ds-radius-sm)}.c-image-text-profile__text{display:flex;flex-direction:column;gap:var(--ds-space-xl);align-items:flex-start;justify-content:center;flex:1;min-height:1px;min-width:1px}.c-image-text-profile__heading{width:100%}.c-image-text-profile__heading h3{font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-medium);font-size:29px;line-height:var(--ds-line-height-base);color:var(--ds-color-text);letter-spacing:1.74px;margin:0}.c-image-text-profile__description{width:100%}.c-image-text-profile__description p{font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-sm);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);letter-spacing:.96px;margin:0 0 var(--ds-space-x3s) 0}.c-image-text-profile__description p:last-child{margin-bottom:0}.c-image-text-profile__signature{display:flex;flex-direction:column;gap:var(--ds-space-x4s);align-items:flex-end;justify-content:flex-end;width:100%}.c-image-text-profile__signature-text{text-align:right}.c-image-text-profile__signature-text p{font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-sm);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);letter-spacing:.96px;margin:0;white-space:nowrap}.c-image-text-profile__signature-img{width:228px;height:68px;background-color:#dfdfdf;border-radius:var(--ds-radius-sm);flex-shrink:0}@media (max-width:768px){.c-image-text-profile__content{flex-direction:column;gap:var(--ds-space-x3s)}.c-image-text-profile__image{width:100%;max-width:360px;margin:0 auto}.c-image-text-profile__signature{align-items:center}.c-image-text-profile__signature-text{text-align:center}}.c-point-card{display:flex;gap:var(--ds-space-xl);align-items:flex-start;padding:var(--ds-space-xl);background-color:var(--ds-color-background);width:100%;box-sizing:border-box}.c-point-card__label{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;width:180px;flex-shrink:0;font-family:var(--ds-font-family-roboto);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-x2l);line-height:var(--ds-line-height-compact);color:var(--ds-color-text);letter-spacing:.72px}.c-point-card__content{display:flex;flex:1;gap:var(--ds-space-xl);align-items:flex-start;min-height:1px;min-width:1px;position:relative}.c-point-card__divider{width:1px;height:136px;background-color:var(--ds-color-text);flex-shrink:0;align-self:flex-start}.c-point-card__list{display:flex;flex-direction:column;gap:var(--ds-space-x3s);flex:1;min-height:1px;min-width:1px}.c-point-card__item{display:flex;gap:8px;align-items:center;width:100%}.c-point-card__check{width:30px;height:30px;flex-shrink:0;background-color:var(--ds-color-text);border-radius:4px;display:flex;align-items:center;justify-content:center;position:relative}.c-point-card__check::after{content:'✓';color:var(--ds-color-white);font-size:16px;font-weight:700}.c-point-card__text{flex:1;display:flex;align-items:center;min-height:1px;min-width:1px}.c-point-card__text p{flex:1;font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-sm);line-height:var(--ds-line-height-base);color:var(--ds-color-text);letter-spacing:1.6px;margin:0;min-height:1px;min-width:1px}@media (max-width:768px){.c-point-card{flex-direction:column;gap:var(--ds-space-x2s);padding:var(--ds-space-x2s)}.c-point-card__label{width:100%;font-size:var(--ds-font-size-xl)}.c-point-card__content{flex-direction:column;gap:var(--ds-space-x3s)}.c-point-card__divider{width:100%;height:1px}.c-point-card__text p{letter-spacing:.8px}}.ds-navigation{position:sticky;top:0;background:var(--ds-color-white);border-bottom:1px solid var(--ds-color-border);z-index:100;box-shadow:0 2px 4px rgba(0,0,0,.1)}.ds-navigation__container{display:flex;flex-wrap:wrap;gap:2rem;padding:1rem;max-width:1200px;margin:0 auto}.ds-navigation__category{display:flex;flex-direction:row;flex-wrap:wrap;gap:.5rem;align-items:center}.ds-navigation__category-title{font-family:var(--ds-font-family-roboto);font-weight:var(--ds-font-weight-medium);font-size:var(--ds-font-size-sm);color:var(--ds-color-primary);margin-right:.75rem;padding:.25rem .5rem;background:var(--ds-color-background);border-radius:var(--ds-radius-sm);border:1px solid var(--ds-color-border);white-space:nowrap;flex-shrink:0}.ds-navigation__category a{padding:.25rem .75rem;background:var(--ds-color-background);border-radius:var(--ds-radius-sm);text-decoration:none;color:var(--ds-color-text);font-size:var(--ds-font-size-x2s);transition:background-color 0.2s;border:1px solid transparent}.ds-navigation__category a:hover{background:var(--ds-color-border);border-color:var(--ds-color-primary)}.ds-category{margin-bottom:4rem;border-bottom:2px solid var(--ds-color-border);padding-bottom:2rem}.ds-category:last-child{border-bottom:none;margin-bottom:2rem}.ds-category__title{font-family:var(--ds-font-family-roboto);font-size:var(--ds-font-size-x2l);font-weight:var(--ds-font-weight-medium);color:var(--ds-color-text);margin-bottom:2rem;padding:1rem;border-bottom:1px solid var(--ds-color-border);background:linear-gradient(135deg,#f8f9fa 0%,var(--ds-color-background) 100%);border-radius:var(--ds-radius-md);border-left:4px solid var(--ds-color-primary)}html{scroll-behavior:smooth}@media (max-width:768px){.ds-navigation__container{flex-direction:column;gap:1rem}.ds-navigation__category{flex-direction:column;align-items:flex-start;gap:.5rem}.ds-navigation__category-title{width:auto;margin-right:0;margin-bottom:.5rem}.ds-category__title{font-size:var(--ds-font-size-xl);padding:.75rem}}
        .timeline{display:flex;flex-direction:column;gap:0;width:100%;max-width:var(--ds-content-width);margin:0 auto}.timeline__item{display:flex;align-items:flex-start;gap:var(--ds-space-x3s);position:relative;padding:var(--ds-space-x3s) 0}.timeline__date{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;flex-shrink:0;min-width:95px;font-family:var(--ds-font-family-roboto);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-x5l);line-height:var(--ds-line-height-compact);color:var(--ds-color-text);letter-spacing:.96px}.timeline__date-sub{display:block;font-size:var(--ds-font-size-md);line-height:var(--ds-line-height-compact);letter-spacing:.54px;padding-left:var(--ds-space-x5s);margin-top:var(--ds-space-x5s)}.timeline__indicator{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:30px;height:30px;position:relative;z-index:2}.timeline__indicator::before{content:'';width:9px;height:9px;background-color:var(--ds-color-text);border-radius:50%}.timeline__line{position:absolute;left:108px;top:30px;width:1px;height:100%;background-color:var(--ds-color-text);z-index:1}.timeline__text{flex:1;min-width:204px;font-family:var(--ds-font-family-noto-sans-jp);font-weight:var(--ds-font-weight-regular);font-size:var(--ds-font-size-sm);line-height:var(--ds-line-height-wide);color:var(--ds-color-text);letter-spacing:.96px;margin:0;padding-top:5px}.timeline__item:last-child .timeline__line{display:none}@media (max-width:768px){.timeline__item{gap:var(--ds-space-x4s);padding:var(--ds-space-x4s) 0}.timeline__date{min-width:70px;font-size:24px}.timeline__date-sub{font-size:var(--ds-font-size-sm)}.timeline__line{left:78px}.timeline__text{min-width:auto;font-size:14px}}
    </style>
</head>
<body>
    <div class="wireframe-container">
        ${bodyHTML}
    </div>
</body>
</html>`;
    }

    /**
     * ローカルナビゲーション項目を生成
     * @param {Array} items - 項目配列
     * @returns {string} - 生成されたHTML
     */
    generateLocalNavItems(items) {
        const rows = [];
        for (let i = 0; i < items.length; i += 3) {
            rows.push(items.slice(i, i + 3));
        }

        return rows.map(row => `
            <div class="c-localav__row">
                ${row.map(item => `
                    <div class="c-localav__item">
                        <div class="c-localav__english">ENGLISH</div>
                        <div class="c-localav__text">${typeof item === 'string' ? item : item.text || 'ダミーテキスト'}</div>
                        <div class="c-localav__arrow">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 4L10 8L6 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    /**
     * デフォルトのローカルナビゲーション項目を生成
     * @returns {string} - 生成されたHTML
     */
    generateDefaultLocalNavItems() {
        const defaultItems = [
            'ダミーテキスト', 'ダミーテキスト', 'ダミーテキスト',
            'ダミーテキスト', 'ダミーテキスト', 'ダミーテキスト'
        ];
        return this.generateLocalNavItems(defaultItems);
    }

    /**
     * エラー時のHTMLを生成
     * @param {string} errorMessage - エラーメッセージ
     * @returns {string} - エラーHTML
     */
    generateErrorHTML(errorMessage) {
        return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>エラー - ワイヤーフレーム生成</title>
</head>
<body>
    <div class="wireframe-container">
        <div class="error-message">
            <h1>ワイヤーフレーム生成エラー</h1>
            <p>申し訳ございませんが、ワイヤーフレームの生成中にエラーが発生しました。</p>
            <p><strong>エラー詳細:</strong> ${errorMessage}</p>
            <p>入力内容を確認して、再度お試しください。</p>
        </div>
    </div>
</body>
</html>`;
    }

    /**
     * 使用例とテンプレートを提供
     * @returns {string} - 使用例テキスト
     */
    getUsageExample() {
        return `
# ワイヤーフレーム生成システム使用例

## 基本的な使用方法

以下のような形式でテキストを入力してください：

\`\`\`
ヘッダー: サイトタイトル
　タイトル: 企業サイト

メイン:
　見出し: サービス紹介
　カード: サービス1の説明
　　画像: service1.jpg
　　説明: サービス1の詳細説明です
　カード: サービス2の説明
　　画像: service2.jpg
　　説明: サービス2の詳細説明です
　ナビゲーション: メニュー項目
　　項目: 会社概要, サービス, お問い合わせ

フッター:
　テーブル: 会社情報
\`\`\`

## 利用可能なコンポーネント

- ヘッダー
- 見出し
- ボタン / サブテキストボタン
- カード / インフォカード
- ナビゲーション
- テーブル
- リスト / 番号付きリスト
`;
    }
}

// 使用例
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WireframeGenerator;
}

// ブラウザ環境での使用例
if (typeof window !== 'undefined') {
    window.WireframeGenerator = WireframeGenerator;

    // DOM読み込み後の初期化例
    document.addEventListener('DOMContentLoaded', function() {
        const generator = new WireframeGenerator();

        // 使用例
        console.log('Wireframe Generator が利用可能です');
        console.log('使用例:', generator.getUsageExample());

        // グローバルに公開
        window.wireframeGenerator = generator;
    });
}