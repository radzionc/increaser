import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { Interval } from '@lib/utils/interval/Interval'
import { Set } from '@product/entities/User'

type DeleteSetInput = {
  sets: Set[]
  value: Interval
}

export const deleteSet = ({ sets, value }: DeleteSetInput) =>
  sets.filter((set) => !areEqualIntervals(set, value))
