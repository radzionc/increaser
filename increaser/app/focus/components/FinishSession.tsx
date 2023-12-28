import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import { useCurrentFocus } from './CurrentFocusProvider'
import { startOfDay } from 'date-fns'
import { MS_IN_HOUR } from '@lib/utils/time'
import { useState } from 'react'
import { EditEndTimeOverlay } from './EditEndTimeOverlay'

const Container = styled(UnstyledButton)<{ $color: HSLA }>`
  font-size: 18px;
  font-weight: 600;
  ${transition}
  ${centerContent};
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  border-radius: 20px;
  width: 120px;
  background: ${({ theme }) => theme.colors.background.toCssValue()};

  &:hover {
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
      return
    }

    stop()
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
