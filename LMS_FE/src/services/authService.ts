import api, { setAccessToken, setRefreshHandler } from '../api/axios'
import type { AuthResponse, LoginRequest, User } from '../types'

let refreshPromise: Promise<AuthResponse | null> | null = null

async function login(payload: LoginRequest): Promise<User> {
  const { data } = await api.post<AuthResponse>('/api/auth/login', payload)
  setAccessToken(data.token)
  return data.user
}

function refresh(): Promise<AuthResponse | null> {
  refreshPromise ??= api
    .post<AuthResponse>('/api/auth/refresh')
    .then(({ data }) => {
      setAccessToken(data.token)
      return data
    })
    .catch(() => {
      setAccessToken(null)
      return null
    })
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

async function logout(): Promise<void> {
  try {
    await api.post('/api/auth/logout')
  } finally {
    setAccessToken(null)
  }
}

setRefreshHandler(async () => (await refresh()) !== null)

export const authService = { login, refresh, logout }
