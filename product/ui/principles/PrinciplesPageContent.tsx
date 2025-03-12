import { shyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { VStack } from '@lib/ui/css/stack'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Principle } from '@product/entities/Principle'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'
import { getAppPath } from '@product/ui/navigation/app'
import Link from 'next/link'
import styled from 'styled-components'

import { useUser } from '../user/state/user'

import { ActivePrinciple } from './ActivePrinciple'
import { AddPrinciple } from './AddPrinciple'
import {
  useFilterByPrincipleCategory,
  usePrincipleCategoryFilter,
} from './categoryFilter/state/principleCategoryFilter'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { usePrinciples } from './hooks/usePrinciples'
import { PrincipleItem } from './PrincipleItem'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
`

const PrinciplesIdeasLink = styled(Link)`
  ${shyTextButton}
`

const getPrincipleCategoryId = (item: Principle) => item.categoryId

export const PrinciplesPageContent = () => {
  const [categoryId, setPrincipleCategoryFilter] = usePrincipleCategoryFilter()
  const { principleCategories } = useUser()

  const items = useFilterByPrincipleCategory(
    usePrinciples(),
    getPrincipleCategoryId,
  )

  if (isEmpty(items)) {
    if (categoryId) {
      const category = principleCategories[categoryId]
      return (
        <NoFilterMatches
          title={`"${category.name}" has no principles yet`}
          onRemove={() => setPrincipleCategoryFilter(null)}
          action={<AddPrinciple />}
        />
      )
    }

    return (
      <EmptyState
        title="Start with your first principle"
        action={
          <>
            <LearnMoreShyAction value="principles" />
            <AddPrinciple />
          </>
        }
        description={
          <>
            Document your core beliefs and lessons learned from experiences.
            Need inspiration?{' '}
            <PrinciplesIdeasLink href={getAppPath('principles', 'ideas')}>
              Explore our curated list of principles
            </PrinciplesIdeasLink>{' '}
            for health, relationships, work, and more.
          </>
        }
      />
    )
  }

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActivePrinciple />
      <Container>
        {items.map((item) => (
          <CurrentPrincipleProvider key={item.id} value={item}>
            <PrincipleItem />
          </CurrentPrincipleProvider>
        ))}
      </Container>
    </ActiveItemIdProvider>
  )
}
