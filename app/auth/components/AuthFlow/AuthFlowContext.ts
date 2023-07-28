import { AuthFlowPurpose } from 'auth/AuthFlowPurpose'
import { createContext } from 'react'
import { createContextHook } from 'shared/utils/createContextHook'

export enum AuthDestination {
  AppSumo = 'app-sumo',
  App = 'app',
}

interface AuthFlowState {
  destination: AuthDestination
  authFlowPurpose: AuthFlowPurpose | null
  setAuthFlowPurpose: (purpose: AuthFlowPurpose | null) => void
}

export const AuthFlowContext = createContext<AuthFlowState | undefined>(
  undefined,
)

export const useAuthFlow = createContextHook(AuthFlowContext, 'AuthFlowContext')
