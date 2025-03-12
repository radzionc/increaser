import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { defaultPrincipleCategories } from '@product/entities/PrincipleCategory'
import { PrincipleIdea } from '@product/entities-utils/principle/principleIdeas'
import { useMemo } from 'react'

import { usePrinciples } from './hooks/usePrinciples'
import { PrincipleDescription } from './PrincipleDescription'
import { PrincipleHeader } from './PrincipleHeader'
import { PrincipleItemContainer } from './PrincipleItemContainer'
import { PrincipleName } from './PrincipleName'

export const PrincipleIdeaItemContent = ({
  value,
}: ValueProp<PrincipleIdea>) => {
  const { description, name, source } = value

  const principles = usePrinciples()

  const isAdded = useMemo(
    () => principles.some((p) => p.name === name),
    [name, principles],
  )

  return (
    <PrincipleItemContainer>
      <PrincipleHeader
        prefix={
          <Text color="contrast">
            {
              shouldBePresent(
                defaultPrincipleCategories.find(
                  (principle) => principle.id === value.categoryId,
                ),
              ).emoji
            }
          </Text>
        }
      >
        <PrincipleName>
          {name}
          {isAdded && (
            <Text
              weight="600"
              style={{ marginLeft: 8 }}
              as="span"
              color="success"
            >
              (added)
            </Text>
          )}
        </PrincipleName>
      </PrincipleHeader>
      <PrincipleDescription>{description}</PrincipleDescription>
      <Text color="shy">
        From "{source.name}" by {source.author}
      </Text>
    </PrincipleItemContainer>
  )
}
