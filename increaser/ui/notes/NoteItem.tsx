import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentNote } from './CurrentNoteProvider'
import { EditNoteForm } from './form/EditNoteForm'
import { NoteItemContent } from './NoteItemContent'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Container = styled(Hoverable)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  text-align: start;
  width: 100%;
`

export const NoteItem = () => {
  const { id } = useCurrentNote()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditNoteForm />
  }

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <NoteItemContent />
    </Container>
  )
}
