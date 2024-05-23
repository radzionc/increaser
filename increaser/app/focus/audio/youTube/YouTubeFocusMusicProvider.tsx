import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type YouTubeFocusMusicMutableState = {
  isPlaying: boolean
}

type YouTubeFocusMusicState = YouTubeFocusMusicMutableState & {
  setState: Dispatch<SetStateAction<YouTubeFocusMusicMutableState>>
}

const YouTubeFocusMusicContext = createContext<
  YouTubeFocusMusicState | undefined
>(undefined)

export const YouTubeFocusMusicProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = useState<YouTubeFocusMusicMutableState>({
    isPlaying: true,
  })

  return (
    <YouTubeFocusMusicContext.Provider value={{ ...state, setState }}>
      {children}
    </YouTubeFocusMusicContext.Provider>
  )
}

export const useYouTubeFocusMusic = createContextHook(
  YouTubeFocusMusicContext,
  'YouTubeFocusMusic',
)
