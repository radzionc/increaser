import { principleIdeas } from '@increaser/entities-utils/principle/principleIdeas'
import { PrincipleIdeaItem } from './PrincipleIdeaItem'
import { PrinciplesContainer } from './PrinciplesContainer'

export const ExplorePrinciples = () => {
  return (
    <PrinciplesContainer gap={20}>
      {principleIdeas.map((idea) => (
        <PrincipleIdeaItem key={idea.id} value={idea} />
      ))}
    </PrinciplesContainer>
  )
}
