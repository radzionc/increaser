import { visionAttributeIdeas } from '@product/entities/Vision'
import { VisionBoardContainer } from '@product/ui/vision/VisionBoardContainer'

import { VisionIdeaItem } from './VisionIdeaItem'

export const VisionIdeas = () => {
  return (
    <VisionBoardContainer>
      {visionAttributeIdeas.map((value) => (
        <VisionIdeaItem key={value.name} value={value} />
      ))}
    </VisionBoardContainer>
  )
}
