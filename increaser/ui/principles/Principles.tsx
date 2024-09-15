import { VStack } from '@lib/ui/css/stack'
import { usePrinciples } from './hooks/usePrinciples'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { PrincipleItem } from './PrincipleItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddPrinciple } from './AddPrinciple'
import styled from 'styled-components'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'

const Container = styled(VStack)`
  max-width: 560px;
  width: 100%;
`

export const Principles = () => {
  const items = usePrinciples()

  return (
    <Container>
      <PageHeaderControlsArea>
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
