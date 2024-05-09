import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type TasksManagerMutableState = {
  activeTaskId: string | null
}

type TasksManagerState = TasksManagerMutableState & {
  setState: Dispatch<SetStateAction<TasksManagerMutableState>>
}

export const TasksManagerContext = createContext<TasksManagerState | undefined>(
  undefined,
)

export const useTasksManager = createContextHook(
  TasksManagerContext,
  'TasksManager',
)

export const TasksManagerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = useState<TasksManagerMutableState>({
    activeTaskId: null,
  })

  return (
    <TasksManagerContext.Provider value={{ ...state, setState }}>
      {children}
    </TasksManagerContext.Provider>
  )
}
