import { createContext } from 'react'

interface ShowSnackbarParams {
  text: string
  duration?: number
}

export interface Snackbar {
  text: string
  duration: number
  showedAt: number
}

export interface SnackbarState {
  hideSnackbar: () => void
  showSnackbar: (params: ShowSnackbarParams) => void
  currentSnackbar: Snackbar | null
}

export const SnackbarContext = createContext<SnackbarState | undefined>(
  undefined,
)
