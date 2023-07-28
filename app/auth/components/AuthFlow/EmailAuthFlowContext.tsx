import { createContext } from 'react'

interface EmailAuthFlowState {
  email: string | null
  setEmail: (email: string | null) => void
}

export const EmailAuthFlowContext = createContext<EmailAuthFlowState>({
  email: null,
  setEmail: () => {},
})
