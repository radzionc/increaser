import { Set } from '@increaser/entities/User'
import { UIComponentProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { useTheme } from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

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
`

const Identifier = styled.div`
  width: 4px;
  height: 100%;
`

export const WorkSession = ({
  set,
  showIdentifier = true,
  ...rest
}: WorkSessionProps) => {
  const { projects } = useAssertUserState()

  const theme = useTheme()

  const color = theme.colors.getLabelColor(projects[set.projectId].color)

  return (
    <Container {...rest}>
      {showIdentifier && (
        <Identifier style={{ background: color.toCssValue() }} />
      )}
    </Container>
  )
}
