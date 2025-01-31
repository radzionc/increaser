import { VStack } from '@lib/ui/css/stack'
import { usePrinciples } from './hooks/usePrinciples'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { PrincipleItem } from './PrincipleItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import {
  useFilterByPrincipleCategory,
  usePrincipleCategoryFilter,
} from './categoryFilter/state/principleCategoryFilter'
import { Principle } from '@increaser/entities/Principle'
import { ActivePrinciple } from './ActivePrinciple'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { AddPrinciple } from './AddPrinciple'
import { useUser } from '../user/state/user'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import { shyTextButton } from '@lib/ui/buttons/ShyTextButton'

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
