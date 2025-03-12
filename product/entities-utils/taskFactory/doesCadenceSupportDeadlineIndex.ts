import { TaskCadence } from '@product/entities/TaskFactory'

import { cadenceDefaultDeadlineIndex } from './cadenceDefaultDeadlineIndex'

export const doesCadenceSupportDeadlineIndex = (cadence: TaskCadence) =>
  cadenceDefaultDeadlineIndex[cadence] !== null
