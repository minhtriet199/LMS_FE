export type Role = 'Student' | 'Teacher' | 'Admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
