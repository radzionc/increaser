import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/css/stack'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { goalsTimelineConfig } from './config'
import { toPercents } from '@lib/utils/toPercents'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { formatDuration, intervalToDuration } from 'date-fns'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { Opener } from '@lib/ui/base/Opener'
import { SetDobOverlay } from '../dob/SetDobOverlay'

const Container = styled(VStack)`
  height: ${toSizeUnit(goalsTimelineConfig.labelsHeight)};
  justify-content: end;
  color: ${getColor('primary')};
  border-left: 1px solid;
  position: absolute;
  top: 0;
  ${interactive};
  ${transition};
`

const Content = styled.div`
  border-radius: 0 4px 4px 0;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 12px;

  border: 1px solid ${getColor('primary')};
  border-left: 0;
  color: ${({ theme }) =>
    theme.colors.primary
      .getHighestContrast(theme.colors.background, theme.colors.contrast)
      .toCssValue()};
  &:hover {
    background: ${getColor('foreground')};
  }
`

export const CurrentAge = () => {
  const { interval, dob } = useGoalsTimeline()

  const now = Date.now()

  const intervalDuration = getIntervalDuration(interval)

  const dobTimestamp = fromDay(stringToDay(shouldBePresent(dob)))
  const duration = intervalToDuration({
    start: dobTimestamp,
    end: Date.now(),
  })

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container
          onClick={onOpen}
          style={{
            left: toPercents((now - interval.start) / intervalDuration),
          }}
        >
          <Content>
            {formatDuration(duration, {
              format: ['years', 'months', 'days'],
            })}
          </Content>
        </Container>
      )}
      renderContent={({ onClose }) => <SetDobOverlay onFinish={onClose} />}
    />
  )
}
