import { HStack, VStack } from '@lib/ui/css/stack'

import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { Spacer } from '@lib/ui/layout/Spacer'

import { chartConfig } from './config'
import { ComparisonChart } from './ComparisonChart'

export const CurrentWeekVsBudget = () => {
  return (
    <VStack gap={20}>
      <HStack>
        <ElementSizeAware
          render={({ setElement, size }) => (
            <VStack fullWidth gap={8} ref={setElement}>
              {size && <ComparisonChart width={size.width} />}
            </VStack>
          )}
        />
        <Spacer width={chartConfig.expectedXLabelWidth / 2} />
      </HStack>
    </VStack>
  )
}
