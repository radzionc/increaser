import { VStack } from '@lib/ui/layout/Stack'
import { useNotes } from './hooks/useNotes'
import { CurrentNoteProvider } from './CurrentNoteProvider'
import { NoteItem } from './NoteItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddNote } from './AddNote'
import styled from 'styled-components'

const Container = styled(VStack)`
  max-width: 560px;
`

export const Notes = () => {
  const items = useNotes()

  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentNoteProvider key={item.id} value={item}>
            <NoteItem />
          </CurrentNoteProvider>
        ))}
      </ActiveItemIdProvider>
      <AddNote />
    </Container>
  )
}
