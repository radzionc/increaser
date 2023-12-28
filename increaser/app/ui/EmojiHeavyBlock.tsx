import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  emoji: ReactNode
  title: ReactNode
  subtitle: ReactNode
}

const Subtitle = styled(Text)`
  width: 100%;
  text-align: start;
`

export const EmojiHeavyBlock = ({ emoji, title, subtitle }: Props) => (
  <HStack fullWidth style={{ overflow: 'hidden' }} alignItems="center" gap={8}>
    <Text as="div" height="small" size={40}>
      {emoji}
    </Text>
    <VStack
      style={{ overflow: 'hidden' }}
      fullWidth
      alignItems="start"
      fullHeight
    >
      <Text cropped as="div" color="regular" weight="semibold">
        {title || '...'}
      </Text>
      <Subtitle as="div" color="supporting" weight="semibold">
        {subtitle}
      </Subtitle>
    </VStack>
  </HStack>
)
