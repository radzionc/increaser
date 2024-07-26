import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { EditPrincipleForm } from './form/EditPrincipleForm'
import { PrincipleItemContent } from './PrincipleItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const PrincipleItem = () => {
  const { id } = useCurrentPrinciple()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditPrincipleForm />
  }

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
