import { HStack, VStack } from '@lib/ui/layout/Stack'
import { SetsExplorerProvider } from './SetsExplorerProvider'
import { SetsExplorerYAxis } from './SetsExplorerYAxis'
import { SetsExplorerDays } from './SetsExplorerDays'
import { SetsExplorerStats } from './SetsExplorerStats'

export const SetsExplorer = () => {
  return (
    <SetsExplorerProvider>
      <VStack gap={40}>
        <SetsExplorerStats />
        <HStack fullWidth gap={8}>
          <SetsExplorerYAxis />
          <SetsExplorerDays />
        </HStack>
      </VStack>
    </SetsExplorerProvider>
  )
}
