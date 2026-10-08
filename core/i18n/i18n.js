/*
Family Wealth AI OS V7
Global i18n Core
全局多语言核心：语言选择保存在 localStorage（fw_language），与投资决策中心共用同一偏好。
支持：简体中文 / 繁體中文 / English / 日本語
*/

const STORAGE_KEY = "fw_language";

export const SUPPORTED_LANGUAGES = [
    { code: "zh-CN", label: "简体中文" },
    { code: "zh-TW", label: "繁體中文" },
    { code: "en-US", label: "English" },
    { code: "ja-JP", label: "日本語" }
];

const DICTIONARY = {
    "zh-CN": {
        "common.back": "← 返回首页", "common.language": "语言", "common.save": "保存", "common.cancel": "取消",
        "common.edit": "编辑", "common.delete": "删除", "common.add": "新增", "common.name": "名称",
        "common.amount": "金额", "common.date": "日期", "common.account": "账户", "common.selectAccount": "选择账户",
        "common.description": "描述", "common.category": "类别", "common.total": "合计", "common.actions": "操作",
        "common.noAccountWarn": "暂无账户，请先到 Accounts 页面新建账户，否则不会进入 Cash Flow。",
        "common.accountHint": "选了账户才会自动记账并同步余额",
        "dash.systemStatus": "系统状态", "dash.title": "财富驾驶舱", "dash.systemReady": "✅ 系统就绪", "dash.quickAccess": "快捷入口",
        "dash.totalAssets": "总资产", "dash.totalLiabilities": "总负债", "dash.netWorth": "净资产",
        "dash.income": "收入", "dash.expense": "支出", "dash.netCashFlow": "净现金流", "dash.wealthScore": "财富评分",
        "dash.assets": "💰 资产", "dash.investment": "📈 投资", "dash.accounts": "🏦 账户", "dash.incomeBtn": "💵 收入",
        "dash.expenseBtn": "🧾 支出", "dash.liability": "💳 负债", "dash.cashflow": "💸 现金流", "dash.tax": "🧾 税务",
        "dash.retirement": "🏖️ 退休", "dash.advisor": "🤖 AI 顾问", "tax.title": "税务中心", "tax.taxableIncome": "应税收入", "tax.deductions": "扣除额", "tax.year": "税务年度", "tax.savePlan": "保存税务规划",
        "account.title": "账户中心", "account.add": "+ 新增账户", "account.totalBalance": "总余额",
        "account.type": "类型", "account.institution": "机构", "account.balance": "余额", "account.list": "账户列表",
        "account.empty": "暂无账户", "account.createFirst": "先新建一个账户，后面的记账才能选账户。",
        "income.title": "收入中心", "income.add": "+ 新增收入", "income.edit": "编辑收入", "income.total": "总收入",
        "income.records": "收入记录", "income.source": "来源", "income.type": "类型", "income.amount": "金额",
        "income.save": "保存收入", "income.summary": "收入汇总", "income.count": "笔数", "income.empty": "暂无收入记录。",
        "expense.title": "支出中心", "expense.add": "+ 新增支出", "expense.edit": "编辑支出", "expense.total": "总支出",
        "expense.records": "支出记录", "expense.save": "保存支出", "expense.count": "笔数", "expense.empty": "暂无支出记录。", "expense.summary": "支出汇总",
        "liability.title": "负债中心", "liability.add": "+ 新增负债", "liability.edit": "编辑负债", "liability.pay": "还款", "liability.recordPayment": "记录还款",
        "liability.paymentAmount": "还款金额", "liability.interestPortion": "其中利息部分（可留 0）",
        "liability.currentBalance": "当前余额", "liability.total": "总负债", "liability.status": "状态", "liability.dashboard": "债务看板", "liability.count": "负债笔数", "liability.annualInterest": "年利息", "liability.monthlyInterest": "月利息", "liability.avgRate": "平均利率", "liability.debtStatus": "债务状态", "liability.interest": "利息", "liability.rate": "利率 %", "liability.empty": "暂无负债数据",
        "liability.accountHint": "选了才会进入 Cash Flow 并同步余额",
        "cashflow.title": "现金流中心", "cashflow.add": "+ 新增现金流", "cashflow.edit": "编辑现金流",
        "cashflow.income": "收入", "cashflow.expense": "支出", "cashflow.net": "净额", "cashflow.type": "类型",
        "cashflow.frequency": "频率", "cashflow.accountHint": "选账户走 Transaction，现金余额自动同步",
        "cashflow.records": "现金流记录", "cashflow.oneTime": "一次性", "cashflow.dashboard": "现金流看板", "cashflow.empty": "暂无现金流数据", "cashflow.annualized": "年化", "cashflow.editTitle": "编辑现金流",
        "asset.title": "资产中心", "asset.add": "+ 新增资产", "asset.list": "资产列表", "asset.empty": "暂无资产", "asset.liquidity": "流动性", "asset.currentValue": "当前价值", "asset.edit": "编辑资产", "asset.totalValue": "总价值",
        "asset.recordPurchase": "记录购买", "asset.recordSale": "记录出售", "asset.purchaseAmount": "购买金额",
        "asset.saleAmount": "出售金额", "asset.payAccount": "付款/收款账户（选了才会记入 Transaction）",
        "retire.title": "🏖️ 退休中心", "retire.netWorthNow": "当前净资产（系统汇总）", "retire.projection": "退休测算",
        "retire.yearsTo": "距退休", "retire.yearsIn": "退休期", "retire.yearsUnit": "年", "retire.projected": "退休时预计资产",
        "retire.required": "退休总需求", "retire.gap": "还差", "retire.surplus": "已覆盖，富余", "retire.coverage": "覆盖率",
        "retire.recentExpense": "最近 12 个月支出（Expense 模块）", "retire.profile": "规划参数",
        "retire.currentAge": "现在年龄", "retire.retirementAge": "退休年龄", "retire.lifeExpectancy": "预期寿命",
        "retire.annualExpense": "退休后年支出（留 0 则用最近 12 个月支出）", "retire.annualSavings": "退休前每年储蓄",
        "retire.expectedReturn": "预期年回报 %", "retire.saveRecalc": "保存并重算",
        "retire.accountsPart": "账户", "retire.investmentsPart": "投资", "retire.assetsPart": "资产", "retire.liabilitiesPart": "负债",
        "advisor.title": "🤖 AI 顾问", "advisor.health": "财富健康", "advisor.healthStatus": "健康状态", "advisor.riskLevel": "风险等级",
        "advisor.netWorth": "净资产", "advisor.wealthScore": "财富评分", "advisor.debtRatio": "负债率",
        "advisor.liquidity": "流动性覆盖", "advisor.months": "个月", "advisor.netCashFlow": "净现金流（系统记录）",
        "advisor.recommendations": "建议", "advisor.alerts": "提醒", "advisor.retirement": "退休", "advisor.coverage": "覆盖率",
        "advisor.gap": "退休缺口", "advisor.surplus": "退休已覆盖，富余", "advisor.tax": "税务",
        "advisor.totalIncome": "合计收入", "advisor.wage": "工资/业务", "advisor.dividends": "股息", "advisor.interest": "利息",
        "advisor.gains": "资本利得", "advisor.mortgageInterest": "房贷利息已付", "advisor.taxPaid": "已缴税款",
        "support.title": "外部支持中心", "support.subtitle": "官方支持、常用工具与自定义链接，可随时引入外部支持。",
        "support.official": "官方与推荐资源", "support.custom": "我的链接", "support.addLink": "添加链接",
        "support.linkName": "名称", "support.linkUrl": "链接地址", "support.linkNote": "备注（可选）",
        "support.open": "打开", "support.emptyCustom": "暂无自定义链接", "support.externalSystems": "外部支持系统",
        "support.externalNote": "此处预留外部系统接入点：添加的链接会保存在本机，可随时打开使用；后续可在此接入税务/退休外部服务。",
        "support.taxTitle": "税务支持中心", "support.retireTitle": "退休支持中心",
        "support.res.irs.name": "IRS 美国国税局", "support.res.irs.desc": "报税、退税进度、表格与官方指引",
        "support.res.irsFreeFile.name": "IRS Free File", "support.res.irsFreeFile.desc": "联邦税免费在线申报入口",
        "support.res.irsWithholding.name": "IRS 预扣税估算器", "support.res.irsWithholding.desc": "检查 W-4 预扣是否合适",
        "support.res.irsForms.name": "IRS 表格与说明", "support.res.irsForms.desc": "查找税表与填写说明",
        "support.res.waDor.name": "华盛顿州税务局", "support.res.waDor.desc": "华州税务信息（无州所得税，含其他税种）",
        "support.res.ssa.name": "SSA 社会保障局", "support.res.ssa.desc": "社保福利、退休金官方信息",
        "support.res.ssaEstimator.name": "SSA 退休金估算器", "support.res.ssaEstimator.desc": "按官方记录估算退休福利",
        "support.res.ssaBenefits.name": "SSA 福利规划", "support.res.ssaBenefits.desc": "退休、残疾与遗属福利规划工具",
        "support.res.medicare.name": "Medicare 医保", "support.res.medicare.desc": "联邦医保计划与注册",
        "support.res.cfpb.name": "CFPB 退休专题", "support.res.cfpb.desc": "消费者金融保护局退休规划指引"
    },
    "zh-TW": {
        "common.back": "← 返回首頁", "common.language": "語言", "common.save": "保存", "common.cancel": "取消",
        "common.edit": "編輯", "common.delete": "刪除", "common.add": "新增", "common.name": "名稱",
        "common.amount": "金額", "common.date": "日期", "common.account": "帳戶", "common.selectAccount": "選擇帳戶",
        "common.description": "描述", "common.category": "類別", "common.total": "合計", "common.actions": "操作",
        "common.noAccountWarn": "暫無帳戶，請先到 Accounts 頁面新建帳戶，否則不會進入 Cash Flow。",
        "common.accountHint": "選了帳戶才會自動記帳並同步餘額",
        "dash.systemStatus": "系統狀態", "dash.title": "財富駕駛艙", "dash.systemReady": "✅ 系統就緒", "dash.quickAccess": "快捷入口",
        "dash.totalAssets": "總資產", "dash.totalLiabilities": "總負債", "dash.netWorth": "淨資產",
        "dash.income": "收入", "dash.expense": "支出", "dash.netCashFlow": "淨現金流", "dash.wealthScore": "財富評分",
        "dash.assets": "💰 資產", "dash.investment": "📈 投資", "dash.accounts": "🏦 帳戶", "dash.incomeBtn": "💵 收入",
        "dash.expenseBtn": "🧾 支出", "dash.liability": "💳 負債", "dash.cashflow": "💸 現金流", "dash.tax": "🧾 稅務",
        "dash.retirement": "🏖️ 退休", "dash.advisor": "🤖 AI 顧問", "tax.title": "稅務中心", "tax.taxableIncome": "應稅收入", "tax.deductions": "扣除額", "tax.year": "稅務年度", "tax.savePlan": "保存稅務規劃",
        "account.title": "帳戶中心", "account.add": "+ 新增帳戶", "account.totalBalance": "總餘額",
        "account.type": "類型", "account.institution": "機構", "account.balance": "餘額", "account.list": "帳戶列表",
        "account.empty": "暫無帳戶", "account.createFirst": "先新建一個帳戶，後面的記帳才能選帳戶。",
        "income.title": "收入中心", "income.add": "+ 新增收入", "income.edit": "編輯收入", "income.total": "總收入",
        "income.records": "收入記錄", "income.source": "來源", "income.type": "類型", "income.amount": "金額",
        "income.save": "保存收入", "income.summary": "收入彙總", "income.count": "筆數", "income.empty": "暫無收入記錄。",
        "expense.title": "支出中心", "expense.add": "+ 新增支出", "expense.edit": "編輯支出", "expense.total": "總支出",
        "expense.records": "支出記錄", "expense.save": "保存支出", "expense.count": "筆數", "expense.empty": "暫無支出記錄。", "expense.summary": "支出彙總",
        "liability.title": "負債中心", "liability.add": "+ 新增負債", "liability.edit": "編輯負債", "liability.pay": "還款", "liability.recordPayment": "記錄還款",
        "liability.paymentAmount": "還款金額", "liability.interestPortion": "其中利息部分（可留 0）",
        "liability.currentBalance": "目前餘額", "liability.total": "總負債", "liability.status": "狀態", "liability.dashboard": "債務看板", "liability.count": "負債筆數", "liability.annualInterest": "年利息", "liability.monthlyInterest": "月利息", "liability.avgRate": "平均利率", "liability.debtStatus": "債務狀態", "liability.interest": "利息", "liability.rate": "利率 %", "liability.empty": "暫無負債資料",
        "liability.accountHint": "選了才會進入 Cash Flow 並同步餘額",
        "cashflow.title": "現金流中心", "cashflow.add": "+ 新增現金流", "cashflow.edit": "編輯現金流",
        "cashflow.income": "收入", "cashflow.expense": "支出", "cashflow.net": "淨額", "cashflow.type": "類型",
        "cashflow.frequency": "頻率", "cashflow.accountHint": "選帳戶走 Transaction，現金餘額自動同步",
        "cashflow.records": "現金流記錄", "cashflow.oneTime": "一次性", "cashflow.dashboard": "現金流看板", "cashflow.empty": "暫無現金流資料", "cashflow.annualized": "年化", "cashflow.editTitle": "編輯現金流",
        "asset.title": "資產中心", "asset.add": "+ 新增資產", "asset.list": "資產列表", "asset.empty": "暫無資產", "asset.liquidity": "流動性", "asset.currentValue": "目前價值", "asset.edit": "編輯資產", "asset.totalValue": "總價值",
        "asset.recordPurchase": "記錄購買", "asset.recordSale": "記錄出售", "asset.purchaseAmount": "購買金額",
        "asset.saleAmount": "出售金額", "asset.payAccount": "付款/收款帳戶（選了才會記入 Transaction）",
        "retire.title": "🏖️ 退休中心", "retire.netWorthNow": "目前淨資產（系統彙總）", "retire.projection": "退休測算",
        "retire.yearsTo": "距退休", "retire.yearsIn": "退休期", "retire.yearsUnit": "年", "retire.projected": "退休時預計資產",
        "retire.required": "退休總需求", "retire.gap": "還差", "retire.surplus": "已覆蓋，富餘", "retire.coverage": "覆蓋率",
        "retire.recentExpense": "最近 12 個月支出（Expense 模組）", "retire.profile": "規劃參數",
        "retire.currentAge": "現在年齡", "retire.retirementAge": "退休年齡", "retire.lifeExpectancy": "預期壽命",
        "retire.annualExpense": "退休後年支出（留 0 則用最近 12 個月支出）", "retire.annualSavings": "退休前每年儲蓄",
        "retire.expectedReturn": "預期年回報 %", "retire.saveRecalc": "保存並重算",
        "retire.accountsPart": "帳戶", "retire.investmentsPart": "投資", "retire.assetsPart": "資產", "retire.liabilitiesPart": "負債",
        "advisor.title": "🤖 AI 顧問", "advisor.health": "財富健康", "advisor.healthStatus": "健康狀態", "advisor.riskLevel": "風險等級",
        "advisor.netWorth": "淨資產", "advisor.wealthScore": "財富評分", "advisor.debtRatio": "負債率",
        "advisor.liquidity": "流動性覆蓋", "advisor.months": "個月", "advisor.netCashFlow": "淨現金流（系統記錄）",
        "advisor.recommendations": "建議", "advisor.alerts": "提醒", "advisor.retirement": "退休", "advisor.coverage": "覆蓋率",
        "advisor.gap": "退休缺口", "advisor.surplus": "退休已覆蓋，富餘", "advisor.tax": "稅務",
        "advisor.totalIncome": "合計收入", "advisor.wage": "薪資/業務", "advisor.dividends": "股息", "advisor.interest": "利息",
        "advisor.gains": "資本利得", "advisor.mortgageInterest": "房貸利息已付", "advisor.taxPaid": "已繳稅款",
        "support.title": "外部支持中心", "support.subtitle": "官方支持、常用工具與自訂連結，可隨時引入外部支持。",
        "support.official": "官方與推薦資源", "support.custom": "我的連結", "support.addLink": "添加連結",
        "support.linkName": "名稱", "support.linkUrl": "連結地址", "support.linkNote": "備註（可選）",
        "support.open": "開啟", "support.emptyCustom": "暫無自訂連結", "support.externalSystems": "外部支持系統",
        "support.externalNote": "此處預留外部系統接入點：添加的連結會保存在本機，可隨時開啟使用；後續可在此接入稅務/退休外部服務。",
        "support.taxTitle": "稅務支持中心", "support.retireTitle": "退休支持中心",
        "support.res.irs.name": "IRS 美國國稅局", "support.res.irs.desc": "報稅、退稅進度、表格與官方指引",
        "support.res.irsFreeFile.name": "IRS Free File", "support.res.irsFreeFile.desc": "聯邦稅免費線上申報入口",
        "support.res.irsWithholding.name": "IRS 預扣稅估算器", "support.res.irsWithholding.desc": "檢查 W-4 預扣是否合適",
        "support.res.irsForms.name": "IRS 表格與說明", "support.res.irsForms.desc": "查找稅表與填寫說明",
        "support.res.waDor.name": "華盛頓州稅務局", "support.res.waDor.desc": "華州稅務資訊（無州所得稅，含其他稅種）",
        "support.res.ssa.name": "SSA 社會保障局", "support.res.ssa.desc": "社保福利、退休金官方資訊",
        "support.res.ssaEstimator.name": "SSA 退休金估算器", "support.res.ssaEstimator.desc": "依官方紀錄估算退休福利",
        "support.res.ssaBenefits.name": "SSA 福利規劃", "support.res.ssaBenefits.desc": "退休、殘疾與遺屬福利規劃工具",
        "support.res.medicare.name": "Medicare 醫保", "support.res.medicare.desc": "聯邦醫保計畫與註冊",
        "support.res.cfpb.name": "CFPB 退休專題", "support.res.cfpb.desc": "消費者金融保護局退休規劃指引"
    },
    "en-US": {
        "common.back": "← Back to Dashboard", "common.language": "Language", "common.save": "Save", "common.cancel": "Cancel",
        "common.edit": "Edit", "common.delete": "Delete", "common.add": "Add", "common.name": "Name",
        "common.amount": "Amount", "common.date": "Date", "common.account": "Account", "common.selectAccount": "Select Account",
        "common.description": "Description", "common.category": "Category", "common.total": "Total", "common.actions": "Actions",
        "common.noAccountWarn": "No account yet. Create one on the Accounts page first, otherwise this will not enter Cash Flow.",
        "common.accountHint": "Pick an account to record automatically and sync the balance",
        "dash.systemStatus": "System Status", "dash.title": "Wealth Cockpit", "dash.systemReady": "✅ SYSTEM READY", "dash.quickAccess": "Quick Access",
        "dash.totalAssets": "Total Assets", "dash.totalLiabilities": "Total Liabilities", "dash.netWorth": "Net Worth",
        "dash.income": "Income", "dash.expense": "Expense", "dash.netCashFlow": "Net Cash Flow", "dash.wealthScore": "Wealth Score",
        "dash.assets": "💰 Assets", "dash.investment": "📈 Investment", "dash.accounts": "🏦 Accounts", "dash.incomeBtn": "💵 Income",
        "dash.expenseBtn": "🧾 Expense", "dash.liability": "💳 Liability", "dash.cashflow": "💸 Cash Flow", "dash.tax": "🧾 Tax",
        "dash.retirement": "🏖️ Retirement", "dash.advisor": "🤖 Advisor", "tax.title": "Tax Center", "tax.taxableIncome": "Taxable Income", "tax.deductions": "Deductions", "tax.year": "Tax Year", "tax.savePlan": "Save Tax Plan",
        "account.title": "Accounts", "account.add": "+ Add Account", "account.totalBalance": "Total Balance",
        "account.type": "Type", "account.institution": "Institution", "account.balance": "Balance", "account.list": "Accounts",
        "account.empty": "No accounts", "account.createFirst": "Create an account first so later entries can use it.",
        "income.title": "Income Center", "income.add": "+ Add Income", "income.edit": "Edit Income", "income.total": "Total Income",
        "income.records": "Income Records", "income.source": "Source", "income.type": "Type", "income.amount": "Amount",
        "income.save": "Save Income", "income.summary": "Income Summary", "income.count": "Records", "income.empty": "No income records.",
        "expense.title": "Expense Center", "expense.add": "+ Add Expense", "expense.edit": "Edit Expense", "expense.total": "Total Expense",
        "expense.records": "Expense Records", "expense.save": "Save Expense", "expense.count": "Records", "expense.empty": "No expense records.", "expense.summary": "Expense Summary",
        "liability.title": "Liability Center", "liability.add": "Add Liability", "liability.edit": "Edit Liability", "liability.pay": "Pay", "liability.recordPayment": "Record Payment",
        "liability.paymentAmount": "Payment Amount", "liability.interestPortion": "Interest Portion (0 allowed)",
        "liability.currentBalance": "Current Balance", "liability.total": "Total Liability", "liability.status": "Status", "liability.dashboard": "Debt Dashboard", "liability.count": "Liability Count", "liability.annualInterest": "Annual Interest", "liability.monthlyInterest": "Monthly Interest", "liability.avgRate": "Average Interest Rate", "liability.debtStatus": "Debt Status", "liability.interest": "Interest", "liability.rate": "Interest Rate %", "liability.empty": "No liability data.",
        "liability.accountHint": "Pick an account to enter Cash Flow and sync the balance",
        "cashflow.title": "Cash Flow Center", "cashflow.add": "+ Add Cash Flow", "cashflow.edit": "Edit Cash Flow",
        "cashflow.income": "Income", "cashflow.expense": "Expense", "cashflow.net": "Net", "cashflow.type": "Type",
        "cashflow.frequency": "Frequency", "cashflow.accountHint": "Pick an account to record via Transaction; the cash balance syncs automatically",
        "cashflow.records": "Cash Flow Records", "cashflow.oneTime": "One Time", "cashflow.dashboard": "Cashflow Dashboard", "cashflow.empty": "No cash flow data.", "cashflow.annualized": "Annualized", "cashflow.editTitle": "Edit Cash Flow",
        "asset.title": "Assets Center", "asset.add": "+ Add Asset", "asset.list": "Assets", "asset.empty": "No assets", "asset.liquidity": "Liquidity", "asset.currentValue": "Current Value", "asset.edit": "Edit Asset", "asset.totalValue": "Total Value",
        "asset.recordPurchase": "Record Purchase", "asset.recordSale": "Record Sale", "asset.purchaseAmount": "Purchase Amount",
        "asset.saleAmount": "Sale Amount", "asset.payAccount": "Paying/Receiving Account (pick one to record in Transaction)",
        "retire.title": "🏖️ Retirement Center", "retire.netWorthNow": "Current Net Worth (from system)", "retire.projection": "Retirement Projection",
        "retire.yearsTo": "Years to retirement", "retire.yearsIn": "Years in retirement", "retire.yearsUnit": "yrs", "retire.projected": "Projected Assets at Retirement",
        "retire.required": "Total Retirement Need", "retire.gap": "Gap", "retire.surplus": "Covered, surplus", "retire.coverage": "Funded",
        "retire.recentExpense": "Last 12 Months Expense (Expense module)", "retire.profile": "Plan Settings",
        "retire.currentAge": "Current Age", "retire.retirementAge": "Retirement Age", "retire.lifeExpectancy": "Life Expectancy",
        "retire.annualExpense": "Annual Expense in Retirement (0 = use last 12 months)", "retire.annualSavings": "Annual Savings Before Retirement",
        "retire.expectedReturn": "Expected Annual Return %", "retire.saveRecalc": "Save & Recalculate",
        "retire.accountsPart": "Accounts", "retire.investmentsPart": "Investments", "retire.assetsPart": "Assets", "retire.liabilitiesPart": "Liabilities",
        "advisor.title": "🤖 AI Advisor", "advisor.health": "Wealth Health", "advisor.healthStatus": "Health", "advisor.riskLevel": "Risk Level",
        "advisor.netWorth": "Net Worth", "advisor.wealthScore": "Wealth Score", "advisor.debtRatio": "Debt Ratio",
        "advisor.liquidity": "Liquidity Coverage", "advisor.months": "months", "advisor.netCashFlow": "Net Cash Flow (recorded)",
        "advisor.recommendations": "Recommendations", "advisor.alerts": "Alerts", "advisor.retirement": "Retirement", "advisor.coverage": "Funded",
        "advisor.gap": "Retirement Gap", "advisor.surplus": "Covered, surplus", "advisor.tax": "Tax",
        "advisor.totalIncome": "Total Income", "advisor.wage": "Wages/Business", "advisor.dividends": "Dividends", "advisor.interest": "Interest",
        "advisor.gains": "Capital Gains", "advisor.mortgageInterest": "Mortgage Interest Paid", "advisor.taxPaid": "Tax Paid",
        "support.title": "External Support Center", "support.subtitle": "Official support, handy tools and your own links — bring in outside help anytime.",
        "support.official": "Official & Recommended", "support.custom": "My Links", "support.addLink": "Add Link",
        "support.linkName": "Name", "support.linkUrl": "URL", "support.linkNote": "Note (optional)",
        "support.open": "Open", "support.emptyCustom": "No custom links yet", "support.externalSystems": "External Support Systems",
        "support.externalNote": "Hook point for external systems: links you add are stored on this device and can be opened anytime; tax/retirement services can plug in here later.",
        "support.taxTitle": "Tax Support Center", "support.retireTitle": "Retirement Support Center",
        "support.res.irs.name": "IRS", "support.res.irs.desc": "Filing, refunds, forms and official guidance",
        "support.res.irsFreeFile.name": "IRS Free File", "support.res.irsFreeFile.desc": "Free federal e-filing portal",
        "support.res.irsWithholding.name": "IRS Withholding Estimator", "support.res.irsWithholding.desc": "Check whether your W-4 withholding fits",
        "support.res.irsForms.name": "IRS Forms & Instructions", "support.res.irsForms.desc": "Find tax forms and instructions",
        "support.res.waDor.name": "WA Dept. of Revenue", "support.res.waDor.desc": "Washington tax info (no state income tax; other taxes apply)",
        "support.res.ssa.name": "SSA", "support.res.ssa.desc": "Social Security benefits and retirement info",
        "support.res.ssaEstimator.name": "SSA Retirement Estimator", "support.res.ssaEstimator.desc": "Estimate benefits from your official record",
        "support.res.ssaBenefits.name": "SSA Benefit Planners", "support.res.ssaBenefits.desc": "Retirement, disability and survivor planning tools",
        "support.res.medicare.name": "Medicare", "support.res.medicare.desc": "Federal health coverage and enrollment",
        "support.res.cfpb.name": "CFPB Retirement", "support.res.cfpb.desc": "Consumer finance retirement planning guides"
    },
    "ja-JP": {
        "common.back": "← ダッシュボードに戻る", "common.language": "言語", "common.save": "保存", "common.cancel": "キャンセル",
        "common.edit": "編集", "common.delete": "削除", "common.add": "追加", "common.name": "名称",
        "common.amount": "金額", "common.date": "日付", "common.account": "口座", "common.selectAccount": "口座を選択",
        "common.description": "説明", "common.category": "カテゴリ", "common.total": "合計", "common.actions": "操作",
        "common.noAccountWarn": "口座がありません。先に Accounts で口座を作成してください。Cash Flow に反映されません。",
        "common.accountHint": "口座を選ぶと自動記録され残高も同期します",
        "dash.systemStatus": "システム状態", "dash.title": "ウェルスコックピット", "dash.systemReady": "✅ システム準備完了", "dash.quickAccess": "クイックアクセス",
        "dash.totalAssets": "総資産", "dash.totalLiabilities": "総負債", "dash.netWorth": "純資産",
        "dash.income": "収入", "dash.expense": "支出", "dash.netCashFlow": "純キャッシュフロー", "dash.wealthScore": "資産スコア",
        "dash.assets": "💰 資産", "dash.investment": "📈 投資", "dash.accounts": "🏦 口座", "dash.incomeBtn": "💵 収入",
        "dash.expenseBtn": "🧾 支出", "dash.liability": "💳 負債", "dash.cashflow": "💸 キャッシュフロー", "dash.tax": "🧾 税金",
        "dash.retirement": "🏖️ 退職", "dash.advisor": "🤖 AIアドバイザー", "tax.title": "税金センター", "tax.taxableIncome": "課税所得", "tax.deductions": "控除", "tax.year": "課税年度", "tax.savePlan": "税金プランを保存",
        "account.title": "口座センター", "account.add": "+ 口座を追加", "account.totalBalance": "総残高",
        "account.type": "種類", "account.institution": "機関", "account.balance": "残高", "account.list": "口座一覧",
        "account.empty": "口座なし", "account.createFirst": "先に口座を作成すると、以後の記録で選べます。",
        "income.title": "収入センター", "income.add": "+ 収入を追加", "income.edit": "収入を編集", "income.total": "総収入",
        "income.records": "収入記録", "income.source": "源泉", "income.type": "種類", "income.amount": "金額",
        "income.save": "収入を保存", "income.summary": "収入サマリー", "income.count": "件数", "income.empty": "収入記録がありません",
        "expense.title": "支出センター", "expense.add": "+ 支出を追加", "expense.edit": "支出を編集", "expense.total": "総支出",
        "expense.records": "支出記録", "expense.save": "支出を保存", "expense.count": "件数", "expense.empty": "支出記録がありません", "expense.summary": "支出サマリー",
        "liability.title": "負債センター", "liability.add": "+ 負債を追加", "liability.edit": "負債を編集", "liability.pay": "返済", "liability.recordPayment": "返済を記録",
        "liability.paymentAmount": "返済額", "liability.interestPortion": "利息分（0可）",
        "liability.currentBalance": "現在の残高", "liability.total": "総負債", "liability.status": "状態", "liability.dashboard": "債務ダッシュボード", "liability.count": "負債件数", "liability.annualInterest": "年間利息", "liability.monthlyInterest": "月間利息", "liability.avgRate": "平均金利", "liability.debtStatus": "債務状態", "liability.interest": "利息", "liability.rate": "金利 %", "liability.empty": "負債データなし",
        "liability.accountHint": "口座を選ぶと Cash Flow に入り残高も同期します",
        "cashflow.title": "キャッシュフローセンター", "cashflow.add": "+ キャッシュフローを追加", "cashflow.edit": "キャッシュフローを編集",
        "cashflow.income": "収入", "cashflow.expense": "支出", "cashflow.net": "純額", "cashflow.type": "種類",
        "cashflow.frequency": "頻度", "cashflow.accountHint": "口座を選ぶと Transaction 経由で記録され、現金残高が自動同期します",
        "cashflow.records": "キャッシュフロー記録", "cashflow.oneTime": "一回のみ", "cashflow.dashboard": "キャッシュフロー・ダッシュボード", "cashflow.empty": "キャッシュフローデータなし", "cashflow.annualized": "年換算", "cashflow.editTitle": "キャッシュフローを編集",
        "asset.title": "資産センター", "asset.add": "+ 資産を追加", "asset.list": "資産リスト", "asset.empty": "資産なし", "asset.liquidity": "流動性", "asset.currentValue": "現在価値", "asset.edit": "資産を編集", "asset.totalValue": "総価値",
        "asset.recordPurchase": "購入を記録", "asset.recordSale": "売却を記録", "asset.purchaseAmount": "購入金額",
        "asset.saleAmount": "売却金額", "asset.payAccount": "支払/受取口座（選ぶと Transaction に記録）",
        "retire.title": "🏖️ 退職センター", "retire.netWorthNow": "現在の純資産（システム集計）", "retire.projection": "退職シミュレーション",
        "retire.yearsTo": "退職まで", "retire.yearsIn": "退職期間", "retire.yearsUnit": "年", "retire.projected": "退職時の予想資産",
        "retire.required": "退職総必要額", "retire.gap": "不足額", "retire.surplus": "カバー済み、余剰", "retire.coverage": "充足率",
        "retire.recentExpense": "直近12か月の支出（Expense）", "retire.profile": "プラン設定",
        "retire.currentAge": "現在の年齢", "retire.retirementAge": "退職年齢", "retire.lifeExpectancy": "平均余命",
        "retire.annualExpense": "退職後の年間支出（0なら直近12か月）", "retire.annualSavings": "退職前の年間貯蓄",
        "retire.expectedReturn": "想定年間リターン %", "retire.saveRecalc": "保存して再計算",
        "retire.accountsPart": "口座", "retire.investmentsPart": "投資", "retire.assetsPart": "資産", "retire.liabilitiesPart": "負債",
        "advisor.title": "🤖 AIアドバイザー", "advisor.health": "資産ヘルス", "advisor.healthStatus": "状態", "advisor.riskLevel": "リスク水準",
        "advisor.netWorth": "純資産", "advisor.wealthScore": "資産スコア", "advisor.debtRatio": "負債比率",
        "advisor.liquidity": "流動性カバー", "advisor.months": "か月", "advisor.netCashFlow": "純キャッシュフロー（記録）",
        "advisor.recommendations": "提案", "advisor.alerts": "アラート", "advisor.retirement": "退職", "advisor.coverage": "充足率",
        "advisor.gap": "退職不足額", "advisor.surplus": "カバー済み、余剰", "advisor.tax": "税金",
        "advisor.totalIncome": "総収入", "advisor.wage": "給与/事業", "advisor.dividends": "配当", "advisor.interest": "利息",
        "advisor.gains": "譲渡益", "advisor.mortgageInterest": "住宅ローン利息（支払済）", "advisor.taxPaid": "納税済額",
        "support.title": "外部サポートセンター", "support.subtitle": "公式サポート、便利ツール、カスタムリンク — 外部の助けをいつでも取り込めます。",
        "support.official": "公式・推奨リソース", "support.custom": "マイリンク", "support.addLink": "リンクを追加",
        "support.linkName": "名称", "support.linkUrl": "URL", "support.linkNote": "備考（任意）",
        "support.open": "開く", "support.emptyCustom": "カスタムリンクはまだありません", "support.externalSystems": "外部サポートシステム",
        "support.externalNote": "外部システムの接続ポイント：追加したリンクはこの端末に保存され、いつでも開けます。今後、税金/退職の外部サービスをここに接続できます。",
        "support.taxTitle": "税金サポートセンター", "support.retireTitle": "退職サポートセンター",
        "support.res.irs.name": "IRS（米国国税庁）", "support.res.irs.desc": "申告、還付、フォームと公式ガイダンス",
        "support.res.irsFreeFile.name": "IRS Free File", "support.res.irsFreeFile.desc": "連邦税の無料電子申告ポータル",
        "support.res.irsWithholding.name": "IRS 源泉徴収見積もり", "support.res.irsWithholding.desc": "W-4 の源泉徴収が適切か確認",
        "support.res.irsForms.name": "IRS フォームと手順", "support.res.irsForms.desc": "税務フォームと記入手順を探す",
        "support.res.waDor.name": "ワシントン州歳入局", "support.res.waDor.desc": "州税情報（州所得税なし、その他の税）",
        "support.res.ssa.name": "SSA（社会保障局）", "support.res.ssa.desc": "社会保障給付と退職情報",
        "support.res.ssaEstimator.name": "SSA 退職給付見積もり", "support.res.ssaEstimator.desc": "公式記録から給付額を見積もり",
        "support.res.ssaBenefits.name": "SSA 給付プランナー", "support.res.ssaBenefits.desc": "退職・障害・遺族給付の計画ツール",
        "support.res.medicare.name": "Medicare", "support.res.medicare.desc": "連邦医療保険と加入",
        "support.res.cfpb.name": "CFPB 退職ガイド", "support.res.cfpb.desc": "消費者金融保護局の退職計画ガイド"
    }
};

