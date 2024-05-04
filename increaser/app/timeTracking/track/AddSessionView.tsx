import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { Button } from '@lib/ui/buttons/Button'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { FinishableComponentProps } from '@lib/ui/props'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { useEffect, useMemo, useState } from 'react'
import { WeekdaySelector } from './WeekdaySelector'
import { ProjectSelector } from './ProjectSelector'
import { IntervalInput } from '@lib/ui/timeline/IntervalInput'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Interval } from '@lib/utils/interval/Interval'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { getDaySets } from '../../sets/helpers/getDaySets'
import { WorkSession } from '../../sets/components/DayOverview/WorkBlocks/WorkSession'
import styled from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { analytics } from '../../analytics'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'

const defaultIntervalDuration = 30

const Content = styled(VStack)`
  max-height: 480px;
  overflow-y: auto;
`

export const AddSessionView = ({ onFinish }: FinishableComponentProps) => {
  const currentWeekday = useWeekday()
  const [weekday, setWeekday] = useState(currentWeekday)
  const { activeProjects, projectsRecord } = useProjects()
  const [project, setProject] = useState(activeProjects[0].id)

  const { finishWorkAt } = useAssertUserState()

  const sets = useCurrentWeekSets()

  const weekStartedAt = useStartOfWeek()
  const timelineStartsAt = weekStartedAt + convertDuration(weekday, 'd', 'ms')
  const timelineEndsAt = useMemo(() => {
    return weekday === currentWeekday
      ? Date.now()
      : timelineStartsAt + convertDuration(1, 'd', 'ms')
  }, [currentWeekday, timelineStartsAt, weekday])

  const [interval, setInterval] = useState<Interval>({
    start:
      timelineEndsAt - convertDuration(defaultIntervalDuration, 'min', 'ms'),
    end: timelineEndsAt,
  })

  useEffect(() => {
    if (interval.start < timelineStartsAt || interval.end > timelineEndsAt) {
      const end =
        weekday < currentWeekday
          ? timelineStartsAt + convertDuration(finishWorkAt, 'min', 'ms')
          : Date.now()
      setInterval({
        end,
        start: end - convertDuration(defaultIntervalDuration, 'min', 'ms'),
      })
    }
  }, [
    currentWeekday,
    finishWorkAt,
    interval.end,
    interval.start,
    timelineEndsAt,
    timelineStartsAt,
    weekday,
  ])

  const daySets = useMemo(() => {
    return getDaySets(sets, timelineStartsAt)
  }, [sets, timelineStartsAt])

  const isDisabled = useMemo(() => {
    if (daySets.some((set) => areIntersecting(set, interval))) {
      return 'This session intersects with another session'
    }
    return false
  }, [daySets, interval])

  const { mutate: addSet } = useAddSetMutation()

  const onSubmit = () => {
    addSet({ projectId: project, ...interval })
    analytics.trackEvent('Add session')
    onFinish()
  }

  return (
    <VStack gap={16} style={{ maxWidth: 400 }}>
      <Panel withSections kind="secondary">
        <HStack
          wrap="wrap"
          alignItems="center"
          fullWidth
          justifyContent="space-between"
          gap={20}
        >
          <SectionTitle>Add Session</SectionTitle>
          <HStack alignItems="center" gap={8}>
            <HStack alignItems="center" gap={4}>
              <ProjectSelector value={project} onChange={setProject} />

              <WeekdaySelector value={weekday} onChange={setWeekday} />
            </HStack>
          </HStack>
        </HStack>
        <Content>
          <IntervalInput
            pxInHour={100}
            timelineStartsAt={timelineStartsAt}
            timelineEndsAt={timelineEndsAt}
            color={projectsRecord[project].hslaColor}
            value={interval}
            onChange={setInterval}
            renderContent={({ msToPx }) => {
              return daySets.map((set, index) => {
                return (
                  <WorkSession
                    key={index}
                    set={set}
                    showIdentifier
                    style={{
                      top: msToPx(set.start - timelineStartsAt),
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
      </Panel>
    </VStack>
  )
}
