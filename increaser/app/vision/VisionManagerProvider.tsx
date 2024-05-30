import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type VisionManagerMutableState = {
  activeItemId: string | null
}

type VisionManagerState = VisionManagerMutableState & {
  setState: Dispatch<SetStateAction<VisionManagerMutableState>>
}

export const VisionManagerContext = createContext<
  VisionManagerState | undefined
>(undefined)

export const useVisionManager = createContextHook(
  VisionManagerContext,
  'VisionManager',
)

export const VisionManagerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = useState<VisionManagerMutableState>({
    activeItemId: null,
  })

  return (
    <VisionManagerContext.Provider value={{ ...state, setState }}>
      {children}
    </VisionManagerContext.Provider>
  )
}
