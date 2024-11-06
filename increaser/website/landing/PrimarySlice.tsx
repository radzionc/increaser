import { PrimaryWebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { vStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { SparkleIcon } from '@lib/ui/icons/SparkleIcon'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { ClosingArgumentBackground } from '@lib/ui/website/ClosingArgumentBackground'
import { borderRadius } from '@lib/ui/css/borderRadius'

const primaryTools = ['Deep Work', 'Time Tracking', 'Tasks', 'Daily Habits']

const Separator = styled(SparkleIcon)`
  color: ${getColor('contrast')};
  font-size: 14px;
`

const Container = styled(ClosingArgumentBackground)`
  padding-top: 100px;
  align-items: start;
`

const Content = styled.div`
  z-index: 1;
  ${vStack({
    alignItems: 'center',
    gap: 32,
  })}
  padding: 20px;
  border-radius: 20px;

  position: relative;

  background: hsl(220deg 25.71% 13.73%);
`

export const PrimarySlice = () => (
  <Container imageUrl="images/mountain.jpg">
    <Content>
      <VStack alignItems="center" gap={12}>
        <Text
          centerHorizontally
          color="contrast"
          size={40}
          as="h1"
          weight={800}
          height="s"
        >
          Achieve Your Goals
        </Text>
        <Text
          color="contrast"
          size={14}
          weight={600}
          style={{ fontStyle: 'italic' }}
        >
          with
        </Text>
        <VStack alignItems="center" gap={8}>
          <HStackSeparatedBy
            alignItems="center"
            justifyContent="center"
            wrap="wrap"
            gap={8}
            separator={<Separator />}
          >
            {primaryTools.map((tool) => (
              <Text
                nowrap
                as="h2"
                size={16}
                weight={700}
                key={tool}
                color="primary"
              >
                {tool}
              </Text>
            ))}
          </HStackSeparatedBy>
          <Text color="primary" nowrap as="h2" size={14} weight={600}>
            and other cool tools...
          </Text>
        </VStack>
      </VStack>
      <PrimaryCallToAction />
    </Content>
  </Container>
)
