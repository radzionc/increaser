import { Text } from '@increaser/ui/ui/Text'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { MS_IN_HOUR, MS_IN_MIN } from '@increaser/utils/time'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import styled from 'styled-components'
import { useAssertUserState } from 'user/state/UserStateContext'

interface WorkdayLeftBlockProps {
  style?: React.CSSProperties
  className?: string
}

const Container = styled.div`
  background: ${getColor('foreground')};
  ${centerContentCSS};
  position: absolute;
`

export const WorkdayLeftBlock = ({
  style,
  className,
}: WorkdayLeftBlockProps) => {
  const startOfDay = useStartOfDay()
  const { goalToFinishWorkBy } = useAssertUserState()
  const workEndsAt = startOfDay + goalToFinishWorkBy * MS_IN_MIN
  const now = useRhythmicRerender(2000)
  const workEndsIn = workEndsAt - now

  if (workEndsIn < 0) {
    return null
  }

  return (
    <Container style={style} className={className}>
      {workEndsIn > MS_IN_HOUR && (
        <Text color="contrast" weight="semibold" size={14}>
          {formatDuration(workEndsIn, 'ms')}{' '}
          <Text as="span" color="supporting">
            left to finish work
          </Text>
        </Text>
      )}
    </Container>
  )
}
