export const calculateSubscriptionMetrics = (subscriptions) => {
    // Filter active subscriptions
    const assinaturas_ativas = subscriptions.filter(sub => sub.status === "Active");

    // Initialize metrics
    let total_custo_mensal = 0;
    let total_custo_anual = 0;
    let categoria_gasta = {};
    let futuros_pagamentos = 0;
    let assinatura_mais_cara = null;

    const today = new Date();
    const next_week = new Date();
    next_week.setDate(today.getDate() + 7);

    assinaturas_ativas.forEach(sub => {
        // Ensure numeric values are properly parsed
        const cost = parseFloat(sub.cost) || 0;
        const billingFrequency = sub.billingFrequency;

        const monthly_cost = billingFrequency === "Yearly" ? cost / 12 : cost;
        total_custo_mensal += monthly_cost;
        total_custo_anual += billingFrequency === "Yearly" ? cost : cost * 12;

        // Track category spending
        if (!categoria_gasta[sub.category]) {
            categoria_gasta[sub.category] = 0;
        }
        categoria_gasta[sub.category] += cost;

        // Determine most expensive subscription
        if (!assinatura_mais_cara || cost > assinatura_mais_cara.cost) {
            assinatura_mais_cara = sub;
        }

        // Calculate next billing date
        const start_date = new Date(sub.startDate);
        let next_billing_date = new Date(start_date);
        while (next_billing_date < today) {
            if (billingFrequency === "Monthly") {
                next_billing_date.setMonth(next_billing_date.getMonth() + 1);
            } else if (billingFrequency === "Yearly") {
                next_billing_date.setFullYear(next_billing_date.getFullYear() + 1);
            }
        }

        // Count upcoming billing within the next 7 days
        if (next_billing_date >= today && next_billing_date <= next_week) {
            futuros_pagamentos++;
        }
    });

    // Calculate average monthly spending
    const média_custo_mensal = assinaturas_ativas.length > 0 ? total_custo_mensal / assinaturas_ativas.length : 0;

    // Find the top spending category
    let categoria_de_maior_custo = Object.entries(categoria_gasta).reduce((top, current) => current[1] > top[1] ? current : top, ["", 0])[0] || "Nenhum";

    return {
        total_custo_mensal: total_custo_mensal.toFixed(2),
        total_custo_anual: total_custo_anual.toFixed(2),
        média_custo_mensal: média_custo_mensal.toFixed(2),
        assinaturas_ativas: assinaturas_ativas.length,
        categoria_de_maior_custo,
        futuros_pagamentos,
        assinatura_mais_cara: assinatura_mais_cara ? assinatura_mais_cara.name : "Nenhum"
    };
};

// Helper function to format object keys into readable labels
export const formatKey = (key) => {
    return key
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
        .replace("Upcoming Billing Dates", "Upcoming Bills (Next 7 Days)")
        .replace("Trial Ending Soon", "Trials Ending Soon")
}

export function getDaysUntilNextCharge(startDate, billingFrequency) {
    const start = new Date(startDate)
    const today = new Date()

    let nextBillingDate = new Date(start)

    if (billingFrequency === "Monthly") {
        // Add months until next charge is in the future
        while (nextBillingDate <= today) {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
        }
    } else if (billingFrequency === "Yearly") {
        // Add years until next charge is in the future
        while (nextBillingDate <= today) {
            nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
        }
    } else if (billingFrequency === "Quarterly") {
        // Add quarters (3 months)
        while (nextBillingDate <= today) {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 3)
        }
    } else if (billingFrequency === "One-time") {
        // No recurring charges
        return "No upcoming charges"
    }

    // Calculate the number of days until next charge
    const diffTime = nextBillingDate - today
    const daysUntilNextCharge = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return daysUntilNextCharge
}

// Example Usage
// console.log(getDaysUntilNextCharge("2024-02-01", "Monthly"))  // Example output: 30


export const subscriptions = [
    {
        id: 1,
        name: "Netflix",
        category: "Entertainment",
        cost: 15.99, // Monthly cost in USD
        currency: "USD",
        billingFrequency: "Monthly", // Could be "Monthly", "Yearly", etc.
        paymentMethod: "Credit Card", // e.g., Credit Card, PayPal, etc.
        startDate: "2022-06-15", // Subscription start date
        renewalType: "Automatic", // Could be "Automatic" or "Manual"
        notes: "Shared with family",
        status: "Active", // Could be "Active", "Paused", or "Canceled"
    },
    {
        id: 2,
        name: "Spotify",
        category: "Music",
        cost: 9.99,
        currency: "USD",
        billingFrequency: "Monthly",
        paymentMethod: "PayPal",
        startDate: "2021-11-01",
        renewalType: "Automatic",
        notes: "Student discount applied",
        status: "Active",
    },
    {
        id: 3,
        name: "Amazon Prime",
        category: "Shopping",
        cost: 139.00,
        currency: "USD",
        billingFrequency: "Yearly",
        paymentMethod: "Credit Card",
        startDate: "2019-12-01",
        renewalType: "Automatic",
        notes: "Includes Prime Video",
        status: "Active",
    },
    {
        id: 4,
        name: "Adobe Creative Cloud",
        category: "Software",
        cost: 54.99,
        currency: "USD",
        billingFrequency: "Monthly",
        paymentMethod: "Credit Card",
        startDate: "2023-03-01",
        renewalType: "Manual",
        notes: "Used for video editing and design work",
        status: "Active",
    },
    {
        id: 5,
        name: "Gym Membership",
        category: "Health & Fitness",
        cost: 50.00,
        currency: "USD",
        billingFrequency: "Monthly",
        paymentMethod: "Debit Card",
        startDate: "2020-01-15",
        renewalType: "Automatic",
        notes: "Access to multiple locations",
        status: "Paused",
    },
    {
        id: 6,
        name: "Domain Hosting",
        category: "Web Services",
        cost: 12.00,
        currency: "USD",
        billingFrequency: "Yearly",
        paymentMethod: "Credit Card",
        startDate: "2021-08-20",
        renewalType: "Automatic",
        notes: "Used for personal blog",
        status: "Active",
    },
]
