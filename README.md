# DanLun Logic — Legacy Modernization Advisor

**脱レガシー診断ツール / 日本企业遗留系统现代化诊断工具**  
Strategic Advisory by Silynn Lee

---

<!-- スクリーンショットPDFをここに配置 / Place your screenshot PDF here -->
<!-- ![Tool Overview](./DanLun-Logic-Overview.pdf) -->

---

## 中文 · 简介

这是一个帮助日本企业决定「旧系统该怎么改」的诊断工具，专为 Workshop 现场和 C-level 提案设计。

**背景：** 日本企业有大量运行了30-40年的COBOL大型机系统。所有人都知道要改，但不知道从哪里改、怎么改、风险有多大。这个工具用10分钟把这个模糊的对话变成结构化的诊断。

**输入10个变量：** 业种、大型机平台、代码复杂度、接口数、人才风险、定制化程度、预算规模、风险容忍度。全部选项都有「不知道」，高管不懂技术也能填完。

**输出完整诊断报告：**
- 三条路径推荐：**API Enablement / Refactor / Rebuild** + 置信度分数
- **Hybrid 双轨制策略**（当top-2路径分差在15%以内时自动触发）
- **6年技术债趋势图**（维持现状 / API / Refactor / Rebuild 四条线对比）
- **定制化3个月POC计划**（4业种 x 3路径 = 12套内容）
- CFO / 经营层专用说明要点

**这个工具的核心价值不是给出「正确答案」，而是让客户在填写过程中自己发现问题。** 当Confidence分数因为「不知道」太多而下降时，那种「失控感」本身就是后续咨询的最大入口。

---

## 日本語 · 概要

日本企業の「脱レガシー」の意思決定を支援する診断ツールです。Workshopのオープニングセッションとシニア経営層へのプレゼンを想定して設計しています。

**背景：** 日本の大手企業の多くは1970〜80年代構築のCOBOLシステムを現在も稼働させています。モダナイゼーションの必要性は共有されていても、「どのアプローチが最適か」という合意形成が最大の壁です。このツールは、その曖昧な議論を構造化された診断に変換します。

**6次元10変数の入力：** 業種・メインフレームプラットフォーム・コード複雑度・インターフェース数・人材リスク・カスタマイズ度・予算規模・リスク許容度。全項目に「不明」オプションあり。技術を知らない経営層でも完答できます。

**出力内容：**
- 推奨パス：**API Enablement / Refactor / Rebuild** + Confidenceスコア
- **Hybrid双軌制戦略**（上位2パスのスコア差が15%以内の場合に自動表示）
- **6年間の技術債トレンドグラフ**（維持現状との比較）
- **業種 x パス別3ヶ月POCロードマップ**（4業種 x 3パス = 12パターン）
- CFO・取締役会向け説明ポイント

**日本市場固有の設計思想：** FISC安全対策基準・J-SOX・保険業法・全銀システム等の規制環境、富士通GS21・NEC ACOS・日立VOS3等の非IBMプラットフォームへの対応、そして「ものづくり文化」に根ざしたゼロ停止要件——これらを全てスコアリングロジックに組み込んでいます。

---

## English · Overview

A diagnostic tool that helps Japanese enterprises decide *how* to modernize legacy systems — before committing budget or timeline.

**The problem:** Japanese enterprises are running COBOL systems built in the 1970s–80s. Everyone agrees modernization is necessary. Nobody agrees on the approach, the risk, or where to start. This tool turns that ambiguous conversation into a structured, evidence-based diagnosis in under 10 minutes.

**6 input dimensions, 10 variables.** Industry, mainframe platform, code complexity, interface count, talent risk, customization level, budget availability, risk tolerance. Every field has an "unknown" option — C-level executives don't need technical details to complete the assessment.

**Output a full diagnostic report:**
- Recommended path: **API Enablement / Refactor / Rebuild** with confidence score
- **Hybrid dual-track strategy** — automatically triggered when top-2 paths score within 15%
- **6-year Tech Debt Trajectory** — 4 scenarios plotted against inaction
- **POC Roadmap** — 3-month action plan, customized by industry x path (12 patterns total)
- CFO and board-level talking points built into every output section

---

## Why Japan / なぜ日本 / 为什么是日本

