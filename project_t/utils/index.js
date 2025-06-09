export const calculateSubscriptionMetrics = (subscriptions) => {
    // Filter active subscriptions
    const active_subscriptions = subscriptions.filter(sub => sub.status === "Active");

    // Initialize metrics
    let total_monthly_cost = 0;
    let total_yearly_cost = 0;
    let category_spending = {};
    let upcoming_billing_count = 0;
    let most_expensive_subscription = null;

    const today = new Date();
    const next_week = new Date();
    next_week.setDate(today.getDate() + 7);

    active_subscriptions.forEach(sub => {
        // Ensure numeric values are properly parsed
        const cost = parseFloat(sub.cost) || 0;
        const billingFrequency = sub.billingFrequency;

        const monthly_cost = billingFrequency === "Yearly" ? cost / 12 : cost;
        total_monthly_cost += monthly_cost;
        total_yearly_cost += billingFrequency === "Yearly" ? cost : cost * 12;

        // Track category spending
        if (!category_spending[sub.category]) {
            category_spending[sub.category] = 0;
        }
        category_spending[sub.category] += cost;

        // Determine most expensive subscription
        if (!most_expensive_subscription || cost > most_expensive_subscription.cost) {
            most_expensive_subscription = sub;
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
            upcoming_billing_count++;
        }
    });

    // Calculate average monthly spending
    const average_monthly_spending = active_subscriptions.length > 0 ? total_monthly_cost / active_subscriptions.length : 0;

    // Find the top spending category
    let top_spending_category = Object.entries(category_spending).reduce((top, current) => current[1] > top[1] ? current : top, ["", 0])[0] || "None";

    return {
        total_monthly_cost: total_monthly_cost.toFixed(2),
        total_yearly_cost: total_yearly_cost.toFixed(2),
        average_monthly_spending: average_monthly_spending.toFixed(2),
        active_subscriptions: active_subscriptions.length,
        top_spending_category,
        upcoming_billing_count,
        most_expensive_subscription: most_expensive_subscription ? most_expensive_subscription.name : "None"
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