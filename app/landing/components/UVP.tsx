import { HStack, VStack } from '@increaser/ui/ui/Stack'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'

import { CTA } from './CTA'
import { SliceTitle } from './shared/SliceTitle'

export const UVP = () => {
  return (
    <VStack style={{ maxWidth: 400 }} gap={40}>
      <VStack gap={4}>
        <SliceTitle>
          <Text as="span" color="alert">
            STOP OVERWORKING
          </Text>
          <br />
          & GET MORE DONE <br />
          <Text as="span" color="success">
            WITH RIGHT TOOLS
          </Text>
        </SliceTitle>
        <HStack gap={8}>
          <Text as="div" weight="bold" color="contrast">
            <HStackSeparatedBy
              separator={<Text color="shy">{dotSeparator}</Text>}
            >
              <Text as="h2" size={16}>
                DEEP WORK TIMER
              </Text>
              <Text as="h2" size={16}>
                TIME MANAGEMENT
              </Text>
              <Text as="h2" size={16}>
                HABIT TRACKER
              </Text>
            </HStackSeparatedBy>
          </Text>
        </HStack>
      </VStack>
      <VStack alignItems="start" gap={8}>
        <CTA />
        <Text color="supporting">No credit card, start for free</Text>
      </VStack>
    </VStack>
  )
}
