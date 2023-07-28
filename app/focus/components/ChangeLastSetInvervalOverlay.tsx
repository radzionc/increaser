import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { useState } from 'react'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useUpdateLastSetMutation } from 'sets/hooks/useUpdateLastSetMutation'
import { Interval } from 'shared/entities/Interval'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ClosableComponentProps } from 'shared/props'
import styled, { useTheme } from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Modal } from '@increaser/ui/ui/Modal'
import { IntervalInput } from '@increaser/ui/ui/timeline/IntervalInput'
import { IntervalRect } from '@increaser/ui/ui/timeline/IntervalRect'
import { MS_IN_HOUR } from 'utils/time'
interface Props extends ClosableComponentProps {}

const Session = styled(IntervalRect)`
  width: 96%;
  right: 4%;
`

export const ChangeLastSetIntervalOverlay = ({ onClose }: Props) => {
  const startOfDay = useStartOfDay()
  const now = useRhythmicRerender(10000)
  const msToday = now - startOfDay
  const endHour = Math.ceil(msToday / MS_IN_HOUR)

  const theme = useTheme()

  const todaySets = useTodaySets()
  const readonlyTodaySets = todaySets.slice(0, -1)
  const set = todaySets[todaySets.length - 1]
  const { projectsRecord } = useProjects()

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
          startOfDay={startOfDay}
          startHour={0}
          endHour={endHour}
          color={projectsRecord[set.projectId].hslaColor}
          value={value}
          onChange={setValue}
          maxIntervalEnd={now}
          renderContent={({ pxInMs }) =>
            readonlyTodaySets.map(({ projectId, start, end }, index) => {
              return (
                <Session
                  key={index}
                  $color={getProjectColor(
                    projectsRecord,
                    theme,
                    projectId,
                  ).getVariant({ a: () => 0.4 })}
                  style={{
                    top: pxInMs * (start - startOfDay),
                    height: pxInMs * (end - start),
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
