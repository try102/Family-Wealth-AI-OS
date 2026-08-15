// =====================

// Agents

// =====================

AgentRegistry.register(

    "investment",

    InvestmentAgent

);

// =====================

// Account

// =====================

AccountIntegration.initialize();

ModuleRegistry.register(

    "account",

    AccountIntegration

);

// =====================

// Modules

// =====================

ModuleRegistry.register(

    "investment",

    {

        name:

        "Investment Center",

        status:

        "ACTIVE"

    }

);
