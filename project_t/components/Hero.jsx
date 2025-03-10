import Link from "next/link";

export default function Hero() {
    return (
        <div className="hero-section"> 
            <div>
                <p className="header-text">Tenha controle<br />de seus gastos</p>
                <p className="text-medium">Analise e organize seu dinheiro<br /> com Meu Gasto   
                </p>
                <Link href={'/dashboard'}>
                   <button><h5>Comece em &rarr;</h5></button>
                </Link>
                <small>Totalmente grátis</small>
            </div>


            <div className="hero-display">
                <div>
                    <div className="card">
                        <div>
                            <div className="card-header" />
                            <div className="card-blank" />
                            <div className="card-description-large" />
                            <div className="card-description-small" />
                        </div>
                        <div className="card-square" />
                    </div>
                    <div className="card">
                        <div>
                            <div className="card-header" />
                            <div className="card-blank" />
                            <div className="card-description-large" />
                            <div className="card-description-small" />
                        </div>
                        <div className="card-square" />
                    </div>
                </div>

                <div>
                <div className="card">
                        <div>
                            <div className="card-header" />
                            <div className="card-blank" />
                            <div className="card-description-large" />
                            <div className="card-description-small" />
                        </div>
                        <div className="card-square" />
                    </div>
                    <div className="card">
                        <div>
                            <div className="card-header" />
                            <div className="card-blank" />
                            <div className="card-description-large" />
                            <div className="card-description-small" />
                        </div>
                        <div className="card-square" />
                    </div>
                </div>
            </div>
        </div>
    )
}