import { Set } from '@increaser/entities/User'
import { getSetsDuration } from '../set/getSetsDuration'
import { getDistanceBetweenSets } from '../set/getDistanceBetweenSets'
import { MS_IN_MIN } from '@lib/utils/time'
import { Block, blockMaxBreak } from '@increaser/entities/Block'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const getBlockWorkDuration = ({ sets }: Block) => getSetsDuration(sets)

export const getBlocks = <T extends Set = Set>(sets: T[]): Block<T>[] => {
  const blocks: Block<T>[] = []

  sets.forEach((set, index) => {
    const prevSet = sets[index - 1]

    if (!prevSet) {
      blocks.push({ sets: [set] })
      return
    }

    const distance = getDistanceBetweenSets(prevSet, set)
    if (distance > blockMaxBreak * MS_IN_MIN) {
      blocks.push({ sets: [set] })
      return
    }

    getLastItem(blocks).sets.push(set)
  })

  return blocks
}

export const getBlockBoundaries = (block: Block) => ({
  start: block.sets[0].start,
  end: getLastItem(block.sets).end,
})
