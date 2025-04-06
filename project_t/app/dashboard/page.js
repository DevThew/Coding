'use client'

import Login from "@/components/Login";
import SubscriptionDisplay from "@/components/SubscriptionDisplay";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useState } from "react";


export default function DashboardPage() {

    const isAuthenticated = true
    const [isAddEntry, setIsAddEntry] = useState(false)

    function handleToggleInput() {
        setIsAddEntry(!isAddEntry)
    }

    if (!isAuthenticated) { 
        return (
            <Login />
        )
    }


    return (
        <>
            <SubscriptionSummary />
            <SubscriptionDisplay handleShowInput={isAddEntry ? () => { } :
            handleToggleInput} />
            {isAddEntry && (
                <SubscriptionForm onSubmit={() => { }} closeInput=
                {handleToggleInput} />
            )}
        </>
    );
}