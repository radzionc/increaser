import { visionAttributes } from './visionAttributes'
import { CuratedVisionAttributeItem } from './CuratedVisionAttributeItem'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useMemo } from 'react'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const CuratedVisionAttributes = () => {
  const { vision } = useAssertUserState()
  const items = useMemo(() => {
    const usedNames = new Set(Object.values(vision).map((item) => item.name))
    return visionAttributes.filter((item) => !usedNames.has(item.name))
  }, [vision])

  return (
    <UniformColumnGrid minChildrenWidth={280} gap={8}>
      {items.map((value) => (
        <CuratedVisionAttributeItem key={value.name} value={value} />
      ))}
    </UniformColumnGrid>
  )
}
