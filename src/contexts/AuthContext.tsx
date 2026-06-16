import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAdminAndSetSession = async (currentSession: Session | null) => {
    if (currentSession?.user) {
      const { data: perfil } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id', currentSession.user.id)
        .single()

      if (perfil?.rol !== 'admin') {
        await supabase.auth.signOut()
        alert('Acceso denegado: No tienes permisos de administrador.')
        setSession(null)
        setUser(null)
        setIsLoading(false)
        return
      }
    }
    setSession(currentSession)
    setUser(currentSession?.user ?? null)
    setIsLoading(false)
  }

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdminAndSetSession(session)
    })

    // Escuchar cambios (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminAndSetSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
