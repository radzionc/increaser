import { VStack } from '@lib/ui/layout/Stack'
import { useIdeas } from './hooks/useIdeas'
import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { IdeaItem } from './IdeaItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddIdea } from './AddIdea'
import styled from 'styled-components'

const Container = styled(VStack)`
  max-width: 560px;
`

export const Ideas = () => {
  const items = useIdeas()

  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentIdeaProvider key={item.id} value={item}>
            <IdeaItem />
          </CurrentIdeaProvider>
        ))}
      </ActiveItemIdProvider>
      <AddIdea />
    </Container>
  )
}
