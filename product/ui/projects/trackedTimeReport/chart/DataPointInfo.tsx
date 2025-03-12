import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
} from '@floating-ui/react'
import { FixedReference } from '@lib/ui/base/FixedReference'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack, vStack } from '@lib/ui/css/stack'
import { Point } from '@lib/ui/entities/Point'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { getColor } from '@lib/ui/theme/getters'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useEffect } from 'react'
import styled from 'styled-components'

import { useActiveProject } from '../activeProject/useActiveProject'
import { ActiveDayInterval } from '../days/ActiveDayInterval'
import { useTimeGrouping } from '../timeGrouping/state'
import { useFormatPeriodDate } from '../timeGrouping/useFormatPeriodDate'
import { useStartOfSelectedIntervalPoint } from '../timeGrouping/useStartOfSelectedIntervalPoint'

import { DataPointBreakdown } from './breakdown/DataPointBreakdown'
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'

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
  const [activeProjectId] = useActiveProject()

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    update,
  } = useFloating({
    open: true,
    placement: 'right-start',
    strategy: 'fixed',
    middleware: [offset(16), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const periodStartedAt = useStartOfSelectedIntervalPoint(index)

  const data = useSelectedIntervalActiveTimeSeries()

  const formatDate = useFormatPeriodDate()

  const title = formatDate(periodStartedAt)

  useEffect(() => {
    update()
  }, [position, update])

  const total = data[index]

  const timeGrouping = useTimeGrouping()

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
        <HStack alignItems="center" justifyContent="space-between" gap={20}>
          <Text weight="600" color="supporting">
            {title}
          </Text>
          <Text weight="600" color="contrast">
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
        </HStack>
        {!activeProjectId && timeGrouping === 'day' && <ActiveDayInterval />}
        {!activeProjectId && <DataPointBreakdown />}
      </Container>
    </>
  )
}
