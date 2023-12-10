import { VStack } from '@increaser/ui/layout/Stack'
import { useSetsExplorer } from './SetsExplorerProvider'
import { Text } from '@increaser/ui/text'
import { pluralize } from '@increaser/utils/pluralize'
import { SameWidthChildrenRow } from '@increaser/ui/layout/SameWidthChildrenRow'
import { SetsExplorerStatsDetails } from './SetsExplorerStatsDetails'

export const SetsExplorerStats = () => {
  const setsExplorer = useSetsExplorer()

  const days = setsExplorer.days.slice(0, -1)

  if (!days.length) {
    return null
  }

  return (
    <VStack gap={16}>
      <Text weight="semibold">
        Past {pluralize(days.length, 'day')} statistics
      </Text>
      <SameWidthChildrenRow gap={16} maxColumns={5} minChildrenWidth={160}>
        <SetsExplorerStatsDetails days={days} />
      </SameWidthChildrenRow>
    </VStack>
  )
}
