import { VStack } from '@lib/ui/css/stack'

import { ErrorFallbackCard } from './ErrorFallbackCard'

export const FullSizeErrorFallback = () => {
  return (
    <VStack fullWidth fullHeight alignItems="center" justifyContent="center">
      <ErrorFallbackCard />
    </VStack>
  )
}
