import { useDayOverview } from '../DayOverviewProvider'
import { getBlocks } from '@increaser/entities-utils/block'
import { WorkBlock } from './WorkBlock'

export const WorkBlocks = () => {
  const { sets } = useDayOverview()
  const blocks = getBlocks(sets)

  return (
    <>
      {blocks.map((block, index) => (
        <WorkBlock key={index} block={block} />
      ))}
    </>
  )
}
