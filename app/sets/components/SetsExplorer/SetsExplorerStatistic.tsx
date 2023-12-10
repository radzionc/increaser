import { VStack } from '@increaser/ui/layout/Stack'
import { Panel } from '@increaser/ui/panel/Panel'
import { Text } from '@increaser/ui/text'
import { ReactNode } from 'react'

interface SetsExplorerStatisticProps {
  title: ReactNode
  value?: ReactNode
}
export const SetsExplorerStatistic = ({
  title,
  value,
}: SetsExplorerStatisticProps) => (
  <Panel>
    <VStack gap={8}>
      <Text as="div" size={14}>
        {title}
      </Text>
      <Text as="div" size={20} weight="bold">
        {value ?? '-'}
      </Text>
    </VStack>
  </Panel>
)
