import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentIdea } from './CurrentIdeaProvider'
import { IdeaItemContent } from './IdeaItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const IdeaItem = () => {
  const { id } = useCurrentIdea()

  const [, setActiveItemId] = useActiveItemId()

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <IdeaItemContent />
    </Container>
  )
}
