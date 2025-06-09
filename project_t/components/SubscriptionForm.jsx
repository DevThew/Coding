'use client'

import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

export default function SubscriptionForm(props) {
    const { onSubmit, closeInput, formData, handleChangeInput, handleResetForm } = props
    const { handleAddSubscription } = useAuth()


    function handleFormSumbit(e) {
        e.preventDefault() // prevents the random as behavior of reloading the webpage
        handleAddSubscription(formData)
        handleResetForm()
        closeInput()
    }


    return (
        <section>
            <h2>Adicionar assinatura</h2>

            <form onSubmit={handleFormSumbit}>
                <label>
                    <span>Nome</span>
                    <input value={formData.name} onChange={handleChangeInput} type="text" name="name" placeholder="Netflix, Spotify, Academia" required />
                </label>

                <label>
                    <span>Categoria</span>
                    <select value={formData.category} onChange={handleChangeInput} name="category">
                        {['Diversão', 'Musica', 'Software', 'Serviços Online', 'Saúde', 'Outros'].map((cat, catIndex) => {
                            return (
                                <option key={catIndex}>
                                    {cat}
                                </option>
                            )
                        })}
                    </select>
                </label>


                <label>
                    <span>Custo</span>
                    <input value={formData.cost} onChange={handleChangeInput} type="number" name="cost" step="0.01" placeholder="12.00" required />
                </label>

                <label>
                    <span>Moeda</span>
                    <select value={formData.currency} onChange={handleChangeInput} name="currency">
                        {[ "BRL", 'USD', 'EUR', 'GBP', 'NZD', "AUD",'Outro'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Frequencia</span>
                    <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency">
                        {['Mensal', 'Anual', 'Quadrimestre', 'Unico'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>


                <label>
                    <span>Método de Pagamento</span>
                    <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod">
                        {['Crédito', 'Débito', 'Pix', 'Transferência', 'Outros'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Inicio da Assinatura</span>
                    <input value={formData.startDate} onChange={handleChangeInput} type="date" name="startDate" required />
                </label>

                <label>
                    <span>Status</span>
                    <select value={formData.status} onChange={handleChangeInput} name="status">
                        {['Ativo', 'Pausado', 'Cancelado'].map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>


                <label className="fat-column">
                    <span>Notas</span>
                    <textarea value={formData.notes} onChange={handleChangeInput} name="notes" placeholder="Comentário a respeito da assinatura" />
                </label>

                <div className="fat-column form-submit-btns">
                    <button onClick={closeInput}>Cancelar</button>
                    <button type="submit">
                        Confirmar
                    </button>
                </div>
            </form>
        </section>
    )
}