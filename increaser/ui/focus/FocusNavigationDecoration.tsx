import { useFocus } from './FocusContext'
import { FocusPassedTime } from './FocusPassedTime'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useProjects } from '../projects/ProjectsProvider'
import { useCurrentPage } from '@increaser/app/navigation/hooks/useCurrentPage'

const Container = styled.div`
  position: absolute;
  right: 8px;
  padding: 4px 8px;
  ${borderRadius.s};
  border: 2px solid;
`

export const FocusNavigationDecoration = () => {
  const page = useCurrentPage()

  const { currentSet } = useFocus()

  const { projectsRecord } = useProjects()

  const isActive = page === 'focus'

  if (isActive || !currentSet) return null

  return (
    <Container
      style={{
        color: projectsRecord[currentSet.projectId].hslaColor.toCssValue(),
      }}
    >
      <FocusPassedTime />
    </Container>
  )
}
