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
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { vStack } from '@lib/ui/css/stack'
import { Center } from '@lib/ui/layout/Center'
import { DataPointBreakdown } from './breakdown/DataPointBreakdown'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useActiveProject } from '../activeProject/useActiveProject'
import { FixedReference } from '@lib/ui/base/FixedReference'
import { useStartOfSelectedIntervalPoint } from '../timeGrouping/useStartOfSelectedIntervalPoint'
import { useTimeGrouping } from '../timeGrouping/state'

type DataPointInfoProps = {
  position: Point
}

const Container = styled.div`
  border: 1px solid ${getColor('textShy')};
  background: ${getColor('foregroundExtra')};
  ${borderRadius.s};
  overflow: hidden;

  ${vStack({
    gap: 1,
  })}

  min-width: 120px;

  > * {
    padding: 12px;
    background: ${getColor('foreground')};
  }
`

export const DataPointInfo = ({ position }: DataPointInfoProps) => {
  const [index] = usePresentState(useActiveItemIndex())
  const timeGrouping = useTimeGrouping()
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

  const periodStartedAt = useStartOfSelectedIntervalPoint(index)

  const data = useSelectedIntervalActiveTimeSeries()

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
      <FixedReference
        ref={setReference}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <Container ref={setFloating} style={{ ...floatingStyles }}>
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
