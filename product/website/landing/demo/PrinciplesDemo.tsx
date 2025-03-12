import { VStack } from '@lib/ui/css/stack'
import { without } from '@lib/utils/array/without'
import {
  defaultPrincipleCategories,
  otherPrincipleCategoryId,
} from '@product/entities/PrincipleCategory'
import {
  PrincipleIdea,
  principleIdeas,
} from '@product/entities-utils/principle/principleIdeas'
import { PrincipleIdeaItemContent } from '@product/ui/principles/PrincipleIdeaItemContent'
import { useMemo } from 'react'

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
