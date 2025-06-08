//page to route user to login/register page, also to know where the user is currently

'use client'

import { useAuth } from "@/context/AuthContext"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function GoTo() {
    const { currentUser, logout } = useAuth()

    const isAuthenticated = !!currentUser

    const path = usePathname()

    return (
        <div className="goto">
            {path == '/' && (
                <>
                    <Link href={'/dashboard?register=true'}>
                        <p>Registrar</p>
                    </Link>
                    <Link href={'/dashboard'}>
                        <button>Entrar &rarr;</button>
                    </Link>
                </>
            )}
            {(isAuthenticated && path == '/dashboard') && (
                <button onClick={logout}>Sair</button>
            )}
        </div>
    )
}