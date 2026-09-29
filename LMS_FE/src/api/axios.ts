import axios, { type InternalAxiosRequestConfig } from 'axios'

let accessToken: string | null = null
let refreshHandler: (() => Promise<boolean>) | null = null
let sessionExpiredHandler: (() => void) | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

export const setRefreshHandler = (handler: () => Promise<boolean>) => {
  refreshHandler = handler
}

export const setSessionExpiredHandler = (handler: (() => void) | null) => {
  sessionExpiredHandler = handler
}

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || !error.config) {
      return Promise.reject(error)
    }

    const config = error.config as RetryableConfig
    if (config._retry || config.url?.startsWith('/api/auth/')) {
      return Promise.reject(error)
    }

    config._retry = true
    if (refreshHandler && (await refreshHandler())) {
      return api(config)
    }

    sessionExpiredHandler?.()
    return Promise.reject(error)
  },
)

export default api
