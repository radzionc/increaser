import { VStack } from '@lib/ui/css/stack'
import { useIdeas } from './hooks/useIdeas'
import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { IdeaItem } from './IdeaItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { useMemo } from 'react'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'
import { ActiveIdea } from './ActiveIdea'

const Container = styled(VStack)`
  max-width: 560px;
`

export const Ideas = () => {
  const items = useIdeas()

  const [projectId] = useProjectFilter()

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return projectId ? item.projectId === projectId : true
    })
  }, [projectId, items])

  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        <ActiveIdea />
        {filteredItems.map((item) => (
          <CurrentIdeaProvider key={item.id} value={item}>
            <IdeaItem />
          </CurrentIdeaProvider>
        ))}
      </ActiveItemIdProvider>
    </Container>
  )
}
