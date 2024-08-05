import { Spacer } from '@lib/ui/layout/Spacer'
import { VStack } from '@lib/ui/layout/Stack'
import { setsExplorerConfig } from './config'
import { useSetsExplorer } from './SetsExplorerProvider'
import { DayTimeLabels } from '@increaser/ui/sets/manager/overview/DayTimeLabels'

export const SetsExplorerYAxis = () => {
  const { startHour, endHour } = useSetsExplorer()

  return (
    <VStack>
      <Spacer height={setsExplorerConfig.headerHeight} />
      <DayTimeLabels
        startHour={startHour}
        endHour={endHour}
        style={{
          height: (endHour - startHour) * setsExplorerConfig.hourHeight,
        }}
      />
    </VStack>
  )
}
