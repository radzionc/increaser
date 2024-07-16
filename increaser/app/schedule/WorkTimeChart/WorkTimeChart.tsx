import { VStack } from '@lib/ui/layout/Stack'
import { WorkTimeChartGuard } from './WorkTimeChartGuard'
import { WorkTimeChartProvider } from './WorkTimeChartProvider'
import { WorkTimeChartHeader } from './WorkTimeChartHeader'

export const WorkTimeChart = () => {
  return (
    <VStack>
      <WorkTimeChartHeader />
      <WorkTimeChartGuard>
        <WorkTimeChartProvider>
          <div>WorkTimeChart</div>
        </WorkTimeChartProvider>
      </WorkTimeChartGuard>
    </VStack>
  )
}
