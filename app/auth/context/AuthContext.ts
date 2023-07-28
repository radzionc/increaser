import { createContext } from 'react'

export type AuthSessionInfo = {
  token: string
  tokenExpirationTime: number
}

interface AuthState {
  token?: string
  isUserLoggedIn: boolean
  updateSession: (info: AuthSessionInfo) => void
  unauthorize: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)
