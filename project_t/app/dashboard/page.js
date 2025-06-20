'use client'

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useAuth } from "@/context/AuthContext";
import { Suspense, useState } from "react";

const blankSubscription = {
    name: '',
    category: 'Serviços Online',
    cost: '',
    currency: 'BRL',
    billingFrequency: 'Mensal',
    nextBillingData: '',
    paymentMethod: 'Crédito',
    startDate: '',
    renewalType: '',
    notes: '',
    status: 'Ativo'
}

export default function DashboardPage() {

    const [isAddEntry, setIsAddEntry] = useState(false)

    const [formData, setFormData] = useState(blankSubscription)

    const { handleDeleteSubscription, userData, currentUser, loading } = useAuth()
    const isAuthenticated = !!currentUser

    function handleChangeInput(e) {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(newData)
    }

    function handleEditSubscription(index) {
        const data = userData.subscriptions.find((val, valIndex) => {
            return valIndex === index
        })
        setFormData(data)
        handleDeleteSubscription(index)
        setIsAddEntry(true)
    }

    function handleResetForm() {
        setFormData(blankSubscription)
    }

    function handleToggleInput() {
        setIsAddEntry(!isAddEntry)
    }

    if (loading) {
        return (
            <p>Carregando...</p>
        )
    }

    if (!isAuthenticated) {
        return (
            <Suspense fallback={<p>Carregando...</p>}>
                <Login />
            </Suspense>
        )
    }

    return (
        <>
            <SubscriptionSummary />
            <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={isAddEntry ? () => { } : handleToggleInput} />
            {isAddEntry && (
                <SubscriptionForm handleResetForm={handleResetForm} closeInput={handleToggleInput} formData={formData} handleChangeInput={handleChangeInput} />
            )}
        </>
    );
}