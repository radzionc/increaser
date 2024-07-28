import { VStack } from '@lib/ui/layout/Stack'
import { WorkTimeReportGuard } from './WorkTimeReportGuard'
import { WorkTimeReportHeader } from './WorkTimeReportHeader'
import { WorkTimeChart } from './WorkTimeChart'
import { WorkTimeStats } from './WorkTimeStats'

export const WorkTimeReport = () => {
  return (
    <VStack gap={8}>
      <WorkTimeReportGuard>
        <WorkTimeReportHeader />
        <VStack gap={20}>
          <WorkTimeStats />
          <WorkTimeChart />
        </VStack>
      </WorkTimeReportGuard>
    </VStack>
  )
}
