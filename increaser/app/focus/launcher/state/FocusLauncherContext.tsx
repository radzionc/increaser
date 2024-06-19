import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'

export const focusEntities = ['project', 'task'] as const
export type FocusEntity = (typeof focusEntities)[number]

export type FocusLauncherMutableState = {
  projectId: string | null
  taskId: string | null
  startedAt: number | null
  focusEntity: FocusEntity
}

type FocusLauncherState = FocusLauncherMutableState & {
  setState: Dispatch<SetStateAction<FocusLauncherMutableState>>
}

export const FocusLauncherContext = createContext<
  FocusLauncherState | undefined
>(undefined)

export const useFocusLauncher = createContextHook(
  FocusLauncherContext,
  'FocusLauncher',
)
