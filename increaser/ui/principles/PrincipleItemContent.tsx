import { Text } from '@lib/ui/text'
import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { useUser } from '@increaser/ui/user/state/user'
import { PrincipleDescription } from './PrincipleDescription'
import { PrincipleName } from './PrincipleName'
import { PrincipleHeader } from './PrincipleHeader'
import { PrincipleItemContainer } from './PrincipleItemContainer'

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
