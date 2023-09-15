import { Set } from '@increaser/entities/User'
import { UIComponentProps } from '@increaser/ui/props'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import styled, { useTheme } from 'styled-components'

interface WorkSessionProps extends UIComponentProps {
  set: Set
}

const Container = styled.div`
  border-radius: 2px;
  background: ${getColor('mist')};
  overflow: hidden;
  position: absolute;
  width: 100%;
`

const Identifier = styled.div`
  width: 4px;
  height: 100%;
`

export const WorkSession = ({ set, ...rest }: WorkSessionProps) => {
  const { projectsRecord } = useProjects()
  const { currentSet } = useFocus()

  const theme = useTheme()

  const color = getProjectColor(projectsRecord, theme, set.projectId)

  return (
    <Container {...rest}>
      {!currentSet && <Identifier style={{ background: color.toCssValue() }} />}
    </Container>
  )
}
