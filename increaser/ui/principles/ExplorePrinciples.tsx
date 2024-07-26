import { principleIdeas } from '@increaser/entities-utils/principle/principleIdeas'
import { VStack } from '@lib/ui/layout/Stack'
import { PrincipleIdeaItem } from './PrincipleIdeaItem'
import styled from 'styled-components'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
`

export const ExplorePrinciples = () => {
  return (
    <Container>
      {principleIdeas.map((idea) => (
        <PrincipleIdeaItem key={idea.id} value={idea} />
      ))}
    </Container>
  )
}
