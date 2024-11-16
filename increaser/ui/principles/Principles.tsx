import { VStack } from '@lib/ui/css/stack'
import { usePrinciples } from './hooks/usePrinciples'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { PrincipleItem } from './PrincipleItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddPrinciple } from './AddPrinciple'
import styled from 'styled-components'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { PrincipleCategoryFilter } from './categoryFilter/PrincipleCategoryFilter'
import { useFilterByPrincipleCategory } from './categoryFilter/state/principleCategoryFilter'
import { Principle } from '@increaser/entities/Principle'
import { ActivePrinciple } from './ActivePrinciple'

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
    <>
      <PageHeaderControlsArea>
        <PrincipleCategoryFilter />
        <AddPrinciple />
      </PageHeaderControlsArea>
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
    </>
  )
}
