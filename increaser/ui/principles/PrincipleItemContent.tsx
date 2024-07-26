import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { useAssertUserState } from '../user/UserStateContext'
import { PrincipleDescription } from './PrincipleDescription'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { PrincipleName } from './PrincipleName'
import { PrincipleHeader } from './PrincipleHeader'

const Container = styled(VStack)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  gap: 4px;
`

export const PrincipleItemContent = () => {
  const { description, name, categoryId } = useCurrentPrinciple()
  const { principleCategories } = useAssertUserState()

  return (
    <Container>
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
    </Container>
  )
}
