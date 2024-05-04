import { Set } from '@increaser/entities/User'
import { Interval } from '@lib/utils/interval/Interval'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'

type DeleteSetInput = {
  sets: Set[]
  value: Interval
}

export const deleteSet = ({ sets, value }: DeleteSetInput) =>
  sets.filter((set) => !areEqualIntervals(set, value))
