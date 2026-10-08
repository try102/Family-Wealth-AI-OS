/*

Family Wealth AI OS V7

Investment Locales

投资决策中心多语言支持。

语言选择保存在 localStorage（fw_language），

其他模块可复用同一机制扩展。

*/

const STORAGE_KEY =

    "fw_language";

export const SUPPORTED_LANGUAGES = [

    {

        code:

            "zh-CN",

        label:

            "简体中文"

    },

    {

        code:

            "zh-TW",

        label:

            "繁體中文"

    },

    {

        code:

            "en-US",

        label:

            "English"

    },

    {

        code:

            "ja-JP",

        label:

            "日本語"

    }

];

const DICTIONARY = {

    "zh-CN": {

        title: "投资决策中心",

        back: "← 返回首页",

        language: "语言",

        overview: "决策总览",

        portfolioValue: "组合市值",

        totalCost: "总成本",

        totalGainLoss: "总盈亏",

        realizedGainLoss: "已实现利得",

        totalReturn: "总收益率",

        holdingsCount: "持仓数量",

        riskWarnings: "风险提示",

        decisionTable: "持仓决策",

        colSymbol: "代码",

        colName: "名称",

        colQty: "数量",

        colAvgCost: "单位成本",

        colPrice: "现价",

        colMarketValue: "市值",

        colWeight: "权重",

        colGainLoss: "盈亏",

        colReturn: "收益率",

        colDecision: "决策信号",

        signalHOLD: "持有",

        signalREDUCE: "减仓",

        signalREVIEW: "复核",

        signalTAKE_PROFIT: "考虑止盈",

        reasonHold: "仓位与盈亏处于正常区间",

        reasonConcentration: "单只权重 {weight}%，集中度过高",

        reasonLoss: "收益率 {rate}%，亏损较大，请复核基本面",

        reasonProfit: "收益率 {rate}%，可考虑部分止盈",

        reasonSmall: "小仓位，继续观察",

        adviceTitle: "决策建议",

        adviceNone: "当前无特别建议，保持现有策略",

        concentrationWarn: "{symbol} 权重 {weight}%，注意集中度风险",

        disclaimer: "决策信号由本地规则生成（权重/盈亏阈值），仅供参考，不构成投资建议。",

        noHoldings: "暂无持仓，先记录一笔买入",

        recordTrade: "⇄ 记录交易",

        holdingsAuto: "持仓（买卖自动更新）",

        recentTrades: "最近交易",

        investmentsTitle: "投资列表",

        addInvestment: "+ 新增投资",

        scopeLabel: "持仓范围",

        scopeMerged: "合并（全部成员）",

        scopeShared: "家庭共同",

        allocation: "组合配置",

        performanceLabel: "表现",

        riskLabel: "风险",

        noInvestments: "暂无投资",

        noTrades: "暂无交易记录",

        edit: "编辑",

        delete: "删除",

        unnamed: "未命名",

        sharesUnit: "股",

        posCost: "成本",

        unrealized: "未实现盈亏",

        formAddTitle: "新增投资",

        formEditTitle: "编辑投资",

        invName: "投资名称",

        symbolLabel: "代码",

        typeLabel: "类型",

        currentValueLabel: "当前价值",

        selectType: "请选择类型",

        typeStock: "股票",

        typeETF: "ETF",

        typeBond: "债券",

        typeFund: "基金",

        typeOther: "其他",

        saveInvestment: "保存投资",

        updateInvestment: "更新投资",

        cancel: "取消",

        formTradeTitle: "记录交易",

        actionLabel: "操作",

        nameLabel: "名称",

        quantityLabel: "数量",

        quantityHint: "股息/利息可留空",

        priceLabel: "价格",

        priceHint: "股息/利息可留空",

        amountLabel: "金额",

        amountHint: "留空则按 数量×价格 计算；股息/利息直接填金额",

        dateLabel: "日期",

        accountLabel: "账户",

        accountHintTrade: "不选也会记入现金流，只是不影响账户余额",

        selectAccount: "选择账户（可选）",

        optBuy: "买入",

        optSell: "卖出",

        optDividend: "股息",

        optInterest: "利息",

        saveTrade: "保存交易",

        confirmDelete: "删除投资",

        allocEmpty: "暂无配置数据",

        memberLabel: "成员",

        memberNewOption: "+ 新增成员（输入姓名）",

        memberNamePlaceholder: "输入成员姓名",

        buyDate: "买入",

        sellDate: "卖出",

        holdingBalance: "持仓余额",

        riskNone: "暂无风险提示",

        riskHighLevel: "高",

        noAccountHint: "暂无账户。可先到账户页新建；不选账户也会记入现金流与交易流水，只是不影响账户余额。"

    },

    "zh-TW": {

        title: "投資決策中心",

        back: "← 返回首頁",

        language: "語言",

        overview: "決策總覽",

        portfolioValue: "組合市值",

        totalCost: "總成本",

        totalGainLoss: "總盈虧",

        realizedGainLoss: "已實現利得",

        totalReturn: "總收益率",

        holdingsCount: "持倉數量",

        riskWarnings: "風險提示",

        decisionTable: "持倉決策",

        colSymbol: "代碼",

        colName: "名稱",

        colQty: "數量",

        colAvgCost: "單位成本",

        colPrice: "現價",

        colMarketValue: "市值",

        colWeight: "權重",

        colGainLoss: "盈虧",

        colReturn: "收益率",

        colDecision: "決策信號",

        signalHOLD: "持有",

        signalREDUCE: "減倉",

        signalREVIEW: "復核",

        signalTAKE_PROFIT: "考慮止盈",

        reasonHold: "倉位與盈虧處於正常區間",

        reasonConcentration: "單隻權重 {weight}%，集中度過高",

        reasonLoss: "收益率 {rate}%，虧損較大，請復核基本面",

        reasonProfit: "收益率 {rate}%，可考慮部分止盈",

        reasonSmall: "小倉位，繼續觀察",

        adviceTitle: "決策建議",

        adviceNone: "目前無特別建議，保持現有策略",

        concentrationWarn: "{symbol} 權重 {weight}%，注意集中度風險",

        disclaimer: "決策信號由本地規則生成（權重/盈虧閾值），僅供參考，不構成投資建議。",

        noHoldings: "暫無持倉，先記錄一筆買入",

        recordTrade: "⇄ 記錄交易",

        holdingsAuto: "持倉（買賣自動更新）",

        recentTrades: "最近交易",

        investmentsTitle: "投資列表",

        addInvestment: "+ 新增投資",

        scopeLabel: "持倉範圍",

        scopeMerged: "合併（全部成員）",

        scopeShared: "家庭共同",

        allocation: "組合配置",

        performanceLabel: "表現",

        riskLabel: "風險",

        noInvestments: "暫無投資",

        noTrades: "暫無交易記錄",

        edit: "編輯",

        delete: "刪除",

        unnamed: "未命名",

        sharesUnit: "股",

        posCost: "成本",

        unrealized: "未實現盈虧",

        formAddTitle: "新增投資",

        formEditTitle: "編輯投資",

        invName: "投資名稱",

        symbolLabel: "代碼",

        typeLabel: "類型",

        currentValueLabel: "目前價值",

        selectType: "請選擇類型",

        typeStock: "股票",

        typeETF: "ETF",

        typeBond: "債券",

        typeFund: "基金",

        typeOther: "其他",

        saveInvestment: "儲存投資",

        updateInvestment: "更新投資",

        cancel: "取消",

        formTradeTitle: "記錄交易",

        actionLabel: "操作",

        nameLabel: "名稱",

        quantityLabel: "數量",

        quantityHint: "股息/利息可留空",

        priceLabel: "價格",

        priceHint: "股息/利息可留空",

        amountLabel: "金額",

        amountHint: "留空則按 數量×價格 計算；股息/利息直接填金額",

        dateLabel: "日期",

        accountLabel: "帳戶",

        accountHintTrade: "不選也會記入現金流，只是不影響帳戶餘額",

        selectAccount: "選擇帳戶（可選）",

        optBuy: "買入",

        optSell: "賣出",

        optDividend: "股息",

        optInterest: "利息",

        saveTrade: "儲存交易",

        confirmDelete: "刪除投資",

        allocEmpty: "暫無配置數據",

        memberLabel: "成員",

        memberNewOption: "+ 新增成員（輸入姓名）",

        memberNamePlaceholder: "輸入成員姓名",

        buyDate: "買入",

        sellDate: "賣出",

        holdingBalance: "持倉餘額",

        riskNone: "暫無風險提示",

        riskHighLevel: "高",

        noAccountHint: "暫無帳戶。可先到帳戶頁新增；不選帳戶也會記入現金流與交易流水，只是不影響帳戶餘額。"

    },

    "en-US": {

        title: "Investment Decision Center",

        back: "← Back to Dashboard",

        language: "Language",

        overview: "Decision Overview",

        portfolioValue: "Portfolio Value",

        totalCost: "Total Cost",

        totalGainLoss: "Total Gain/Loss",

        realizedGainLoss: "Realized Gain/Loss",

        totalReturn: "Total Return",

        holdingsCount: "Holdings",

        riskWarnings: "Risk Warnings",

        decisionTable: "Holdings Decisions",

        colSymbol: "Symbol",

        colName: "Name",

        colQty: "Qty",

        colAvgCost: "Avg Cost",

        colPrice: "Price",

        colMarketValue: "Market Value",

        colWeight: "Weight",

        colGainLoss: "Gain/Loss",

        colReturn: "Return",

        colDecision: "Signal",

        signalHOLD: "HOLD",

        signalREDUCE: "REDUCE",

        signalREVIEW: "REVIEW",

        signalTAKE_PROFIT: "TAKE PROFIT",

        reasonHold: "Weight and return within normal range",

        reasonConcentration: "Single position is {weight}% of portfolio — concentration too high",

        reasonLoss: "Return {rate}% — sizable loss, review fundamentals",

        reasonProfit: "Return {rate}% — consider taking partial profit",

        reasonSmall: "Small position — keep observing",

        adviceTitle: "Decision Advice",

        adviceNone: "No special actions — maintain current strategy",

        concentrationWarn: "{symbol} is {weight}% of the portfolio — concentration risk",

        disclaimer: "Signals are generated by local rules (weight/return thresholds) for reference only — not investment advice.",

        noHoldings: "No holdings yet — record a buy first",

        recordTrade: "⇄ Record Trade",

        holdingsAuto: "Holdings (auto-updated by trades)",

        recentTrades: "Recent Trades",

        investmentsTitle: "Investments",

        addInvestment: "+ Add Investment",

        scopeLabel: "Holdings Scope",

        scopeMerged: "Merged (all members)",

        scopeShared: "Family / Unassigned",

        allocation: "Portfolio Allocation",

        performanceLabel: "Performance",

        riskLabel: "Risk",

        noInvestments: "No investments",

        noTrades: "No trades recorded",

        edit: "Edit",

        delete: "Delete",

        unnamed: "Unnamed",

        sharesUnit: "shares",

        posCost: "Cost",

        unrealized: "Unrealized Gain/Loss",

        formAddTitle: "Add Investment",

        formEditTitle: "Edit Investment",

        invName: "Investment Name",

        symbolLabel: "Symbol",

        typeLabel: "Type",

        currentValueLabel: "Current Value",

        selectType: "Select type",

        typeStock: "Stock",

        typeETF: "ETF",

        typeBond: "Bond",

        typeFund: "Fund",

        typeOther: "Other",

        saveInvestment: "Save Investment",

        updateInvestment: "Update Investment",

        cancel: "Cancel",

        formTradeTitle: "Record Trade",

        actionLabel: "Action",

        nameLabel: "Name",

        quantityLabel: "Quantity",

        quantityHint: "optional for dividend/interest",

        priceLabel: "Price",

        priceHint: "optional for dividend/interest",

        amountLabel: "Amount",

        amountHint: "leave blank to use Quantity × Price; for dividend/interest enter the amount directly",

        dateLabel: "Date",

        accountLabel: "Account",

        accountHintTrade: "without an account it still enters Cash Flow; it just does not change a balance",

        selectAccount: "Select Account (optional)",

        optBuy: "BUY",

        optSell: "SELL",

        optDividend: "DIVIDEND",

        optInterest: "INTEREST",

        saveTrade: "Save Trade",

        confirmDelete: "Delete investment",

        allocEmpty: "No allocation data",

        memberLabel: "Member",

        memberNewOption: "+ New member (type name)",

        memberNamePlaceholder: "Member name",

        buyDate: "Buy",

        sellDate: "Sell",

        holdingBalance: "Balance",

        riskNone: "No risk warnings",

        riskHighLevel: "HIGH",

        noAccountHint: "No account yet. You can create one on the Accounts page; without an account the trade still enters Cash Flow and transactions, it just does not change any balance."

    },

    "ja-JP": {

        title: "投資意思決定センター",

        back: "← ダッシュボードに戻る",

        language: "言語",

        overview: "意思決定の概要",

        portfolioValue: "ポートフォリオ評価額",

        totalCost: "総コスト",

        totalGainLoss: "総損益",

        realizedGainLoss: "実現損益",

        totalReturn: "総リターン",

        holdingsCount: "保有銘柄数",

        riskWarnings: "リスク警告",

        decisionTable: "保有銘柄の判断",

        colSymbol: "銘柄",

        colName: "名称",

        colQty: "数量",

        colAvgCost: "平均コスト",

        colPrice: "現在価格",

        colMarketValue: "評価額",

        colWeight: "比重",

        colGainLoss: "損益",

        colReturn: "収益率",

        colDecision: "シグナル",

        signalHOLD: "保有",

        signalREDUCE: "縮小",

        signalREVIEW: "見直し",

        signalTAKE_PROFIT: "利確検討",

        reasonHold: "比重と収益は正常範囲です",

        reasonConcentration: "単一銘柄が {weight}% — 集中しすぎです",

        reasonLoss: "収益率 {rate}% — 損失が大きいため見直しを",

        reasonProfit: "収益率 {rate}% — 一部利確を検討",

        reasonSmall: "小口のため様子見",

        adviceTitle: "意思決定アドバイス",

        adviceNone: "特別な対応は不要、現戦略を維持",

        concentrationWarn: "{symbol} は {weight}% — 集中リスクに注意",

        disclaimer: "シグナルはローカルルール（比重・収益の閾値）で生成された参考情報であり、投資助言ではありません。",

        noHoldings: "保有銘柄なし — まず買いを記録してください",

        recordTrade: "⇄ 取引を記録",

        holdingsAuto: "保有銘柄（取引で自動更新）",

        recentTrades: "最近の取引",

        investmentsTitle: "投資リスト",

        addInvestment: "+ 投資を追加",

        scopeLabel: "保有範囲",

        scopeMerged: "合算（全メンバー）",

        scopeShared: "家族共通",

        allocation: "ポートフォリオ配分",

        performanceLabel: "パフォーマンス",

        riskLabel: "リスク",

        noInvestments: "投資がありません",

        noTrades: "取引記録がありません",

        edit: "編集",

        delete: "削除",

        unnamed: "名称未設定",

        sharesUnit: "株",

        posCost: "コスト",

        unrealized: "未実現損益",

        formAddTitle: "投資を追加",

        formEditTitle: "投資を編集",

        invName: "投資名",

        symbolLabel: "銘柄コード",

        typeLabel: "種類",

        currentValueLabel: "現在価値",

        selectType: "種類を選択",

        typeStock: "株式",

        typeETF: "ETF",

        typeBond: "債券",

        typeFund: "ファンド",

        typeOther: "その他",

        saveInvestment: "投資を保存",

        updateInvestment: "投資を更新",

        cancel: "キャンセル",

        formTradeTitle: "取引を記録",

        actionLabel: "操作",

        nameLabel: "名称",

        quantityLabel: "数量",

        quantityHint: "配当/利息の場合は空欄可",

        priceLabel: "価格",

        priceHint: "配当/利息の場合は空欄可",

        amountLabel: "金額",

        amountHint: "空欄の場合は 数量×価格 で計算；配当/利息は金額を直接入力",

        dateLabel: "日付",

        accountLabel: "口座",

        accountHintTrade: "口座なしでもキャッシュフローに記録されます（残高は変わりません）",

        selectAccount: "口座を選択（任意）",

        optBuy: "買い",

        optSell: "売り",

        optDividend: "配当",

        optInterest: "利息",

        saveTrade: "取引を保存",

        confirmDelete: "投資を削除",

        allocEmpty: "配分データなし",

        memberLabel: "メンバー",

        memberNewOption: "+ メンバー追加（名前を入力）",

        memberNamePlaceholder: "メンバー名",

        buyDate: "買い",

        sellDate: "売り",

        holdingBalance: "保有残高",

        riskNone: "リスク警告なし",

        riskHighLevel: "高",

        noAccountHint: "口座がありません。口座ページで作成できます。口座なしでもキャッシュフローと取引履歴に記録されます（残高は変わりません）。"

    }

};

function isSupported(code) {

    return SUPPORTED_LANGUAGES.some(

        item => item.code === code

    );

}

export function getLanguage() {

    try {

        const saved =

            globalThis.localStorage

                ?.getItem(

                    STORAGE_KEY

                );

        if (

            saved &&

            isSupported(saved)

        ) {

            return saved;

        }

    } catch (error) {

        // Storage unavailable: fall through.

    }

    return "zh-CN";

}

export function setLanguage(code) {

    if (

        !isSupported(code)

    ) {

        return getLanguage();

    }

    try {

        globalThis.localStorage

            ?.setItem(

                STORAGE_KEY,

                code

            );

    } catch (error) {

        // Storage unavailable: language applies to this render only.

    }

    return code;

}

export function t(key, params = {}) {

    const language =

        getLanguage();

    const template =

        DICTIONARY[language]?.[key] ??

        DICTIONARY["en-US"]?.[key] ??

        key;

    return Object.keys(params)

        .reduce(

            (text, name) =>

                text.replaceAll(

                    `{${name}}`,

                    String(params[name])

                ),

            template

        );

}

export default {

    SUPPORTED_LANGUAGES,

    getLanguage,

    setLanguage,

    t

};
