import { getLastItem } from '@increaser/utils/getLastItem'
import {
  blockDistanceInMinutes,
  getBlocks,
  getFocusDurationForCurrentBlock,
} from 'sets/Block'
import { Set } from 'sets/Set'
import { MS_IN_MIN } from '@increaser/utils/time'

export const focusDurations = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
] as const

export const maxFocusDuration = getLastItem(focusDurations)

export const recommendedFocusDurations = [30, 46, 60, 90]

export const defaultFocusDuration: FocusDuration = 30

export type FocusDuration = (typeof focusDurations)[number]

export const increaseFocusDuration = (lastSetDuration: number) => {
  return (
    focusDurations.find((option) => option > lastSetDuration) ??
    getLastItem(focusDurations)
  )
}

interface SuggestFocusDurationParams {
  todayStartedAt: number
  goalToFinishWorkBy: number
  todaySets: Set[]
}

export const suggestFocusDuration = ({
  todayStartedAt,
  goalToFinishWorkBy,
  todaySets,
}: SuggestFocusDurationParams): FocusDuration => {
  const now = Date.now()
  const workdayEndsAt = todayStartedAt + goalToFinishWorkBy * MS_IN_MIN
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
