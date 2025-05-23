import { getDaysUntilNextCharge, subscriptions } from "@/utils";

export default function SubscriptionForm(props) {
    const { handleShowInput } = props

    return (
        <section>
            <h2>My Subscriptions</h2>
            <div className="card-container">

                {subscriptions.map((sub, subIndex) => {
                    const {name, category, cost, currency, billingFrequency, startDate, notes, status} = sub
                    

                    return (
                        <div key={subIndex} className="card subscription-card">
                            <div>
                                <h3>{name}</h3>
                                <div className={'status ' + (status === 'Active' ?
                                    'card-button-primary' : 'card-button-secondary'
                                )}>
                                    <small>{status}</small>
                                </div>
                            </div>

                            <p><i>{category}</i></p> 

                            <div className="sub-cost">
                                <h2>${cost}</h2>
                                <p>{currency}</p>
                            </div>
                            <small>Per {billingFrequency}</small>

                            <div className="sub-renewal">
                                <div>
                                    <p>Start</p>
                                    <h4>{startDate}</h4>
                                </div>
                                <div>
                                    <p>Due</p>
                                    <h4>{getDaysUntilNextCharge(startDate, billingFrequency)}</h4>
                                </div>
                            </div>
                            <div className="white-line"></div>
                                <p>{notes}</p>
                                <div className="subscription-actions">
                                    <button className="button-card">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        Edit
                                    </button>
                                    <button className="button-card">
                                        <i className="fa-solid fa-trash"></i>
                                        Delete
                                    </button>
                                </div>
                        </div>
                    )
                })}
                <button onClick={handleShowInput} className="button-card add-subscriptions">
                <i className="fa-solid fa-plus"></i>
                <h5>Add new subscription</h5>
                </button>
            </div>
        </section>
    )
}