import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { useSetsExplorer } from './SetsExplorerProvider'
import { Text } from '@increaser/ui/text'
import { pluralize } from '@increaser/utils/pluralize'
import { SameWidthChildrenRow } from '@increaser/ui/layout/SameWidthChildrenRow'
import { SetsExplorerStatsDetails } from './SetsExplorerStatsDetails'
import { Switch } from '@increaser/ui/inputs/Switch/Switch'

export const SetsExplorerStats = () => {
  const { days, includesToday, setIncludesToday } = useSetsExplorer()

  return (
    <VStack gap={16}>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <Text weight="bold">
          {includesToday ? '' : 'Past '}
          {pluralize(days.length, 'day')} statistics
        </Text>
        <Switch
          value={includesToday}
          onChange={() => setIncludesToday(!includesToday)}
          label="include today"
        />
      </HStack>
      <SameWidthChildrenRow gap={16} maxColumns={5} minChildrenWidth={160}>
        <SetsExplorerStatsDetails days={days} />
      </SameWidthChildrenRow>
    </VStack>
  )
}
