import { VStack } from '@lib/ui/layout/Stack'
import { useIdeas } from './hooks/useIdeas'
import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { IdeaItem } from './IdeaItem'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { useMemo } from 'react'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'
import { Opener } from '@lib/ui/base/Opener'
import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { CreateIdeaForm } from './form/CreateIdeaForm'

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
      <Opener
        renderOpener={({ onOpen, isOpen }) =>
          isOpen ? null : <ListAddButton onClick={onOpen} text="Add an idea" />
        }
        renderContent={({ onClose }) => (
          <CreateIdeaForm
            initialValue={projectId ? { projectId } : undefined}
            onFinish={onClose}
          />
        )}
      />
      <ActiveItemIdProvider initialValue={null}>
        {filteredItems.map((item) => (
          <CurrentIdeaProvider key={item.id} value={item}>
            <IdeaItem />
          </CurrentIdeaProvider>
        ))}
      </ActiveItemIdProvider>
    </Container>
  )
}
