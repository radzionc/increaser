import { HStack } from '@increaser/ui/layout/Stack'
import { SetsExplorerProvider } from './SetsExplorerProvider'
import { SetsExplorerYAxis } from './SetsExplorerYAxis'
import { SetsExplorerDays } from './SetsExplorerDays'

export const SetsExplorer = () => {
  return (
    <SetsExplorerProvider>
      <HStack fullWidth gap={8}>
        <SetsExplorerYAxis />
        <SetsExplorerDays />
      </HStack>
    </SetsExplorerProvider>
  )
}
