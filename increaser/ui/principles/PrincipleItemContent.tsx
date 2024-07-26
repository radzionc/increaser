import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { getColor } from '@lib/ui/theme/getters'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { useAssertUserState } from '../user/UserStateContext'
import { PrincipleDescription } from './PrincipleDescription'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
`

const Header = styled(PrefixedItemFrame)`
  ${verticalPadding(0)};
  gap: 4px;
`

const Container = styled(VStack)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
`

export const PrincipleItemContent = () => {
  const { description, name, categoryId } = useCurrentPrinciple()
  const { principleCategories } = useAssertUserState()

  return (
    <Container>
      <Header
        prefix={
          <Text color="contrast">{principleCategories[categoryId].emoji}</Text>
        }
      >
        <Name>{name}</Name>
      </Header>
      {description && <PrincipleDescription />}
    </Container>
  )
}
