import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { setSessionExpiredHandler } from '../api/axios'
import { authService } from '../services/authService'
import type { LoginRequest, User } from '../types'

export interface AuthContextValue {
  user: User | null
  login: (payload: LoginRequest) => Promise<User>
  logout: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const [user, setUser] = useState<User | null>(null)
  const [restoring, setRestoring] = useState(true)

  useEffect(() => {
    let active = true
    authService.refresh().then((res) => {
      if (!active) return
      setUser(res?.user ?? null)
      setRestoring(false)
    })
    setSessionExpiredHandler(() => setUser(null))
    return () => {
      active = false
      setSessionExpiredHandler(null)
    }
  }, [])

  const login = useCallback(async (payload: LoginRequest) => {
    const loggedIn = await authService.login(payload)
    setUser(loggedIn)
    return loggedIn
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  if (restoring) {
    return <div className="app-loading muted">{t('common.loading')}</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
