import { HStack, VStack } from '@lib/ui/layout/Stack'
import { formatTimeGrouping, timeFrames, timeGroupings } from './TimeGrouping'
import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import styled from 'styled-components'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { ShySection } from '@lib/ui/layout/ShySection'

const ItemContainer = styled.div`
  height: 32px;
  display: grid;
  align-items: center;
`

const TimeFrameOption = styled(TabNavigationItem)`
  height: 100%;
  font-size: 14px;
  ${horizontalPadding(12)};
`

const Toggle = styled(MinimalisticToggle)`
  ${takeWholeSpace};
`

export const TimeFrameManager = () => {
  const { timeGrouping, timeFrame, setState } = useTrackedTimeReport()
  return (
    <ShySection title="Group by">
      <VStack gap={4}>
        {timeGroupings.map((group) => {
          const isGroupSelected = group === timeGrouping
          return (
            <ItemContainer
              style={{
                gridTemplateColumns: isGroupSelected ? '100px 1fr' : '1fr',
              }}
              key={group}
            >
              <Toggle
                value={isGroupSelected}
                onChange={() =>
                  setState((state) => ({ ...state, timeGrouping: group }))
                }
                label={formatTimeGrouping(group)}
              />
              {isGroupSelected && (
                <HStack alignItems="center" gap={4} fullHeight>
                  {timeFrames[group].map((frame) => (
                    <TimeFrameOption
                      isSelected={frame === timeFrame}
                      onSelect={() =>
                        setState((state) => ({ ...state, timeFrame: frame }))
                      }
                      value={frame ?? 'max'}
                      key={frame}
                      groupName={group}
                    >
                      {frame === null ? 'max' : `${frame}${group[0]}`}
                    </TimeFrameOption>
                  ))}
                </HStack>
              )}
            </ItemContainer>
          )
        })}
      </VStack>
    </ShySection>
  )
}
