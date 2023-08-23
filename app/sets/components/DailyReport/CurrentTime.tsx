import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { formatTime } from '@increaser/utils/formatTime'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from 'utils/time'

interface CurrentTimeProps {
  style?: React.CSSProperties
  timelineStart: number
  timelineInMs: number
}

const Container = styled.div`
  position: absolute;
  border-top: 1px solid;
  width: 100%;

  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-size: 12px;

  display: flex;
  justify-content: end;
  padding-right: 6px;
`

export const CurrentTime = ({
  timelineStart,
  timelineInMs,
}: CurrentTimeProps) => {
  const now = useRhythmicRerender()

  const todayStartedAt = useStartOfDay()
  const { goalToFinishWorkBy } = useAssertUserState()
  const workdayEndsAt = todayStartedAt + goalToFinishWorkBy * MS_IN_MIN

  if (now > workdayEndsAt) return null

  return (
    <Container
      style={{
        top: toPercents((now - timelineStart) / timelineInMs),
      }}
    >
      {formatTime(now)}
    </Container>
  )
}
