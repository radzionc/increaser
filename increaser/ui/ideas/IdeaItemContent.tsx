import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentIdea } from './CurrentIdeaProvider'
import { getColor } from '@lib/ui/theme/getters'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { useAssertUserState } from '../user/UserStateContext'
import { IdeaDescription } from './IdeaDescription'
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

export const IdeaItemContent = () => {
  const { description, name, projectId } = useCurrentIdea()
  const { projects } = useAssertUserState()

  return (
    <Container>
      <Header
        prefix={<Text color="contrast">{projects[projectId].emoji}</Text>}
      >
        <Name>{name}</Name>
      </Header>
      {description && <IdeaDescription />}
    </Container>
  )
}
