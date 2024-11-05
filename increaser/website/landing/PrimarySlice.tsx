import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { SparkleIcon } from '@lib/ui/icons/SparkleIcon'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const primaryTools = [
  'Deep Work',
  'Time Tracking',
  'Daily Habits',
  'Tasks Management',
]

const Separator = styled(SparkleIcon)`
  color: ${getColor('contrast')};
  font-size: 14px;
`

export const PrimarySlice = () => (
  <PrimaryWebsiteSlice>
    <VStack flexGrow justifyContent="center" alignItems="center" gap={32}>
      <VStack alignItems="center" gap={12}>
        <Text color="contrast" size={40} as="h1" weight={800}>
          Achieve Your Goals
        </Text>
        <HStackSeparatedBy gap={8} separator={<Separator />}>
          {primaryTools.map((tool) => (
            <Text as="h2" color="primary" size={14} weight={600} key={tool}>
              {tool}
            </Text>
          ))}
        </HStackSeparatedBy>
      </VStack>
      <PrimaryCallToAction />
    </VStack>
  </PrimaryWebsiteSlice>
)
