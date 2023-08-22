import { Set } from '@increaser/entities/User'
import { getSetsDuration } from '../set/getSetsDuration'
import { getDistanceBetweenSets } from '../set/getDistanceBetweenSets'
import { MS_IN_MIN } from '@increaser/utils/time'
import { Block } from '@increaser/entities/Block'
import { getLastItem } from '@increaser/utils/getLastItem'

export const blockDistanceInMinutes = 15

export const targetBlockInMin = 90

export const getBlockDuration = ({ sets }: Block) =>
  getLastItem(sets).end - sets[0].start

export const getBlockWorkDuration = ({ sets }: Block) => getSetsDuration(sets)

export const getDistanceBetweenBlocks = (prevBlock: Block, block: Block) =>
  getDistanceBetweenSets(getLastItem(prevBlock.sets), block.sets[0])

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

    getLastItem(blocks).sets.push(set)
  })

  return blocks
}
