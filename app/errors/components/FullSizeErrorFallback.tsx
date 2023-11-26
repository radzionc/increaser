import { VStack } from '@increaser/ui/layout/Stack'

import { ErrorFallbackCard } from './ErrorFallbackCard'

export const FullSizeErrorFallback = () => {
  return (
    <VStack fullWidth fullHeight alignItems="center" justifyContent="center">
      <ErrorFallbackCard />
    </VStack>
  )
}
