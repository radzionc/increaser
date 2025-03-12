import { areEqualRecords } from '@lib/utils/record/areEqualRecords'
import { TaskLink } from '@product/entities/Task'

export const areLinkItemsEqual = (one: TaskLink, another: TaskLink) =>
  areEqualRecords(one, another)
