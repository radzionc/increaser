import { visionAttributeIdeas } from '@increaser/entities/Vision'
import { CuratedVisionAttributeItem } from './CuratedVisionAttributeItem'
import { VisionBoardContainer } from '@increaser/ui/vision/VisionBoardContainer'

export const CuratedVisionAttributes = () => {
  return (
    <VisionBoardContainer>
      {visionAttributeIdeas.map((value) => (
        <CuratedVisionAttributeItem key={value.name} value={value} />
      ))}
    </VisionBoardContainer>
  )
}