| Factor | Detail |
|--------|--------|
| Economic urgency | Ministry of Economy estimates up to **12 trillion yen/year** in losses post-2025 from legacy system dependency |
| IT budget structure | ~80% of Japanese enterprise IT budgets consumed by maintenance, leaving almost nothing for innovation |
| Talent crisis | COBOL engineer average age is late 50s. No successor pipeline. Core business logic risks becoming a permanent black box. |
| Regulatory complexity | FISC, J-SOX, Zengin System, Insurance Business Act, IFRS 17 — compliance requirements vary by industry and add months to any migration timeline |
| Platform diversity | Fujitsu GS21, NEC ACOS, Hitachi VOS3 are still in active use. Non-IBM platforms require custom connector scoping — ignored by most migration frameworks. |

---

## The 3 Paths / 3つのパス / 三条路径

### API Enablement
**EN:** Keep the legacy system running. Expose core business logic as REST APIs immediately. Time to market: 3-6 months. Zero production disruption.  
**JP:** レガシーシステムを稼働させたままAPIとして公開。最速3ヶ月で業務価値を解放。  
**CN:** 旧系统继续运行，直接套一层API暴露核心逻辑。最快3个月上线。

### Refactor
**EN:** Incrementally improve code structure. Works when documentation exists and technical debt is moderate. 6-12 months to meaningful improvement.  
**JP:** ドキュメントが整備されており、技術的負債が中程度の場合に有効。6〜12ヶ月。  
**CN:** 逐步改善代码结构。文档齐全、技术债适中时适用。6-12个月见效。

### Rebuild
**EN:** Full replacement. Only when budget, timeline, and skills are all confirmed. 18-36 months. Highest risk, highest potential.  
**JP:** 予算・期間・スキルセット全て揃った場合のみ推奨。18〜36ヶ月。  
**CN:** 推倒重来。预算、时间、技能三者都确认到位才推荐。18-36个月。

---

## Scoring Engine / スコアリングエンジン / 评分逻辑

```
API Enablement =
  complexity x 0.30  +  customization x 0.20  +  interfaces x 0.15
  + risk_aversion x 0.15 x industry_weight  +  platform_risk x 0.08

Refactor =
  (1-complexity) x 0.45  +  (1-customization) x 0.30
  + (1-risk_aversion) x 0.15  +  (1-interfaces) x 0.10  -  platform_risk x 0.06

Rebuild =
  budget x 0.40  +  (1-risk_aversion) x 0.25
  + (1-customization) x 0.25  +  (1-complexity) x 0.10  -  platform_risk x 0.06
```

- **Confidence:** Each unknown input reduces score by 4% (floor: 30%)
- **Hybrid trigger:** Top-2 paths within 15% gap
- **Industry weights:** Banking 0.9 / Insurance 0.85 / Manufacturing 0.7 / Retail 0.6
- **Platform risk:** IBM z/OS & AS400 = 0 / Fujitsu & Hitachi = 0.15 / NEC = 0.20 / Tandem = 0.25 / Unisys = 0.30

---

## POC Design Philosophy / POC設計思想 / POC设计理念

Activities are written from a practitioner's perspective, not a textbook:

| Textbook version | Practitioner version |
|-----------------|---------------------|
| Implement authentication & encryption | Interview current auth state, identify API blockers |
| Achieve FISC compliance | Confirm FISC scope with IT team, identify gaps |
| Calculate TCO/ROI | Identify data needed for estimation, present directional range |
| Create rollback scripts | Design initial rollback approach (final version in full project) |

---

## Tech Stack

```
React JSX        UI framework
Recharts         LineChart (Tech Debt Trajectory) + RadarChart
Inline Styles    Zero CSS template literals, Babel-safe
Noto Sans JP     Japanese typography
Space Grotesk    Latin and numeric typography
```

No backend. No database. Runs entirely in the browser.

---

## Roadmap / 今後の機能 / 未来功能

- [ ] Knowledge loss risk alert — avgAge + noSuccessor both true triggers red alert
- [ ] dataEntanglement slider — database coupling complexity input
- [ ] isCoreAccounting boolean — flags core accounting systems
- [ ] PDF export — branded report from result page
- [ ] Multilingual in-app toggle — Japanese / English / Chinese

---

## About / について / 关于

Built by **Silynn Lee** using Vibe Coding + Expert Domain Knowledge.

---

*2026 DanLun Logic by Silynn Lee · All Rights Reserved*  
*Powered by Vibe Coding & Expert Domain Knowledge*
