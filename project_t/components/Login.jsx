export default function Login() {
    return (
        <div className="login">
            <h2>Entrar</h2>
            <input placeholder="Email" type="email" />
            <input placeholder="Senha" type="password" />
            <button>Enviar</button>
            <div className="full-line" />
            <div>
                <p>Não tem uma conta?</p>
                <button>Registrar</button>
            </div>
        </div>
    )
}