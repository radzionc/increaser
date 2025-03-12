import { VStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { useUser } from '@product/ui/user/state/user'
import styled from 'styled-components'

import { useCurrentIdea } from './CurrentIdeaProvider'
import { IdeaDescription } from './IdeaDescription'

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
  const { projects } = useUser()

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
