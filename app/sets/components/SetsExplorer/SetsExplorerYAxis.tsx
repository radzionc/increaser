import { Spacer } from '@increaser/ui/layout/Spacer'
import { VStack } from '@increaser/ui/layout/Stack'
import { headerHeight } from './config'
import { SetsExplorerTimeMarks } from './SetsExplorerTimeMarks'

export const SetsExplorerYAxis = () => {
  return (
    <VStack>
      <Spacer height={headerHeight} />
      <SetsExplorerTimeMarks />
    </VStack>
  )
}
