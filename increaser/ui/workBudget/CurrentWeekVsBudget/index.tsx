import { VStack } from '@lib/ui/css/stack'

import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'

import { ComparisonChart } from './ComparisonChart'

export const CurrentWeekVsBudget = () => {
  return (
    <ElementSizeAware
      render={({ setElement, size }) => (
        <VStack fullWidth gap={8} ref={setElement}>
          {size && <ComparisonChart width={size.width} />}
        </VStack>
      )}
    />
  )
}
