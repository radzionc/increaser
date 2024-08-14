import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export const taskViews = ['board', 'upcoming'] as const
export type TaskView = (typeof taskViews)[number]

export const useTasksView = () => {
  return usePersistentState<TaskView>(PersistentStateKey.TasksView, 'board')
}
