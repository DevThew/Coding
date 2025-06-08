import "./globals.css";
import './style.css'
import Head from "./Head"
import Link from "next/link";
import GoTo from "@/components/GoTo";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Meu Gasto",
  description: "Controle seu dinheiro",
};

export default function RootLayout({ children }) {

  const header = (
    <header>
      <div>
        <Link href={'/'}>
          <h1 className="text-gradient">Meu Gasto</h1>
        </Link>
        <p>Controle seu dinheiro</p>
      </div>
      <GoTo />
    </header>
  )

  const footer = (
    <footer>
      <div className="hard-line" />
      <div className="footer-content">
        <div>
          <div>
            <h4>Meu Gasto</h4>
          </div>
          <p className="copyright">© Copyright 2025, Thew dev.<br />All rights reserved.</p>
        </div>
        <div>
          <p>Precisa de ajuda? <a>Suporte.</a></p>
          <p>Deixe seu feedback! <a>Feedback.</a></p>
          <div>
            <Link href={'/privacy'}>Politica de privacidade</Link>
            <Link href={'/tos'}>Termos de serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body >
          {header}
          <div className="full-line" />
          <main>
            {children}
          </main>
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
