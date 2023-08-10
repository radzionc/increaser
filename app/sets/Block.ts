import {
  FocusDuration,
  defaultFocusDuration,
  focusDurations,
} from 'focus/FocusDuration'
import { getLast } from 'shared/utils/getLast'
import { DefaultTheme } from 'styled-components'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { MS_IN_MIN } from 'utils/time'

import { getSetsSum } from './helpers/getSetsSum'
import { Set } from './Set'
import { getDistanceBetweenSets } from '@increaser/entities-utils/set/getDistanceBetweenSets'

export interface Block {
  sets: Set[]
}

export const blockDistanceInMinutes = 15

export const targetBlockInMin = 90

export const getBlockDuration = ({ sets }: Block) =>
  getLast(sets).end - sets[0].start

export const getBlockWorkDuration = ({ sets }: Block) => getSetsSum(sets)

export const getDistanceBetweenBlocks = (prevBlock: Block, block: Block) =>
  getDistanceBetweenSets(getLast(prevBlock.sets), block.sets[0])

export const getBlocks = (sets: Set[]): Block[] => {
  const blocks: Block[] = []

  sets.forEach((set, index) => {
    const prevSet = sets[index - 1]

    if (!prevSet) {
      blocks.push({ sets: [set] })
      return
    }

    const distance = getDistanceBetweenSets(prevSet, set)
    if (distance > blockDistanceInMinutes * MS_IN_MIN) {
      blocks.push({ sets: [set] })
      return
    }

    getLast(blocks).sets.push(set)
  })

  return blocks
}

export const getNextFocusDuration = (blocks: Block[]) => {
  if (blocks.length === 0) return defaultFocusDuration

  const block = getLast(blocks)

  const workDurationInMin = getBlockWorkDuration(block) / MS_IN_MIN

  const now = Date.now()
  const timeSinceLastSet = now - getLast(block.sets).end
  if (timeSinceLastSet > blockDistanceInMinutes * MS_IN_MIN)
    return defaultFocusDuration

  if (targetBlockInMin - workDurationInMin < focusDurations[0])
    return defaultFocusDuration

  return (
    focusDurations.find(
      (option) => option + workDurationInMin >= targetBlockInMin,
    ) || defaultFocusDuration
  )
}

export const getFocusDurationForCurrentBlock = (
  block: Block,
  focusOptions: FocusDuration[],
): FocusDuration => {
  const workDurationInMin = getBlockWorkDuration(block) / MS_IN_MIN
  return (
    focusOptions.find(
      (option) => option + workDurationInMin >= targetBlockInMin,
    ) || getLast(focusOptions)
  )
}

interface ShouldBeNewBlockParams {
  sets: Set[]
  timestamp: number
}

export const shouldBeNewBlock = ({
  sets,
  timestamp,
}: ShouldBeNewBlockParams) => {
  if (!sets.length) return true

  const durationSinceLastSet = timestamp - getLast(sets).end

  return durationSinceLastSet > blockDistanceInMinutes * MS_IN_MIN
}

export const getBlockColor = (
  duration: number,
  { colors }: DefaultTheme,
  mediumColor?: HSLA,
) => {
  const durationInMin = duration / MS_IN_MIN

  const color =
    durationInMin >= 60
      ? colors.success
      : durationInMin < 30
      ? colors.alert
      : mediumColor

  return color?.toCssValue()
}
