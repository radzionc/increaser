import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentPrincipleCategory } from './CurrentPrincipleCategoryProvider'
import { PrincipleCategoryItemContent } from './PrincipleCategoryItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const PrincipleCategoryItem = () => {
  const { id } = useCurrentPrincipleCategory()

  const [, setActiveItemId] = useActiveItemId()

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
