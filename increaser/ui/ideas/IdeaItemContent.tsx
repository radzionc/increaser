import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentIdea } from './CurrentIdeaProvider'
import { getColor } from '@lib/ui/theme/getters'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { useAssertUserState } from '../user/UserStateContext'
import { IdeaDescription } from './IdeaDescription'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
`

export const IdeaItemContent = () => {
  const { description, name, projectId } = useCurrentIdea()
  const { projects } = useAssertUserState()

  return (
    <VStack>
      <PrefixedItemFrame
        prefix={<Text color="contrast">{projects[projectId].emoji}</Text>}
      >
        <Name>{name}</Name>
      </PrefixedItemFrame>
      {description && <IdeaDescription />}
    </VStack>
  )
}
