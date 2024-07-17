import { VStack } from '@lib/ui/layout/Stack'
import { WorkTimeReportGuard } from './WorkTimeReportGuard'
import { WorkTimeReportHeader } from './WorkTimeReportHeader'
import { WorkTimeChart } from './WorkTimeChart'

export const WorkTimeReport = () => {
  return (
    <VStack>
      <WorkTimeReportHeader />
      <WorkTimeReportGuard>
        <WorkTimeChart />
      </WorkTimeReportGuard>
    </VStack>
  )
}
