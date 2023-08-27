import { FocusSound } from '@increaser/entities/FocusSound'
import { createContext } from 'react'

export interface FocusSoundsState {
  isEnabled: boolean
  updateIsEnabled: (isEnabled: boolean) => void

  sounds: FocusSound[]
  updateSounds: (sounds: FocusSound[]) => void

  activeSoundUrl: string | null
  updateActiveSoundUrl: (url: string) => void

  isPlaying: boolean
  updateIsPlaying: (isPlaying: boolean) => void
}

export const FocusSoundsContext = createContext<FocusSoundsState | undefined>(
  undefined,
)
