import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import styled, { useTheme } from 'styled-components'
import {
  IntervalInput,
  IntervalInputProps,
} from '@increaser/ui/ui/timeline/IntervalInput'
import { MS_IN_HOUR } from 'utils/time'

import { IntervalRect } from './IntervalRect'

interface Props
  extends Pick<IntervalInputProps, 'color' | 'value' | 'onChange'> {}

const Session = styled(IntervalRect)`
  width: 96%;
  right: 4%;
`

export const TodaySessionIntervalInput = (props: Props) => {
  const startOfDay = useStartOfDay()
  const now = useRhythmicRerender(10000)
  const msToday = now - startOfDay
  const endHour = Math.ceil(msToday / MS_IN_HOUR)

  const theme = useTheme()

  const todaySets = useTodaySets()
  const { projectsRecord } = useProjects()

  return (
    <IntervalInput
      startOfDay={startOfDay}
      startHour={0}
      endHour={endHour}
      color={props.color}
      value={props.value}
      onChange={props.onChange}
      maxIntervalEnd={now}
      renderContent={({ pxInMs }) =>
        todaySets.map(({ projectId, start, end }, index) => {
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
  )
}
