import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import {
  PrincipleIdea,
  principleIdeas,
} from '@product/entities-utils/principle/principleIdeas'

import { PrincipleIdeaItem } from '../PrincipleIdeaItem'
import { PrinciplesContainer } from '../PrinciplesContainer'

import { ExplorePrinciplesCategoryFilter } from './ExplorePrinciplesFilter'
import { useFilterByExplorePrincipleCategory } from './state/explorePrincipleCategoryFilter'

const getCategoryId = (idea: PrincipleIdea) => idea.categoryId

export const ExplorePrinciples = () => {
  const items = useFilterByExplorePrincipleCategory(
    principleIdeas,
    getCategoryId,
  )

  return (
    <>
      <PageHeaderControlsArea>
        <ExplorePrinciplesCategoryFilter />
      </PageHeaderControlsArea>
      <PrinciplesContainer gap={20}>
        {items.map((idea) => (
          <PrincipleIdeaItem key={idea.id} value={idea} />
        ))}
      </PrinciplesContainer>
    </>
  )
}
