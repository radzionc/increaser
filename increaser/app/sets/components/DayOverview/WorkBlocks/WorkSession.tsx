import { Set } from '@increaser/entities/User'
import { transition } from '@lib/ui/css/transition'
import { UIComponentProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { getProjectColor } from '@increaser/app/projects/utils/getProjectColor'
import styled, { useTheme } from 'styled-components'

interface WorkSessionProps extends UIComponentProps {
  set: Set
  showIdentifier?: boolean
}

const Container = styled.div`
  border-radius: 2px;
  background: ${getColor('mist')};
  overflow: hidden;
  position: absolute;
  width: 100%;
  ${transition};
`

const Identifier = styled.div`
  width: 4px;
  height: 100%;
  ${transition};
`

export const WorkSession = ({
  set,
  showIdentifier = true,
  ...rest
}: WorkSessionProps) => {
  const { projectsRecord } = useProjects()
  const { currentSet } = useFocus()

  const theme = useTheme()

  const color = getProjectColor(projectsRecord, theme, set.projectId)

  return (
    <Container {...rest}>
      {!currentSet && showIdentifier && (
        <Identifier style={{ background: color.toCssValue() }} />
      )}
    </Container>
  )
}
