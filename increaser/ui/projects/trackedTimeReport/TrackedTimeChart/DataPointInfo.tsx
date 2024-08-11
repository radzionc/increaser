import { Point } from '@lib/ui/entities/Point'
import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
} from '@floating-ui/react'
import styled from 'styled-components'
import { useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { match } from '@lib/utils/match'
import { formatWeek } from '@lib/utils/time/Week'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useActiveTimeSeries } from '../hooks/useActiveTimeSeries'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/layout/Stack'
import { Center } from '@lib/ui/layout/Center'
import { DataPointBreakdown } from './breakdown/DataPointBreakdown'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useStartOfPeriod } from '../timeGrouping/useStartOfPeriod'

type DataPointInfoProps = {
  position: Point
}

const Reference = styled.div`
  position: fixed;
  pointer-events: none;
`

const Container = styled(VStack)`
  border: 1px solid ${getColor('textSupporting')};
  background: ${getColor('foregroundExtra')};
  gap: 1px;
  ${borderRadius.s};
  overflow: hidden;

  font-size: 14px;
  font-weight: 500;
  min-width: 120px;

  > * {
    padding: 12px;
    background: ${getColor('foreground')};
  }
`

export const DataPointInfo = ({ position }: DataPointInfoProps) => {
  const [index] = usePresentState(useActiveItemIndex())
  const [timeGrouping] = useTimeGrouping()
  const [activeProjectId] = useActiveProject()

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    update,
  } = useFloating({
    open: true,
    placement: 'right',
    strategy: 'fixed',
    middleware: [offset(16), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const periodStartedAt = useStartOfPeriod(index)

  const data = useActiveTimeSeries()

  const title = useMemo(
    () =>
      match(timeGrouping, {
        day: () => format(periodStartedAt, 'EEE d, MMM yyyy'),
        week: () => formatWeek(periodStartedAt),
        month: () => format(periodStartedAt, 'MMMM yyyy'),
        year: () => new Date(periodStartedAt).getFullYear().toString(),
      }),
    [periodStartedAt, timeGrouping],
  )

  useEffect(() => {
    update()
  }, [position, update])

  const total = data[index]

  return (
    <>
      <Reference
        ref={setReference}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <Container ref={setFloating} style={{ ...floatingStyles, zIndex: 1 }}>
        <Center>
          <Text>{title}</Text>
        </Center>
        <Center>
          <Text size={20} color="contrast">
            {total ? (
              <EmphasizeNumbers
                value={formatDuration(total, 's', {
                  maxUnit: 'h',
                })}
              />
            ) : (
              '-'
            )}
          </Text>
        </Center>
        {!activeProjectId && <DataPointBreakdown />}
      </Container>
    </>
  )
}
