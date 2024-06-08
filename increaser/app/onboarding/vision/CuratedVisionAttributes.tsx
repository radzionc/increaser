import { visionAttributeIdeas } from '@increaser/entities/Vision'
import { CuratedVisionAttributeItem } from './CuratedVisionAttributeItem'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const CuratedVisionAttributes = () => {
  return (
    <UniformColumnGrid minChildrenWidth={300} gap={20}>
      {visionAttributeIdeas.map((value) => (
        <CuratedVisionAttributeItem key={value.name} value={value} />
      ))}
    </UniformColumnGrid>
  )
}
