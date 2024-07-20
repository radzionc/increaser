import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentIdea } from './CurrentIdeaProvider'
import { EditIdeaForm } from './form/EditIdeaForm'
import { IdeaItemContent } from './IdeaItemContent'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Container = styled(Hoverable)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  text-align: start;
  width: 100%;
`

export const IdeaItem = () => {
  const { id } = useCurrentIdea()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditIdeaForm />
  }

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
