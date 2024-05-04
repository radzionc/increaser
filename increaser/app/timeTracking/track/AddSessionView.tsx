import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { Button } from '@lib/ui/buttons/Button'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { FinishableComponentProps } from '@lib/ui/props'
import { useEffect, useMemo, useState } from 'react'
import { IntervalInput } from '@lib/ui/timeline/IntervalInput'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Interval } from '@lib/utils/interval/Interval'
import { WorkSession } from '../../sets/components/DayOverview/WorkBlocks/WorkSession'
import styled from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { analytics } from '../../analytics'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useTrackTime } from './TrackTimeProvider'

const defaultIntervalDuration = 30

const Content = styled(VStack)`
  max-height: 520px;
  overflow-y: auto;
`

export const AddSessionView = ({ onFinish }: FinishableComponentProps) => {
  const currentWeekday = useWeekday()
  const { projectsRecord } = useProjects()

  const { dayInterval, sets, weekday, projectId } = useTrackTime()

  const { finishWorkAt } = useAssertUserState()

  const [interval, setInterval] = useState<Interval>({
    start:
      dayInterval.end - convertDuration(defaultIntervalDuration, 'min', 'ms'),
    end: dayInterval.end,
  })

  useEffect(() => {
    if (interval.start < dayInterval.start || interval.end > dayInterval.end) {
      const end =
        weekday < currentWeekday
          ? dayInterval.start + convertDuration(finishWorkAt, 'min', 'ms')
          : Date.now()
      setInterval({
        end,
        start: end - convertDuration(defaultIntervalDuration, 'min', 'ms'),
      })
    }
  }, [
    currentWeekday,
    dayInterval.end,
    dayInterval.start,
    finishWorkAt,
    interval.end,
    interval.start,
    weekday,
  ])

  const isDisabled = useMemo(() => {
    if (sets.some((set) => areIntersecting(set, interval))) {
      return 'This session intersects with another session'
    }
    return false
  }, [interval, sets])

  const { mutate: addSet } = useAddSetMutation()

  const onSubmit = () => {
    addSet({ projectId, ...interval })
    analytics.trackEvent('Add session')
    onFinish()
  }

  return (
    <>
      <Content>
        <IntervalInput
          pxInHour={100}
          timelineStartsAt={dayInterval.start}
          timelineEndsAt={dayInterval.end}
          color={projectsRecord[projectId].hslaColor}
          value={interval}
          onChange={setInterval}
          renderContent={({ msToPx }) => {
            return sets.map((set, index) => {
              return (
                <WorkSession
                  key={index}
                  set={set}
                  showIdentifier
                  style={{
                    top: msToPx(set.start - dayInterval.start),
                    height: msToPx(set.end - set.start),
                  }}
                />
              )
            })
          }}
        />
      </Content>
      <VStack>
        <HStack style={{ alignSelf: 'end' }} gap={12}>
          <Button onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button onClick={onSubmit} isDisabled={isDisabled}>
            Submit
          </Button>
        </HStack>
      </VStack>
    </>
  )
}
