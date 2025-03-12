import { Text } from '@lib/ui/text'
import { useUser } from '@product/ui/user/state/user'

import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { PrincipleDescription } from './PrincipleDescription'
import { PrincipleHeader } from './PrincipleHeader'
import { PrincipleItemContainer } from './PrincipleItemContainer'
import { PrincipleName } from './PrincipleName'

export const PrincipleItemContent = () => {
  const { description, name, categoryId } = useCurrentPrinciple()
  const { principleCategories } = useUser()

  return (
    <PrincipleItemContainer>
      <PrincipleHeader
        prefix={
          <Text color="contrast">{principleCategories[categoryId].emoji}</Text>
        }
      >
        <PrincipleName>{name}</PrincipleName>
      </PrincipleHeader>
      {description && (
        <PrincipleDescription>{description}</PrincipleDescription>
      )}
    </PrincipleItemContainer>
  )
}
