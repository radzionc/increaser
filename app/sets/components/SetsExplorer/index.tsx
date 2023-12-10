import { HStack } from '@increaser/ui/layout/Stack'
import { SetsExplorerProvider } from './SetsExplorerProvider'
import { SetsExplorerYAxis } from './SetsExplorerYAxis'

export const SetsExplorer = () => {
  return (
    <SetsExplorerProvider>
      <HStack fullWidth gap={20}>
        <SetsExplorerYAxis />
      </HStack>
    </SetsExplorerProvider>
  )
}
