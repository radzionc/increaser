import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentPrincipleCategory } from './CurrentPrincipleCategoryProvider'
import { EditPricnipleCategoryForm } from './form/EditPrincipleCategoryForm'
import { PrincipleCategoryItemContent } from './PrincipleCategoryItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const PrincipleCategoryItem = () => {
  const { id } = useCurrentPrincipleCategory()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditPricnipleCategoryForm />
  }

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <PrincipleCategoryItemContent />
    </Container>
  )
}
