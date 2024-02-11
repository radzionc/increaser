import { HStack, VStack } from '@lib/ui/layout/Stack'
import { SetsExplorerProvider } from './SetsExplorerProvider'
import { SetsExplorerYAxis } from './SetsExplorerYAxis'
import { SetsExplorerDays } from './SetsExplorerDays'
import { SetsExplorerStats } from './SetsExplorerStats'
import { SetsChart } from './SetsChart'
import { Line } from '@lib/ui/layout/Line'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { isEmpty } from '@lib/utils/array/isEmpty'

export const SetsExplorer = () => {
  const { sets } = useAssertUserState()
  if (isEmpty(sets)) return null

  return (
    <SetsExplorerProvider>
      <VStack gap={40}>
        <SetsExplorerStats />
        <SetsChart />
        <Line />
        <HStack fullWidth gap={8}>
          <SetsExplorerYAxis />
          <SetsExplorerDays />
        </HStack>
      </VStack>
    </SetsExplorerProvider>
  )
}
