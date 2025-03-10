import Login from "@/components/Login";
import SubscriptionDisplay from "@/components/SubscriptionDisplay";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionSummary from "@/components/SubscriptionSummary";


export default function DashboardPage() {

    const isAuthenticated = true
    const isAddEntry = true

    if (!isAuthenticated) { 
        return (
            <Login />
        )
    }


    return (
        <>
            <SubscriptionDisplay />
            <SubscriptionSummary />
            {isAddEntry && (
                <SubscriptionForm />
            )}
        </>
    );
}