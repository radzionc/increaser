import { areEqualRecords } from '@lib/utils/record/areEqualRecords'
import { TaskChecklistItem } from '@product/entities/Task'

export const areChecklistItemsEqual = (
  one: TaskChecklistItem,
  another: TaskChecklistItem,
) => areEqualRecords(one, another)
