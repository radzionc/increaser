import { VStack } from '@lib/ui/css/stack'
import { usePrinciples } from './hooks/usePrinciples'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { PrincipleItem } from './PrincipleItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddPrinciple } from './AddPrinciple'
import styled from 'styled-components'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { PrincipleCategoryFilter } from './categoryFilter/PrincipleCategoryFilter'
import { useFilterByPrincipleCategory } from './categoryFilter/state/principleCategoryFilter'
import { Principle } from '@increaser/entities/Principle'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
`

const getPrincipleCategoryId = (item: Principle) => item.categoryId

export const Principles = () => {
  const items = useFilterByPrincipleCategory(
    usePrinciples(),
    getPrincipleCategoryId,
  )

  return (
    <Container>
      <PageHeaderControlsArea>
        <UserStateOnly>
          <PrincipleCategoryFilter />
        </UserStateOnly>
        <AddPrinciple />
      </PageHeaderControlsArea>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentPrincipleProvider key={item.id} value={item}>
            <PrincipleItem />
          </CurrentPrincipleProvider>
        ))}
      </ActiveItemIdProvider>
    </Container>
  )
}
