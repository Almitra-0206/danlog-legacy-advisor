import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine } from "recharts";

// ── Brand Colors ──────────────────────────────────────────────────────────────
const G      = "#FFCD00";
const DARK   = "#050505";
const CARD   = "#0D1520";
const BORDER = "#1A2A3A";
const T1     = "#F0F0F0";
const T2     = "#9A9A9A";
const T3     = "#6B6B6B";
const BLUE   = "#0F62FE";

// ── Shared style objects ──────────────────────────────────────────────────────
const S = {
  app:        { minHeight: "100vh", background: DARK, fontFamily: "'Noto Sans JP', 'Space Grotesk', sans-serif" },
  hdr:        { borderBottom: "1px solid " + BORDER, padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(5,5,5,0.97)", backdropFilter: "blur(12px)", zIndex: 100 },
  logoT:      { fontSize: 15, fontWeight: 700, color: T1, letterSpacing: 0.5, fontFamily: "'Space Grotesk', sans-serif" },
  logoS:      { fontSize: 10, color: T3, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" },
  badge:      { fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: G, border: "1px solid rgba(255,205,0,0.3)", padding: "4px 10px", borderRadius: 2, fontFamily: "'Space Grotesk', sans-serif" },
  main:       { maxWidth: 1280, margin: "0 auto", padding: 48 },
  heroLabel:  { fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" },
  heroTitle:  { fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.1, color: T1, letterSpacing: -1, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 },
  heroSub:    { fontSize: 14, color: T3, marginTop: 10, lineHeight: 1.6 },
  g2:         { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24, alignItems: "stretch" },
  g3:         { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 },
  card:       { background: CARD, border: "1px solid " + BORDER, borderRadius: 4, padding: 26, position: "relative", overflow: "hidden" },
  cardTop:    { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  cardTitle:  { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T3, fontFamily: "'Space Grotesk', sans-serif" },
  cardNum:    { fontSize: 10, color: "rgba(255,205,0,0.5)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1 },
  label:      { fontSize: 13, color: T2, marginBottom: 10, display: "block" },
  labelJp:    { fontSize: 11, color: T3, marginLeft: 6, fontFamily: "'Noto Sans JP', sans-serif" },
  select:     { width: "100%", background: "#0A1220", border: "1px solid " + BORDER, borderRadius: 2, color: T1, padding: "10px 14px", fontSize: 13, fontFamily: "'Noto Sans JP', 'Space Grotesk', sans-serif", appearance: "none", cursor: "pointer", outline: "none" },
  fg:         { marginBottom: 20 },
  ib:         { background: "rgba(255,205,0,0.03)", borderLeft: "2px solid " + G, padding: "13px 17px", fontSize: 13, color: T2, lineHeight: 1.6, marginTop: 16 },
  tag:        { display: "inline-block", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", border: "1px solid " + BORDER, borderRadius: 2, color: T3, margin: "3px 3px 0 0", fontFamily: "'Space Grotesk', sans-serif" },
  trow:       { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #141E2A" },
  tlbl:       { fontSize: 13, color: T2, lineHeight: 1.4 },
  tlblJp:     { display: "block", fontSize: 11, color: T3, marginTop: 2, fontFamily: "'Noto Sans JP', sans-serif" },
  t3g:        { display: "flex", gap: 1, flexShrink: 0, marginLeft: 14 },
  t3bBase:    { padding: "4px 9px", fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer", border: "1px solid " + BORDER, background: "#0A1220", color: T3, lineHeight: 1 },
  rlabels:    { display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: T3, fontFamily: "'Space Grotesk', sans-serif" },
  dbox:       { marginTop: 12, background: "#060D18", border: "1px solid " + BORDER, borderLeft: "2px solid #2A3A50", borderRadius: 3, padding: "13px 15px" },
  dtit:       { fontSize: 11, fontWeight: 600, color: "#556", letterSpacing: 0.5, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" },
  dbody:      { fontSize: 12, color: T3, lineHeight: 1.7, marginBottom: 10 },
  dimp:       { fontSize: 12, color: T2, lineHeight: 1.65, padding: "9px 11px", background: "rgba(255,205,0,0.04)", borderLeft: "2px solid rgba(255,205,0,0.25)", marginBottom: 8 },
  dlab:       { display: "block", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: G, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 5 },
  dhint:      { fontSize: 11, color: "#445", fontFamily: "'Space Grotesk', sans-serif", fontStyle: "italic" },
  abtn:       { width: "100%", padding: 16, background: G, color: DARK, border: "none", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", marginTop: 8 },
  divider:    { height: 1, background: BORDER, margin: "34px 0" },
  secTitle:   { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T3, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" },
  confN:      { fontSize: 44, fontWeight: 700, color: G, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 },
  confL:      { fontSize: 10, color: T3, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif", marginTop: 4 },
  mrow:       { display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" },
  mi:         { flex: 1, minWidth: 100, background: "rgba(255,255,255,0.02)", border: "1px solid " + BORDER, borderRadius: 4, padding: 13 },
  mv:         { fontSize: 18, fontWeight: 700, color: G, fontFamily: "'Space Grotesk', sans-serif" },
  mk:         { fontSize: 10, color: T3, letterSpacing: 1, textTransform: "uppercase", marginTop: 4, fontFamily: "'Space Grotesk', sans-serif" },
  wbox:       { background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.22)", borderRadius: 4, padding: "14px 17px", fontSize: 13, color: "#FCD34D", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 12 },
  mfg:        { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 9, marginTop: 6 },
  mfcBase:    { padding: "11px 9px", background: "#080E18", border: "1px solid " + BORDER, borderRadius: 3, cursor: "pointer" },
  mfv:        { fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: T3, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 },
  mfn:        { fontSize: 11, fontWeight: 600, color: T1, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.3 },
  mfjp:       { fontSize: 10, color: T3, fontFamily: "'Noto Sans JP', sans-serif", marginTop: 2 },
  pocHdr:     { display: "grid", gridTemplateColumns: "120px 1fr 1fr", background: "#060D18", borderBottom: "1px solid " + BORDER },
  pocHdrCell: { padding: "10px 14px", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: T3, fontFamily: "'Space Grotesk', sans-serif" },
  pocRow:     { display: "grid", gridTemplateColumns: "120px 1fr 1fr", borderBottom: "1px solid #0F1A28" },
  pocCell:    { padding: 14, fontSize: 12, color: T2, lineHeight: 1.6, borderRight: "1px solid #0F1A28" },
  pocMo:      { fontSize: 11, fontWeight: 700, color: G, fontFamily: "'Space Grotesk', sans-serif" },
  pocDel:     { fontSize: 11, color: G, marginTop: 6, padding: "5px 8px", background: "rgba(255,205,0,0.05)", borderRadius: 2, borderLeft: "2px solid rgba(255,205,0,0.3)" },
  ftr:        { borderTop: "1px solid " + BORDER, padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 64 },
  fn:         { fontSize: 11, color: T3, fontFamily: "'Space Grotesk', sans-serif" },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const MF_CONFIG = {
  ibm_zos:   { label: "IBM z/OS",            labelJp: "IBM z/OS",             vendor: "IBM",     sup: "full",    supLabel: "Full Support",      connectors: ["CICS","IMS","VSAM","DB2","MQ"],  note: "Most mature connector suite. Native CICS, IMS, VSAM access.", noteJp: "CICS/IMS/VSAMへのネイティブアクセス。最も成熟したコネクタ。",    riskAdj: 0,    color: "#0F62FE" },
  ibm_as400: { label: "IBM AS/400 / IBM i",  labelJp: "IBM AS/400 (iSeries)", vendor: "IBM",     sup: "full",    supLabel: "Full Support",      connectors: ["RPG","PCML","DB2 for i","MQ"],   note: "Strong support via PCML and RPG parsing.", noteJp: "PCML/RPG解析による強力なコネクタ対応。中堅製造業・地方銀行に普及。",                           riskAdj: 0,    color: "#0043CE" },
  fujitsu:   { label: "FUJITSU GS21",        labelJp: "富士通 GS21",          vendor: "FUJITSU", sup: "partial", supLabel: "Partial Support",   connectors: ["COBOL","PL/I","DBLC"],           note: "Proprietary protocols require custom adapter config.", noteJp: "富士通独自プロトコルのためカスタムアダプタ設定が必要。",                              riskAdj: 0.15, color: "#E60012" },
  nec_acos:  { label: "NEC ACOS",            labelJp: "NEC ACOSシリーズ",     vendor: "NEC",     sup: "partial", supLabel: "Partial Support",   connectors: ["COBOL","ACOS JCL","ISAM"],       note: "Proprietary job control. Specialist involvement required.", noteJp: "独自JCLとISAMデータ構造。スペシャリスト参加が必要。",                              riskAdj: 0.2,  color: "#00A0E9" },
  hitachi:   { label: "HITACHI VOS3",        labelJp: "日立 VOS3",            vendor: "HITACHI", sup: "partial", supLabel: "Partial Support",   connectors: ["COBOL","PL/I","KEIS"],           note: "z/OS-compatible but KEIS extensions require validation POC.", noteJp: "z/OS互換だがKEIS独自拡張の検証が必要。POC推奨。",                              riskAdj: 0.15, color: "#E60026" },
  unisys:    { label: "Unisys ClearPath",    labelJp: "Unisys ClearPath",     vendor: "UNISYS",  sup: "limited", supLabel: "Limited/POC req.",  connectors: ["COBOL","MCP JCL","DMSII"],       note: "Rare in Japan. Custom engagement scoping required.", noteJp: "一部公共機関に残存。カスタムエンゲージメントのスコーピングが必要。",                  riskAdj: 0.3,  color: "#8B5CF6" },
  tandem:    { label: "Tandem / HP NonStop", labelJp: "Tandem / HP NonStop",  vendor: "HP/HPE",  sup: "limited", supLabel: "Limited/POC req.",  connectors: ["TAL","COBOL","SQL/MP"],          note: "Used in Japanese payment rails. Specialized scoping required.", noteJp: "決済システムに使用。専門的な統合スコーピングが必要。",                          riskAdj: 0.25, color: "#F59E0B" },
  unknown:   { label: "Unknown / TBD",       labelJp: "不明 / Unknown",       vendor: "?",       sup: "unknown", supLabel: "TBD",               connectors: ["TBD"],                           note: "Platform not identified. Conservative defaults applied.", noteJp: "プラットフォーム未特定。保守的デフォルト値で診断します。",                          riskAdj: 0.1,  color: "#555555" },
};

const SUP_STYLE = {
  full:    { color: G,         bg: "rgba(255,205,0,0.08)",   border: "rgba(255,205,0,0.3)"    },
  partial: { color: "#FBBF24", bg: "rgba(251,191,36,0.06)",  border: "rgba(251,191,36,0.28)"  },
  limited: { color: "#F87171", bg: "rgba(248,113,113,0.06)", border: "rgba(248,113,113,0.28)" },
  unknown: { color: "#888888", bg: "rgba(100,100,100,0.06)", border: "rgba(100,100,100,0.22)" },
};

const IND_CONFIG = {
  banking: {
    labelJp: "金融 / Banking", weights: { risk: 0.9 },
    noteEn: "Regulatory compliance is paramount. API enablement preserves core while enabling open banking mandates and real-time payment rails.",
    noteJp: "規制対応が最優先。API活用によるコア温存が戦略的に有利。",
    context: [
      "日本の大手銀行・地方銀行の多くは1970〜80年代構築のCOBOL勘定系を現在も稼働中",
      "全銀システム対応・FISC安全対策基準・J-SOXへの適合が移行の前提条件となる",
      "オープンバンキングAPI義務化（2018年銀行法改正）により、レガシーへのAPI接続が急務",
      "メガバンクでは1億行超のCOBOLコードが存在するケースもあり、一括置換は現実的でない",
    ],
    tags: ["Basel III","FISC安全対策基準","J-SOX","全銀システム","Open Banking","勘定系"],
  },
  manufacturing: {
    labelJp: "製造 / Manufacturing", weights: { risk: 0.7 },
    noteEn: "Production line continuity is non-negotiable. Japan's monozukuri culture demands zero-defect migration.",
    noteJp: "生産ラインの停止は許容不可。ものづくり文化に根ざした「止めない移行」が必須。",
    context: [
      "日本の製造業はMES・ERP・基幹系が密結合しており、一つの変更が生産全体に波及するリスクがある",
      "自動車・電機メーカーを中心にAS/400（IBM i）が生産管理の中核として現役稼働中",
      "Industry 4.0対応でIoTデータとの連携が急増しており、レガシーAPIとの橋渡しが課題",
      "団塊世代の退職により、システムの属人的知識が失われるリスクが2025年問題として顕在化",
    ],
    tags: ["Industry 4.0","MES統合","SCM連携","IBM i/AS400","2025年問題","ものづくり"],
  },
  insurance: {
    labelJp: "保険 / Insurance", weights: { risk: 0.85 },
    noteEn: "Decades of policy data integrity is critical. VSAM-dependent systems are common. IFRS 17 deadline adds urgency.",
    noteJp: "長期契約データの整合性が最重要。VSAMシステムが多く、IFRS 17対応が喫緊の課題。",
    context: [
      "生命保険・損保ともに30〜40年前の契約データがVSAMファイルに格納されており、現代DBへの移行が困難",
      "IFRS 17（保険契約の国際会計基準）の完全適用に向け、データアクセス層の刷新が急務",
      "個人情報保護法改正（2022年）と忘れられる権利への対応で、全データの360度把握が義務化",
      "保険業法上の変更届出義務により、システム変更のたびに金融庁との協議が必要で移行に時間がかかる",
    ],
    tags: ["IFRS 17","個人情報保護法","VSAM","保険業法","忘れられる権利","金融庁"],
  },
  retail: {
    labelJp: "小売 / Retail", weights: { risk: 0.6 },
    noteEn: "Speed to market is the key differentiator. API facade decoupling unlocks omnichannel. Legacy POS is the primary bottleneck.",
    noteJp: "Time-to-Marketが競争優位の源泉。レガシーPOS統合がオムニチャネル化の最大の障壁。",
    context: [
      "コンビニ・スーパー・百貨店ともにPOSシステムが基幹在庫と密結合しており、EC化の足かせとなっている",
      "ロイヤルティプログラムの乱立（Tポイント・楽天・PayPay等）により、顧客ID統合が複雑化",
      "コロナ後のEC急拡大で、既存のバッチ処理型在庫管理とリアルタイムEC在庫の乖離が常態化",
      "セブン・イレブン等の先行事例がAPI基盤でPOS/EC/配送を統合し、Time-to-Marketを3分の1に短縮",
    ],
    tags: ["EC統合","ロイヤルティPF","オムニチャネル","リアルタイム在庫","POS連携","顧客ID統合"],
  },
};

const REC_META = {
  api:      { title: "API Enablement",  titleJp: "APIによるレガシー資産活用",  cls: "api",      badge: "推奨 RECOMMENDED",   badgeC: G,         badgeBC: "rgba(255,205,0,0.15)",  borderC: "rgba(255,205,0,0.4)",  bgC: "rgba(255,205,0,0.04)",   desc: "OpenLegacy Phased Co-Existence戦略を採用。レガシーシステムをそのまま稼働させながら、コアビジネスロジックをAPIとして即座に公開します。", risks: [{ label: "Migration Risk",      val: 15, color: G },         { label: "Business Continuity", val: 95, color: G },         { label: "Time-to-Market Gain", val: 88, color: G },         { label: "Cost vs. Rebuild",    val: 82, color: G }] },
  refactor: { title: "Refactor",        titleJp: "段階的リファクタリング",       cls: "refactor", badge: "代替案 ALTERNATIVE",  badgeC: "#60A5FA", badgeBC: "rgba(59,130,246,0.15)", borderC: "rgba(59,130,246,0.4)", bgC: "rgba(59,130,246,0.04)",  desc: "既存コードベースの構造を改善しモジュール化を進めます。ドキュメントが整備されており技術的負債が中程度の場合に適しています。",         risks: [{ label: "Migration Risk",      val: 45, color: "#60A5FA" }, { label: "Business Continuity", val: 72, color: "#60A5FA" }, { label: "Time-to-Market Gain", val: 55, color: "#60A5FA" }, { label: "Cost vs. Rebuild",    val: 68, color: "#60A5FA" }] },
  rebuild:  { title: "Rebuild",         titleJp: "フルリビルド",                cls: "rebuild",  badge: "ハイリスク HIGH RISK", badgeC: "#F87171", badgeBC: "rgba(239,68,68,0.15)",  borderC: "rgba(239,68,68,0.4)", bgC: "rgba(239,68,68,0.04)",   desc: "ビジネスロジックの全面刷新が必要な場合に限定推奨。予算・期間・スキルセットが揃った環境でのみ実施可能です。",                             risks: [{ label: "Migration Risk",      val: 78, color: "#F87171" }, { label: "Business Continuity", val: 42, color: "#F87171" }, { label: "Time-to-Market Gain", val: 35, color: "#F87171" }, { label: "Cost vs. Rebuild",    val: 20, color: "#F87171" }] },
};

const HYBRID_DEF = {
  "api-refactor":    { title: "双軌制 · Dual-Track", en: "API Quick Win + Parallel Refactor",       p1: "Phase 1 (0-6M): API Enablementで即座に業務価値を解放。既存システム稼働のままデジタルサービスを先行リリース。", p2: "Phase 2 (6-24M): 並行してコアモジュールをRefactor。APIレイヤーが安全網として機能し、リファクタリングリスクを大幅低減。",    why: "スコア拮抗時は「Quick Winで経営層の信頼を得ながら中長期で技術債削減」する双軌制が最もリスク・リターンバランスが高い。", ttm: "6M (API) + 24M (Refactor)", risk: "Low-Medium" },
  "api-rebuild":     { title: "段階的代替 · Phased Replacement", en: "API Bridge + Selective Rebuild",   p1: "Phase 1 (0-6M): API Enablementで現行システムを継続稼働させながら、新規デジタルサービスを即座にリリース。",      p2: "Phase 2 (12-36M): 優先度の高いドメインから選択的にRebuild。APIレイヤーが旧新システムの橋渡し役となり段階的切り替えを実現。", why: "完全Rebuildは高コスト・高リスクだが、APIを先に敷くことで止めないRebuildが実現できる。ビジネス継続性を担保しながら技術債ゼロを目指す戦略。", ttm: "6M (API) + 36M (Rebuild)", risk: "Medium" },
  "refactor-rebuild":{ title: "段階的全面刷新 · Progressive Overhaul", en: "Refactor Core + Domain Rebuild", p1: "Phase 1 (0-12M): 変更頻度の高いモジュールをRefactorし開発速度と安定性を先に確保。テスト基盤とCI/CDを整備。", p2: "Phase 2 (12-36M): Refactorで得た知見とテスト資産を活用し、ドメイン単位でのRebuildを実施。技術債を段階的に解消。",    why: "予算と技術力が十分にある場合、RefactorとRebuildを組み合わせることでリスク分散しながら完全モダン化を達成できる。",          ttm: "12M (Refactor) + 36M (Rebuild)", risk: "Medium-High" },
};

const POC_DATA = {
  banking: {
    api: [
      { phase:"Month 1", title:"Discovery & Dependency Mapping", titleJp:"現状調査・依存関係マッピング",
        items:[
          "COBOLプログラムのインベントリ作成（対象スコープの合意）",
          "PGM CALL連鎖の可視化と、APIとして切り出す候補機能の優先順位付け",
          "認証・暗号化・監査ログの現状方式をヒアリングし、API連携時のブロッカー有無を確認",
          "FISC安全対策基準の対象範囲をIT部門と確認し、POCスコープへの影響を特定",
        ],
        del:"依存関係マップ + API候補リスト + セキュリティ・規制ブロッカー確認シート" },
      { phase:"Month 2", title:"API Prototype & Integration Test", titleJp:"APIプロトタイプ・接続テスト",
        items:[
          "優先度1位の機能（例：口座照会）のREST API自動生成",
          "既存認証基盤（RACF等）との接続方式の検討・テスト（新規実装ではなく接続確認）",
          "フロントエンド担当チームとのサンドボックス接続テスト",
          "レスポンスタイム・スループットの初期計測と本番水準との比較",
        ],
        del:"動作するAPIプロトタイプ + 接続テスト結果 + 性能初期計測レポート" },
      { phase:"Month 3", title:"Feasibility Assessment & Go/No-Go", titleJp:"実現可能性評価・Go/No-Go",
        items:[
          "POC結果をもとに技術的ブロッカーの有無を整理",
          "本番移行に向けて追加調査が必要な項目の洗い出し（規制・セキュリティ・性能）",
          "コスト試算に必要なデータ項目の特定と、入手可能な情報での概算レンジ提示",
          "経営層向けGo/No-Go判断材料の作成（前提条件・リスク・次ステップを明記）",
        ],
        del:"技術的実現可能性レポート + 概算コストレンジ + Go/No-Go判断資料" },
    ],
    refactor: [
      { phase:"Month 1", title:"Code Audit & Risk Assessment", titleJp:"コード監査・リスク評価",
        items:[
          "COBOL静的解析ツールの適用（ネスト深度・デッドコード・複雑度の計測）",
          "未文書化ロジックの洗い出しと、業務担当者へのヒアリングによる仕様確認",
          "J-SOX内部統制への影響範囲の確認（IT部門・内部監査との合意）",
          "現状のテスト資産の有無を確認し、回帰テストのベースライン整備方針を決定",
        ],
        del:"コード品質レポート + リスクマトリクス + テスト整備方針" },
      { phase:"Month 2", title:"Module Decomposition Pilot", titleJp:"モジュール分割パイロット",
        items:[
          "変更頻度が高く、かつ影響範囲が限定的なモジュールを1本選定",
          "機能変更なしの構造改善（リファクタリング）を実施し、動作保証を確認",
          "開発チームへの技術トレーニングと、作業見積もり精度の検証",
          "1モジュールの実績をもとに全体工数の仮説を更新",
        ],
        del:"リファクタリング済みモジュール + テスト結果 + 工数仮説アップデート" },
      { phase:"Month 3", title:"Velocity Baseline & Roadmap", titleJp:"速度ベースライン・ロードマップ策定",
        items:[
          "POC期間中のリリーススピード・不具合率を計測し、改善効果の初期値を算出",
          "残存技術的負債の定量化（対象モジュール数・優先度・推定工数のレンジ）",
          "12〜24ヶ月の全体ロードマップ案を作成（確定値ではなく仮説として提示）",
          "予算申請に向けた概算レンジと、精度向上に必要な追加情報の提示",
        ],
        del:"速度ベースラインレポート + ロードマップ仮説 + 概算レンジ資料" },
    ],
    rebuild: [
      { phase:"Month 1", title:"Architecture Vision & Vendor Shortlist", titleJp:"アーキテクチャ方針・ベンダー候補整理",
        items:[
          "ターゲットアーキテクチャの方向性合意（クラウドベンダー・フレームワーク選定基準）",
          "既存業務ロジックの要件定義に必要なヒアリング対象者と期間の特定",
          "ベンダー候補のロングリスト作成と、選定基準の関係者合意",
          "データ移行の複雑度を初期評価し、最大のリスク要因を特定",
        ],
        del:"アーキテクチャ方針書 + ベンダー候補リスト + リスク初期評価" },
      { phase:"Month 2", title:"Core Domain Prototype", titleJp:"コアドメインプロトタイプ",
        items:[
          "最重要業務ドメイン1機能の新規実装（スコープを明確に限定）",
          "旧システムとのデータ整合性検証（サンプルデータ使用）",
          "開発生産性の実績計測（見積もり精度の検証に使用）",
          "判明した技術的課題・前提条件の変更点を記録",
        ],
        del:"プロトタイプ + 整合性検証結果 + 実績ベース工数データ" },
      { phase:"Month 3", title:"Risk Gate & Decision Framework", titleJp:"リスクゲート・意思決定フレームワーク",
        items:[
          "POC実績をもとにコスト・期間の概算レンジを更新（当初想定との乖離を明示）",
          "続行・縮小・中止・代替案（API Enablement等）の判断基準を整理",
          "経営承認に必要な情報と、現時点で入手できていない情報を明確に分離",
          "次フェーズ開始の前提条件（予算・人員・規制対応）を関係者で合意",
        ],
        del:"リスクゲートレポート + 意思決定フレームワーク + 経営承認資料" },
    ],
  },
  manufacturing: {
    api: [
      { phase:"Month 1", title:"Production System Mapping", titleJp:"生産系システムマッピング",
        items:[
          "MES/ERP/基幹システムの連携図作成と、変更時の影響範囲の初期整理",
          "生産ライン停止が許容できない時間帯・期間を現場担当者とともに特定",
          "PGM CALL連鎖のうち、生産に影響しない補助系機能を優先候補として選定",
          "既存のセキュリティ・認証方式をヒアリングし、API接続時のブロッカー有無を確認",
        ],
        del:"生産系依存関係図 + POC優先候補リスト + ブロッカー確認シート" },
      { phase:"Month 2", title:"Non-Disruptive API Prototype", titleJp:"非停止APIプロトタイプ",
        items:[
          "生産に影響しない補助系機能（例：設備稼働状況照会）のAPI先行生成",
          "非本番環境でのIoTデータ連携テスト（実環境への接続は次フェーズ）",
          "既存MQメッセージとのCoexistence動作確認",
          "本番並行稼働を想定したシミュレーションテストの実施",
        ],
        del:"補助系APIプロトタイプ + 並行稼働シミュレーション結果" },
      { phase:"Month 3", title:"Cutover Readiness & Roadmap", titleJp:"切替準備状況・ロードマップ",
        items:[
          "POC結果をもとに本番切替の実現可能性と前提条件を整理",
          "ロールバック手順の初期設計（確定版は本格フェーズで作成）",
          "Industry 4.0対応ロードマップの方向性案を作成（仮説として提示）",
          "コスト試算に必要なデータ項目の特定と概算レンジの提示",
        ],
        del:"切替準備状況レポート + ロードマップ方向性案 + 概算レンジ" },
    ],
    refactor: [
      { phase:"Month 1", title:"Inventory & Change Frequency Analysis", titleJp:"インベントリ・変更頻度分析",
        items:[
          "過去2〜3年のコード変更履歴を分析し、変更頻度の高いモジュールを特定",
          "変更頻度と生産への影響度を組み合わせた優先度マトリクスの作成",
          "テスト資産の現状確認（テストケースの有無・自動化率）",
          "開発チームの稼働状況と、POC並行作業の実現可能性を確認",
        ],
        del:"変更頻度マトリクス + 優先度リスト + テスト資産現状確認シート" },
      { phase:"Month 2", title:"Low-Risk Module Refactoring Pilot", titleJp:"低リスクモジュール試験改修",
        items:[
          "生産影響が最も小さいモジュールを1本選定し、構造改善を実施",
          "改修前後の動作一致をテストで確認（機能変更なし）",
          "SCM連携インターフェースへの影響がないことを確認",
          "作業実績をもとに全体工数の仮説を現実的な数字に更新",
        ],
        del:"試験改修済みモジュール + 動作確認結果 + 工数仮説アップデート" },
      { phase:"Month 3", title:"Sustainability Assessment & Next Steps", titleJp:"保守性評価・次ステップ整理",
        items:[
          "POC実績をもとに保守コストの改善見込みをレンジで提示",
          "技術継承リスク（担当者の知識依存度）の初期評価",
          "次フェーズのスコープ・体制・予算レンジについて関係者と合意形成",
          "推進の前提条件（開発リソース確保・経営コミットメント）を明確化",
        ],
        del:"保守性評価レポート + 次ステップ合意書 + 予算レンジ資料" },
    ],
    rebuild: [
      { phase:"Month 1", title:"Greenfield Architecture Direction", titleJp:"新アーキテクチャ方針策定",
        items:[
          "Industry 4.0対応のターゲットアーキテクチャの方向性を関係者で合意",
          "生産データの移行複雑度を初期評価し、最大リスク要因を特定",
          "旧システムとの並行稼働が必要な期間・条件を現場と確認",
          "開発チームのスキルギャップを評価し、外部調達が必要な領域を特定",
        ],
        del:"アーキテクチャ方針書 + リスク初期評価 + スキルギャップ分析" },
      { phase:"Month 2", title:"Core Manufacturing Domain Prototype", titleJp:"コア製造ドメインプロトタイプ",
        items:[
          "生産管理の中核機能1つを新規実装（スコープを厳密に限定）",
          "旧システムとのサンプルデータ整合性検証",
          "IoT/センサーデータとの接続テスト（実環境ではなくシミュレーション）",
          "実績工数を記録し、全体見積もり精度の検証に活用",
        ],
        del:"コアドメインプロトタイプ + 整合性検証結果 + 実績工数記録" },
      { phase:"Month 3", title:"Decision Gate & Commitment Checklist", titleJp:"意思決定ゲート・前提条件確認",
        items:[
          "POC実績をもとにコスト・期間の概算レンジを更新",
          "続行・縮小・API Enablement切り替えの判断基準を整理",
          "取締役会承認に必要な情報と、現時点で不明な情報を分離して提示",
          "次フェーズ開始に必要なコミットメント事項の関係者合意",
        ],
        del:"意思決定ゲートレポート + 前提条件確認リスト + 取締役会資料" },
    ],
  },
  insurance: {
    api: [
      { phase:"Month 1", title:"Policy Data & VSAM Assessment", titleJp:"契約データ・VSAM評価",
        items:[
          "VSAM/DB2の契約データ棚卸しと、POCスコープとなる対象データの特定",
          "個人情報保護法・GDPR該当データの範囲をコンプライアンス担当とともに確認",
          "既存の認証・暗号化・監査ログ方式をヒアリングし、API連携時のブロッカー有無を調査",
          "保険業法上の変更届出が必要か否かを法務・コンプライアンス部門に確認",
        ],
        del:"契約データマップ + VSAM接続性確認 + 規制ブロッカー確認シート" },
      { phase:"Month 2", title:"API Generation & Integration Test", titleJp:"API生成・接続テスト",
        items:[
          "保険料計算または契約照会（どちらか1機能）のREST API自動生成",
          "既存の個人情報保護対応（アクセス制御等）との接続方式の確認テスト",
          "IFRS 17対応に必要なデータアクセスの要件を業務担当者とともに整理",
          "API経由でのデータアクセス可否をサンドボックス環境で検証",
        ],
        del:"動作するAPI + 接続テスト結果 + IFRS 17要件整理メモ" },
      { phase:"Month 3", title:"Compliance Gap & Feasibility Report", titleJp:"規制ギャップ・実現可能性レポート",
        items:[
          "POC結果をもとに規制対応上の追加作業項目を整理（適合確認は本格フェーズで実施）",
          "監査証跡の取得方式について内部監査部門と方針合意",
          "コスト試算に必要な情報項目の特定と、入手可能な範囲での概算レンジ提示",
          "法務・コンプライアンス・IT部門の三者でGo/No-Go判断材料を確認",
        ],
        del:"規制ギャップレポート + 概算レンジ資料 + Go/No-Go判断材料" },
    ],
    refactor: [
      { phase:"Month 1", title:"Contract System Audit", titleJp:"レガシー契約システム監査",
        items:[
          "長期契約データ（20年超）の整合性を抽出検査（全件ではなくサンプリング）",
          "COBOLビジネスロジックの主要部分を業務担当者へのヒアリングでドキュメント化",
          "IFRS 17移行に必要なデータ変換の複雑度を初期評価",
          "テスト資産の現状確認と、回帰テスト整備に必要な工数の仮説算出",
        ],
        del:"契約システム監査レポート + IFRS 17初期評価 + テスト整備工数仮説" },
      { phase:"Month 2", title:"Business Logic Extraction Pilot", titleJp:"業務ロジック抽出パイロット",
        items:[
          "保険料計算ロジック（1商品・1パターン）のモジュール化を試験実施",
          "業務担当者との確認セッションでロジックの正確性を検証",
          "単体テストの作成と、回帰テスト自動化の実現可能性を確認",
          "作業実績をもとに全体工数レンジの仮説を更新",
        ],
        del:"試験抽出済みロジックモジュール + 業務担当者確認済み仕様書 + 工数仮説" },
      { phase:"Month 3", title:"Compliance Roadmap & Budget Framework", titleJp:"コンプライアンスロードマップ・予算枠組み",
        items:[
          "IFRS 17完全対応のマイルストーン案を作成（確定版は本格フェーズで作成）",
          "個人情報保護法対応の優先項目と、対応に必要なリソースレンジを提示",
          "監査対応工数の概算（精緻化に必要な追加情報を明示）",
          "予算申請に向けた資料の骨格作成と、承認プロセスの確認",
        ],
        del:"コンプライアンスロードマップ案 + 概算予算枠組み + 予算申請骨格資料" },
    ],
    rebuild: [
      { phase:"Month 1", title:"Policy Admin Platform Direction", titleJp:"契約管理プラットフォーム方針策定",
        items:[
          "次世代契約管理プラットフォームの候補を整理し、選定基準を関係者で合意",
          "既存契約データの移行複雑度を初期調査（全件移行の可否・期間の仮説）",
          "IFRS 17ネイティブ対応に必要な要件を業務・財務部門とともに整理",
          "ベンダー候補へのRFI（情報提供依頼）の発行準備",
        ],
        del:"プラットフォーム選定基準 + 移行複雑度初期評価 + RFI草案" },
      { phase:"Month 2", title:"Data Migration Feasibility Prototype", titleJp:"データ移行実現可能性プロトタイプ",
        items:[
          "サンプル契約データ（限定件数）の新システムへの試験移行",
          "VSAM形式からクラウドDBへの変換ロジックの実現可能性確認",
          "新旧システムのデータ整合性をサンプルレベルで検証",
          "移行に必要な追加作業・ツールの洗い出し",
        ],
        del:"データ移行プロトタイプ + 実現可能性確認レポート + 追加作業リスト" },
      { phase:"Month 3", title:"Regulatory Pre-Consultation & Decision Gate", titleJp:"規制事前確認・意思決定ゲート",
        items:[
          "金融庁・保険業法対応の観点から、事前相談の要否と手続きスケジュールを確認",
          "移行期間中の契約者保護に関する法務・コンプライアンス部門との方針合意",
          "コスト・期間の概算レンジを更新し、当初想定との乖離を経営層に説明",
          "続行・縮小・API Enablement切り替えの判断基準を関係者で合意",
        ],
        del:"規制事前確認メモ + 意思決定ゲートレポート + 経営層説明資料" },
    ],
  },
  retail: {
    api: [
      { phase:"Month 1", title:"Omnichannel Integration Mapping", titleJp:"オムニチャネル統合マッピング",
        items:[
          "EC/POS/在庫/ロイヤルティ連携の現状図作成と、最も優先度の高い接続ポイントの特定",
          "顧客ID統合の現状と課題をEC・店舗・ITの各担当者からヒアリング",
          "既存の認証・セキュリティ方式を確認し、API公開時のブロッカー有無を調査",
          "OpenLegacy接続テスト（在庫照会・購買履歴の読み取り）を非本番環境で実施",
        ],
        del:"オムニチャネル依存関係マップ + API優先候補リスト + ブロッカー確認シート" },
      { phase:"Month 2", title:"Customer-Facing API Sprint", titleJp:"顧客向けAPIスプリント",
        items:[
          "優先度1位の機能（例：在庫照会）のREST API生成と動作確認",
          "モバイルアプリまたはECサイトとのサンドボックス接続テスト",
          "ロイヤルティポイント照会APIの生成と、既存ポイントシステムとの接続確認",
          "レスポンスタイムの初期計測（ピーク時シミュレーションは次フェーズ）",
        ],
        del:"顧客向けAPIプロトタイプ + 接続テスト結果 + 初期性能計測" },
      { phase:"Month 3", title:"TTM Baseline & Scale Readiness", titleJp:"TTMベースライン・スケール準備状況",
        items:[
          "POC期間中のリリーススピードを計測し、現状のTTMベースラインを確立",
          "本番展開に向けて必要な追加作業（性能・セキュリティ・負荷テスト等）を整理",
          "開発チームが自律的にAPIを追加できる体制の実現可能性を評価",
          "コスト試算に必要な情報の特定と、概算レンジの提示",
        ],
        del:"TTMベースラインレポート + 本番展開準備リスト + 概算レンジ資料" },
    ],
    refactor: [
      { phase:"Month 1", title:"Frontend Decoupling Assessment", titleJp:"フロントエンド分離評価",
        items:[
          "バックエンドとUI層の結合度を分析し、分離の難易度を初期評価",
          "変更頻度が高く、かつ影響範囲が限定的な機能TOP10を抽出",
          "競合他社との機能ギャップを確認し、優先改修対象の根拠を整理",
          "テスト資産の現状を確認し、自動化に必要な工数レンジを仮算出",
        ],
        del:"結合度分析レポート + 優先改修リスト + テスト整備工数仮説" },
      { phase:"Month 2", title:"High-Value Feature Refactoring Pilot", titleJp:"高価値機能リファクタリング試験",
        items:[
          "優先度1位の機能（例：商品検索）のモジュール化を試験実施",
          "改修前後の動作一致をテストで確認（機能変更なし）",
          "モバイル対応のAPIインターフェース整備の実現可能性を確認",
          "作業実績をもとに全体工数の仮説を現実的な数字に更新",
        ],
        del:"試験改修済み機能モジュール + テスト結果 + 工数仮説アップデート" },
      { phase:"Month 3", title:"Release Cadence Improvement Plan", titleJp:"リリースサイクル改善計画",
        items:[
          "POC実績をもとにリリースサイクル改善の効果をレンジで提示",
          "CI/CDパイプライン整備の優先項目と実現可能性の確認",
          "季節需要（セール・年末商戦）対応のスケーリング要件を整理",
          "次フェーズのスコープ・体制・予算レンジについて関係者と合意",
        ],
        del:"リリースサイクル改善計画 + CI/CD整備優先リスト + 概算予算レンジ" },
    ],
    rebuild: [
      { phase:"Month 1", title:"Modern Commerce Platform Evaluation", titleJp:"モダンコマースプラットフォーム評価",
        items:[
          "クラウドネイティブECプラットフォームの候補を整理し、選定基準を関係者で合意",
          "既存ロイヤルティ・在庫データの移行複雑度を初期調査",
          "顧客データ基盤（CDP）の要件を、マーケティング・IT部門とともに整理",
          "競合他社の移行事例をリサーチし、想定コスト・期間の参考レンジを収集",
        ],
        del:"プラットフォーム選定基準 + 移行複雑度初期評価 + 参考レンジ資料" },
      { phase:"Month 2", title:"Core Commerce Prototype", titleJp:"コアコマースプロトタイプ",
        items:[
          "商品カタログまたはカート機能（どちらか1機能）の新規実装（スコープ限定）",
          "旧基幹システムとのサンプルデータ同期検証",
          "ユーザーテスト（限定ユーザー・社内メンバー）でのUX初期検証",
          "実績工数の記録と、全体見積もり精度の検証",
        ],
        del:"コアコマースプロトタイプ + データ同期検証結果 + UX初期フィードバック" },
      { phase:"Month 3", title:"Phased Launch Feasibility & Decision Gate", titleJp:"段階的ローンチ実現可能性・意思決定ゲート",
        items:[
          "特定地域・店舗でのパイロットに向けた準備状況と前提条件の確認",
          "旧新システム並行稼働の期間・コストの概算レンジを更新",
          "続行・縮小・API Enablement切り替えの判断基準を整理",
          "取締役会承認に必要な情報と、現時点で不明な情報を分離して提示",
        ],
        del:"パイロット準備状況レポート + 意思決定ゲート資料 + 取締役会説明資料" },
    ],
  },
};

// ── Engine ────────────────────────────────────────────────────────────────────
function compute(inp) {
  const { industry, mainframe, codeDepth, undocumented, avgAge, noSuccessor, interfaces, customLevel, budgetLevel, riskTolerance } = inp;
  const cfg = IND_CONFIG[industry];
  const mf  = MF_CONFIG[mainframe];
  const unk = [];
  if (undocumented  === null)      unk.push("COBOLドキュメント");
  if (avgAge        === null)      unk.push("チーム年齢");
  if (noSuccessor   === null)      unk.push("後継者");
  if (customLevel   === "unknown") unk.push("カスタマイズ度");
  if (budgetLevel   === "unknown") unk.push("予算規模");
  if (riskTolerance === "unknown") unk.push("リスク許容度");
  if (mainframe     === "unknown") unk.push("プラットフォーム");
  const cx = (codeDepth/10)*0.3 + (undocumented===null?0.15:undocumented?0.3:0) + (avgAge===null?0.1:avgAge?0.2:0) + (noSuccessor===null?0.1:noSuccessor?0.2:0);
  const cu = customLevel==="unknown"?0.55:customLevel==="high"?1:customLevel==="medium"?0.55:0.2;
  const iv = Math.min(interfaces/20,1);
  const bu = budgetLevel==="unknown"?0.5:budgetLevel==="high"?1:budgetLevel==="medium"?0.5:0.2;
  const rv = riskTolerance==="unknown"?0.5:riskTolerance==="low"?1:riskTolerance==="medium"?0.5:0.15;
  const pr = mf.riskAdj;
  const apiS     = cx*0.30 + cu*0.20 + iv*0.15 + rv*0.15*cfg.weights.risk + pr*0.08;
  const refactS  = (1-cx)*0.45 + (1-cu)*0.30 + (1-rv)*0.15 + (1-iv)*0.10 - pr*0.06;
  const rebuildS = bu*0.40 + (1-rv)*0.25 + (1-cu)*0.25 + (1-cx)*0.10 - pr*0.06;
  const tot = Math.max(apiS+refactS+rebuildS, 0.001);
  const norm = { api:apiS/tot, refactor:refactS/tot, rebuild:rebuildS/tot };
  let primary = "api";
  if (norm.refactor>norm.api && norm.refactor>norm.rebuild) primary="refactor";
  if (norm.rebuild>norm.api  && norm.rebuild>norm.refactor) primary="rebuild";
  const sorted = Object.entries(norm).sort((a,b)=>b[1]-a[1]);
  const gap = sorted[0][1] - sorted[1][1];
  const hybridKey = gap<=0.15 ? [sorted[0][0],sorted[1][0]].sort().join("-") : null;
  const hybrid = hybridKey && HYBRID_DEF[hybridKey] ? HYBRID_DEF[hybridKey] : null;
  const conf = Math.max(Math.round((sorted[0][1]-unk.length*0.04)*100),30);
  const ttm  = primary==="api"?"3-6ヶ月":primary==="refactor"?"6-12ヶ月":"18-36ヶ月";
  const roi  = primary==="api"?"353%":primary==="refactor"?"~180%":"~120%";
  const radar = [
    { axis:"Cost Efficiency",     api:85, refactor:75, rebuild:40 },
    { axis:"Speed to Market",     api:90, refactor:65, rebuild:55 },
    { axis:"Risk Control",        api:primary==="api"?88:50, refactor:70, rebuild:35 },
    { axis:"Business Agility",    api:85, refactor:60, rebuild:80 },
    { axis:"Tech Debt Reduction", api:70, refactor:75, rebuild:95 },
  ];
  return { primary, norm, conf, radar, ttm, roi, cfg, mf, unk, hybrid, cx, cu };
}

// ── Tech Debt Trajectory ──────────────────────────────────────────────────────
// Generates 6-year tech debt trend lines per path.
// Values are relative index (100 = current state). Higher = more debt.
// Logic: API buys time but doesn't reduce debt. Refactor reduces steadily.
// Rebuild spikes in year 1-2 (project risk) then drops to near zero.
function buildDebtTrajectory(primary, norm, cx, cu) {
  const years = [0, 1, 2, 3, 4, 5, 6];

  // Base growth rate - how fast debt grows if nothing done
  // Higher complexity & customization = faster debt accumulation
  const growthRate = 1 + (cx * 0.12) + (cu * 0.06);

  return years.map(y => {
    // Inaction: debt compounds every year
    const inaction = Math.round(100 * Math.pow(growthRate, y));

    // API Enablement: debt stays flat (legacy still runs), slight creep from dual-maintenance
    const api = y === 0 ? 100 : Math.round(100 + (y * 4));

    // Refactor: steady reduction, takes 2 years to show effect
    const refactor = y <= 1
      ? Math.round(100 + (y * 8))
      : Math.round(100 - ((y - 1) * 18));

    // Rebuild: spikes year 1-2 (parallel run risk), then near zero
    const rebuild = y === 0 ? 100
      : y === 1 ? 145
      : y === 2 ? 130
      : Math.round(Math.max(130 - ((y - 2) * 40), 10));

    return {
      year: y + "Y",
      inaction,
      api:      Math.max(api, 0),
      refactor: Math.max(refactor, 0),
      rebuild:  Math.max(rebuild, 0),
    };
  });
}
function RBar({ label, val, color }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:12 }}>
        <span style={{ color:T2 }}>{label}</span>
        <span style={{ color:T3, fontFamily:"Space Grotesk,sans-serif" }}>{val}%</span>
      </div>
      <div style={{ height:4, background:"#1A2A3A", borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:val+"%", background:color, borderRadius:2 }} />
      </div>
    </div>
  );
}

function RTip({ active, payload }) {
  if (!active||!payload||!payload.length) return null;
  return (
    <div style={{ background:"#0D1520", border:"1px solid "+BORDER, borderRadius:4, padding:"9px 13px", fontSize:12, fontFamily:"Space Grotesk,sans-serif" }}>
      {payload.map((p,i) => <div key={i} style={{ color:p.color, marginBottom:2 }}>{p.name}: <strong>{p.value}</strong></div>)}
    </div>
  );
}

function DebtTip({ active, payload, label }) {
  if (!active||!payload||!payload.length) return null;
  return (
    <div style={{ background:"#060D18", border:"1px solid "+BORDER, borderRadius:4, padding:"10px 14px", fontSize:12, fontFamily:"Space Grotesk,sans-serif" }}>
      <div style={{ color:T3, marginBottom:6, fontSize:10, letterSpacing:1, textTransform:"uppercase" }}>{label} 経過</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color, marginBottom:3, display:"flex", justifyContent:"space-between", gap:16 }}>
          <span>{p.name}</span>
          <strong>{p.value}</strong>
        </div>
      ))}
      <div style={{ marginTop:6, fontSize:10, color:T3, borderTop:"1px solid "+BORDER, paddingTop:6 }}>技術債指数 (現状=100)</div>
    </div>
  );
}

function hexRgb(h) { return parseInt(h.slice(1,3),16)+","+parseInt(h.slice(3,5),16)+","+parseInt(h.slice(5,7),16); }

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [industry,  setIndustry]  = useState("banking");
  const [mainframe, setMainframe] = useState("ibm_zos");
  const [depth,     setDepth]     = useState(6);
  const [undoc,     setUndoc]     = useState(null);
  const [age,       setAge]       = useState(null);
  const [succ,      setSucc]      = useState(null);
  const [ifaces,    setIfaces]    = useState(8);
  const [cust,      setCust]      = useState("unknown");
  const [budget,    setBudget]    = useState("unknown");
  const [risk,      setRisk]      = useState("unknown");
  const [result,    setResult]    = useState(null);
  const [busy,      setBusy]      = useState(false);

  const run = () => {
    setBusy(true); setResult(null);
    setTimeout(() => {
      setResult(compute({ industry, mainframe, codeDepth:depth, undocumented:undoc, avgAge:age, noSuccessor:succ, interfaces:ifaces, customLevel:cust, budgetLevel:budget, riskTolerance:risk }));
      setBusy(false);
    }, 700);
  };

  const sv   = (v,mx) => ({ "--sv": (v/mx*100)+"%" });
  const mfc  = MF_CONFIG[mainframe];
  const ss   = SUP_STYLE[mfc.sup];
  const meta = result ? REC_META[result.primary] : null;
  const cpC  = { full:"cpf", partial:"cpp", limited:"cpl", unknown:"cpu" };
  const scC  = { full:"sf",  partial:"sp",  limited:"sl",  unknown:"su"  };

  // Slider range input needs a small style injection for the track fill
  const rangeCSS = "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } body { background:" + DARK + "; } input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:4px; border-radius:2px; background:linear-gradient(to right," + G + " var(--sv,50%)," + BORDER + " var(--sv,50%)); cursor:pointer; outline:none; border:none; } input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:" + G + "; border:2px solid " + DARK + "; cursor:pointer; } select { -webkit-appearance:none; } .mfc-sel { border-color:var(--ac) !important; background:rgba(var(--acr),0.08) !important; }";

  return (
    <div style={S.app}>
      <style>{rangeCSS}</style>

      {/* ── Header ── */}
      <header style={S.hdr}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div>
            <div style={S.logoT}>DanLun <span style={{ color:G }}>Logic</span></div>
            <div style={S.logoS}>Legacy Modernization Intelligence</div>
          </div>
        </div>
        <span style={S.badge}>Strategic Advisory · By Silynn Lee</span>
      </header>

      <main style={S.main}>

        {/* ── Hero ── */}
        <div style={{ marginBottom:44 }}>
          <div style={S.heroLabel}>Modernization Intelligence · Japan Market</div>
          <h1 style={S.heroTitle}>
            脱レガシー<br />
            <span style={{ fontWeight:700, color:G }}>Legacy</span> Modernization Advisor
          </h1>
          <p style={S.heroSub}>日本企業の旧システム資産活用に特化 · API Enablementを基軸とした移行路線図診断ツール</p>
        </div>

        {/* ── Row 1: Industry + Mainframe ── */}
        <div style={S.g2}>

          {/* Card 01 - Industry */}
          <div style={S.card}>
            <div style={S.cardTop}><span style={S.cardTitle}>Industry Context / 業種</span><span style={S.cardNum}>01</span></div>
            <div style={S.fg}>
              <label style={S.label}>業種を選択 <span style={S.labelJp}>Industry</span></label>
              <select style={S.select} value={industry} onChange={e=>setIndustry(e.target.value)}>
                {Object.entries(IND_CONFIG).map(([k,v]) => <option key={k} value={k}>{v.labelJp}</option>)}
              </select>
            </div>
            <div style={S.ib}>
              <div style={{ fontSize:13, color:T2, lineHeight:1.6, marginBottom:10 }}>{IND_CONFIG[industry].noteEn}</div>
              <div style={{ fontSize:12, color:T3, fontFamily:"Noto Sans JP,sans-serif", lineHeight:1.6, marginBottom:14 }}>{IND_CONFIG[industry].noteJp}</div>
              <div style={{ fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:G, fontFamily:"Space Grotesk,sans-serif", marginBottom:10, opacity:0.8 }}>Japan Market Context</div>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {IND_CONFIG[industry].context.map((c,i) => (
                  <li key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                    <span style={{ color:G, fontSize:10, marginTop:3, flexShrink:0, opacity:0.7 }}>-</span>
                    <span style={{ fontSize:12, color:T2, lineHeight:1.6, fontFamily:"Noto Sans JP,sans-serif" }}>{c}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop:14 }}>
                {IND_CONFIG[industry].tags.map(t => <span key={t} style={S.tag}>{t}</span>)}
              </div>
            </div>
          </div>

          {/* Card 02 - Mainframe */}
          <div style={S.card}>
            <div style={S.cardTop}><span style={S.cardTitle}>Mainframe Platform / メインフレーム</span><span style={S.cardNum}>02</span></div>
            <label style={{ ...S.label, marginBottom:12 }}>稼働中のメインフレームを選択 <span style={S.labelJp}>Select legacy platform</span></label>
            <div style={S.mfg}>
              {Object.entries(MF_CONFIG).map(([k,v]) => (
                <div key={k}
                  className={mainframe===k?"mfc-sel":""}
                  style={{ ...S.mfcBase, "--ac":v.color, "--acr":hexRgb(v.color) }}
                  onClick={() => setMainframe(k)}>
                  <div style={S.mfv}>{v.vendor}</div>
                  <div style={S.mfn}>{v.label}</div>
                  <div style={S.mfjp}>{v.labelJp}</div>
                  <span style={{ fontSize:9, letterSpacing:0.8, textTransform:"uppercase", marginTop:7, padding:"2px 6px", borderRadius:2, display:"inline-block", fontFamily:"Space Grotesk,sans-serif", fontWeight:600, background:"rgba("+hexRgb(v.color)+",0.15)", color:v.color }}>{v.supLabel}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14, padding:"13px 15px", background:ss.bg, border:"1px solid "+ss.border, borderRadius:3 }}>
              <div style={{ fontSize:11, fontWeight:600, color:ss.color, letterSpacing:1, textTransform:"uppercase", fontFamily:"Space Grotesk,sans-serif", marginBottom:8 }}>{mfc.label} · {mfc.supLabel}</div>
              <div style={{ fontSize:10, color:T3, letterSpacing:1, textTransform:"uppercase", fontFamily:"Space Grotesk,sans-serif", marginBottom:6 }}>Connectors</div>
              {mfc.connectors.map(c => <span key={c} style={{ display:"inline-block", fontSize:10, padding:"3px 9px", borderRadius:12, margin:"3px 3px 0 0", fontFamily:"Space Grotesk,sans-serif", fontWeight:500, background:"rgba("+hexRgb(ss.color)+",0.12)", color:ss.color, border:"1px solid rgba("+hexRgb(ss.color)+",0.25)" }}>{c}</span>)}
              <div style={{ fontSize:12, color:T2, lineHeight:1.6, marginTop:10 }}>{mfc.note}</div>
              <div style={{ fontSize:11, color:T3, fontFamily:"Noto Sans JP,sans-serif", marginTop:4, lineHeight:1.5 }}>{mfc.noteJp}</div>
              {mfc.sup!=="full" && <div style={{ marginTop:10, fontSize:12, color:"#FBBF24" }}>(!) 非IBMプラットフォーム検出 - 追加スコーピングセッションおよびフィジビリティPOCを推奨します。</div>}
            </div>
          </div>
        </div>

        {/* ── Card 03 - Code Complexity ── */}
        <div style={{ ...S.card, marginBottom:24 }}>
          <div style={S.cardTop}><span style={S.cardTitle}>Code Complexity &amp; Talent Risk / コード複雑度</span><span style={S.cardNum}>03</span></div>
          <div style={S.g2}>
            <div>
              <div style={S.fg}>
                <label style={S.label}>ロジックのネスト深度 <span style={S.labelJp}>Logic Nesting Depth</span></label>
                <input type="range" min={1} max={10} value={depth} style={sv(depth,10)} onChange={e=>setDepth(+e.target.value)} />
                <div style={S.rlabels}><span>1層</span><span style={{ color:G, fontWeight:600 }}>{depth}層</span><span>10層</span></div>
                <div style={S.dbox}>
                  <div style={S.dtit}>これは何を聞いていますか？</div>
                  <div style={S.dbody}>COBOLプログラム内でのPGM CALL連鎖の深さです。例：PGM-A が PGM-B を呼び出し、PGM-B が PGM-C を呼び出す場合は3層。層が深いほど安全にリファクタリングすることが難しくなります。</div>
                  <div style={S.dimp}><span style={S.dlab}>診断への影響 / Impact on Assessment</span>5層超ではリファクタリングのリスクが高く、API Enablementが推奨パスになります。既存システムを稼働させたままAPIとして切り出すことで安全に移行できます。</div>
                  <div style={S.dhint}>わからない場合はデフォルト値（6）のまま診断できます。</div>
                </div>
              </div>
              <div style={{ ...S.fg, marginBottom:0 }}>
                <label style={S.label}>インターフェース数（他部門連携）<span style={S.labelJp}>Cross-dept Interfaces</span></label>
                <input type="range" min={0} max={30} value={ifaces} style={sv(ifaces,30)} onChange={e=>setIfaces(+e.target.value)} />
                <div style={S.rlabels}><span>0本</span><span style={{ color:G, fontWeight:600 }}>{ifaces}本</span><span>30本</span></div>
                <div style={S.dbox}>
                  <div style={S.dtit}>これは何を聞いていますか？</div>
                  <div style={S.dbody}>このシステムが他部門・他システムとリアルタイムで連携しているデータ接続の本数です。例：勘定系と営業支援、勘定系と帳票システム、それぞれ1本と数えます。</div>
                  <div style={S.dimp}><span style={S.dlab}>診断への影響 / Impact on Assessment</span>10本超ではAPI Enablementが強く推奨されます。既存インターフェースを壊さずにクラウド化が可能です。</div>
                  <div style={S.dhint}>わからない場合はデフォルト値（8）のまま診断できます。</div>
                </div>
              </div>
            </div>
            <div>
              {[
                { v:undoc, s:setUndoc, l:"Undocumented COBOL logic present", jp:"未文書化COBOLロジックが存在する" },
                { v:age,   s:setAge,   l:"Team avg age exceeds 55 years",    jp:"運用チームの平均年齢が55歳超" },
                { v:succ,  s:setSucc,  l:"No identified successor / heir",   jp:"後継者・引き継ぎ者が不在" },
              ].map((it,i) => (
                <div key={i} style={{ ...S.trow, ...(i===2?{borderBottom:"none"}:{}) }}>
                  <div style={S.tlbl}>{it.l}<span style={S.tlblJp}>{it.jp}</span></div>
                  <div style={S.t3g}>
                    {[["No",false,"#2A3A4A",T2],["Yes",true,"rgba(255,205,0,0.12)",G],["?",null,"rgba(120,120,120,0.08)","#666"]].map(([lbl,val,bg,col]) => (
                      <button key={lbl} onClick={()=>it.s(val)} style={{ ...S.t3bBase, background:it.v===val?bg:"#0A1220", color:it.v===val?col:T3, borderRadius:lbl==="No"?"2px 0 0 2px":lbl==="?"?"0 2px 2px 0":"0", borderStyle:lbl==="?"?"dashed":"solid" }}>{lbl}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ marginTop:12, fontSize:11, color:T3, fontFamily:"Space Grotesk,sans-serif" }}>「?」= 不明のままでも診断可能 · 保守的なデフォルト値を使用します</div>
            </div>
          </div>
        </div>

        {/* ── Row 3: Customization / Budget / Risk ── */}
        <div style={S.g3}>
          {[
            { title:"Customization Level", num:"04", lbl:"業務特化カスタマイズ度",    jp:"Business-specific",    val:cust,   set:setCust,   opts:[["low","低 Low"],["medium","中 Med"],["high","高 High"],["unknown","不明 ?"]] },
            { title:"Budget Availability",  num:"05", lbl:"モダナイゼーション予算規模", jp:"Modernization budget",  val:budget, set:setBudget, opts:[["low","限定"],["medium","標準"],["high","潤沢"],["unknown","不明 ?"]] },
            { title:"Risk Tolerance",        num:"06", lbl:"リスク許容度",             jp:"Organization risk",     val:risk,   set:setRisk,   opts:[["low","保守的"],["medium","標準的"],["high","積極的"],["unknown","不明 ?"]] },
          ].map(c => (
            <div key={c.num} style={S.card}>
              <div style={S.cardTop}><span style={S.cardTitle}>{c.title}</span><span style={S.cardNum}>{c.num}</span></div>
              <label style={{ ...S.label, marginBottom:12 }}>{c.lbl}<span style={S.labelJp}>{c.jp}</span></label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {c.opts.map(([v,l]) => (
                  <button key={v} onClick={()=>c.set(v)} style={{ flex:1, minWidth:60, padding:"8px 10px", background:c.val===v?(v==="unknown"?"rgba(100,100,100,0.1)":"rgba(255,205,0,0.1)"):"#0A1220", border:"1px "+(v==="unknown"?"dashed":"solid")+" "+(c.val===v?(v==="unknown"?"#555":G):BORDER), borderRadius:2, color:c.val===v?(v==="unknown"?"#888":G):T3, fontSize:12, cursor:"pointer", fontFamily:"Space Grotesk,sans-serif" }}>{l}</button>
                ))}
              </div>
              {c.val==="unknown" && <div style={{ marginTop:10, fontSize:11, color:"#666", fontFamily:"Space Grotesk,sans-serif", lineHeight:1.5 }}>保守的な中間値を使用して診断します</div>}
            </div>
          ))}
        </div>

        <button style={S.abtn} onClick={run} disabled={busy}>
          {busy ? "分析中... Analyzing..." : "> 診断を実行する · Run Assessment"}
        </button>

        {/* ── Results ── */}
        {result && meta && (
          <div>
            <div style={S.divider} />
            <div style={S.secTitle}>Assessment Output · 診断結果</div>

            {/* Unknown fields notice */}
            {result.unk.length>0 && (
              <div style={{ background:"rgba(100,100,100,0.06)", border:"1px dashed #2A3A4A", borderRadius:4, padding:"14px 18px", marginBottom:22, display:"flex", alignItems:"flex-start", gap:12 }}>
                <span style={{ fontSize:16, color:"#888" }}>?</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"#888", fontFamily:"Space Grotesk,sans-serif", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>不明項目あり · Incomplete Data</div>
                  <div style={{ fontSize:12, color:T3, lineHeight:1.6 }}>未入力項目: <span style={{ fontFamily:"Space Grotesk,sans-serif", color:"#666" }}>{result.unk.join(", ")}</span></div>
                  <div style={{ marginTop:6, fontSize:11, color:"#555", fontFamily:"Space Grotesk,sans-serif" }}>保守的なデフォルト値を使用しています。Confidenceスコアを下方修正済み。</div>
                </div>
              </div>
            )}

            {/* Platform strip */}
            <div style={{ background:ss.bg, border:"1px solid "+ss.border, borderRadius:4, padding:"16px 20px", marginBottom:22 }}>
              <div style={{ fontSize:11, fontWeight:600, color:ss.color, letterSpacing:1, textTransform:"uppercase", fontFamily:"Space Grotesk,sans-serif", marginBottom:8 }}>{result.mf.label} · OpenLegacy Connector: {result.mf.supLabel}</div>
              <div style={{ fontSize:13, color:T2, lineHeight:1.6 }}>{result.mf.note}</div>
              <div style={{ fontSize:11, color:T3, fontFamily:"Noto Sans JP,sans-serif", marginTop:4, lineHeight:1.5 }}>{result.mf.noteJp}</div>
              <div style={{ marginTop:9 }}>
                {result.mf.connectors.map(c => <span key={c} style={{ display:"inline-block", fontSize:10, padding:"3px 9px", borderRadius:12, margin:"3px 3px 0 0", fontFamily:"Space Grotesk,sans-serif", fontWeight:500, background:"rgba("+hexRgb(ss.color)+",0.12)", color:ss.color, border:"1px solid rgba("+hexRgb(ss.color)+",0.25)" }}>{c}</span>)}
              </div>
            </div>

            {/* Main recommendation card */}
            <div style={{ background:meta.bgC, border:"1px solid "+meta.borderC, borderRadius:4, padding:26, marginBottom:22 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                <div>
                  <span style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:"4px 10px", borderRadius:2, fontFamily:"Space Grotesk,sans-serif", fontWeight:600, background:meta.badgeBC, color:meta.badgeC }}>{meta.badge}</span>
                  <div style={{ fontSize:22, fontWeight:700, color:T1, letterSpacing:-0.5, fontFamily:"Space Grotesk,sans-serif", margin:"10px 0 3px" }}>{meta.title}</div>
                  <div style={{ fontSize:13, color:T3, fontFamily:"Noto Sans JP,sans-serif" }}>{meta.titleJp}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={S.confN}>{result.conf}%</div>
                  <div style={S.confL}>Confidence</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:T2, lineHeight:1.7, marginBottom:16 }}>{meta.desc}</p>
              <div style={S.mrow}>
                <div style={S.mi}><div style={S.mv}>{result.ttm}</div><div style={S.mk}>Time to Market</div></div>
                <div style={S.mi}><div style={S.mv}>{result.roi}</div><div style={S.mk}>Projected ROI</div></div>
                <div style={{ ...S.mi, borderColor:"#2A3A4A", borderStyle:"dashed" }}>
                  <div style={{ ...S.mv, fontSize:13, color:"#555" }}>TBD</div>
                  <div style={{ fontSize:10, color:"#444", marginTop:4, lineHeight:1.4, fontFamily:"Noto Sans JP,sans-serif" }}>費用はEngagement Manager確認要</div>
                  <div style={{ ...S.mk, color:"#444" }}>Cost Estimate</div>
                </div>
              </div>
            </div>

            {/* Hybrid section */}
            {result.hybrid && (
              <div style={{ background:"rgba(15,98,254,0.06)", border:"1px solid rgba(15,98,254,0.35)", borderRadius:4, padding:26, marginBottom:22 }}>
                <span style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", padding:"4px 10px", borderRadius:2, fontFamily:"Space Grotesk,sans-serif", fontWeight:600, background:"rgba(15,98,254,0.18)", color:"#60A5FA", display:"inline-block", marginBottom:12 }}>HYBRID RECOMMENDED</span>
                <div style={{ fontSize:20, fontWeight:700, color:T1, letterSpacing:-0.5, fontFamily:"Space Grotesk,sans-serif", marginBottom:3 }}>{result.hybrid.title}</div>
                <div style={{ fontSize:12, color:T3, fontFamily:"Space Grotesk,sans-serif", marginBottom:16, letterSpacing:0.5 }}>{result.hybrid.en}</div>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:14 }}>
                  <div style={{ ...S.mi, borderColor:"rgba(15,98,254,0.3)", minWidth:140 }}><div style={{ ...S.mv, fontSize:14, color:"#60A5FA" }}>{result.hybrid.ttm}</div><div style={S.mk}>Total Timeline</div></div>
                  <div style={{ ...S.mi, borderColor:"rgba(15,98,254,0.3)", minWidth:140 }}><div style={{ ...S.mv, fontSize:14, color:"#60A5FA" }}>{result.hybrid.risk}</div><div style={S.mk}>Risk Profile</div></div>
                </div>
                {[["Phase 1",result.hybrid.p1],["Phase 2",result.hybrid.p2]].map(([ph,txt]) => (
                  <div key={ph} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid "+BORDER, borderRadius:3, padding:"14px 16px", marginBottom:10 }}>
                    <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#60A5FA", fontFamily:"Space Grotesk,sans-serif", marginBottom:6 }}>{ph}</div>
                    <div style={{ fontSize:13, color:T2, lineHeight:1.65 }}>{txt}</div>
                  </div>
                ))}
                <div style={{ background:"rgba(255,205,0,0.04)", borderLeft:"2px solid rgba(255,205,0,0.35)", padding:"12px 16px", marginTop:14 }}>
                  <span style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:G, fontFamily:"Space Grotesk,sans-serif", marginBottom:6, display:"block" }}>なぜ双軌制が有効か · Strategic Rationale</span>
                  <div style={{ fontSize:12, color:T2, lineHeight:1.65 }}>{result.hybrid.why}</div>
                </div>
              </div>
            )}

            {/* Charts */}
            <div style={{ ...S.g2, alignItems:"start" }}>
              <div style={S.card}>
                <div style={S.cardTop}><span style={S.cardTitle}>Path Score Breakdown</span></div>
                {[
                  { label:"API Enablement (OpenLegacy)", val:Math.round(result.norm.api*100),     color:G },
                  { label:"Refactor",                    val:Math.round(result.norm.refactor*100), color:"#60A5FA" },
                  { label:"Rebuild",                     val:Math.round(result.norm.rebuild*100),  color:"#F87171" },
                ].map(b => <RBar key={b.label} {...b} />)}
                <div style={{ marginTop:20 }}>
                  <div style={{ ...S.cardTitle, marginBottom:13 }}>Risk / Impact Matrix</div>
                  {meta.risks.map(r => <RBar key={r.label} {...r} />)}
                </div>
              </div>
              <div style={S.card}>
                <div style={S.cardTop}><span style={S.cardTitle}>Multi-Dimension Comparison</span></div>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={result.radar}>
                    <PolarGrid stroke="#1A2A3A" />
                    <PolarAngleAxis dataKey="axis" tick={{ fill:T3, fontSize:11, fontFamily:"Space Grotesk,sans-serif" }} />
                    <Radar name="API Enablement" dataKey="api"      stroke={G}        fill={G}        fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Refactor"        dataKey="refactor" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.1}  strokeWidth={1.5} />
                    <Radar name="Rebuild"         dataKey="rebuild"  stroke="#F87171" fill="#F87171" fillOpacity={0.1}  strokeWidth={1.5} />
                    <Tooltip content={<RTip />} />
                  </RadarChart>
                </ResponsiveContainer>
                <div style={{ display:"flex", gap:18, justifyContent:"center", marginTop:6 }}>
                  {[{ c:G, n:"API Enablement" },{ c:"#60A5FA", n:"Refactor" },{ c:"#F87171", n:"Rebuild" }].map(l => (
                    <div key={l.n} style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:10, height:2, background:l.c, borderRadius:1 }} />
                      <span style={{ fontSize:10, color:T3, fontFamily:"Space Grotesk,sans-serif" }}>{l.n}</span>
                    </div>
                  ))}
                </div>
                <div style={S.ib}>
                  <strong style={{ color:G, fontSize:11, letterSpacing:1, textTransform:"uppercase", fontFamily:"Space Grotesk,sans-serif" }}>{IND_CONFIG[industry].labelJp} · Advisory Note</strong>
                  <div style={{ marginTop:7 }}>{result.cfg.noteEn}</div>
                  <div style={{ fontFamily:"Noto Sans JP,sans-serif", fontSize:12, color:T3, marginTop:4 }}>{result.cfg.noteJp}</div>
                </div>
              </div>
            </div>

            {/* Warnings */}
            {result.norm.rebuild>0.35 && (
              <div style={S.wbox}>
                <span>(!)</span>
                <span><strong>Rebuild Risk Flag:</strong> スコアに基づき「フルリビルド」の可能性が排除できません。しかしOpenLegacy Phased Co-Existenceアプローチにより、リビルドが不要になるケースが大多数です。Workshop前にHub Planner依存関係マッピングの実施を強く推奨します。</span>
              </div>
            )}
            {result.mf.sup==="limited" && (
              <div style={{ ...S.wbox, borderColor:"rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.04)", color:"#FCA5A5" }}>
                <span>(!)</span>
                <span><strong>Platform Alert · {result.mf.label}:</strong> コネクタ対応が限定的です。タイムライン・予算確定前に2〜4週間のフィジビリティPOCが必須です。OpenLegacy Solutions Architectureチームへのエスカレーションを推奨します。</span>
              </div>
            )}

            {/* Tech Debt Trajectory */}
            <div style={S.divider} />
            <div style={S.secTitle}>技術債トレンド · Tech Debt Trajectory (6-Year Projection)</div>
            <div style={{ fontSize:13, color:T2, lineHeight:1.7, marginBottom:6 }}>
              現状のまま放置した場合、技術債は複利で増加します。以下は入力値をもとにした
              <strong style={{ color:T1 }}>3パスの技術債推移シミュレーション</strong>です。
              縦軸は現状を100とした相対指数です。
            </div>
            <div style={{ fontSize:11, color:T3, fontFamily:"Space Grotesk,sans-serif", marginBottom:20 }}>
              Note: Values are indicative projections based on complexity and customization inputs, not financial estimates. For CFO/board presentations, use as directional reference only.
            </div>
            <div style={{ background:CARD, border:"1px solid "+BORDER, borderRadius:4, padding:26, marginBottom:8 }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={buildDebtTrajectory(result.primary, result.norm, result.cx, result.cu)} margin={{ top:10, right:20, left:0, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis dataKey="year" tick={{ fill:T3, fontSize:11, fontFamily:"Space Grotesk,sans-serif" }} />
                  <YAxis tick={{ fill:T3, fontSize:11, fontFamily:"Space Grotesk,sans-serif" }} domain={[0,200]} tickFormatter={v=>v} />
                  <Tooltip content={<DebtTip />} />
                  <Legend wrapperStyle={{ fontSize:11, fontFamily:"Space Grotesk,sans-serif", paddingTop:16 }} />
                  <ReferenceLine y={100} stroke="#2A3A4A" strokeDasharray="4 4" label={{ value:"現状", fill:T3, fontSize:10 }} />
                  <Line type="monotone" dataKey="inaction" name="維持現状 (Inaction)" stroke="#F87171" strokeWidth={2} strokeDasharray="6 3" dot={{ r:3, fill:"#F87171" }} />
                  <Line type="monotone" dataKey="api"      name="API Enablement"       stroke={G}        strokeWidth={2.5} dot={{ r:3, fill:G }} />
                  <Line type="monotone" dataKey="refactor" name="Refactor"              stroke="#60A5FA"  strokeWidth={2} dot={{ r:3, fill:"#60A5FA" }} />
                  <Line type="monotone" dataKey="rebuild"  name="Rebuild"               stroke="#A78BFA"  strokeWidth={2} dot={{ r:3, fill:"#A78BFA" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display:"flex", gap:12, marginBottom:8, flexWrap:"wrap" }}>
              {[
                { color:"#F87171", label:"維持現状",    desc:"複雑度・カスタマイズ度に応じて技術債が複利で増加。人材退職と重なると加速。" },
                { color:G,         label:"API Enablement", desc:"レガシーは残るため技術債はほぼ横ばい。ただし二重保守コストが微増。Quick Winと引き換えのトレードオフ。" },
                { color:"#60A5FA", label:"Refactor",    desc:"初期2年は工数増で一時的に負荷上昇。その後は技術債が継続的に削減。" },
                { color:"#A78BFA", label:"Rebuild",     desc:"Year 1-2は並行稼働リスクで一時急上昇。成功すれば5-6年目に技術債はほぼゼロ。" },
              ].map(item => (
                <div key={item.label} style={{ flex:"1 1 200px", background:"rgba(255,255,255,0.02)", border:"1px solid "+BORDER, borderRadius:3, padding:"12px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <div style={{ width:20, height:2, background:item.color, borderRadius:1, flexShrink:0 }} />
                    <span style={{ fontSize:11, fontWeight:600, color:item.color, fontFamily:"Space Grotesk,sans-serif" }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize:11, color:T3, lineHeight:1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(255,205,0,0.04)", borderLeft:"2px solid rgba(255,205,0,0.3)", padding:"12px 16px", marginBottom:0 }}>
              <span style={{ fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:G, fontFamily:"Space Grotesk,sans-serif", display:"block", marginBottom:5 }}>CFO・経営層への説明ポイント</span>
              <div style={{ fontSize:12, color:T2, lineHeight:1.65 }}>
                「技術債は放置すると複利で増加します。{result.primary==="api"?"API Enablementは今すぐ業務価値を解放しながら、技術債の急増を防ぐ最もリスクの低い第一手です。":result.primary==="refactor"?"Refactorは初期2年の投資を経て、中長期的に保守コストと開発遅延を継続的に削減します。":"Rebuildは短期的には最大の投資を要しますが、5〜6年後に技術債をほぼゼロにする唯一の選択肢です。"}このグラフは、今の意思決定が5年後のIT競争力に直結することを示しています。」
              </div>
            </div>

            {/* POC Roadmap */}
            <div style={S.divider} />
            <div style={S.secTitle}>推奨POCロードマップ · Recommended POC Roadmap (3 months)</div>
            <div style={{ fontSize:13, color:T2, lineHeight:1.7, marginBottom:6 }}>
              予算確定・経営承認・ベンダー選定——その全ての前に、<strong style={{ color:T1 }}>POCを必ず実施してください。</strong>
              仮説を検証せずに大規模移行に踏み込むことは、日本市場における最大のリスクです。
              以下は <strong style={{ color:G }}>{IND_CONFIG[industry].labelJp}</strong> x <strong style={{ color:G }}>{REC_META[result.primary].title}</strong> に特化した、実行可能な3ヶ月アクションプランです。
            </div>
            <div style={{ fontSize:12, color:T3, fontFamily:"Space Grotesk,sans-serif", marginBottom:20 }}>A POC is non-negotiable. Validate every assumption before committing budget or timeline.</div>
            <div style={{ border:"1px solid "+BORDER, borderRadius:4, overflow:"hidden", marginBottom:16 }}>
              <div style={S.pocHdr}>
                {["Phase","アクティビティ · Activities","成果物 · Deliverables"].map(h => <div key={h} style={S.pocHdrCell}>{h}</div>)}
              </div>
              {POC_DATA[industry][result.primary].map((row,i) => (
                <div key={i} style={{ ...S.pocRow, ...(i===2?{borderBottom:"none"}:{}) }}>
                  <div style={S.pocCell}>
                    <div style={S.pocMo}>{row.phase}</div>
                    <div style={{ fontSize:11, color:T3, marginTop:4, fontFamily:"Space Grotesk,sans-serif", lineHeight:1.4 }}>{row.title}</div>
                    <div style={{ fontSize:10, color:"#444", marginTop:2, fontFamily:"Noto Sans JP,sans-serif" }}>{row.titleJp}</div>
                  </div>
                  <div style={S.pocCell}>
                    <ul style={{ listStyle:"none", padding:0 }}>
                      {row.items.map((item,j) => (
                        <li key={j} style={{ padding:"2px 0 2px 12px", position:"relative", fontSize:12, color:T2, lineHeight:1.55 }}>
                          <span style={{ position:"absolute", left:0, color:"#2A3A50" }}>-</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ ...S.pocCell, borderRight:"none" }}>
                    <div style={S.pocDel}>{row.del}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:16, marginTop:14, flexWrap:"wrap" }}>
              {[
                { k:"POC期間の目安", v:"3ヶ月" },
                { k:"Month 3 ゴール", v:result.primary==="api"?"Go/No-Go判定 + 移行ロードマップ確定":result.primary==="refactor"?"速度改善実績 + 全体ロードマップ確定":"TCO再試算 + 経営承認取得" },
              ].map(m => (
                <div key={m.k} style={{ flex:1, minWidth:180, background:"#060D18", border:"1px solid "+BORDER, borderRadius:4, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:T3, fontFamily:"Space Grotesk,sans-serif", marginBottom:6 }}>{m.k}</div>
                  <div style={{ fontSize:12, color:T1, lineHeight:1.6, fontFamily:"Space Grotesk,sans-serif" }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={S.ftr}>
        <div style={S.fn}>2026 DanLun Logic by Silynn Lee · All Rights Reserved</div>
        <div style={{ ...S.fn, color:G, opacity:0.6 }}>Powered by Vibe Coding &amp; Expert Domain Knowledge</div>
      </footer>
    </div>
  );
}
