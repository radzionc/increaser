import { TaskChecklistItem, TaskLink } from '@increaser/entities/Task'
import { TaskCadence } from '@increaser/entities/TaskFactory'

export type TaskFactoryFormShape = {
  name: string
  projectId: string
  links: TaskLink[]
  cadence: TaskCadence
  checklist: TaskChecklistItem[]
}
