import { VStack } from '@lib/ui/layout/Stack'
import { usePrinciples } from './hooks/usePrinciples'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { PrincipleItem } from './PrincipleItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddPrinciple } from './AddPrinciple'
import styled from 'styled-components'

const Container = styled(VStack)``

export const Principles = () => {
  const items = usePrinciples()

  return (
    <Container>
      <AddPrinciple />
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
