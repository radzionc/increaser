import {
  defaultPrincipleCategories,
  otherPrincipleCategoryId,
} from '@increaser/entities/PrincipleCategory'
import { without } from '@lib/utils/array/without'
import {
  PrincipleIdea,
  principleIdeas,
} from '@increaser/entities-utils/principle/principleIdeas'
import { useMemo } from 'react'
import { VStack } from '@lib/ui/css/stack'
import { PrincipleIdeaItemContent } from '@increaser/ui/principles/PrincipleIdeaItemContent'

const categories = without(
  defaultPrincipleCategories.map((category) => category.id),
  otherPrincipleCategoryId,
)

export const PrinciplesDemo = () => {
  const items = useMemo(() => {
    const result: PrincipleIdea[] = []

    categories.forEach((categoryId) => {
      const item = principleIdeas.find((idea) => idea.categoryId === categoryId)
      if (item) {
        result.push(item)
      }
    })

    return result
  }, [])

  return (
    <VStack style={{ maxWidth: 560 }}>
      {items.map((item) => (
        <PrincipleIdeaItemContent key={item.id} value={item} />
      ))}
    </VStack>
  )
}
