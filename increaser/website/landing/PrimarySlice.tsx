import { PrimaryCallToAction } from './PrimaryCallToAction'
import { vStack, VStack } from '@lib/ui/css/stack'
import { text, Text } from '@lib/ui/text'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { SparkleIcon } from '@lib/ui/icons/SparkleIcon'
import styled from 'styled-components'
import { FadeOutImageSlice } from '@lib/ui/website/FadeOutImageSlice'

const primaryTools = ['Deep Work', 'Time Tracking', 'Tasks', 'Daily Habits']

const Separator = styled(SparkleIcon)`
  ${text({
    size: 14,
    color: 'contrast',
  })}
`

const Container = styled(FadeOutImageSlice)`
  padding-top: 60px;
  align-items: start;
`

const Content = styled.div`
  z-index: 1;
  ${vStack({
    alignItems: 'center',
    gap: 32,
  })}
`

const Explanation = styled.div`
  ${vStack({
    alignItems: 'center',
    gap: 8,
  })}
`

const Item = styled(Text)`
  color: #ffd700;
  ${text({
    blurBackground: true,
    nowrap: true,
    size: 16,
    weight: 700,
  })}
`

const backgroundUrl = 'images/primary-slice-bg.webp'

export const PrimarySlice = () => (
  <Container imageUrl={backgroundUrl}>
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
          blurBackground
        >
          with
        </Text>
        <Explanation>
          <HStackSeparatedBy
            alignItems="center"
            justifyContent="center"
            wrap="wrap"
            gap={8}
            separator={<Separator />}
          >
            {primaryTools.map((tool) => (
              <Item as="h2" key={tool}>
                {tool}
              </Item>
            ))}
          </HStackSeparatedBy>
          <Item size={14} weight={600}>
            and other powerful tools...
          </Item>
        </Explanation>
      </VStack>
      <PrimaryCallToAction />
    </Content>
  </Container>
)
