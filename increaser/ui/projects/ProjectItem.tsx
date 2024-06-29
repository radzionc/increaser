import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { EditProjectForm } from './form/EditProjectForm'
import { projectsConfig } from './config'
import { ProjectItemContent } from './ProjectItemContent'

const Container = styled(Hoverable)`
  ${verticalPadding(projectsConfig.verticalPadding)};
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
    >
      <ProjectItemContent />
    </Container>
  )
}
