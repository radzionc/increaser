import { getLastItem } from '@lib/utils/array/getLastItem'
import {
  blockDistanceInMinutes,
  getBlocks,
  getFocusDurationForCurrentBlock,
} from '@increaser/app/sets/Block'
import { MS_IN_MIN } from '@lib/utils/time'
import {
  FocusDuration,
  defaultFocusDuration,
  focusDurations,
  maxFocusDuration,
} from '@increaser/entities/FocusDuration'
import { Set } from '@increaser/entities/User'

export const increaseFocusDuration = (lastSetDuration: number) => {
  return (
    focusDurations.find((option) => option > lastSetDuration) ??
    getLastItem(focusDurations)
  )
}

interface SuggestFocusDurationParams {
  todayStartedAt: number
  finishWorkAt: number
  todaySets: Set[]
}

export const suggestFocusDuration = ({
  todayStartedAt,
  finishWorkAt,
  todaySets,
}: SuggestFocusDurationParams): FocusDuration => {
  const now = Date.now()
  const workdayEndsAt = todayStartedAt + finishWorkAt * MS_IN_MIN
  const workdayEndsInMinutes = Math.floor((workdayEndsAt - now) / MS_IN_MIN)
  const focusOptions = focusDurations.filter(
    (option) => option <= workdayEndsInMinutes,
  )
  if (!focusOptions.length) return defaultFocusDuration

  const willBeNewBlock = todaySets.length
    ? now - getLastItem(todaySets).end > blockDistanceInMinutes * MS_IN_MIN
    : true

  if (willBeNewBlock) return maxFocusDuration

  const blocks = getBlocks(todaySets)
  const lastBlock = getLastItem(blocks)

  const focusDurationForCurrentBlock = getFocusDurationForCurrentBlock(
    lastBlock,
    focusOptions,
  )
  if (focusDurationForCurrentBlock < 15) {
    return defaultFocusDuration
  }

  return focusDurationForCurrentBlock
}
