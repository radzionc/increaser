import { VStack } from '@lib/ui/layout/Stack'
import { SetsExplorerProvider } from './SetsExplorerProvider'
import { SetsExplorerStats } from './SetsExplorerStats'
import { SetsChart } from './SetsChart'
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
      </VStack>
    </SetsExplorerProvider>
  )
}
