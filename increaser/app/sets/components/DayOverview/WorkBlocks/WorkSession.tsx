import { Set } from '@increaser/entities/User'
import { transition } from '@lib/ui/css/transition'
import { UIComponentProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { useFocus } from '@increaser/ui/focus/FocusContext'
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
  const { projects } = useAssertUserState()
  const { currentSet } = useFocus()

  const theme = useTheme()

  const color = theme.colors.getLabelColor(projects[set.projectId].color)

  return (
    <Container {...rest}>
      {!currentSet && showIdentifier && (
        <Identifier style={{ background: color.toCssValue() }} />
      )}
    </Container>
  )
}
