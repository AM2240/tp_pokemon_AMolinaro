export interface User {
  id: number
  email: string
  username: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
