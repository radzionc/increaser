import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { EditProjectForm } from './form/EditProjectForm'
import { ProjectItemContent } from './ProjectItemContent'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const ProjectItem = () => {
  const { id } = useCurrentProject()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditProjectForm />
  }

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
      horizontalOffset={tightListItemConfig.horizontalOffset}
    >
      <ProjectItemContent />
    </Container>
  )
}
