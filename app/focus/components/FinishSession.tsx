import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { useCurrentFocus } from './CurrentFocusProvider'
import { startOfDay } from 'date-fns'
import { MS_IN_HOUR } from '@increaser/utils/time'
import { useState } from 'react'
import { EditEndTimeOverlay } from './EditEndTimeOverlay'

const Container = styled(UnstyledButton)<{ $color: HSLA }>`
  font-size: 18px;
  font-weight: 600;
  ${defaultTransitionCSS}
  ${centerContentCSS};
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  border-radius: 20px;
  width: 120px;
  background: ${({ theme }) => theme.colors.background.toCssValue()};

  :hover {
    border-color: ${({ $color }) => $color.toCssValue()};
  }
`

interface FinishSessionProps {
  style?: React.CSSProperties
}

export const FinishSession = ({ style }: FinishSessionProps) => {
  const { stop } = useFocus()
  const { projectId, startedAt } = useCurrentFocus()
  const { projectsRecord } = useProjects()
  const project = projectsRecord[projectId]

  const [isEditing, setIsEditing] = useState(false)

  const handleStop = () => {
    const now = Date.now()
    const todayStartedAt = startOfDay(now).getTime()
    const duration = now - startedAt

    // TODO: consider last interaction with the app to understand if it was stale
    if (startedAt < todayStartedAt || duration > 2 * MS_IN_HOUR) {
      setIsEditing(true)
    } else {
      stop()
    }
  }

  return (
    <>
      <Container $color={project.hslaColor} style={style} onClick={handleStop}>
        Finish
      </Container>
      {isEditing && <EditEndTimeOverlay />}
    </>
  )
}
