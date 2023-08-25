import { createContext } from 'react'
import { Set } from 'sets/Set'

export interface SetsManagerState {
  create: (set: Set) => void
}

export const SetsManagerContext = createContext<SetsManagerState | undefined>(
  undefined,
)
