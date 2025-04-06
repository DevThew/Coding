'use client'

import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistration, setIsRegistration] = useState('')

    return (
        <div className="login">
            <h2>{isRegistration ? 'Criar uma conta' : 'Entrar'}</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" />
            <button>Enviar</button>
            <div className="full-line" />
            <div>
                <p>{isRegistration ? 'Já possui uma conta?':'Não tem uma conta?'}</p>
                <button onClick={() => {
                    setIsRegistration(!isRegistration)
                }}>{isRegistration ? 'Entrar' : 'Registrar'}</button>
            </div>
        </div>
    )
}