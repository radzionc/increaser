import { HStack, VStack } from '@lib/ui/layout/Stack'
import { SetsExplorerProvider } from './SetsExplorerProvider'
import { SetsExplorerYAxis } from './SetsExplorerYAxis'
import { SetsExplorerDays } from './SetsExplorerDays'
import { SetsExplorerStats } from './SetsExplorerStats'
import { SetsChart } from './SetsChart'

export const SetsExplorer = () => {
  return (
    <SetsExplorerProvider>
      <VStack gap={40}>
        <SetsExplorerStats />
        <SetsChart />
        <HStack fullWidth gap={8}>
          <SetsExplorerYAxis />
          <SetsExplorerDays />
        </HStack>
      </VStack>
    </SetsExplorerProvider>
  )
}
