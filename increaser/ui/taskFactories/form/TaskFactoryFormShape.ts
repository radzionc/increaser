import { TaskCadence } from '@increaser/entities/TaskFactory'
import { TaskFormShape } from '../../tasks/form/TaskFormShape'

export type TaskFactoryFormShape = Omit<TaskFormShape, 'deadlineAt'> & {
  cadence: TaskCadence
  deadlineIndex: number | null
}
