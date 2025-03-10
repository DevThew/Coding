import { calculateSubscriptionMetrics, subscriptions } from "@/utils"

export default function SubscriptionSummary() {
    const summary = calculateSubscriptionMetrics (subscriptions)
    console.log(summary)

    const emojis = ['🔥', '✅', '⭐️', '⚡️', '🎉', '✨', '🏆', '🌼', '🌱', '🐛', '🐙', '🪼']

    return (
        <section>
            <h2>My Subscriptions</h2>
            <div className="analytics-card">

{/* make emojis be sequential part*/}

                {Object.keys(summary).map((metric, metricIndex) =>{
                    return (
                        <div key={metricIndex} className="analytics-item">
                            <p>{emojis[metricIndex]} {metric.replaceAll('_', ' ')}</p>
                            <h4>{summary[metric]}</h4>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}