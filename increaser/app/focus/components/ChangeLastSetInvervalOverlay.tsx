import { useState } from 'react'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useUpdateLastSetMutation } from '@increaser/app/sets/hooks/useUpdateLastSetMutation'
import { Interval } from '@increaser/app/shared/entities/Interval'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { ClosableComponentProps } from '@lib/ui/props'
import styled, { useTheme } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { IntervalInput } from '@lib/ui/timeline/IntervalInput'
import { IntervalRect } from '@lib/ui/timeline/IntervalRect'
import { MS_IN_HOUR } from '@lib/utils/time'
import { endOfDay, endOfHour, startOfHour } from 'date-fns'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Modal } from '@lib/ui/modal'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

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
          onClick={() => {
            onClose()
            updateLastSet({ ...set, ...value })
          }}
          kind="reversed"
          size="l"
        >
          Update
        </Button>
      }
    >
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
    </Modal>
  )
}
