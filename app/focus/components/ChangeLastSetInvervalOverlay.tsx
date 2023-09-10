import { useProjects } from 'projects/hooks/useProjects'
import { useState } from 'react'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useUpdateLastSetMutation } from 'sets/hooks/useUpdateLastSetMutation'
import { Interval } from 'shared/entities/Interval'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { ClosableComponentProps } from '@increaser/ui/props'
import styled, { useTheme } from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Modal } from '@increaser/ui/ui/Modal'
import { IntervalInput } from '@increaser/ui/ui/timeline/IntervalInput'
import { IntervalRect } from '@increaser/ui/ui/timeline/IntervalRect'
import { MS_IN_HOUR } from '@increaser/utils/time'
import { endOfDay, endOfHour, startOfHour } from 'date-fns'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
interface Props extends ClosableComponentProps {}

const Session = styled(IntervalRect)``

export const ChangeLastSetIntervalOverlay = ({ onClose }: Props) => {
  const now = useRhythmicRerender(10000)
  const theme = useTheme()

  const todaySets = useTodaySets()
  const readonlyTodaySets = todaySets.slice(0, -1)
  const set = todaySets[todaySets.length - 1]
  const { projectsRecord } = useProjects()
  const todayStartedAt = useStartOfDay()

  const timelineStartsAt = Math.max(
    startOfHour(set.start - 2 * MS_IN_HOUR).getTime(),
    todayStartedAt,
  )
  const timelineEndsAt = Math.min(
    endOfDay(set.start).getTime(),
    timelineStartsAt + 4 * MS_IN_HOUR,
    endOfHour(set.end).getTime(),
    now,
  )

  const [value, setValue] = useState<Interval>(set)

  const { mutate: updateLastSet } = useUpdateLastSetMutation()

  return (
    <Modal
      title="Update Session"
      onClose={onClose}
      footer={
        <Button
          kind="reversed"
          size="l"
          onClick={() => {
            onClose()
            updateLastSet({ ...set, ...value })
          }}
        >
          Update
        </Button>
      }
      renderContent={() => (
        <IntervalInput
          timelineStartsAt={timelineStartsAt}
          timelineEndsAt={timelineEndsAt}
          color={projectsRecord[set.projectId].hslaColor}
          value={value}
          onChange={setValue}
          renderContent={({ msToPx }) =>
            readonlyTodaySets.map(({ start, end }, index) => {
              return (
                <Session
                  key={index}
                  $color={theme.colors.mistExtra}
                  style={{
                    top: msToPx(start - timelineStartsAt),
                    height: msToPx(end - start),
                  }}
                />
              )
            })
          }
        />
      )}
    />
  )
}
