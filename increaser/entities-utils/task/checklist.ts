import { TaskChecklistItem } from '@increaser/entities/Task'
import { areEqualRecords } from '@lib/utils/record/areEqualRecords'

export const areChecklistItemsEqual = (
  one: TaskChecklistItem,
  another: TaskChecklistItem,
) => areEqualRecords(one, another)
