import { visionAttributes } from './visionAttributes'
import { CuratedVisionAttributeItem } from './CuratedVisionAttributeItem'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const CuratedVisionAttributes = () => {
  return (
    <UniformColumnGrid minChildrenWidth={280} gap={8}>
      {visionAttributes.map((value) => (
        <CuratedVisionAttributeItem key={value.name} value={value} />
      ))}
    </UniformColumnGrid>
  )
}
