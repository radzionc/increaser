import { TaskLink } from '@increaser/entities/Task'
import { areEqualRecords } from '@lib/utils/record/areEqualRecords'

export const areLinkItemsEqual = (one: TaskLink, another: TaskLink) =>
  areEqualRecords(one, another)
