import { visionAttributeIdeas } from '@increaser/entities/Vision'
import { VisionIdeaItem } from './VisionIdeaItem'
import { VisionBoardContainer } from '@increaser/ui/vision/VisionBoardContainer'

export const VisionIdeas = () => {
  return (
    <VisionBoardContainer>
      {visionAttributeIdeas.map((value) => (
        <VisionIdeaItem key={value.name} value={value} />
      ))}
    </VisionBoardContainer>
  )
}