function isSupported(code) {
    return SUPPORTED_LANGUAGES.some(item => item.code === code);
}

export function getLanguage() {
    try {
        const saved = globalThis.localStorage?.getItem(STORAGE_KEY);
        if (saved && isSupported(saved)) {
            return saved;
        }
    } catch (error) {
        // Storage unavailable: fall through to default.
    }
    return "zh-CN";
}

export function setLanguage(code) {
    if (!isSupported(code)) {
        return getLanguage();
    }
    try {
        globalThis.localStorage?.setItem(STORAGE_KEY, code);
    } catch (error) {
        // Storage unavailable: applies to this session only.
    }
    return code;
}

export function t(key, params = {}) {
    const language = getLanguage();
    const template =
        DICTIONARY[language]?.[key] ??
        DICTIONARY["en-US"]?.[key] ??
        key;
    return Object.keys(params).reduce(
        (text, name) => text.replaceAll(`{${name}}`, String(params[name])),
        template
    );
}

export function languageOptions(selected) {
    return SUPPORTED_LANGUAGES.map(
        item =>
            `<option value="${item.code}"${item.code === selected ? " selected" : ""}>${item.label}</option>`
    ).join("");
}

export default { SUPPORTED_LANGUAGES, getLanguage, setLanguage, t, languageOptions };
