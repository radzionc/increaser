import { TaskLink } from '@increaser/entities/Task'

export type TaskFormShape = {
  name: string
  projectId: string
  links: TaskLink[]
}
