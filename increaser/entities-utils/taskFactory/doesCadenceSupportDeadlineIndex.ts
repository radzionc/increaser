import { TaskCadence } from '@increaser/entities/TaskFactory'
import { cadenceDefaultDeadlineIndex } from './cadenceDefaultDeadlineIndex'

export const doesCadenceSupportDeadlineIndex = (cadence: TaskCadence) =>
  cadenceDefaultDeadlineIndex[cadence] !== null
