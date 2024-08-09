import { HStack, VStack } from '@lib/ui/layout/Stack'
import { formatTimeGrouping, timeFrames, timeGroupings } from './TimeGrouping'
import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import styled from 'styled-components'
import { TabNavigationItem } from '@lib/ui/navigation/TabNavigation/TabNavigationItem'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ShySection } from '@lib/ui/layout/ShySection'

const Option = styled(TabNavigationItem)`
  height: 36px;
  font-size: 13px;
  ${horizontalPadding(12)};
`

export const TimeFrameManager = () => {
  const { timeGrouping, timeFrame, setState } = useTrackedTimeReport()
  return (
    <VStack gap={20}>
      <ShySection title="Group by">
        <HStack gap={4}>
          {timeGroupings.map((value) => (
            <Option
              isSelected={value === timeGrouping}
              onSelect={() =>
                setState((state) => ({ ...state, timeGrouping: value }))
              }
              value={value}
              key={value}
              groupName="timeGroup"
            >
              {formatTimeGrouping(value)}
            </Option>
          ))}
        </HStack>
      </ShySection>
      <ShySection title="Interval">
        <HStack alignItems="center" gap={4} fullHeight>
          {timeFrames[timeGrouping].map((frame) => (
            <Option
              isSelected={frame === timeFrame}
              onSelect={() =>
                setState((state) => ({ ...state, timeFrame: frame }))
              }
              value={frame ?? 'max'}
              key={frame}
              groupName={timeGrouping}
            >
              {frame === null
                ? 'Max'
                : `${frame}${timeGrouping[0].toUpperCase()}`}
            </Option>
          ))}
        </HStack>
      </ShySection>
    </VStack>
  )
}
