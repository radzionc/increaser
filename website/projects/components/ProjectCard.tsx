import { ReactNode } from 'react'
import styled from 'styled-components'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { Panel } from '@increaser/ui/panel/Panel'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { S_IN_HOUR } from '@increaser/utils/time'
import { EmojiHeavyBlock } from 'ui/EmojiHeavyBlock'

interface Props {
  name?: string
  total: number
  color: HSLA
  emoji: string
  optionsOpener?: ReactNode
}

const OptionsWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

const Container = styled(Panel)`
  overflow: hidden;
  position: relative;
`

const Color = styled.div<{ $color: HSLA }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background: ${({ $color }) => $color.toCssValue()};
`

export const ProjectCard = ({
  total,
  emoji,
  name,
  optionsOpener,
  color,
}: Props) => {
  return (
    <Container width="100%">
      <Color $color={color} />
      <VStack style={{ position: 'relative' }} fullWidth gap={4}>
        <OptionsWrapper>{optionsOpener}</OptionsWrapper>
        <EmojiHeavyBlock
          emoji={emoji}
          title={name}
          subtitle={
            <>
              <Text as="span" weight="bold" color="regular">
                {Math.round(total / S_IN_HOUR)} hours
              </Text>{' '}
              total
            </>
          }
        />
      </VStack>
    </Container>
  )
}
