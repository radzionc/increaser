import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'

import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { PrincipleItemContent } from './PrincipleItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const PrincipleItem = () => {
  const { id } = useCurrentPrinciple()

  const [, setActiveItemId] = useActiveItemId()

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <PrincipleItemContent />
    </Container>
  )
}
